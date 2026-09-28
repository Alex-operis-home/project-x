"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { experienceRisks, experienceLevels, type ExperienceLevel } from "@/lib/experience";

const levelStyle: Record<ExperienceLevel, string> = {
  information: "bg-brand-soft text-brand",
  vigilance: "bg-signal-orange-soft text-signal-orange",
  alerte: "bg-signal-orange text-white",
  critique: "bg-signal-red text-white",
};

export default function ExperiencePage() {
  const [filter, setFilter] = useState<ExperienceLevel | "tous">("tous");
  const items = filter === "tous" ? experienceRisks : experienceRisks.filter((r) => r.level === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Retours d'expérience</h1>
        <p className="text-ink-soft text-sm mt-1">
          La mémoire opérationnelle de vos opérations passées — {experienceRisks.length} risques types déjà documentés.
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setFilter("tous")} className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${filter === "tous" ? "bg-ink text-white border-ink" : "border-line text-ink-soft"}`}>
          Tous
        </button>
        {experienceLevels.map((l) => (
          <button key={l.key} onClick={() => setFilter(l.key)} className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${filter === l.key ? levelStyle[l.key] + " border-transparent" : "border-line text-ink-soft"}`}>
            {l.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {items.map((r) => (
          <Card key={r.id}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className="text-xs font-semibold text-brand uppercase tracking-wide">{r.category}</span>
                <h3 className="font-display text-lg font-semibold mt-0.5">{r.risk}</h3>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${levelStyle[r.level]}`}>
                {experienceLevels.find((l) => l.key === r.level)?.label}
              </span>
            </div>
            <p className="text-sm text-ink-soft mb-4">{r.situation}</p>

            <div className="grid sm:grid-cols-3 gap-3">
              <div className="bg-canvas rounded-lg p-3">
                <div className="text-xs font-semibold text-ink-soft uppercase tracking-wide mb-1">Retour d'expérience</div>
                <p className="text-sm">{r.retourExperience}</p>
                <p className="text-xs text-ink-soft mt-2 italic">Opération(s) de référence : {r.operationRef}</p>
              </div>
              <div className="bg-brand-soft rounded-lg p-3 sm:col-span-2">
                <div className="text-xs font-semibold text-brand uppercase tracking-wide mb-1">Recommandation Project X</div>
                <p className="text-sm text-ink">{r.recommandation}</p>
                <p className="text-xs text-ink-soft mt-2 italic">Validation professionnelle nécessaire avant toute décision juridique, fiscale ou technique.</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
