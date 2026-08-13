import React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  helperText?: string;
}

export default function Select({
  label,
  options,
  helperText,
  className = "",
  id,
  ...props
}: SelectProps) {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={selectId} className="text-xs font-semibold text-zinc-700">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs sm:text-sm text-zinc-900 focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800 transition-colors cursor-pointer ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-white text-zinc-900">
            {opt.label}
          </option>
        ))}
      </select>
      {helperText && <p className="text-[11px] text-zinc-500">{helperText}</p>}
    </div>
  );
}
