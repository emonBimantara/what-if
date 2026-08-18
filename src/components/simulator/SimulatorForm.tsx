"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import FinancialInput from "@/components/simulator/FinancialInput";
import ScenarioCard, { ScenarioFormItem } from "@/components/simulator/ScenarioCard";
import { calculateSimulation } from "@/lib/api/simulations";

export default function SimulatorForm() {
    const router = useRouter();

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

    const formatCurrency = (val: string) => {
        const raw = val.replace(/\D/g, "");
        if (!raw) return "";
        return Number(raw).toLocaleString("id-ID");
    };

    const cleanNumber = (val: string | number) => {
        if (!val) return 0;
        return Number(String(val).replace(/\./g, "").replace(/,/g, ""));
    };

    const handleAddScenario = () => {
        const nextIndex = scenarios.length;
        const nextLetter = String.fromCharCode(65 + nextIndex);

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
            const formData = new FormData(event.currentTarget);

            const payload = {
                simulationName: formData.get("simulationName") as string,
                category: formData.get("category") as string,
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

            const result = await calculateSimulation(payload);

            if (result.simulation?.id) {
                router.push(`/simulations/${result.simulation.id}`);
            }
        } catch (error: any) {
            setErrorMessage(error.message || "Terjadi kesalahan saat memproses data");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {errorMessage && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-md">
                    {errorMessage}
                </div>
            )}

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                        01
                    </span>
                    <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
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

            <hr className="border-t border-zinc-200" />

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
                    <div className="pb-3 border-b border-zinc-200">
                        <h3 className="text-sm font-bold text-zinc-900">
                            Informasi Barang / Keputusan
                        </h3>
                        <p className="text-xs text-zinc-500 mt-0.5">
                            Berikan nama dan kategori untuk mempermudah identifikasi laporan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Input
                            name="simulationName"
                            label="Nama Simulasi / Aset"
                            helperText="Nama barang atau proyek keputusan"
                            required
                        />

                        <Select
                            name="category"
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

            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-zinc-800 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                            03
                        </span>
                        <div>
                            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
                                SCENARIO VARIATIONS ({scenarios.length})
                            </h2>
                            <p className="text-xs text-zinc-500 mt-0.5">
                                Buat skenario perbandingan dengan kombinasi DP, tenor, atau suku bunga yang berbeda.
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleAddScenario}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded bg-white hover:bg-zinc-100 text-zinc-800 border border-zinc-300 transition-colors duration-150 w-fit cursor-pointer"
                    >
                        <Plus className="h-3.5 w-3.5" />
                        Tambah Skenario
                    </button>
                </div>

                <div className="space-y-5">
                    {scenarios.map((scenario, index) => (
                        <ScenarioCard
                            key={scenario.id}
                            scenarioLetter={String.fromCharCode(65 + index)}
                            name={scenario.name}
                            price={scenario.price}
                            dp={scenario.dp}
                            tenor={scenario.tenor}
                            interest={scenario.interest}
                            isRemovable={index > 0}
                            onRemove={() => handleRemoveScenario(scenario.id)}
                            onChange={(field: keyof ScenarioFormItem, value: string) =>
                                handleScenarioChange(scenario.id, field, value)
                            }
                        />
                    ))}
                </div>
            </div>

            <div className="pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto font-semibold px-8 shadow-sm"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Menghitung & Menyimpan..." : "Bandingkan Skenario"}
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
            </div>
        </form>
    );
}