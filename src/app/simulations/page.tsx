import Link from "next/link";
import { Plus } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Button from "@/components/ui/Button";
import SimulationBrowser from "@/components/simulations/SimulationBrowser";
import { auth } from "@/lib/auth/auth";
import { getSimulations } from "@/services/simulation.service";

export default async function SimulationsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const simulations = (await getSimulations(session.user.id)).map((simulation) => ({
    ...simulation,
    createdAt: simulation.createdAt.toISOString(),
  }));

  return (
    <div className="py-8 sm:py-12 bg-[#fafaf9] min-h-[calc(100vh-8rem)]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
              Simulasi Saya
            </h1>

            <p className="text-xs sm:text-sm text-zinc-600 mt-1">
              Daftar skenario keputusan finansial yang telah Anda buat.
            </p>
          </div>

          <div>
            <Link href="/simulator">
              <Button
                variant="primary"
                size="md"
                className="font-medium w-full sm:w-auto shadow-xs"
              >
                <Plus className="h-4 w-4" />
                Simulasi Baru
              </Button>
            </Link>
          </div>
        </div>

        <SimulationBrowser simulations={simulations} />
      </div>
    </div>
  );
}