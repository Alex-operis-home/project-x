"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { useHomeProject } from "@/lib/useHomeProject";

const statusStyle: Record<string, string> = {
  conforme: "bg-signal-green-soft text-signal-green",
  manquant: "bg-signal-orange-soft text-signal-orange",
  bloquant: "bg-signal-red-soft text-signal-red",
};

const categories = ["Permis", "Devis", "Contrats", "Plans", "Assurances", "Autre"];

export default function DocumentsPage() {
  const { documents, loading, demo, addDocument } = useHomeProject();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [saving, setSaving] = useState(false);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    await addDocument(name, category);
    setSaving(false);
    setName("");
    setShowForm(false);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Documents</h1>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="bg-ink text-white text-sm font-semibold px-4 py-2.5 rounded-lg hover:bg-brand-dark transition-colors"
        >
          + Ajouter un document
        </button>
      </div>

      {demo && (
        <div className="text-xs bg-gold-soft text-ink-soft rounded-lg p-3">
          Mode démonstration — les documents ajoutés ici ne seront pas conservés après rechargement. Connecte-toi avec un compte réel pour un enregistrement définitif.
        </div>
      )}

      {showForm && (
        <Card>
          <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 w-full">
              <label className="text-xs text-ink-soft font-semibold mb-1 block">Nom du document</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex : Devis charpente"
                className="w-full border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand"
              />
            </div>
            <div className="w-full sm:w-48">
              <label className="text-xs text-ink-soft font-semibold mb-1 block">Catégorie</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand bg-white"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="bg-gold text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 w-full sm:w-auto"
            >
              {saving ? "…" : "Ajouter"}
            </button>
          </form>
          <p className="text-xs text-ink-soft mt-3">
            Note : l'import d'un vrai fichier (upload) sera branché sur Supabase Storage dans une prochaine étape — pour l'instant, le document est enregistré par son nom et sa catégorie.
          </p>
        </Card>
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
