import { Card } from "@/components/ui/Card";
import { promoteurLots } from "@/lib/mock-data";

export default function CommercialisationPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Commercialisation</h1>
      <div className="grid sm:grid-cols-2 gap-5">
        {promoteurLots.map((l) => (
          <Card key={l.operation}>
            <h3 className="font-semibold mb-4">{l.operation}</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="font-display text-2xl font-semibold text-signal-green">{l.vendus}</div>
                <div className="text-xs text-ink-soft">Vendus</div>
              </div>
              <div>
                <div className="font-display text-2xl font-semibold text-gold">{l.reserves}</div>
                <div className="text-xs text-ink-soft">Réservés</div>
              </div>
              <div>
                <div className="font-display text-2xl font-semibold text-ink-soft">{l.disponibles}</div>
                <div className="text-xs text-ink-soft">Disponibles</div>
              </div>
            </div>
            <div className="text-xs text-ink-soft mt-4 text-center">{l.total} lots au total</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
