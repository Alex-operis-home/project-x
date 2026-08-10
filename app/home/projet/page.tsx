"use client";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/Stat";
import { useHomeProject } from "@/lib/useHomeProject";
import { homeProject } from "@/lib/mock-data";

export default function ProjetPage() {
  const { address, builder, currentStep, progress, demo } = useHomeProject();
  const rows = [
    ["Adresse du projet", address],
    ["Constructeur", builder],
    ["Date de démarrage", homeProject.startDate], // pas encore en base
    ["Étape en cours", currentStep],
  ];
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Mon projet</h1>
      {demo && (
        <div className="text-xs bg-gold-soft text-ink-soft rounded-lg p-3">
          Données de démonstration — connecte-toi avec un compte réel pour voir ton propre projet.
        </div>
      )}
      <Card>
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-ink-soft">Avancement global</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <ProgressBar value={progress} color="gold" />
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
