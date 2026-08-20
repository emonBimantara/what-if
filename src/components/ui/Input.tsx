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
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-zinc-700 select-none">
          {label}
        </label>
      )}
      <div className="relative flex items-center w-full">
        {prefixText && (
          <span className="absolute left-3 text-xs font-medium text-zinc-400 select-none pointer-events-none font-mono">
            {prefixText}
          </span>
        )}
        <input
          id={inputId}
          type={type}
          className={`w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 transition-colors tabular-nums ${
            prefixText ? "pl-9" : ""
          } ${suffixText ? "pr-12" : ""} ${className}`}
          {...props}
        />
        {suffixText && (
          <span className="absolute right-3 text-xs font-medium text-zinc-400 select-none pointer-events-none font-mono">
            {suffixText}
          </span>
        )}
      </div>
      {helperText && <p className="text-[11px] text-zinc-500">{helperText}</p>}
    </div>
  );
}
