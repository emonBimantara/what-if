"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/90 bg-[#fafaf9]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900 text-white font-bold text-xs tracking-tight shadow-sm font-mono">
            W/I
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-zinc-900 flex items-center gap-1.5">
              What If<span className="text-emerald-700 font-extrabold">?</span>
            </span>
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
              Financial Simulator
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link
            href="/"
            className="px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors duration-150"
          >
            Beranda
          </Link>
          <Link
            href="/simulator"
            className="px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors duration-150"
          >
            Simulator
          </Link>
          <Link
            href="/simulations"
            className="px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors duration-150"
          >
            Simulasi Saya
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-900 transition-colors duration-150"
          >
            Masuk
          </Link>
          <Link
            href="/simulator"
            className="inline-flex items-center gap-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 active:scale-[0.99] px-3.5 py-1.5 text-xs font-semibold text-white transition-all duration-150 shadow-sm"
          >
            Mulai Simulasi
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 rounded-md"
            >
              Beranda
            </Link>
            <Link
              href="/simulator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 rounded-md"
            >
              Simulator
            </Link>
            <Link
              href="/simulations"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-100 rounded-md"
            >
              Simulasi Saya
            </Link>
          </nav>

          <div className="pt-3 border-t border-zinc-200 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2 text-xs font-semibold text-zinc-800 bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 rounded-md"
            >
              Masuk
            </Link>
            <Link
              href="/signup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2 text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 rounded-md"
            >
              Daftar Akun
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
