"use client";

import Link from "next/link";
import { Layers, Calendar, PlusCircle } from "lucide-react";
import type { SimulationItem } from "@/types/simulation";

type SimulationListProps = {
  simulations: SimulationItem[];
};

const categoryStyles: Record<string, string> = {
  Kendaraan: "bg-blue-50 text-blue-700 border-blue-200",
  Properti: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Kredit: "bg-amber-50 text-amber-700 border-amber-200",
  Lainnya: "bg-zinc-100 text-zinc-700 border-zinc-200",
};

export default function SimulationList({ simulations }: SimulationListProps) {
  if (!simulations || simulations.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 p-12 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 border border-zinc-200 text-zinc-400 mb-3">
          <Layers className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-bold text-zinc-900">Belum ada simulasi</h3>
        <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
          Mulai buat simulasi finansial pertamamu untuk membandingkan skenario DP, tenor, dan cicilan.
        </p>
        <div className="mt-5">
          <Link
            href="/simulations/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-md bg-zinc-900 text-white hover:bg-zinc-800 transition-colors shadow-sm"
          >
            <PlusCircle className="h-4 w-4" />
            Buat Simulasi Baru
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white overflow-hidden shadow-sm">
      {simulations.map((simulation, index) => {
        const categoryBadge = categoryStyles[simulation.category] || categoryStyles.Lainnya;

        return (
          <Link
            key={simulation.id}
            href={`/simulations/${simulation.id}`}
            className="group block p-4 sm:p-5 hover:bg-zinc-50/80 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors flex items-center gap-1">
                    {simulation.simulationName}
                  </h3>

                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${categoryBadge}`}
                  >
                    {simulation.category}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-zinc-400" />
                    {simulation.scenarios.length} Skenario
                  </span>

                  {simulation.createdAt && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                      {new Date(simulation.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}