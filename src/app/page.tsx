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
              <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-xs space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2.5">
                  <span className="font-semibold text-zinc-900 tracking-wider text-[11px] uppercase">
                    Sample Worksheet
                  </span>
                  <span className="text-[10px] text-zinc-400 font-normal">
                    Pembelian Mobil
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-zinc-500 block text-[10px] uppercase font-sans">
                      Income Bulanan / Free Cash Flow
                    </span>
                    <span className="text-sm font-bold text-zinc-900 tabular-nums">
                      Rp 10.000.000 / Rp 5.000.000
                    </span>
                  </div>

                  <div className="border-t border-dashed border-zinc-200 pt-2.5 space-y-2">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-zinc-700 font-semibold">SKENARIO B (REKOMENDASI)</span>
                      <Badge variant="emerald">DP 30% · 36 Bulan</Badge>
                    </div>

                    <div className="p-3 rounded bg-emerald-50/50 border border-emerald-200/80 space-y-1.5 font-sans">
                      <div className="flex justify-between text-xs">
                        <span className="text-zinc-600">Cicilan / Bulan:</span>
                        <strong className="text-emerald-950 font-bold font-mono tabular-nums">
                          Rp 3.850.000
                        </strong>
                      </div>
                      <div className="flex justify-between text-[11px] text-zinc-500">
                        <span>Sisa Cash Flow Bersih:</span>
                        <span className="text-emerald-800 font-medium font-mono tabular-nums">
                          +Rp 1.150.000
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-100 flex justify-between items-center text-[10px] text-zinc-500">
                    <span>STATUS: TERKENDALI</span>
                    <span className="font-semibold text-zinc-800 font-mono">RASIO: 38.5%</span>
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
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block">
              Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              3 Langkah Membandingkan Masa Depan Finansial
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2 p-5 rounded-lg border border-zinc-200 bg-white">
              <span className="text-xs font-mono font-semibold text-emerald-800 block">
                01 — CASH FLOW
              </span>
              <h3 className="text-base font-bold text-zinc-900">Input Posisi Keuangan</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Isi total penghasilan rutin bulanan dan pengeluaran tetap saat ini untuk menghitung kapasitas arus kas bebas.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-lg border border-zinc-200 bg-white">
              <span className="text-xs font-mono font-semibold text-emerald-800 block">
                02 — SKENARIO
              </span>
              <h3 className="text-base font-bold text-zinc-900">Buat Variasi Pilihan</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Tambahkan variasi Uang Muka (DP), pilihan tenor (12-60 bulan), atau suku bunga per tahun untuk melihat perbedaan cicilan.
              </p>
            </div>

            <div className="space-y-2 p-5 rounded-lg border border-zinc-200 bg-white">
              <span className="text-xs font-mono font-semibold text-emerald-800 block">
                03 — MATRIKS
              </span>
              <h3 className="text-base font-bold text-zinc-900">Evaluasi Keputusan</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Dapatkan rekomendasi skema paling optimal, analisis rasio beban terhadap gaji, dan estimasi surplus/defisit bulanan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold block">
                Use Cases
              </span>
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">
                Simulasi untuk Berbagai Kebutuhan Finansial
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs">
            <div className="p-4 rounded-md border border-zinc-200 bg-[#fafaf9] space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 block uppercase font-medium">
                Kendaraan
              </span>
              <h4 className="font-bold text-zinc-900 text-sm">Mobil & Motor</h4>
              <p className="text-zinc-600 leading-relaxed">
                Bandingkan skenario beli tunai sebagian vs kredit dengan variasi DP 20%-50% dan tenor 3 hingga 5 tahun.
              </p>
            </div>

            <div className="p-4 rounded-md border border-zinc-200 bg-[#fafaf9] space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 block uppercase font-medium">
                Properti
              </span>
              <h4 className="font-bold text-zinc-900 text-sm">KPR Rumah / Ruko</h4>
              <p className="text-zinc-600 leading-relaxed">
                Evaluasi komitmen cicilan jangka panjang 10, 15, atau 20 tahun terhadap ketahanan cash flow keluarga.
              </p>
            </div>

            <div className="p-4 rounded-md border border-zinc-200 bg-[#fafaf9] space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 block uppercase font-medium">
                Pinjaman
              </span>
              <h4 className="font-bold text-zinc-900 text-sm">Modal & Usaha</h4>
              <p className="text-zinc-600 leading-relaxed">
                Kalkulasi batas aman beban pinjaman modal ekspansi usaha tanpa mengganggu biaya operasional rutin.
              </p>
            </div>

            <div className="p-4 rounded-md border border-zinc-200 bg-[#fafaf9] space-y-2">
              <span className="text-[10px] font-mono text-zinc-400 block uppercase font-medium">
                Kebutuhan Lain
              </span>
              <h4 className="font-bold text-zinc-900 text-sm">Elektronik & Renovasi</h4>
              <p className="text-zinc-600 leading-relaxed">
                Uji dampak pembiayaan renovasi tempat tinggal, alat kerja produktif, atau komitmen kebutuhan lainnya.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
