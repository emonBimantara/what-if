import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import SimulatorForm from "@/components/simulator/SimulatorForm";

function FormLoadingFallback() {
  return (
    <div className="flex items-center justify-center p-12 text-zinc-400 text-xs font-mono gap-2 rounded-lg border border-dashed border-zinc-200 bg-white">
      <Loader2 className="h-4 w-4 animate-spin text-zinc-600" />
      <span>Memuat form simulator...</span>
    </div>
  );
}

export default function SimulatorPage() {
  return (
    <div className="py-8 sm:py-12 bg-[#fafaf9] min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8">
        <div className="border-b border-zinc-200 pb-5 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
            Simulator Keputusan Finansial
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl">
            Isi worksheet di bawah ini untuk mensimulasikan dan membandingkan
            beban pembiayaan terhadap arus kas Anda.
          </p>
        </div>

        <Suspense fallback={<FormLoadingFallback />}>
          <SimulatorForm />
        </Suspense>
      </div>
    </div>
  );
}