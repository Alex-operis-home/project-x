import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/Stat";
import { AlertBadge } from "@/components/ui/AlertBadge";
import { RaymondCard } from "@/components/RaymondCard";
import { proUser, proStats, proAlerts, proClients } from "@/lib/mock-data";

export default function ProDashboard() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="font-display text-2xl font-semibold">Salut {proUser.firstName} 👋</h1>
        <p className="text-ink-soft mt-1">
          J'ai regardé tes {proStats.chantiers} chantiers. Aujourd'hui : {proStats.alertesImportantes} alertes importantes.
        </p>
      </div>

      <div className="grid sm:grid-cols-4 gap-5">
        <StatCard label="Chantiers actifs" value={String(proStats.chantiers)} />
        <StatCard label="Alertes importantes" value={String(proStats.alertesImportantes)} hint="à traiter aujourd'hui" hintTone="down" />
        <StatCard label="CA prévisionnel" value={proStats.caPrevisionnel} />
        <StatCard label="Marge moyenne" value={proStats.margeMoyenne} hintTone="up" hint="stable ce trimestre" />
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <Card className="md:col-span-2">
          <h3 className="font-semibold mb-4">Alertes importantes</h3>
          <div className="space-y-3">
            {proAlerts.map((a) => (
              <div key={a.id} className="flex items-start gap-2.5">
                <AlertBadge level={a.level} pulse={a.level === "rouge"} />
                <div className="text-sm">
                  <div className="font-medium leading-snug">{a.title}</div>
                  <div className="text-ink-soft text-xs mt-0.5">{a.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <RaymondCard
          userName={proUser.firstName}
          intro="J'ai regardé tes 25 chantiers."
          bullets={[
            "Chantier Martin : retard fournisseur",
            "Client Dupont : document manquant",
            "Budget chantier Lefort : dépassement probable",
          ]}
        />
      </div>

      <Card>
        <h3 className="font-semibold mb-4">Vos clients en cours</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {proClients.map((c) => (
            <div key={c.name} className="border border-line rounded-lg p-4">
              <div className="flex justify-between items-start mb-1.5">
                <span className="font-medium text-sm">{c.name}</span>
                <AlertBadge level={c.level} />
              </div>
              <div className="text-xs text-ink-soft">{c.project}</div>
              <div className="text-xs text-ink-soft">{c.step}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
