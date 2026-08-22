import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { proChantiers } from "@/lib/mock-data";

export default function BudgetProPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Budget / rentabilité</h1>
      <Card>
        <DataTable
          columns={["Chantier", "Coût prévu", "Coût réel", "Marge estimée"]}
          rows={proChantiers.map((c) => {
            const marge = c.coutPrevu - c.coutReel;
            const margePct = Math.round((marge / c.coutPrevu) * 100);
            return [
              c.name,
              `${c.coutPrevu.toLocaleString("fr-FR")} €`,
              `${c.coutReel.toLocaleString("fr-FR")} €`,
              <span key={c.name} className={margePct < 10 ? "text-signal-orange font-semibold" : "text-signal-green font-semibold"}>
                {margePct}%
              </span>,
            ];
          })}
        />
      </Card>
    </div>
  );
}
