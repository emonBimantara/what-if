"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Badge from "@/components/ui/Badge";

type Simulation = {
  id: string;
  simulationName: string;
  category: string;
  income: number;
  expense: number;
  scenarios: unknown[];
};

type SimulationListProps = {
  simulations: Simulation[];
};

export default function SimulationList({
  simulations,
}: SimulationListProps) {
  return (
    <div className="space-y-3">
      <div className="divide-y divide-zinc-200 border border-zinc-200 rounded-lg bg-white overflow-hidden shadow-sm">
        {simulations.map((simulation, index) => (
          <Link
            key={simulation.id}
            href={`/simulations/${simulation.id}`}
            className="group block p-4 sm:p-5 hover:bg-zinc-50 transition-colors border-l-4 border-l-amber-500"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-emerald-800 transition-colors">
                    {simulation.simulationName}
                  </h3>

                  <Badge variant="indigo">
                    {simulation.category}
                  </Badge>
                </div>

                <p className="text-xs text-zinc-500 pl-7">
                  {simulation.scenarios.length} Skenario Pembiayaan
                </p>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 text-xs tabular-nums pl-7 md:pl-0">
                <div>
                  <span className="text-zinc-500 block text-[11px] font-mono uppercase">
                    Income / Expense
                  </span>

                  <span className="font-semibold text-zinc-900">
                    Rp {simulation.income.toLocaleString("id-ID")} / Rp{" "}
                    {simulation.expense.toLocaleString("id-ID")}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-emerald-800 font-semibold font-mono text-xs">
                  LIHAT HASIL
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}