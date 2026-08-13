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
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed rounded-md";

  const variants = {
    primary: "bg-zinc-900 hover:bg-zinc-800 text-white font-semibold shadow-none",
    secondary: "bg-zinc-100 hover:bg-zinc-200/80 text-zinc-900 border border-zinc-200",
    outline: "border border-zinc-300 bg-white hover:bg-zinc-100/70 text-zinc-800",
    ghost: "bg-transparent hover:bg-zinc-100 text-zinc-700 hover:text-zinc-900",
    danger: "bg-rose-700 hover:bg-rose-800 text-white font-medium",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2 text-xs sm:text-sm gap-2",
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
