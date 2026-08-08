"use client";
import { Card } from "@/components/ui/Card";
import { useHomeProject } from "@/lib/useHomeProject";

export default function PlanningPage() {
  const { steps, loading, demo } = useHomeProject();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Planning</h1>
      {demo && (
        <div className="text-xs bg-gold-soft text-ink-soft rounded-lg p-3">
          Données de démonstration — connecte-toi avec un compte réel (Supabase branché) pour voir et faire évoluer ton propre planning.
        </div>
      )}
      <Card>
        {loading ? (
          <div className="text-sm text-ink-soft">Chargement…</div>
        ) : (
          <div className="relative pl-6">
            <div className="absolute left-[7px] top-1 bottom-1 w-px bg-line" />
            <div className="space-y-6">
              {steps.map((s) => (
                <div key={s.id ?? s.step} className="relative flex flex-col gap-1">
                  <span
                    className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-canvas ${
                      s.status === "done" ? "bg-gold" : s.status === "current" ? "bg-brand ring-4 ring-brand-soft" : "bg-line"
                    }`}
                  />
                  <div className="flex items-center gap-3">
                    <span className={`text-sm ${s.status === "todo" ? "text-ink-soft" : "font-semibold"}`}>{s.step}</span>
                    {s.status === "current" && (
                      <span className="text-xs bg-brand-soft text-brand font-semibold px-2 py-0.5 rounded-full">En cours</span>
                    )}
                  </div>
                  {s.advice && <span className="text-xs text-ink-soft leading-relaxed max-w-md">{s.advice}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
