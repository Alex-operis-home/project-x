"use client";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { useHomeProject } from "@/lib/useHomeProject";

const statusStyle: Record<string, string> = {
  conforme: "bg-signal-green-soft text-signal-green",
  manquant: "bg-signal-orange-soft text-signal-orange",
  bloquant: "bg-signal-red-soft text-signal-red",
};

export default function DocumentsPage() {
  const { documents, loading, demo } = useHomeProject();
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Documents</h1>
      {demo && (
        <div className="text-xs bg-gold-soft text-ink-soft rounded-lg p-3">
          Données de démonstration — connecte-toi avec un compte réel pour voir tes propres documents.
        </div>
      )}
      <Card>
        {loading ? (
          <div className="text-sm text-ink-soft">Chargement…</div>
        ) : (
          <DataTable
            columns={["Document", "Catégorie", "Statut"]}
            rows={documents.map((d) => [
              d.name,
              d.category,
              <span key={d.id} className={`text-xs font-semibold px-2 py-1 rounded-full ${statusStyle[d.status]}`}>
                {d.status}
              </span>,
            ])}
          />
        )}
      </Card>
    </div>
  );
}
