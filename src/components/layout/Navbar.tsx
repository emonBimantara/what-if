"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import { authClient } from "@/lib/auth/auth-client";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { data: session, isPending } = authClient.useSession();

  // Close user dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await authClient.signOut();
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
    router.push("/login");
    router.refresh();
  }

  const navLinks = [
    { href: "/", label: "Beranda" },
    { href: "/simulator", label: "Simulator" },
    { href: "/simulations", label: "Simulasi Saya" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-[#fafaf9]/95 backdrop-blur-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-15">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-zinc-900 text-white font-bold text-xs tracking-tight shadow-2xs font-mono">
            W/I
          </div>
          <div className="flex flex-col">
            <span className="text-sm sm:text-base font-bold tracking-tight text-zinc-900 flex items-center gap-1">
              What If<span className="text-emerald-700 font-bold">?</span>
            </span>
            <span className="text-[9px] text-zinc-400 font-mono tracking-wider uppercase -mt-0.5">
              Financial Simulator
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 ${
                  isActive
                    ? "bg-zinc-200/70 text-zinc-900 font-semibold"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {isPending ? null : session ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900 text-white text-[10px] font-bold">
                  {session.user.name.charAt(0).toUpperCase()}
                </div>

                <span className="max-w-[120px] truncate">{session.user.name}</span>

                <ChevronDown
                  className={`h-3.5 w-3.5 text-zinc-400 transition-transform ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-full pt-1.5 w-44 z-50">
                  <div className="rounded-md border border-zinc-200 bg-white p-1 shadow-sm">
                    <div className="px-3 py-2 border-b border-zinc-100">
                      <p className="text-xs font-semibold text-zinc-900 truncate">
                        {session.user.name}
                      </p>
                      <p className="text-[10px] text-zinc-400 truncate">
                        {session.user.email}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full mt-1 flex items-center gap-2 rounded px-3 py-1.5 text-left text-xs font-medium text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Keluar
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3 py-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-900 transition-colors duration-150"
              >
                Masuk
              </Link>
              <Link
                href="/signup"
                className="px-3 py-1.5 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-md transition-colors duration-150 shadow-2xs"
              >
                Daftar
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "bg-zinc-100 text-zinc-900 font-semibold"
                      : "text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-zinc-100 flex flex-col gap-2">
            {isPending ? null : session ? (
              <>
                <div className="flex items-center gap-2.5 px-3 py-2 bg-zinc-50 rounded-md">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-900 text-white text-xs font-bold">
                    {session.user.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-zinc-900 truncate">
                      {session.user.name}
                    </p>
                    <p className="text-[11px] text-zinc-500 truncate">
                      {session.user.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100/80 border border-rose-200/60 rounded-md transition-colors cursor-pointer text-center"
                >
                  Keluar dari Akun
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center px-4 py-2 text-xs font-medium text-zinc-800 bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200 rounded-md transition-colors"
                >
                  Masuk
                </Link>

                <Link
                  href="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-center px-4 py-2 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-md transition-colors"
                >
                  Daftar Akun
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
