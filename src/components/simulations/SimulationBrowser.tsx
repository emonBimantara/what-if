"use client";

import { useState } from "react";
import SearchInput from "./SearchInput";
import SimulationList from "./SimulationList";
import type { SimulationItem } from "@/types/simulation";

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
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-zinc-200/80 pb-4">
                <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono pb-1 md:pb-0">
                    <button
                        type="button"
                        onClick={() => setCategory("Semua")}
                        className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                            category === "Semua"
                                ? "bg-zinc-900 text-white shadow-2xs font-semibold"
                                : "bg-white text-zinc-600 border border-zinc-200 hover:text-zinc-900 hover:bg-zinc-50"
                        }`}
                    >
                        SEMUA ({simulations.length})
                    </button>

                    {categories.map((item) => {
                        const count = getCategoryCount(item);
                        return (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setCategory(item)}
                                className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                                    category === item
                                        ? "bg-zinc-900 text-white shadow-2xs font-semibold"
                                        : "bg-white text-zinc-600 border border-zinc-200 hover:text-zinc-900 hover:bg-zinc-50"
                                }`}
                            >
                                {item.toUpperCase()} ({count})
                            </button>
                        );
                    })}
                </div>

                <div className="w-full md:w-64">
                    <SearchInput value={search} onChange={setSearch} />
                </div>
            </div>

            {filteredSimulations.length > 0 ? (
                <SimulationList simulations={filteredSimulations} />
            ) : (
                <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-10 text-center space-y-2">
                    <h3 className="text-sm font-semibold text-zinc-900">
                        Tidak ada simulasi yang cocok
                    </h3>
                    <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                        Coba gunakan kata kunci pencarian yang berbeda atau reset filter kategori ke &ldquo;Semua&rdquo;.
                    </p>
                </div>
            )}
        </div>
    );
}