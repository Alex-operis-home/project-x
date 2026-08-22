export function ProgressRing({ value, label }: { value: number; label: string }) {
  const radius = 72;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-[168px] h-[168px]">
      <svg width="168" height="168" className="-rotate-90">
        <circle cx="84" cy="84" r={radius} fill="none" stroke="#E6E4DD" strokeWidth="10" />
        <circle
          cx="84"
          cy="84"
          r={radius}
          fill="none"
          stroke="#C9A227"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-semibold text-ink">{value}%</span>
        <span className="text-xs text-ink-soft">{label}</span>
      </div>
    </div>
  );
}
