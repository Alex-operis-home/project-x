import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/Stat";
import { AlertBadge } from "@/components/ui/AlertBadge";
import { RaymondCard } from "@/components/RaymondCard";
import { promoteurUser, promoteurStats, promoteurAlerts, promoteurOperations } from "@/lib/mock-data";

export default function PromoteurDashboard() {
  return (
    <div className="space-y-6 animate-fade-up">
      <div>
        <h1 className="font-display text-2xl font-semibold">Salut {promoteurUser.firstName} 👋</h1>
        <p className="text-ink-soft mt-1">Voici l'état de votre portefeuille d'opérations aujourd'hui.</p>
      </div>

      <div className="grid sm:grid-cols-4 gap-5">
        <StatCard label="Opérations actives" value={String(promoteurStats.operations)} />
        <StatCard label="CA prévisionnel" value={promoteurStats.caPrevisionnel} />
        <StatCard label="Marge moyenne" value={promoteurStats.margeMoyenne} hintTone="up" />
        <StatCard label="Opérations en alerte" value={String(promoteurStats.alertes)} hintTone="down" hint="à traiter" />
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <Card className="md:col-span-2">
          <h3 className="font-semibold mb-4">Alertes portefeuille</h3>
          <div className="space-y-3">
            {promoteurAlerts.map((a) => (
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
          userName={promoteurUser.firstName}
          intro="J'ai passé en revue vos 9 opérations."
          bullets={[
            "Val Fleuri : retard VRD à anticiper",
            "Les Ateliers : dépassement budget lot 4",
            "Garantie financière à renouveler avant le 14/09",
          ]}
        />
      </div>

      <Card>
        <h3 className="font-semibold mb-4">Vos opérations</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {promoteurOperations.map((o) => (
            <div key={o.name} className="border border-line rounded-lg p-4">
              <div className="flex justify-between items-start mb-1.5">
                <span className="font-medium text-sm">{o.name}</span>
                <AlertBadge level={o.level} />
              </div>
              <div className="text-xs text-ink-soft">{o.type}</div>
              <div className="text-xs text-ink-soft">{o.status} — {o.progress}%</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
