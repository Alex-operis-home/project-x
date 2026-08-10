import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { homeDocuments } from "@/lib/mock-data";

const statusStyle: Record<string, string> = {
  conforme: "bg-signal-green-soft text-signal-green",
  manquant: "bg-signal-orange-soft text-signal-orange",
  bloquant: "bg-signal-red-soft text-signal-red",
};

export default function DocumentsPromoteurPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Documents</h1>
      <Card>
        <p className="text-sm text-ink-soft mb-4">Documents transverses, toutes opérations confondues.</p>
        <DataTable
          columns={["Document", "Catégorie", "Statut"]}
          rows={homeDocuments.map((d) => [
            d.name,
            d.category,
            <span key={d.id} className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyle[d.status]}`}>
              {d.status}
            </span>,
          ])}
        />
      </Card>
    </div>
  );
}
