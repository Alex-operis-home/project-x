export type AlertLevel = "rouge" | "orange" | "vert";

const styles: Record<AlertLevel, string> = {
  rouge: "bg-signal-red-soft text-signal-red",
  orange: "bg-signal-orange-soft text-signal-orange",
  vert: "bg-signal-green-soft text-signal-green",
};

const dotColor: Record<AlertLevel, string> = {
  rouge: "bg-signal-red",
  orange: "bg-signal-orange",
  vert: "bg-signal-green",
};

export function AlertBadge({
  level,
  label,
  pulse = false,
}: {
  level: AlertLevel;
  label?: string;
  pulse?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles[level]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor[level]} ${pulse ? "animate-pulse-dot" : ""}`} />
      {label}
    </span>
  );
}
