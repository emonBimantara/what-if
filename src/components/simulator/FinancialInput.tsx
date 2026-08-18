import Input from "@/components/ui/Input";

export interface FinancialInputProps {
  income: string;
  expense: string;
  onIncomeChange: (value: string) => void;
  onExpenseChange: (value: string) => void;
}

export default function FinancialInput({
  income,
  expense,
  onIncomeChange,
  onExpenseChange,
}: FinancialInputProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 sm:p-6 space-y-4">
      <div className="pb-3 border-b border-zinc-200">
        <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
          SECTION 1 — Kondisi Keuangan Saat Ini
        </h3>
        <p className="text-xs text-zinc-500 mt-0.5">
          Masukkan gambaran arus kas (cash flow) bulanan Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Penghasilan Bulanan"
          prefixText="Rp"
          value={income}
          onChange={(e) => onIncomeChange(e.target.value)}
          helperText="Gaji bersih, bonus, atau pendapatan rutin"
          required
        />

        <Input
          label="Pengeluaran Bulanan Rutin"
          prefixText="Rp"
          value={expense}
          onChange={(e) => onExpenseChange(e.target.value)}
          helperText="Biaya hidup rutin, makan, utilitas, cicilan aktif"
          required
        />
      </div>
    </div>
  );
}