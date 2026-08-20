import Link from "next/link";
import { Sliders } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import DeleteSimulationButton from "@/components/simulator/DeleteSimulationButton";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";
import { getSimulationById } from "@/services/simulation.service";

type SimulationDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SimulationDetailPage({ params }: SimulationDetailPageProps) {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const simulation = await getSimulationById(id, session.user.id);
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 pb-6">
            <div className="space-y-1.5">
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
                <Button variant="outline" size="sm" className="h-9 px-3 flex items-center gap-1.5 cursor-pointer shadow-2xs font-medium">
                  <Sliders className="h-3.5 w-3.5 shrink-0" />
                  <span>Edit</span>
                </Button>
              </Link>

              <DeleteSimulationButton id={simulation.id} />
            </div>
          </div>
        </div>

        {/* PRIMARY RECOMMENDATION BANNER */}
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-5 sm:p-6 space-y-4 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200/80 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-bold block">
                PRIMARY RECOMMENDATION — {recommendedScenario.name}
              </span>

              <h2 className="text-lg sm:text-xl font-bold text-emerald-950 mt-0.5">
                Rekomendasi Skema Pembiayaan (DP{" "}
                {((recommendedScenario.dp / recommendedScenario.price) * 100).toFixed(0)}%
                {" · "}
                {recommendedScenario.tenor / 12} Tahun)
              </h2>
            </div>

            <Badge variant="emerald">
              Opsi Paling Optimal
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 tabular-nums">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block font-mono">
                RECOMMENDED CICILAN
              </span>

              <p className="text-2xl sm:text-3xl font-bold text-emerald-950 font-mono">
                Rp {recommendedScenario.monthlyPayment.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
                <span className="text-xs font-normal text-emerald-800 ml-1">
                  /bln
                </span>
              </p>

              <span className="text-[11px] text-emerald-800 block font-mono">
                {recommendedScenario.burdenRatio.toFixed(2)}% DARI PENGHASILAN
              </span>
            </div>

            <div className="space-y-1 sm:border-l sm:border-emerald-200/80 sm:pl-6">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block font-mono">
                ESTIMASI DAMPAK CASH FLOW
              </span>

              <p
                className={`text-2xl sm:text-3xl font-bold font-mono ${
                  recommendedScenario.remainingCashFlow < 0
                    ? "text-rose-900"
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

              <span className="text-[11px] text-emerald-800 block font-mono">
                {recommendedScenario.remainingCashFlow < 0
                  ? "DEFISIT DARI SISA CASH FLOW"
                  : "SURPLUS DARI SISA CASH FLOW"}
              </span>
            </div>

            <div className="space-y-1 sm:border-l sm:border-emerald-200/80 sm:pl-6">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block font-mono">
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

        {/* SECTION 01 FINANCIAL OVERVIEW */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
              01
            </span>
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
              FINANCIAL OVERVIEW (BASELINE CASH FLOW)
            </h2>
          </div>

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

        {/* SECTION 02 SCENARIO COMPARISON MATRIX */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
                02
              </span>
              <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                SCENARIO COMPARISON MATRIX
              </h2>
            </div>

            <span className="text-xs text-zinc-500 font-mono">
              {simulation.scenarios.length} SKENARIO DIANALISIS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {simulation.scenarios.map((scenario) => {
              const isBest = scenario.id === recommendedScenario.id;

              return (
                <div
                  key={scenario.id}
                  className={`rounded-lg border bg-white p-5 space-y-4 flex flex-col justify-between shadow-2xs ${
                    isBest
                      ? "border-emerald-300 ring-1 ring-emerald-300/60"
                      : "border-zinc-200"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold font-mono text-zinc-900">
                          {scenario.name}
                        </span>
                        {isBest && (
                          <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            Terbaik
                          </span>
                        )}
                      </div>

                      <Badge variant={burdenVariant[scenario.burdenLevel as keyof typeof burdenVariant]}>
                        {scenario.burdenLevel}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-zinc-900">
                        DP Rp {scenario.dp.toLocaleString("id-ID")} · Tenor{" "}
                        {scenario.tenor} Bulan
                      </h3>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        Bunga {scenario.interest}% per tahun
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-zinc-100 text-xs tabular-nums font-mono">
                      <div className="flex justify-between">
                        <span className="text-zinc-500 font-sans">Harga Barang:</span>
                        <span className="text-zinc-900 font-semibold">
                          Rp {scenario.price.toLocaleString("id-ID")}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500 font-sans">Down Payment:</span>
                        <span className="text-zinc-900 font-semibold">
                          Rp {scenario.dp.toLocaleString("id-ID")}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500 font-sans">Tenor Pembiayaan:</span>
                        <span className="text-zinc-900 font-semibold">
                          {scenario.tenor} Bulan ({scenario.tenor / 12} Thn)
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500 font-sans">Suku Bunga:</span>
                        <span className="text-zinc-900 font-semibold">
                          {scenario.interest}% / thn
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-md bg-zinc-50 border border-zinc-200/80 space-y-2 tabular-nums">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block">
                          Cicilan / Bulan
                        </span>
                        <span className="text-base font-bold text-zinc-900 font-mono">
                          Rp {scenario.monthlyPayment.toLocaleString("id-ID", { maximumFractionDigits: 0 })}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-zinc-200/80 text-[11px] space-y-1">
                        <div className="flex justify-between">
                          <span className="text-zinc-600">Sisa Cash Flow:</span>
                          <span className={`font-mono font-semibold ${
                            scenario.remainingCashFlow < 0 ? "text-rose-700" : "text-emerald-700"
                          }`}>
                            {scenario.remainingCashFlow < 0 ? "-" : "+"}Rp{" "}
                            {Math.abs(scenario.remainingCashFlow).toLocaleString("id-ID", { maximumFractionDigits: 0 })}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span className="text-zinc-600">Beban / Income:</span>
                          <span className="font-mono font-semibold text-zinc-900">
                            {scenario.burdenRatio.toFixed(2)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-zinc-600 bg-zinc-100/80 p-2.5 rounded border border-zinc-200 font-mono">
                    Pokok Pinjaman: Rp {scenario.loanAmount.toLocaleString("id-ID")}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 03 DETAILED METRIC MATRIX TABLE */}
        <div className="space-y-4 pt-4 border-t border-zinc-200">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
              03
            </span>
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
              DETAILED METRIC MATRIX TABLE
            </h2>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white overflow-x-auto shadow-2xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/80 text-zinc-900 font-semibold">
                  <th className="p-3.5">Metrik Finansial</th>

                  {simulation.scenarios.map((scenario) => {
                    const isBest = scenario.id === recommendedScenario.id;
                    return (
                      <th
                        key={scenario.id}
                        className={`p-3.5 ${
                          isBest
                            ? "text-emerald-950 bg-emerald-50/70 border-x border-emerald-200"
                            : "text-zinc-900"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <span>{scenario.name}</span>
                          {isBest && (
                            <span className="text-[10px] text-emerald-800 font-normal">
                              (Optimal)
                            </span>
                          )}
                        </div>
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