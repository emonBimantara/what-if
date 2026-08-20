"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50/80 text-zinc-500 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-tight text-zinc-900">
                What If<span className="text-emerald-700"> ?</span>
              </span>
            </Link>
            <p className="text-zinc-600 text-xs leading-relaxed max-w-md">
              What If? membantu Anda menganalisis dan membandingkan dampak finansial dari berbagai skenario keputusan sebelum mengambil langkah penting.
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-zinc-900 uppercase tracking-wider mb-3">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-zinc-900 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/simulator" className="hover:text-zinc-900 transition-colors">
                  Simulator
                </Link>
              </li>
              <li>
                <Link href="/simulations" className="hover:text-zinc-900 transition-colors">
                  Simulasi Saya
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-zinc-900 uppercase tracking-wider mb-3">
              Pengguna
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/login" className="hover:text-zinc-900 transition-colors">
                  Masuk Akun
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-zinc-900 transition-colors">
                  Daftar Akun Baru
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-300/70 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} What If? Financial Simulator. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}