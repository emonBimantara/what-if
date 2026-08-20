"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus, ArrowRight, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import FinancialInput from "@/components/simulator/FinancialInput";
import ScenarioCard from "@/components/simulator/ScenarioCard";
import type { ScenarioFormItem } from "@/types/simulation";
import {
  calculateSimulation,
  getSimulationById,
  updateSimulation,
} from "@/lib/api/simulations";

export default function SimulatorForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");
  const isEditMode = Boolean(editId);

  const [isLoadingData, setIsLoadingData] = useState(false);
  const [simulationName, setSimulationName] = useState("");
  const [category, setCategory] = useState("Kendaraan");
  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");

  const [scenarios, setScenarios] = useState<ScenarioFormItem[]>([
    {
      id: "scenario-1",
      name: "",
      price: "",
      dp: "",
      tenor: "",
      interest: "",
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formatCurrency = (val: string | number) => {
    const raw = String(val).replace(/\D/g, "");
    if (!raw) return "";
    return Number(raw).toLocaleString("id-ID");
  };

  const cleanNumber = (val: string | number) => {
    if (!val) return 0;
    return Number(String(val).replace(/\./g, "").replace(/,/g, ""));
  };

  // Ambil data lama jika sedang dalam mode edit (?id=...)
  useEffect(() => {
    if (!editId) return;

    async function loadSimulationData() {
      try {
        setIsLoadingData(true);
        const data = await getSimulationById(editId as string);
        const sim = data.simulation;

        setSimulationName(sim.simulationName || "");
        setCategory(sim.category || "Kendaraan");
        setIncome(formatCurrency(sim.income));
        setExpense(formatCurrency(sim.expense));

        if (sim.scenarios && sim.scenarios.length > 0) {
          setScenarios(
            sim.scenarios.map((sc) => ({
              id: sc.id || crypto.randomUUID(),
              name: sc.name || "",
              price: formatCurrency(sc.price),
              dp: formatCurrency(sc.dp),
              tenor: String(sc.tenor || ""),
              interest: String(sc.interest || ""),
            }))
          );
        }
      } catch (err: any) {
        setErrorMessage("Gagal memuat data simulasi yang ingin diedit.");
      } finally {
        setIsLoadingData(false);
      }
    }

    loadSimulationData();
  }, [editId]);

  const handleAddScenario = () => {
    const newScenario: ScenarioFormItem = {
      id: crypto.randomUUID(),
      name: "",
      price: "",
      dp: "",
      tenor: "",
      interest: "",
    };

    setScenarios((prev) => [...prev, newScenario]);
  };

  const handleRemoveScenario = (id: string) => {
    if (scenarios.length <= 1) return;
    setScenarios((prev) => prev.filter((item) => item.id !== id));
  };

  const handleScenarioChange = (
    id: string,
    field: keyof ScenarioFormItem,
    value: string
  ) => {
    let finalValue = value;

    if (field === "price" || field === "dp") {
      finalValue = formatCurrency(value);
    }

    setScenarios((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: finalValue } : item))
    );
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const payload = {
        simulationName,
        category,
        income: cleanNumber(income),
        expense: cleanNumber(expense),
        scenarios: scenarios.map((scenario, index) => ({
          name: scenario.name || `Skenario ${String.fromCharCode(65 + index)}`,
          price: cleanNumber(scenario.price),
          dp: cleanNumber(scenario.dp),
          tenor: cleanNumber(scenario.tenor),
          interest: Number(scenario.interest) || 0,
        })),
      };

      if (isEditMode && editId) {
        // Mode Update: Kirim request update ke data simulasi yang sudah ada
        await updateSimulation(editId, payload);
        router.push(`/simulations/${editId}`);
      } else {
        // Mode Create: Buat simulasi baru
        const result = await calculateSimulation(payload);
        if (result.simulation?.id) {
          router.push(`/simulations/${result.simulation.id}`);
        }
      }
    } catch (error: any) {
      setErrorMessage(error.message || "Terjadi kesalahan saat memproses data");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoadingData) {
    return (
      <div className="flex items-center justify-center p-12 text-zinc-500 text-xs font-mono gap-2 rounded-lg border border-dashed border-zinc-300 bg-white">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Memuat data simulasi sebelumnya...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {errorMessage && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-md">
          {errorMessage}
        </div>
      )}

      {/* SECTION 01 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
            01
          </span>
          <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
            YOUR FINANCIAL POSITION
          </h2>
        </div>
        <FinancialInput
          income={income}
          expense={expense}
          onIncomeChange={(val) => setIncome(formatCurrency(val))}
          onExpenseChange={(val) => setExpense(formatCurrency(val))}
        />
      </div>

      <div className="border-t border-zinc-200/80" />

      {/* SECTION 02 */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono font-bold text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
            02
          </span>
          <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
            DECISION SPECIFICATIONS
          </h2>
        </div>

        <div className="rounded-lg border border-zinc-200 bg-white p-5 sm:p-6 space-y-4 shadow-2xs">
          <div className="pb-3 border-b border-zinc-100">
            <h3 className="text-sm font-bold text-zinc-900">
              Informasi Barang / Keputusan
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Berikan nama dan kategori untuk mempermudah identifikasi laporan simulasi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              name="simulationName"
              label="Nama Simulasi / Aset"
              placeholder="Contoh: Pembelian Honda HR-V"
              value={simulationName}
              onChange={(e) => setSimulationName(e.target.value)}
              helperText="Nama barang, aset, atau keputusan pembiayaan"
              required
            />

            <Select
              name="category"
              label="Kategori Keputusan"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={[
                { value: "Kendaraan", label: "Kendaraan" },
                { value: "Properti", label: "Properti" },
                { value: "Kredit", label: "Kredit & Pinjaman" },
                { value: "Lainnya", label: "Lainnya" },
              ]}
              helperText="Pilih jenis fasilitas pembiayaan"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200/80" />

      {/* SECTION 03 */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
              03
            </span>
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                SCENARIO VARIATIONS ({scenarios.length})
              </h2>
              <p className="text-xs text-zinc-500 mt-0.5">
                Buat skenario perbandingan dengan kombinasi DP, tenor, atau suku bunga yang berbeda.
              </p>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddScenario}
            className="w-fit cursor-pointer shadow-2xs font-medium"
          >
            <Plus className="h-3.5 w-3.5" />
            Tambah Skenario
          </Button>
        </div>

        <div className="space-y-4">
          {scenarios.map((scenario, index) => (
            <ScenarioCard
              key={scenario.id}
              scenarioLetter={String.fromCharCode(65 + index)}
              name={scenario.name}
              price={scenario.price}
              dp={scenario.dp}
              tenor={scenario.tenor}
              interest={scenario.interest}
              isRemovable={scenarios.length > 1}
              onRemove={() => handleRemoveScenario(scenario.id)}
              onChange={(field: keyof ScenarioFormItem, value: string) =>
                handleScenarioChange(scenario.id, field, value)
              }
            />
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-500 order-2 sm:order-1">
          {isEditMode
            ? "Perubahan akan otomatis memperbarui perhitungan analisis matriks."
            : "Data simulasi akan otomatis dihitung dan disimpan ke akun Anda."}
        </p>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full sm:w-auto font-medium px-8 shadow-sm order-1 sm:order-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              {isEditMode ? "Menyimpan Perubahan..." : "Menghitung & Menyimpan..."}
            </span>
          ) : (
            <>
              {isEditMode ? "Simpan Perubahan Skenario" : "Bandingkan Skenario"}
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}