import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { AlertBadge } from "@/components/ui/AlertBadge";
import { proClients } from "@/lib/mock-data";

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Clients</h1>
      <Card>
        <DataTable
          columns={["Client", "Projet", "Étape", "Statut"]}
          rows={proClients.map((c) => [c.name, c.project, c.step, <AlertBadge key={c.name} level={c.level} />])}
        />
      </Card>
    </div>
  );
}
