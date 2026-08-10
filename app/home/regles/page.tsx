import { Card } from "@/components/ui/Card";
import { AlertBadge } from "@/components/ui/AlertBadge";
import { rules, ruleCategories } from "@/lib/rules";

export default function ReglesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold">Règles Opéris</h1>
        <p className="text-ink-soft text-sm mt-1">Les {rules.length} règles qui alimentent les alertes — la méthode encodée, pas un simple gestionnaire de documents.</p>
      </div>
      {ruleCategories.map((cat) => (
        <Card key={cat.key}>
          <h3 className="font-semibold mb-4">{cat.label}</h3>
          <div className="space-y-4">
            {rules.filter((r) => r.category === cat.key).map((r) => (
              <div key={r.id} className="flex items-start gap-3 pb-4 border-b border-line last:border-0 last:pb-0">
                <AlertBadge level={r.level} />
                <div className="text-sm">
                  <div className="font-medium leading-snug">{r.condition}</div>
                  <div className="text-ink-soft text-xs mt-1">{r.advice}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
