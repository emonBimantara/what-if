import Link from "next/link";
import { Plus, ChevronRight, FileX } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";

export default function SimulationsPage() {
  return (
    <div className="py-8 sm:py-12 bg-[#fafaf9] min-h-[calc(100vh-8rem)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-1">
              WORKSPACE / 3 SIMULASI TERSIMPAN
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
              Simulasi Saya
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Daftar skenario keputusan finansial yang telah Anda buat.
            </p>
          </div>

          <div>
            <Link href="/simulator">
              <Button variant="primary" size="md" className="font-semibold w-full sm:w-auto active:scale-[0.99] transition-transform">
                <Plus className="h-4 w-4" />
                Simulasi Baru
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono">
            <button type="button" className="px-3 py-1 rounded bg-zinc-900 text-white font-medium">
              SEMUA (3)
            </button>
            <button type="button" className="px-3 py-1 rounded bg-white text-zinc-600 border border-zinc-200 hover:text-zinc-900 transition-colors">
              KENDARAAN (1)
            </button>
            <button type="button" className="px-3 py-1 rounded bg-white text-zinc-600 border border-zinc-200 hover:text-zinc-900 transition-colors">
              RUMAH (1)
            </button>
            <button type="button" className="px-3 py-1 rounded bg-white text-zinc-600 border border-zinc-200 hover:text-zinc-900 transition-colors">
              KREDIT (1)
            </button>
          </div>

          <div className="w-full md:w-56">
            <Input
              placeholder="Cari simulasi..."
              className="py-1 text-xs"
            />
          </div>
        </div>

        {/* Editorial List View with Vertical Accents & Numbering */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
            MY CURATED SIMULATIONS
          </span>

          <div className="divide-y divide-zinc-200 border border-zinc-200 rounded-lg bg-white overflow-hidden shadow-sm">
            {/* Item 01 */}
            <Link href="/simulations/honda-hr-v" className="group block p-4 sm:p-5 hover:bg-zinc-50 transition-colors border-l-4 border-l-amber-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-zinc-400">01</span>
                    <h3 className="text-base font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors">
                      Pembelian Honda HR-V
                    </h3>
                    <Badge variant="indigo">Kendaraan</Badge>
                    <Badge variant="amber">Risiko Moderat</Badge>
                  </div>
                  <p className="text-xs text-zinc-500 pl-7">
                    3 Skenario Pembiayaan · Ref: SIM-HRV · Updated: Hari ini
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 text-xs tabular-nums pl-7 md:pl-0">
                  <div>
                    <span className="text-zinc-500 block text-[11px] font-mono uppercase">Income / Expense</span>
                    <span className="font-semibold text-zinc-900">Rp 10jt / Rp 5jt</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-800 font-semibold font-mono text-xs">
                    LIHAT HASIL <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Item 02 */}
            <Link href="/simulations/kpr-bintaro" className="group block p-4 sm:p-5 hover:bg-zinc-50 transition-colors border-l-4 border-l-emerald-600">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-zinc-400">02</span>
                    <h3 className="text-base font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors">
                      KPR Rumah Bintaro 15th
                    </h3>
                    <Badge variant="indigo">Rumah</Badge>
                    <Badge variant="emerald">Terkendali</Badge>
                  </div>
                  <p className="text-xs text-zinc-500 pl-7">
                    2 Skenario Pembiayaan · Ref: SIM-KPR · Updated: Kemarin
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 text-xs tabular-nums pl-7 md:pl-0">
                  <div>
                    <span className="text-zinc-500 block text-[11px] font-mono uppercase">Income / Expense</span>
                    <span className="font-semibold text-zinc-900">Rp 25jt / Rp 11jt</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-800 font-semibold font-mono text-xs">
                    LIHAT HASIL <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Item 03 */}
            <Link href="/simulations/kredit-usaha" className="group block p-4 sm:p-5 hover:bg-zinc-50 transition-colors border-l-4 border-l-rose-600">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-bold text-zinc-400">03</span>
                    <h3 className="text-base font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors">
                      Kredit Modal Usaha Cafe
                    </h3>
                    <Badge variant="indigo">Kredit</Badge>
                    <Badge variant="rose">Risiko Tinggi</Badge>
                  </div>
                  <p className="text-xs text-zinc-500 pl-7">
                    3 Skenario Pembiayaan · Ref: SIM-KRD · Updated: 3 hari lalu
                  </p>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 text-xs tabular-nums pl-7 md:pl-0">
                  <div>
                    <span className="text-zinc-500 block text-[11px] font-mono uppercase">Income / Expense</span>
                    <span className="font-semibold text-zinc-900">Rp 15jt / Rp 7.5jt</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-800 font-semibold font-mono text-xs">
                    LIHAT HASIL <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Empty State Visual Preview */}
        <div className="pt-8 border-t border-zinc-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
              EMPTY STATE VISUAL REFERENCE
            </span>
            <Badge variant="outline">Statis Empty View</Badge>
          </div>

          <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center space-y-3">
            <div className="mx-auto h-9 w-9 rounded bg-zinc-100 border border-zinc-200 text-zinc-400 flex items-center justify-center font-mono font-bold text-xs">
              00
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h3 className="text-sm font-bold text-zinc-900">Belum Ada Simulasi Tersimpan</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Anda belum membuat simulasi keputusan finansial. Buat simulasi pertama Anda.
              </p>
            </div>
            <div>
              <Link href="/simulator">
                <Button variant="outline" size="sm">
                  + Buat Simulasi Pertama
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
