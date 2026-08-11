"use client";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Rule } from "@/lib/rules";

const frameStyle: Record<Rule["level"], string> = {
  rouge: "border-signal-red bg-signal-red-soft",
  orange: "border-signal-orange bg-signal-orange-soft",
  vert: "border-signal-green bg-signal-green-soft",
};

export function RuleCheck({ rule }: { rule: Rule }) {
  const [answered, setAnswered] = useState<"oui" | "non" | null>(null);

  if (answered === "oui") {
    return (
      <div className="flex items-center gap-2.5 rounded-lg border border-signal-green bg-signal-green-soft px-3 py-2.5">
        <CheckCircle2 size={16} className="text-signal-green flex-shrink-0" />
        <span className="text-sm text-ink">{rule.condition}</span>
        <button onClick={() => setAnswered(null)} className="ml-auto text-xs text-ink-soft hover:underline flex-shrink-0">
          Revenir
        </button>
      </div>
    );
  }

  if (answered === "non") {
    return (
      <div className={`rounded-lg border px-3 py-2.5 ${frameStyle[rule.level]}`}>
        <div className="text-sm font-medium text-ink">{rule.condition}</div>
        <div className="text-xs text-ink-soft mt-1">{rule.advice}</div>
        <button onClick={() => setAnswered(null)} className="text-xs text-ink-soft hover:underline mt-1.5">
          Revenir
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border border-line px-3 py-2.5">
      <span className="text-sm text-ink flex-1">{rule.condition}</span>
      <div className="flex gap-1.5 flex-shrink-0">
        <button
          onClick={() => setAnswered("oui")}
          className="text-xs font-semibold px-3 py-1.5 rounded-md border border-line hover:bg-canvas transition-colors"
        >
          C'est fait
        </button>
        <button
          onClick={() => setAnswered("non")}
          className="text-xs font-semibold px-3 py-1.5 rounded-md bg-ink text-white hover:bg-brand-dark transition-colors"
        >
          Pas encore
        </button>
      </div>
    </div>
  );
}
