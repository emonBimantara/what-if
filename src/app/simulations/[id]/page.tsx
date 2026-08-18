import Link from "next/link";
import { ArrowLeft, Share2, Download, Sliders } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { getSimulationById } from "@/lib/api/simulations";

type SimulationDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SimulationDetailPage({ params }: SimulationDetailPageProps) {
  const { id } = await params;
  const respData = await getSimulationById(id);
  const simulation = respData.simulation;
  const recommendedScenario = simulation.scenarios.reduce((best, scenario) => {
    return scenario.burdenRatio < best.burdenRatio ? scenario : best;
  });

  const burdenVariant = {
    LOW: "emerald",
    MODERATE: "amber",
    HIGH: "rose",
  } as const;

  return (
    <div className="py-8 sm:py-12 bg-[#fafaf9] min-h-screen">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="indigo">Kategori: {simulation.category}</Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
                Laporan Hasil Simulasi: {simulation.simulationName}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-600">
                Analisis rasio beban pembiayaan terhadap kapasitas arus kas bulanan.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/simulator?id=${simulation.id}`}>
                <Button variant="outline" size="sm" className="h-9 px-3 flex items-center gap-2">
                  <Sliders className="h-4 w-4 shrink-0" />
                  <span>Edit Input</span>
                </Button>
              </Link>
              <Button variant="primary" size="sm" className="h-9 px-3 flex items-center gap-2 font-semibold">
                <Download className="h-4 w-4 shrink-0" />
                <span>Export PDF</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-emerald-300 bg-emerald-50/40 p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-200 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-bold block">
                PRIMARY RECOMMENDATION — {recommendedScenario.name}
              </span>

              <h2 className="text-xl sm:text-2xl font-bold text-emerald-950 mt-0.5">
                Rekomendasi Skema Pembiayaan (DP{" "}
                {((recommendedScenario.dp / recommendedScenario.price) * 100).toFixed(0)}%
                {" / "}
                {recommendedScenario.tenor / 12} Tahun)
              </h2>
            </div>

            <Badge variant="emerald">
              ★ Opsi Paling Optimal
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 tabular-nums">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-emerald-800 uppercase block">
                RECOMMENDED CICILAN
              </span>

              <p className="text-2xl sm:text-3xl font-bold text-emerald-950 font-mono">
                Rp {recommendedScenario.monthlyPayment.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
                <span className="text-xs font-normal text-emerald-800">
                  /bln
                </span>
              </p>

              <span className="text-[11px] text-emerald-800 block font-mono">
                {recommendedScenario.burdenRatio.toFixed(2)}% DARI PENGHASILAN
              </span>
            </div>

            <div className="space-y-1 sm:border-l sm:border-emerald-200 sm:pl-6">
              <span className="text-xs font-medium text-emerald-800 uppercase block">
                ESTIMASI DAMPAK CASHFLOW
              </span>

              <p
                className={`text-2xl sm:text-3xl font-bold font-mono ${recommendedScenario.remainingCashFlow < 0
                  ? "text-amber-900"
                  : "text-emerald-900"
                  }`}
              >
                {recommendedScenario.remainingCashFlow < 0 ? "-" : "+"}
                Rp{" "}
                {Math.abs(recommendedScenario.remainingCashFlow).toLocaleString("id-ID", { maximumFractionDigits: 0 })}
                <span className="text-xs font-normal ml-1">
                  /bln
                </span>
              </p>

              <span className="text-[11px] text-amber-800 block font-mono">
                {recommendedScenario.remainingCashFlow < 0
                  ? "DEFISIT DARI SISA CASH FLOW"
                  : "SURPLUS DARI SISA CASH FLOW"}
              </span>
            </div>

            <div className="space-y-1 sm:border-l sm:border-emerald-200 sm:pl-6">
              <span className="text-xs font-medium text-emerald-800 uppercase block">
                TOTAL COMMITMENT ASET
              </span>

              <p className="text-2xl sm:text-3xl font-bold text-zinc-900 font-mono">
                Rp {recommendedScenario.totalPayment.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
              </p>

              <span className="text-[11px] text-zinc-600 block font-mono">
                TOTAL BUNGA: Rp{" "}
                {recommendedScenario.totalInterest.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
            01 — FINANCIAL OVERVIEW (BASELINE CASH FLOW)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 tabular-nums">
            <div className="p-4 rounded-lg border border-zinc-200 bg-white space-y-1">
              <span className="text-xs font-medium text-zinc-500 block uppercase">Penghasilan Bulanan</span>
              <p className="text-xl font-bold text-zinc-900 font-mono">
                Rp {simulation.income.toLocaleString("id-ID")}
              </p>
              <span className="text-[11px] text-zinc-500 block">Pendapatan bersih rutin</span>
            </div>

            <div className="p-4 rounded-lg border border-zinc-200 bg-white space-y-1">
              <span className="text-xs font-medium text-zinc-500 block uppercase">Pengeluaran Bulanan</span>
              <p className="text-xl font-bold text-zinc-900 font-mono">
                Rp {simulation.expense.toLocaleString("id-ID")}
              </p>
              <span className="text-[11px] text-zinc-500 block">Biaya hidup & cicilan aktif</span>
            </div>

            <div className="p-4 rounded-lg border border-zinc-200 bg-white space-y-1">
              <span className="text-xs font-bold text-zinc-900 block uppercase">Sisa Cash Flow Bebas</span>
              <p className="text-xl font-bold text-emerald-800 font-mono">
                Rp {(simulation.income - simulation.expense).toLocaleString("id-ID")}
              </p>
              <span className="text-[11px] text-zinc-500 block">Kapasitas maksimal pembayaran</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
              02 — SCENARIO COMPARISON MATRIX
            </span>

            <span className="text-xs text-zinc-500 font-mono">
              {simulation.scenarios.length} SCENARIOS EVALUATED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {simulation.scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="rounded-lg border border-zinc-200 bg-white p-5 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-zinc-800">{scenario.name} </span>
                    <Badge variant={burdenVariant[scenario.burdenLevel as keyof typeof burdenVariant]}>
                      {scenario.burdenLevel}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-zinc-900">
                      DP Rp {scenario.dp.toLocaleString("id-ID")} · Tenor{" "}
                      {scenario.tenor} Bulan
                    </h3>
                    <p className="text-xs text-zinc-500"> Bunga {scenario.interest}% per tahun</p>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-zinc-100 text-xs tabular-nums">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Harga Barang:</span>
                      <span className="text-zinc-900">Rp {scenario.price.toLocaleString("id-ID")}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-zinc-500">Down Payment:</span>
                      <span className="text-zinc-900">Rp {scenario.dp.toLocaleString("id-ID")}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-zinc-500">Tenor:</span>
                      <span className="text-zinc-900">{scenario.tenor} Bulan</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-zinc-500">Bunga:</span>
                      <span className="text-zinc-900">
                        {scenario.interest}% / thn
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-zinc-50 border border-zinc-200 space-y-2 tabular-nums">
                    <div>
                      <span className="text-[11px] text-zinc-600 block">Cicilan / Bulan</span>
                      <span className="text-lg font-bold text-zinc-900">
                        Rp {scenario.monthlyPayment.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-zinc-200 text-[11px] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-zinc-600"> Sisa Cash Flow:</span>
                        <span className="font-bold text-zinc-900">
                          Rp {scenario.remainingCashFlow.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-600">Beban / Income:</span>
                        <span className="font-bold text-zinc-900">
                          {scenario.burdenRatio.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-zinc-700 bg-zinc-100 p-2.5 rounded border border-zinc-200">
                  Loan Amount: Rp {scenario.loanAmount.toLocaleString("id-ID")}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DETAILED METRIC MATRIX TABLE */}
        <div className="space-y-4 pt-4 border-t border-zinc-200">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block">
            03 — DETAILED METRIC MATRIX TABLE
          </span>

          <div className="rounded-lg border border-zinc-200 bg-white overflow-x-auto shadow-none">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50 text-zinc-900 font-bold">
                  <th className="p-3.5">Metrik Finansial</th>

                  {simulation.scenarios.map((scenario) => {
                    const isBest = scenario.id === recommendedScenario.id;
                    return (
                      <th
                        key={scenario.id}
                        className={`p-3.5 ${isBest
                          ? "text-emerald-900 bg-emerald-50/60 border-x border-emerald-200"
                          : "text-zinc-900"
                          }`}
                      >
                        {scenario.name}
                        {isBest && " ★"}
                      </th>
                    );
                  })}
                </tr>
              </thead>

              <tbody className="divide-y divide-zinc-200 tabular-nums text-zinc-800">

                <tr>
                  <td className="p-3.5 font-medium text-zinc-600">Uang Muka (DP)</td>

                  {simulation.scenarios.map((scenario) => {
                    const isBest = scenario.id === recommendedScenario.id;
                    return (
                      <td
                        key={scenario.id}
                        className={`p-3.5 font-semibold ${isBest ? "bg-emerald-50/40 border-x border-emerald-200" : ""
                          }`}
                      >
                        Rp {scenario.dp.toLocaleString("id-ID")}
                      </td>
                    );
                  })}
                </tr>

                <tr>
                  <td className="p-3.5 font-medium text-zinc-600">Tenor Pembiayaan </td>

                  {simulation.scenarios.map((scenario) => {
                    const isBest = scenario.id === recommendedScenario.id;
                    return (
                      <td
                        key={scenario.id}
                        className={`p-3.5 ${isBest ? "bg-emerald-50/40 border-x border-emerald-200" : ""
                          }`}
                      >
                        {scenario.tenor} Bulan
                      </td>
                    );
                  })}
                </tr>

                {/* Cicilan */}
                <tr>
                  <td className="p-3.5 font-medium text-zinc-600">Cicilan / Bulan</td>

                  {simulation.scenarios.map((scenario) => {
                    const isBest = scenario.id === recommendedScenario.id;
                    return (
                      <td
                        key={scenario.id}
                        className={`p-3.5 font-bold ${scenario.burdenLevel === "HIGH"
                          ? "text-rose-800"
                          : scenario.burdenLevel === "MODERATE"
                            ? "text-amber-800"
                            : "text-emerald-800"
                          } ${isBest ? "bg-emerald-50/40 border-x border-emerald-200" : ""}`}
                      >
                        Rp {Math.round(scenario.monthlyPayment).toLocaleString("id-ID")}
                      </td>
                    );
                  })}
                </tr>

                <tr>
                  <td className="p-3.5 font-medium text-zinc-600">Total Bunga Dibayarkan</td>

                  {simulation.scenarios.map((scenario) => {
                    const isBest = scenario.id === recommendedScenario.id;
                    return (
                      <td
                        key={scenario.id}
                        className={`p-3.5 ${isBest ? "bg-emerald-50/40 border-x border-emerald-200" : ""
                          }`}
                      >
                        Rp {Math.round(scenario.totalInterest).toLocaleString("id-ID")}
                      </td>
                    );
                  })}
                </tr>

                <tr>
                  <td className="p-3.5 font-medium text-zinc-600">Total Pembayaran Aset</td>

                  {simulation.scenarios.map((scenario) => {
                    const isBest = scenario.id === recommendedScenario.id;
                    return (
                      <td
                        key={scenario.id}
                        className={`p-3.5 ${isBest ? "bg-emerald-50/40 border-x border-emerald-200" : ""
                          }`}
                      >
                        Rp {Math.round(scenario.totalPayment).toLocaleString("id-ID")}
                      </td>
                    );
                  })}
                </tr>

                <tr>
                  <td className="p-3.5 font-medium text-zinc-600">Sisa Cash Flow Bersih</td>

                  {simulation.scenarios.map((scenario) => {
                    const isBest = scenario.id === recommendedScenario.id;
                    return (
                      <td
                        key={scenario.id}
                        className={`p-3.5 font-semibold ${scenario.remainingCashFlow < 0 ? "text-rose-800" : "text-emerald-800"
                          } ${isBest ? "bg-emerald-50/40 border-x border-emerald-200" : ""}`}
                      >
                        {scenario.remainingCashFlow < 0 ? "-" : "+"}Rp{" "}
                        {Math.abs(Math.round(scenario.remainingCashFlow)).toLocaleString("id-ID")}
                      </td>
                    );
                  })}
                </tr>

                <tr>
                  <td className="p-3.5 font-medium text-zinc-600">Rasio Cicilan / Income</td>

                  {simulation.scenarios.map((scenario) => {
                    const isBest = scenario.id === recommendedScenario.id;
                    return (
                      <td
                        key={scenario.id}
                        className={`p-3.5 font-bold ${scenario.burdenLevel === "HIGH"
                          ? "text-rose-800"
                          : scenario.burdenLevel === "MODERATE"
                            ? "text-amber-800"
                            : "text-emerald-800"
                          } ${isBest ? "bg-emerald-50/40 border-x border-emerald-200" : ""}`}
                      >
                        {scenario.burdenRatio.toFixed(2)}%
                      </td>
                    );
                  })}
                </tr>

                <tr>
                  <td className="p-3.5 font-medium text-zinc-600">Level Risiko Finansial</td>

                  {simulation.scenarios.map((scenario) => {
                    const isBest = scenario.id === recommendedScenario.id;
                    return (
                      <td
                        key={scenario.id}
                        className={`p-3.5 ${isBest ? "bg-emerald-50/40 border-x border-emerald-200" : ""
                          }`}
                      >
                        {scenario.burdenLevel === "HIGH" && (
                          <Badge variant="rose">Risiko Tinggi</Badge>
                        )}

                        {scenario.burdenLevel === "MODERATE" && (
                          <Badge variant="amber">Risiko Moderat</Badge>
                        )}

                        {scenario.burdenLevel === "LOW" && (
                          <Badge variant="emerald">Risiko Terkendali</Badge>
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}