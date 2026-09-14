"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/Stat";
import { AlertBadge } from "@/components/ui/AlertBadge";
import { RuleCheck } from "@/components/RuleCheck";
import { usePortfolio } from "@/lib/usePortfolio";
import { proChantiers } from "@/lib/mock-data";
import { rulesForStep } from "@/lib/rules";
import { ChevronDown } from "lucide-react";
const seeds = proChantiers.map((c) => ({ name: c.name, client_name: c.project, status: c.step, progress: c.progress, budget_planned: c.coutPrevu, budget_spent: c.coutReel }));
export default function ChantiersPage() {
  const { projects, loading, demo, debugError } = usePortfolio("pro", seeds);
  const [openChantier, setOpenChantier] = useState<string | null>(null);
  const items = demo ? proChantiers : projects.map((p) => ({ name: p.name, project: p.client_name ?? "", step: p.status, progress: p.progress, level: "vert" as const }));
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Chantiers</h1>
      {demo && (<div className="text-xs bg-gold-soft text-ink-soft rounded-lg p-3">{debugError ? `Connexion aux données réelles impossible : ${debugError}` : "Données de démonstration — connecte-toi avec un compte réel pour voir tes propres chantiers."}</div>)}
      {loading ? (<div className="text-sm text-ink-soft">Chargement…</div>) : (
        <div className="grid sm:grid-cols-2 gap-5">{items.map((c) => {
          const stepRules = rulesForStep(c.step);
          const isOpen = openChantier === c.name;
          return (
            <Card key={c.name}>
              <div className="flex justify-between items-start mb-3"><div><div className="font-medium">{c.name}</div><div className="text-xs text-ink-soft">{c.project} — {c.step}</div></div><AlertBadge level={c.level} pulse={c.level === "rouge"} /></div>
              <ProgressBar value={c.progress} />
              <div className="flex items-center justify-between mt-2"><span className="text-xs text-ink-soft">{c.progress}% d'avancement</span>{stepRules.length > 0 && (<button onClick={() => setOpenChantier(isOpen ? null : c.name)} className="flex items-center gap-1 text-xs font-semibold text-brand">{stepRules.length} règles Opéris<ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} /></button>)}</div>
              {isOpen && (<div className="mt-3 pt-3 border-t border-line space-y-2">{stepRules.map((r) => (<RuleCheck key={r.id} rule={r} />))}</div>)}
            </Card>
          );
        })}</div>
      )}
    </div>
  );
}
