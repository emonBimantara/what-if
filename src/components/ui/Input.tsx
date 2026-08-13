import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  prefixText?: string;
  suffixText?: string;
}

export default function Input({
  label,
  helperText,
  prefixText,
  suffixText,
  className = "",
  id,
  type = "text",
  ...props
}: InputProps) {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-zinc-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center w-full">
        {prefixText && (
          <span className="absolute left-3 text-xs font-medium text-zinc-500 select-none pointer-events-none">
            {prefixText}
          </span>
        )}
        <input
          id={inputId}
          type={type}
          className={`w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-800 transition-colors tabular-nums ${
            prefixText ? "pl-9" : ""
          } ${suffixText ? "pr-10" : ""} ${className}`}
          {...props}
        />
        {suffixText && (
          <span className="absolute right-3 text-xs font-medium text-zinc-500 select-none pointer-events-none">
            {suffixText}
          </span>
        )}
      </div>
      {helperText && <p className="text-[11px] text-zinc-500">{helperText}</p>}
    </div>
  );
}
