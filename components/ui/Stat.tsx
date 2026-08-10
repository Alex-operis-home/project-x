export function ProgressBar({ value, color = "brand" }: { value: number; color?: "brand" | "gold" }) {
  const bar = color === "gold" ? "bg-gold" : "bg-brand";
  return (
    <div className="h-1.5 w-full rounded-full bg-line overflow-hidden">
      <div className={`h-full ${bar} rounded-full transition-all`} style={{ width: `${value}%` }} />
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  hintTone = "neutral",
}: {
  label: string;
  value: string;
  hint?: string;
  hintTone?: "up" | "down" | "neutral";
}) {
  const hintColor =
    hintTone === "up" ? "text-signal-green" : hintTone === "down" ? "text-signal-red" : "text-ink-soft";
  return (
    <div className="bg-surface border border-line rounded-xl2 shadow-card p-6">
      <div className="text-sm text-ink-soft mb-2">{label}</div>
      <div className="font-display text-3xl font-semibold text-ink">{value}</div>
      {hint && <div className={`text-xs mt-2 ${hintColor}`}>{hint}</div>}
    </div>
  );
}
