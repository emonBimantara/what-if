import Input from "@/components/ui/Input";
import { Trash2 } from "lucide-react";

export interface ScenarioCardProps {
  scenarioLetter: string;
  badgeLabel?: string;
  defaultName?: string;
  defaultPrice?: string;
  defaultDp?: string;
  defaultTenor?: string;
  defaultInterest?: string;
  isRemovable?: boolean;
}

export default function ScenarioCard({
  scenarioLetter,
  badgeLabel = "Skenario",
  defaultName = "",
  defaultPrice = "",
  defaultDp = "",
  defaultTenor = "",
  defaultInterest = "",
  isRemovable = true,
}: ScenarioCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-zinc-900 text-white text-xs font-bold font-mono">
            {scenarioLetter}
          </span>
          <div>
            <h4 className="text-sm font-bold text-zinc-900">Skenario {scenarioLetter}</h4>
            <p className="text-[11px] text-zinc-500">{badgeLabel}</p>
          </div>
        </div>

        {isRemovable && (
          <button
            type="button"
            className="p-1 text-zinc-400 hover:text-rose-600 hover:bg-zinc-100 rounded transition-colors"
            title="Hapus Skenario (Visual)"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="sm:col-span-2 lg:col-span-3">
          <Input
            label="Nama Skenario"
            placeholder="Contoh: DP 20% + Tenor 3 Tahun"
            defaultValue={defaultName}
          />
        </div>

        <Input
          label="Harga Barang / Aset"
          prefixText="Rp"
          placeholder="350.000.000"
          defaultValue={defaultPrice}
        />

        <Input
          label="Down Payment (DP)"
          prefixText="Rp"
          placeholder="70.000.000"
          defaultValue={defaultDp}
          helperText="Uang muka awal"
        />

        <Input
          label="Tenor (Jangka Waktu)"
          suffixText="Bulan"
          placeholder="36"
          defaultValue={defaultTenor}
          helperText="misal: 36 bulan (3 thn)"
        />

        <Input
          label="Suku Bunga"
          suffixText="% / thn"
          placeholder="6.5"
          defaultValue={defaultInterest}
          helperText="Bunga per tahun"
        />
      </div>
    </div>
  );
}
