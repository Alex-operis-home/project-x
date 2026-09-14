"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/Stat";
import { AlertBadge } from "@/components/ui/AlertBadge";
import { RuleCheck } from "@/components/RuleCheck";
import { promoteurOperations } from "@/lib/mock-data";
import { rulesForStep } from "@/lib/rules";
import { ChevronDown } from "lucide-react";
export default function OperationsPage() {
  const [openOp, setOpenOp] = useState<string | null>(null);
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Opérations</h1>
      <div className="grid sm:grid-cols-2 gap-5">{promoteurOperations.map((o) => {
        const opRules = rulesForStep(o.status);
        const isOpen = openOp === o.name;
        return (
          <Card key={o.name}>
            <div className="flex justify-between items-start mb-3"><div><div className="font-medium">{o.name}</div><div className="text-xs text-ink-soft">{o.type}</div></div><AlertBadge level={o.level} pulse={o.level === "rouge"} /></div>
            <ProgressBar value={o.progress} />
            <div className="flex justify-between items-center text-xs text-ink-soft mt-2"><span>{o.status}</span><span>{o.engage} / {o.budget}</span></div>
            {opRules.length > 0 && (<button onClick={() => setOpenOp(isOpen ? null : o.name)} className="flex items-center gap-1 text-xs font-semibold text-brand mt-2">{opRules.length} règles Opéris<ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} /></button>)}
            {isOpen && (<div className="mt-3 pt-3 border-t border-line space-y-2">{opRules.map((r) => (<RuleCheck key={r.id} rule={r} />))}</div>)}
          </Card>
        );
      })}</div>
    </div>
  );
}
