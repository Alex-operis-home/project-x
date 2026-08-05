import { Card } from "@/components/ui/Card";
import { homePlanning } from "@/lib/mock-data";

export default function PlanningPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Planning</h1>
      <Card>
        <div className="relative pl-6">
          <div className="absolute left-[7px] top-1 bottom-1 w-px bg-line" />
          <div className="space-y-6">
            {homePlanning.map((s) => (
              <div key={s.step} className="relative flex items-center gap-4">
                <span
                  className={`absolute -left-6 w-3.5 h-3.5 rounded-full border-2 border-canvas ${
                    s.status === "done" ? "bg-gold" : s.status === "current" ? "bg-brand ring-4 ring-brand-soft" : "bg-line"
                  }`}
                />
                <span className={`text-sm ${s.status === "todo" ? "text-ink-soft" : "font-semibold"}`}>{s.step}</span>
                {s.status === "current" && (
                  <span className="text-xs bg-brand-soft text-brand font-semibold px-2 py-0.5 rounded-full">En cours</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
