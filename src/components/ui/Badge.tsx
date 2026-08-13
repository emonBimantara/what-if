import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "emerald" | "amber" | "rose" | "indigo" | "slate" | "outline";
  children: React.ReactNode;
}

export default function Badge({
  variant = "slate",
  children,
  className = "",
  ...props
}: BadgeProps) {
  const baseStyles = "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border transition-colors";

  const variants = {
    emerald: "bg-emerald-50 text-emerald-800 border-emerald-200",
    amber: "bg-amber-50 text-amber-900 border-amber-200",
    rose: "bg-rose-50 text-rose-800 border-rose-200",
    indigo: "bg-indigo-50 text-indigo-900 border-indigo-200",
    slate: "bg-zinc-100 text-zinc-800 border-zinc-200",
    outline: "bg-transparent text-zinc-600 border-zinc-300",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
