import Input from "@/components/ui/Input";
import { Trash2 } from "lucide-react";

export interface ScenarioFormItem {
  id: string;
  name: string;
  price: string;
  dp: string;
  tenor: string;
  interest: string;
}

export interface ScenarioCardProps {
  scenarioLetter: string;
  badgeLabel?: string;
  name: string;
  price: string;
  dp: string;
  tenor: string;
  interest: string;
  isRemovable: boolean;
  onRemove?: () => void;
  onChange: (field: keyof ScenarioFormItem, value: string) => void;
}

export default function ScenarioCard({
  scenarioLetter,
  badgeLabel = "",
  name,
  price,
  dp,
  tenor,
  interest,
  isRemovable,
  onRemove,
  onChange,
}: ScenarioCardProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-zinc-900 text-white text-xs font-bold font-mono">
            {scenarioLetter}
          </span>
          <div>
            <h4 className="text-sm font-bold text-zinc-900">
              Skenario {scenarioLetter}
            </h4>
            {badgeLabel && (
              <p className="text-[11px] text-zinc-500">{badgeLabel}</p>
            )}
          </div>
        </div>

        {isRemovable && onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="p-1 text-zinc-400 hover:text-rose-600 hover:bg-zinc-100 rounded transition-colors cursor-pointer"
            title="Hapus Skenario"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="sm:col-span-2 lg:col-span-3">
          <Input
            label="Nama Skenario"
            value={name}
            onChange={(e) => onChange("name", e.target.value)}
          />
        </div>

        <Input
          label="Harga Barang / Aset"
          prefixText="Rp"
          value={price}
          onChange={(e) => onChange("price", e.target.value)}
        />

        <Input
          label="Down Payment (DP)"
          prefixText="Rp"
          value={dp}
          onChange={(e) => onChange("dp", e.target.value)}
          helperText="Uang muka awal"
        />

        <Input
          label="Tenor (Jangka Waktu)"
          suffixText="Bulan"
          value={tenor}
          onChange={(e) => onChange("tenor", e.target.value)}
          helperText="misal: 36 bulan (3 thn)"
        />

        <Input
          label="Suku Bunga"
          suffixText="% / thn"
          value={interest}
          onChange={(e) => onChange("interest", e.target.value)}
          helperText="Bunga per tahun"
        />
      </div>
    </div>
  );
}