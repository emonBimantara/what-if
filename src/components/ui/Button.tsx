import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md select-none cursor-pointer";

  const variants = {
    primary:
      "bg-zinc-900 hover:bg-zinc-800 active:bg-zinc-950 text-white font-medium shadow-sm",
    secondary:
      "bg-zinc-100 hover:bg-zinc-200/80 active:bg-zinc-200 text-zinc-900 border border-zinc-200/80",
    outline:
      "border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 active:bg-zinc-100 text-zinc-800 shadow-xs",
    ghost:
      "bg-transparent hover:bg-zinc-100 active:bg-zinc-200/60 text-zinc-700 hover:text-zinc-900",
    danger:
      "bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-medium shadow-sm",
  };

  const sizes = {
    sm: "px-2.5 py-1.5 text-xs gap-1.5",
    md: "px-3.5 py-2 text-xs sm:text-sm gap-2",
    lg: "px-5 py-2.5 text-sm gap-2.5",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
