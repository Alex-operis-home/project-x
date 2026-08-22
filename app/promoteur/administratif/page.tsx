import { Card } from "@/components/ui/Card";
import { promoteurAdmin } from "@/lib/mock-data";

export default function AdministratifPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Administratif</h1>
      <Card>
        <div className="space-y-3">
          {promoteurAdmin.map((a) => (
            <div key={a.item} className="flex items-center justify-between py-2 border-b border-line last:border-0">
              <span className="text-sm font-medium">{a.item}</span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  a.status === "conforme" ? "bg-signal-green-soft text-signal-green" : "bg-signal-orange-soft text-signal-orange"
                }`}
              >
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
