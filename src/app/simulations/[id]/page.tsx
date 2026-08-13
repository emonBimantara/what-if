import Link from "next/link";
import { ArrowLeft, Share2, Download, Sliders, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function SimulationDetailPage() {
  return (
    <div className="py-8 sm:py-12 bg-[#fafaf9] min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
        {/* Navigation & Report Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Link
              href="/simulations"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> Kembali ke Daftar Simulasi
            </Link>
            <span className="text-[11px] font-mono text-zinc-400">
              REPORT REF: #SIM-84920
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="indigo">Kategori: Kendaraan</Badge>
                <Badge variant="amber">Status: Risiko Moderat</Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
                Laporan Hasil Simulasi: Pembelian Honda HR-V
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600">
                Analisis rasio beban pembiayaan terhadap kapasitas arus kas bulanan.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/simulator">
                <Button variant="outline" size="sm">
                  <Sliders className="h-3.5 w-3.5" />
                  Edit Input
                </Button>
              </Link>
              <Button variant="secondary" size="sm">
                <Share2 className="h-3.5 w-3.5" />
                Bagikan
              </Button>
              <Button variant="primary" size="sm" className="font-semibold">
                <Download className="h-3.5 w-3.5" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>

        {/* PRIMARY HIGHLIGHTED METRIC BOX (Visual Signature) */}
        <div className="rounded-lg border border-emerald-300 bg-emerald-50/40 p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-200 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-bold block">
                PRIMARY RECOMMENDATION — SKENARIO B
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-emerald-950 mt-0.5">
                Rekomendasi Skema Pembiayaan (DP 30% / 5 Tahun)
              </h2>
            </div>
            <Badge variant="emerald">★ Opsi Paling Optimal</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 tabular-nums">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase block">RECOMMENDED CICILAN</span>
              <p className="text-2xl sm:text-3xl font-bold text-emerald-950 font-mono">
                Rp 5.210.000<span className="text-xs font-normal text-emerald-800">/bln</span>
              </p>
              <span className="text-[11px] text-emerald-800 block font-mono">52.1% DARI PENGHASILAN</span>
            </div>

            <div className="space-y-1 sm:border-l sm:border-emerald-200 sm:pl-6">
              <span className="text-xs font-medium text-emerald-800 uppercase block">ESTIMASI DAMPAK CASHFLOW</span>
              <p className="text-2xl sm:text-3xl font-bold text-amber-900 font-mono">
                -Rp 210.000<span className="text-xs font-normal text-amber-800">/bln</span>
              </p>
              <span className="text-[11px] text-amber-800 block font-mono">DEFISIT TIPIS DARI SISA CASH FLOW</span>
            </div>

            <div className="space-y-1 sm:border-l sm:border-emerald-200 sm:pl-6">
              <span className="text-xs font-medium text-emerald-800 uppercase block">TOTAL COMMITMENT ASET</span>
              <p className="text-2xl sm:text-3xl font-bold text-zinc-900 font-mono">
                Rp 428.100.000
              </p>
              <span className="text-[11px] text-zinc-600 block font-mono">TOTAL BUNGA: Rp 43.100.000</span>
            </div>
          </div>
        </div>

        {/* FINANCIAL OVERVIEW GRID */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
            01 — FINANCIAL OVERVIEW (BASELINE CASH FLOW)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 tabular-nums">
            <div className="p-4 rounded-lg border border-zinc-200 bg-white space-y-1">
              <span className="text-xs font-medium text-zinc-500 block uppercase">Penghasilan Bulanan</span>
              <p className="text-xl font-bold text-zinc-900 font-mono">Rp 10.000.000</p>
              <span className="text-[11px] text-zinc-500 block">Pendapatan bersih rutin</span>
            </div>

            <div className="p-4 rounded-lg border border-zinc-200 bg-white space-y-1">
              <span className="text-xs font-medium text-zinc-500 block uppercase">Pengeluaran Bulanan</span>
              <p className="text-xl font-bold text-zinc-900 font-mono">Rp 5.000.000</p>
              <span className="text-[11px] text-zinc-500 block">Biaya hidup & cicilan aktif</span>
            </div>

            <div className="p-4 rounded-lg border border-zinc-200 bg-white space-y-1">
              <span className="text-xs font-bold text-zinc-900 block uppercase">Sisa Cash Flow Bebas</span>
              <p className="text-xl font-bold text-emerald-800 font-mono">Rp 5.000.000</p>
              <span className="text-[11px] text-zinc-500 block">Kapasitas maksimal pembayaran</span>
            </div>
          </div>
        </div>

        {/* SCENARIO COMPARISON CARDS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
              02 — SCENARIO COMPARISON MATRIX
            </span>
            <span className="text-xs text-zinc-500 font-mono">3 SCENARIOS EVALUATED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Scenario A Card */}
            <div className="rounded-lg border border-rose-200 bg-white p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-rose-800">SKENARIO A</span>
                  <Badge variant="rose">Risiko Tinggi</Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-zinc-900">DP 20% (Tenor 3 Tahun)</h3>
                  <p className="text-xs text-zinc-500">Cicilan cepat tapi beban bulanan sangat berat.</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-zinc-100 text-xs tabular-nums">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Harga Barang:</span>
                    <span className="text-zinc-900">Rp 385.000.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Down Payment (20%):</span>
                    <span className="text-zinc-900">Rp 77.000.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Tenor:</span>
                    <span className="text-zinc-900">36 Bulan (3 Thn)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Bunga:</span>
                    <span className="text-zinc-900">5.5% / thn</span>
                  </div>
                </div>

                <div className="p-3 rounded bg-rose-50/70 border border-rose-200 space-y-2 tabular-nums">
                  <div>
                    <span className="text-[11px] text-zinc-600 block">Cicilan / Bulan</span>
                    <span className="text-lg font-bold text-rose-800">Rp 9.968.000</span>
                  </div>
                  <div className="pt-2 border-t border-rose-200/80 text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Sisa Cash Flow:</span>
                      <span className="font-bold text-rose-800">-Rp 4.968.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Beban / Income:</span>
                      <span className="font-bold text-rose-800">99.7%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-rose-800 bg-rose-50 p-2.5 rounded border border-rose-200 flex items-start gap-1.5">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5 text-rose-700" />
                <span>Cicilan melebihi sisa cash flow bulanan. Potensi defisit tinggi.</span>
              </div>
            </div>

            {/* Scenario B Card */}
            <div className="rounded-lg border-2 border-emerald-600 bg-emerald-50/20 p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-emerald-900">SKENARIO B</span>
                  <Badge variant="emerald">★ Rekomendasi</Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-zinc-900">DP 30% (Tenor 5 Tahun)</h3>
                  <p className="text-xs text-zinc-600">Keseimbangan antara besaran DP dan cicilan bulanan.</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-emerald-200/80 text-xs tabular-nums">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Harga Barang:</span>
                    <span className="text-zinc-900">Rp 385.000.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Down Payment (30%):</span>
                    <span className="text-zinc-900">Rp 115.500.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Tenor:</span>
                    <span className="text-zinc-900">60 Bulan (5 Thn)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Bunga:</span>
                    <span className="text-zinc-900">6.0% / thn</span>
                  </div>
                </div>

                <div className="p-3 rounded bg-white border border-emerald-300 space-y-2 tabular-nums">
                  <div>
                    <span className="text-[11px] text-zinc-600 block">Cicilan / Bulan</span>
                    <span className="text-lg font-bold text-emerald-900">Rp 5.210.000</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-200 text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Sisa Cash Flow:</span>
                      <span className="font-bold text-amber-800">-Rp 210.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Beban / Income:</span>
                      <span className="font-bold text-amber-800">52.1%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-emerald-900 bg-emerald-100/70 p-2.5 rounded border border-emerald-300 flex items-start gap-1.5">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5 text-emerald-800" />
                <span>Pilihan paling seimbang dengan suku bunga & sisa dana terjangkau.</span>
              </div>
            </div>

            {/* Scenario C Card */}
            <div className="rounded-lg border border-zinc-200 bg-white p-5 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-zinc-800">SKENARIO C</span>
                  <Badge variant="emerald">Risiko Terkendali</Badge>
                </div>

                <div>
                  <h3 className="text-base font-bold text-zinc-900">DP 45% (Tenor 5 Tahun)</h3>
                  <p className="text-xs text-zinc-500">Uang muka besar untuk menjaga cicilan bulanan ringan.</p>
                </div>

                <div className="space-y-2 pt-3 border-t border-zinc-100 text-xs tabular-nums">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Harga Barang:</span>
                    <span className="text-zinc-900">Rp 385.000.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Down Payment (45%):</span>
                    <span className="text-zinc-900">Rp 173.250.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Tenor:</span>
                    <span className="text-zinc-900">60 Bulan (5 Thn)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Bunga:</span>
                    <span className="text-zinc-900">5.8% / thn</span>
                  </div>
                </div>

                <div className="p-3 rounded bg-zinc-50 border border-zinc-200 space-y-2 tabular-nums">
                  <div>
                    <span className="text-[11px] text-zinc-600 block">Cicilan / Bulan</span>
                    <span className="text-lg font-bold text-emerald-800">Rp 4.075.000</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-200 text-[11px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Sisa Cash Flow:</span>
                      <span className="font-bold text-emerald-800">+Rp 925.000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-600">Beban / Income:</span>
                      <span className="font-bold text-emerald-800">40.75%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-zinc-700 bg-zinc-100 p-2.5 rounded border border-zinc-200 flex items-start gap-1.5">
                <Info className="h-4 w-4 flex-shrink-0 mt-0.5 text-zinc-500" />
                <span>Membutuhkan modal awal DP yang tinggi di awal pembelian.</span>
              </div>
            </div>
          </div>
        </div>

        {/* METRIC COMPARISON TABLE MATRIX */}
        <div className="space-y-4 pt-4 border-t border-zinc-200">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
            03 — DETAILED METRIC MATRIX TABLE
          </span>

          <div className="rounded-lg border border-zinc-200 bg-white overflow-x-auto shadow-none">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 text-zinc-900 font-bold">
                  <th className="p-3.5">Metrik Finansial</th>
                  <th className="p-3.5 text-rose-800">Skenario A (DP 20%)</th>
                  <th className="p-3.5 text-emerald-900 bg-emerald-50/60 border-x border-emerald-200">
                    Skenario B (DP 30%) ★
                  </th>
                  <th className="p-3.5 text-zinc-900">Skenario C (DP 45%)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 tabular-nums text-zinc-800">
                <tr>
                  <td className="p-3.5 font-medium text-zinc-600">Uang Muka (DP)</td>
                  <td className="p-3.5 font-semibold text-zinc-900">Rp 77.000.000</td>
                  <td className="p-3.5 font-semibold text-zinc-900 bg-emerald-50/40 border-x border-emerald-200">
                    Rp 115.500.000
                  </td>
                  <td className="p-3.5 font-semibold text-zinc-900">Rp 173.250.000</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-zinc-600">Tenor Pembiayaan</td>
                  <td className="p-3.5">36 Bulan (3 Thn)</td>
                  <td className="p-3.5 bg-emerald-50/40 border-x border-emerald-200">
                    60 Bulan (5 Thn)
                  </td>
                  <td className="p-3.5">60 Bulan (5 Thn)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-zinc-600">Cicilan / Bulan</td>
                  <td className="p-3.5 font-bold text-rose-800">Rp 9.968.000</td>
                  <td className="p-3.5 font-bold text-emerald-900 bg-emerald-50/40 border-x border-emerald-200">
                    Rp 5.210.000
                  </td>
                  <td className="p-3.5 font-bold text-emerald-800">Rp 4.075.000</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-zinc-600">Total Bunga Dibayarkan</td>
                  <td className="p-3.5">Rp 50.850.000</td>
                  <td className="p-3.5 bg-emerald-50/40 border-x border-emerald-200">
                    Rp 43.100.000
                  </td>
                  <td className="p-3.5">Rp 32.750.000</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-zinc-600">Total Pembayaran Aset</td>
                  <td className="p-3.5">Rp 435.850.000</td>
                  <td className="p-3.5 bg-emerald-50/40 border-x border-emerald-200">
                    Rp 428.100.000
                  </td>
                  <td className="p-3.5">Rp 417.750.000</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-zinc-600">Sisa Cash Flow Bersih</td>
                  <td className="p-3.5 font-semibold text-rose-800">-Rp 4.968.000</td>
                  <td className="p-3.5 font-semibold text-amber-800 bg-emerald-50/40 border-x border-emerald-200">
                    -Rp 210.000
                  </td>
                  <td className="p-3.5 font-semibold text-emerald-800">+Rp 925.000</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-zinc-600">Rasio Cicilan / Income</td>
                  <td className="p-3.5 font-bold text-rose-800">99.7%</td>
                  <td className="p-3.5 font-bold text-amber-800 bg-emerald-50/40 border-x border-emerald-200">
                    52.1%
                  </td>
                  <td className="p-3.5 font-bold text-emerald-800">40.75%</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-medium text-zinc-600">Level Risiko Finansial</td>
                  <td className="p-3.5"><Badge variant="rose">Risiko Tinggi</Badge></td>
                  <td className="p-3.5 bg-emerald-50/40 border-x border-emerald-200">
                    <Badge variant="amber">Risiko Moderat</Badge>
                  </td>
                  <td className="p-3.5"><Badge variant="emerald">Risiko Terkendali</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* EVALUATION & REPORT METADATA */}
        <div className="rounded-lg border border-zinc-200 bg-white p-5 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-zinc-900">Evaluasi Risiko Finansial</h3>
            <span className="text-[10px] font-mono text-zinc-400">ANALYSIS STAMP: VERIFIED</span>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Berdasarkan simulasi di atas, <span className="font-semibold text-zinc-900">Skenario A</span> memiliki potensi defisit arus kas karena beban cicilan hampir menyamai total pendapatan bersih. <span className="font-semibold text-emerald-900">Skenario B</span> merupakan opsi paling seimbang antara nominal DP awal dan fleksibilitas arus kas bulanan.
          </p>
          <div className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-100 flex justify-between items-center font-mono">
            <span>* Laporan statis prototype tanpa kalkulasi dynamic backend.</span>
            <span>WHAT IF REPORT #SIM-84920</span>
          </div>
        </div>
      </div>
    </div>
  );
}
