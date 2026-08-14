import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#fafaf9]">
      <section className="relative overflow-hidden py-16 md:py-24 border-b border-zinc-200 bg-financial-grid">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
                What if you made this financial decision?
              </h1>

              <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                Lihat dan bandingkan konsekuensi pembiayaan secara rasional sebelum kamu menyepakati komitmen kredit besar seperti kendaraan, KPR rumah, atau pinjaman modal.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link href="/simulator">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto font-semibold active:scale-[0.99] transition-transform">
                    Mulai Simulasi
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/simulations">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Lihat Contoh Simulasi
                  </Button>
                </Link>
              </div>

              <div className="pt-4 border-t border-zinc-200/80 flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-700" /> Tanpa Registrasi Wajib
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-700" /> Perbandingan Multi-Skenario
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5 text-emerald-700" /> Analisis Rasio Beban
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-lg border border-zinc-300 bg-white p-5 shadow-sm space-y-4 font-mono text-xs relative">
                <div className="flex items-center justify-between border-b border-zinc-200 pb-2.5">
                  <span className="font-bold text-zinc-900 tracking-wider text-[11px] uppercase">
                    [ PREVIEW ]
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase">Monthly Income / Free Cashflow</span>
                    <span className="text-sm font-bold text-zinc-900 tabular-nums">Rp 10.000.000 / Rp 5.000.000</span>
                  </div>

                  <div className="border-t border-dashed border-zinc-200 pt-2.5 space-y-2">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-zinc-600">SKENARIO B (RECOMMENDED)</span>
                      <Badge variant="emerald">DP 30%</Badge>
                    </div>

                    <div className="p-2.5 rounded bg-emerald-50/60 border border-emerald-200 space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-zinc-600">Cicilan / Bulan:</span>
                        <strong className="text-emerald-900 font-bold tabular-nums">Rp 5.210.000</strong>
                      </div>
                      <div className="flex justify-between text-[10px] text-zinc-500">
                        <span>Dampak Cash Flow:</span>
                        <span className="text-amber-800 font-semibold tabular-nums">-Rp 210.000</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-200 flex justify-between items-center text-[10px] text-zinc-500">
                    <span>STATUS RISIKO: MODERAT</span>
                    <span className="font-bold text-zinc-900">BEBAN: 52.1%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#fafaf9] border-b border-zinc-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-10">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              3 Langkah Membandingkan Masa Depan Finansial
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2.5 p-5 rounded-lg border border-zinc-200 bg-white relative">
              <span className="text-xs font-mono font-bold text-emerald-800 block">01 — POSITION</span>
              <h3 className="text-base font-bold text-zinc-900">Input Cash Flow</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Isi total penghasilan rutin bulanan dan pengeluaran tetap saat ini untuk menghitung sisa dana bebas.
              </p>
            </div>

            <div className="space-y-2.5 p-5 rounded-lg border border-zinc-200 bg-white relative">
              <span className="text-xs font-mono font-bold text-emerald-800 block">02 — VARIATION</span>
              <h3 className="text-base font-bold text-zinc-900">Buat Skenario</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Tambahkan variasi Uang Muka (DP), tenor cicilan, atau opsi bunga untuk membandingkan skema pembiayaan.
              </p>
            </div>

            <div className="space-y-2.5 p-5 rounded-lg border border-zinc-200 bg-white relative">
              <span className="text-xs font-mono font-bold text-emerald-800 block">03 — REPORT</span>
              <h3 className="text-base font-bold text-zinc-900">Evaluasi Perbandingan</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Lihat rasio beban cicilan, total bunga yang dibayarkan, serta indikator tingkat risiko finansial.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
                Simulasi untuk Berbagai Kebutuhan Finansial
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
            <div className="p-4 rounded border border-zinc-200 bg-[#fafaf9] space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 block uppercase">CATEG A</span>
              <h4 className="font-bold text-zinc-900 text-sm">Pembelian Kendaraan</h4>
              <p className="text-zinc-600 leading-relaxed">
                Bandingkan skenario beli mobil atau motor dengan variasi DP 20%-50% dan tenor 3 hingga 5 tahun.
              </p>
            </div>

            <div className="p-4 rounded border border-zinc-200 bg-[#fafaf9] space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 block uppercase">CATEG B</span>
              <h4 className="font-bold text-zinc-900 text-sm">KPR Rumah / Properti</h4>
              <p className="text-zinc-600 leading-relaxed">
                Evaluasi komitmen KPR 10, 15, atau 20 tahun terhadap stabilitas keuangan jangka panjang.
              </p>
            </div>

            <div className="p-4 rounded border border-zinc-200 bg-[#fafaf9] space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 block uppercase">CATEG C</span>
              <h4 className="font-bold text-zinc-900 text-sm">Kredit & Pinjaman</h4>
              <p className="text-zinc-600 leading-relaxed">
                Kalkulasi batas beban cicilan pinjaman modal usaha atau kredit barang elektronik.
              </p>
            </div>

            <div className="p-4 rounded border border-zinc-200 bg-[#fafaf9] space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 block uppercase">CATEG D</span>
              <h4 className="font-bold text-zinc-900 text-sm">Keputusan Lainnya</h4>
              <p className="text-zinc-600 leading-relaxed">
                Gunakan simulator untuk dana pendidikan, renovasi rumah, atau investasi bisnis pribadi.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
