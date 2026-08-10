import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/Stat";
import { AlertBadge } from "@/components/ui/AlertBadge";
import { proChantiers } from "@/lib/mock-data";

export default function ChantiersPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Chantiers</h1>
      <div className="grid sm:grid-cols-2 gap-5">
        {proChantiers.map((c) => (
          <Card key={c.name}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-medium">{c.name}</div>
                <div className="text-xs text-ink-soft">{c.project} — {c.step}</div>
              </div>
              <AlertBadge level={c.level} pulse={c.level === "rouge"} />
            </div>
            <ProgressBar value={c.progress} />
            <div className="text-xs text-ink-soft mt-2">{c.progress}% d'avancement</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
