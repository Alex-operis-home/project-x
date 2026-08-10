import { HTMLAttributes } from "react";

export function Card({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-surface border border-line rounded-xl2 shadow-card p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
