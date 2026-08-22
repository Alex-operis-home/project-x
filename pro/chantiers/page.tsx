"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/Stat";
import { AlertBadge } from "@/components/ui/AlertBadge";
import { RuleCheck } from "@/components/RuleCheck";
import { proChantiers } from "@/lib/mock-data";
import { rulesForStep } from "@/lib/rules";
import { ChevronDown } from "lucide-react";

export default function ChantiersPage() {
  const [openChantier, setOpenChantier] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Chantiers</h1>
      <div className="grid sm:grid-cols-2 gap-5">
        {proChantiers.map((c) => {
          const stepRules = rulesForStep(c.step);
          const isOpen = openChantier === c.name;
          return (
            <Card key={c.name}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-ink-soft">{c.project} — {c.step}</div>
                </div>
                <AlertBadge level={c.level} pulse={c.level === "rouge"} />
              </div>
              <ProgressBar value={c.progress} />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-ink-soft">{c.progress}% d'avancement</span>
                {stepRules.length > 0 && (
                  <button
                    onClick={() => setOpenChantier(isOpen ? null : c.name)}
                    className="flex items-center gap-1 text-xs font-semibold text-brand"
                  >
                    {stepRules.length} règles Opéris
                    <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>

              {isOpen && (
                <div className="mt-3 pt-3 border-t border-line space-y-2">
                  {stepRules.map((r) => (
                    <RuleCheck key={r.id} rule={r} />
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
