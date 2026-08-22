import { Card } from "@/components/ui/Card";
import { StatCard, ProgressBar } from "@/components/ui/Stat";
import { homeBudget } from "@/lib/mock-data";

export default function BudgetPage() {
  const pct = Math.round((homeBudget.spent / homeBudget.planned) * 100);
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Budget</h1>
      <div className="grid sm:grid-cols-3 gap-5">
        <StatCard label="Budget initial" value={`${homeBudget.planned.toLocaleString("fr-FR")} €`} />
        <StatCard label="Dépenses engagées" value={`${homeBudget.spent.toLocaleString("fr-FR")} €`} hint={`${pct}% du budget`} hintTone="neutral" />
        <StatCard label="Reste à prévoir" value={`${homeBudget.remaining.toLocaleString("fr-FR")} €`} hint="Sur la durée du chantier" />
      </div>
      <Card>
        <h3 className="font-semibold mb-4">Suivi budgétaire</h3>
        <ProgressBar value={pct} color="gold" />
        <p className="text-sm text-ink-soft mt-3">
          {pct}% du budget initial déjà engagé — cohérent avec l'avancement du chantier (Second œuvre).
        </p>
      </Card>
    </div>
  );
}
