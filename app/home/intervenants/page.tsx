import { Card } from "@/components/ui/Card";
import { homeStakeholders } from "@/lib/mock-data";

export default function IntervenantsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Intervenants</h1>
      <div className="grid sm:grid-cols-2 gap-5">
        {homeStakeholders.map((s) => (
          <Card key={s.name} className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-brand-soft text-brand font-display font-semibold flex items-center justify-center flex-shrink-0">
              {s.name.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{s.name}</div>
              <div className="text-sm text-ink-soft">{s.role}</div>
              <div className="text-xs text-ink-soft mt-0.5">{s.phone}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
