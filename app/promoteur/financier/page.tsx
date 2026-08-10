import { Card } from "@/components/ui/Card";
import { StatCard } from "@/components/ui/Stat";
import { DataTable } from "@/components/ui/DataTable";
import { promoteurOperations } from "@/lib/mock-data";

export default function FinancierPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Financier</h1>
      <div className="grid sm:grid-cols-3 gap-5">
        <StatCard label="Trésorerie disponible" value="2 340 000 €" />
        <StatCard label="Encours bancaire" value="6 800 000 €" />
        <StatCard label="Appels de fonds à émettre" value="4" />
      </div>
      <Card>
        <h3 className="font-semibold mb-4">Budget par opération</h3>
        <DataTable
          columns={["Opération", "Budget engagé", "Budget total"]}
          rows={promoteurOperations.map((o) => [o.name, o.engage, o.budget])}
        />
      </Card>
    </div>
  );
}
