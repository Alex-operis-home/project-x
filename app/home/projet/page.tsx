import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/Stat";
import { homeProject } from "@/lib/mock-data";

export default function ProjetPage() {
  const rows = [
    ["Adresse du projet", homeProject.address],
    ["Constructeur", homeProject.builder],
    ["Date de démarrage", homeProject.startDate],
    ["Étape en cours", homeProject.step],
  ];
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Mon projet</h1>
      <Card>
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-ink-soft">Avancement global</span>
            <span className="font-semibold">{homeProject.progress}%</span>
          </div>
          <ProgressBar value={homeProject.progress} color="gold" />
        </div>
        <dl className="grid sm:grid-cols-2 gap-5">
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-ink-soft uppercase tracking-wide mb-1">{label}</dt>
              <dd className="text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </Card>
    </div>
  );
}
