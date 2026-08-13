import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import FinancialInput from "@/components/simulator/FinancialInput";
import ScenarioCard from "@/components/simulator/ScenarioCard";

export default function SimulatorPage() {
  return (
    <div className="py-8 sm:py-12 bg-[#fafaf9] min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8">
        {/* Header Header & Worksheet Metadata */}
        <div className="border-b border-zinc-200 pb-5 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              FINANCIAL WORKSHEET — REF: W-01
            </span>
            <span className="text-[11px] font-mono text-zinc-400">STATUS: DRAFT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            Simulator Keputusan Finansial
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl">
            Isi worksheet di bawah ini untuk mensimulasikan dan membandingkan beban pembiayaan terhadap arus kas Anda.
          </p>
        </div>

        {/* WORKSHEET CONTAINER (Visual Presentation Only) */}
        <div className="space-y-8">
          {/* SECTION 01 — YOUR FINANCIAL POSITION */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                01
              </span>
              <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
                YOUR FINANCIAL POSITION
              </h2>
            </div>
            <FinancialInput
              defaultIncome="10.000.000"
              defaultExpense="5.000.000"
            />
          </div>

          <hr className="border-t border-zinc-200" />

          {/* SECTION 02 — YOUR DECISION SPECIFICATIONS */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                02
              </span>
              <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
                DECISION SPECIFICATIONS
              </h2>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-white p-5 sm:p-6 space-y-4">
              <div className="pb-3 border-b border-zinc-200 flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900">
                    Informasi Barang / Keputusan
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Berikan nama dan kategori untuk mempermudah identifikasi laporan.
                  </p>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">SPEC ID #02</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Input
                  label="Nama Simulasi / Aset"
                  placeholder="Contoh: Pembelian Honda HR-V"
                  defaultValue="Pembelian Honda HR-V"
                  helperText="Nama barang atau proyek keputusan"
                />

                <Select
                  label="Kategori Keputusan"
                  defaultValue="Kendaraan"
                  options={[
                    { value: "Kendaraan", label: "Kendaraan (Mobil / Motor)" },
                    { value: "Rumah", label: "Rumah / Properti (KPR)" },
                    { value: "Kredit", label: "Kredit / Pinjaman Modal" },
                    { value: "Lainnya", label: "Lainnya" },
                  ]}
                  helperText="Pilih jenis fasilitas pembiayaan"
                />
              </div>
            </div>
          </div>

          <hr className="border-t border-zinc-200" />

          {/* SECTION 03 — COMPARE SCENARIOS */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                  03
                </span>
                <div>
                  <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
                    SCENARIO VARIATIONS
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Buat minimal 2 skenario dengan kombinasi DP, tenor, atau suku bunga yang berbeda.
                  </p>
                </div>
              </div>

              {/* Visual Button: + Tambah Skenario */}
              <button
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-300 transition-colors duration-150 w-fit"
              >
                <Plus className="h-3.5 w-3.5" />
                + Tambah Skenario
              </button>
            </div>

            <div className="space-y-5">
              {/* Scenario A Card */}
              <ScenarioCard
                scenarioLetter="A"
                badgeLabel="Skenario 1 — DP Rendah"
                defaultName="Skenario A - DP 20% (Tenor 3 Tahun)"
                defaultPrice="385.000.000"
                defaultDp="77.000.000"
                defaultTenor="36"
                defaultInterest="5.5"
                isRemovable={false}
              />

              {/* Scenario B Card */}
              <ScenarioCard
                scenarioLetter="B"
                badgeLabel="Skenario 2 — Moderat"
                defaultName="Skenario B - DP 30% (Tenor 5 Tahun)"
                defaultPrice="385.000.000"
                defaultDp="115.500.000"
                defaultTenor="60"
                defaultInterest="6.0"
                isRemovable={true}
              />
            </div>
          </div>

          {/* Bottom Action CTA */}
          <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-500 font-mono">
              [ WORKSHEET READY — PRESS COMPARE TO GENERATE REPORT ]
            </div>

            <Link href="/simulations/honda-hr-v" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto font-semibold px-8 shadow-sm">
                Bandingkan Skenario
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
