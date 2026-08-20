"use client";

import Link from "next/link";
import { Layers, Calendar, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";
import type { SimulationItem } from "@/types/simulation";

type SimulationListProps = {
  simulations: SimulationItem[];
};

const categoryStyles: Record<string, string> = {
  Kendaraan: "bg-blue-50 text-blue-800 border-blue-200/80",
  Properti: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
  Kredit: "bg-amber-50 text-amber-900 border-amber-200/80",
  Lainnya: "bg-zinc-100 text-zinc-700 border-zinc-200",
};

export default function SimulationList({ simulations }: SimulationListProps) {
  if (!simulations || simulations.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-12 text-center space-y-4">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 border border-zinc-200 text-zinc-500">
          <Layers className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-zinc-900">Belum ada simulasi tersimpan</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            Mulai buat simulasi finansial pertamamu untuk membandingkan skenario DP, tenor, dan cicilan bulanan.
          </p>
        </div>
        <div>
          <Link href="/simulator">
            <Button variant="primary" size="md" className="font-medium shadow-xs">
              Buat Simulasi Baru
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="divide-y divide-zinc-200/80 rounded-lg border border-zinc-200 bg-white overflow-hidden shadow-2xs">
      {simulations.map((simulation, index) => {
        const categoryBadge =
          categoryStyles[simulation.category] || categoryStyles.Lainnya;

        return (
          <Link
            key={simulation.id}
            href={`/simulations/${simulation.id}`}
            className="group block p-4 sm:p-5 hover:bg-zinc-50/70 transition-colors"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-semibold text-zinc-400 select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 group-hover:text-zinc-700 transition-colors truncate">
                    {simulation.simulationName}
                  </h3>

                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded border ${categoryBadge}`}
                  >
                    {simulation.category}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 font-mono">
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

              <div className="flex items-center text-zinc-400 group-hover:text-zinc-700 group-hover:translate-x-0.5 transition-all">
                <ChevronRight className="h-4 w-4" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}