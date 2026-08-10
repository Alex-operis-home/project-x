import { Card } from "@/components/ui/Card";
import { proTasksAuto } from "@/lib/mock-data";

export default function ActionsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Actions automatiques</h1>
      <p className="text-ink-soft text-sm">Raymond prépare ces actions pour toi — relis-les avant envoi.</p>
      <div className="grid sm:grid-cols-2 gap-5">
        {proTasksAuto.map((t) => (
          <Card key={t} className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium">{t}</span>
            <div className="flex gap-2 flex-shrink-0">
              <button className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-line hover:bg-canvas">Modifier</button>
              <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-ink text-white">Envoyer</button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
