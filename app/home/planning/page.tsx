"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { AlertBadge } from "@/components/ui/AlertBadge";
import { useHomeProject } from "@/lib/useHomeProject";
import { rulesForStep } from "@/lib/rules";
import { ChevronDown } from "lucide-react";

export default function PlanningPage() {
  const { steps, loading, demo } = useHomeProject();
  const [openStep, setOpenStep] = useState<string | null>(null);

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
            <div className="space-y-2">
              {steps.map((s) => {
                const key = s.id ?? s.step;
                const stepRules = rulesForStep(s.step);
                const isOpen = openStep === key;
                return (
                  <div key={key} className="relative">
                    <span
                      className={`absolute -left-6 top-2 w-3.5 h-3.5 rounded-full border-2 border-canvas ${
                        s.status === "done" ? "bg-gold" : s.status === "current" ? "bg-brand ring-4 ring-brand-soft" : "bg-line"
                      }`}
                    />
                    <button
                      onClick={() => setOpenStep(isOpen ? null : key)}
                      disabled={stepRules.length === 0}
                      className="w-full flex items-center justify-between gap-3 py-2 text-left disabled:cursor-default"
                    >
                      <span className="flex items-center gap-3">
                        <span className={`text-sm ${s.status === "todo" ? "text-ink-soft" : "font-semibold"}`}>{s.step}</span>
                        {s.status === "current" && (
                          <span className="text-xs bg-brand-soft text-brand font-semibold px-2 py-0.5 rounded-full">En cours</span>
                        )}
                        {stepRules.length > 0 && (
                          <span className="text-xs text-ink-soft">{stepRules.length} règles Opéris</span>
                        )}
                      </span>
                      {stepRules.length > 0 && (
                        <ChevronDown size={16} className={`text-ink-soft transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                      )}
                    </button>
                    {s.advice && <p className="text-xs text-ink-soft leading-relaxed max-w-md pb-2">{s.advice}</p>}

                    {isOpen && stepRules.length > 0 && (
                      <div className="mb-4 mt-1 bg-canvas rounded-lg p-4 space-y-3">
                        {stepRules.map((r) => (
                          <div key={r.id} className="flex items-start gap-2.5">
                            <AlertBadge level={r.level} />
                            <div className="text-sm">
                              <div className="font-medium leading-snug">{r.condition}</div>
                              <div className="text-ink-soft text-xs mt-0.5">{r.advice}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
