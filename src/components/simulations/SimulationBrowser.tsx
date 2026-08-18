"use client";

import { useState } from "react";
import SearchInput from "./SearchInput";
import SimulationList, { SimulationItem } from "./SimulationList";

type SimulationBrowserProps = {
    simulations: SimulationItem[];
};

export default function SimulationBrowser({
    simulations,
}: SimulationBrowserProps) {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Semua");

    const categories = ["Kendaraan", "Properti", "Kredit", "Lainnya"];

    const getCategoryCount = (category: string) => {
        return simulations.filter(
            (simulation) => simulation.category === category
        ).length;
    };

    const filteredSimulations = simulations.filter((simulation) => {
        const matchesCategory =
            category === "Semua" || simulation.category === category;

        const matchesSearch = simulation.simulationName
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
                <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono">
                    <button
                        type="button"
                        onClick={() => setCategory("Semua")}
                        className={`px-3 py-1 rounded font-medium ${category === "Semua"
                                ? "bg-zinc-900 text-white"
                                : "bg-white text-zinc-600 border border-zinc-200 hover:text-zinc-900"
                            }`}
                    >
                        SEMUA ({simulations.length})
                    </button>

                    {categories.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => setCategory(item)}
                            className={`px-3 py-1 rounded transition-colors ${category === item
                                    ? "bg-zinc-900 text-white"
                                    : "bg-white text-zinc-600 border border-zinc-200 hover:text-zinc-900"
                                }`}
                        >
                            {item.toUpperCase()} ({getCategoryCount(item)})
                        </button>
                    ))}
                </div>

                <div className="w-full md:w-56">
                    <SearchInput value={search} onChange={setSearch} />
                </div>
            </div>

            {filteredSimulations.length > 0 ? (
                <SimulationList simulations={filteredSimulations} />
            ) : (
                <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center space-y-3">
                    <div className="mx-auto h-9 w-9 rounded bg-zinc-100 border border-zinc-200 text-zinc-400 flex items-center justify-center font-mono font-bold text-xs">
                        X
                    </div>

                    <div className="space-y-1 max-w-sm mx-auto">
                        <h3 className="text-sm font-bold text-zinc-900">
                            Tidak Ada Simulasi Ditemukan
                        </h3>

                        <p className="text-xs text-zinc-500 leading-relaxed">
                            Tidak ada simulasi yang cocok dengan pencarian atau filter yang
                            Anda pilih.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}