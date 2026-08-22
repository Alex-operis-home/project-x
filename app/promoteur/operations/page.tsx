import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/Stat";
import { AlertBadge } from "@/components/ui/AlertBadge";
import { promoteurOperations } from "@/lib/mock-data";

export default function OperationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Opérations</h1>
      <div className="grid sm:grid-cols-2 gap-5">
        {promoteurOperations.map((o) => (
          <Card key={o.name}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="font-medium">{o.name}</div>
                <div className="text-xs text-ink-soft">{o.type}</div>
              </div>
              <AlertBadge level={o.level} pulse={o.level === "rouge"} />
            </div>
            <ProgressBar value={o.progress} />
            <div className="flex justify-between text-xs text-ink-soft mt-2">
              <span>{o.status}</span>
              <span>{o.engage} / {o.budget}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
