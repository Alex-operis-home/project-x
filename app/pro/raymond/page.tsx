"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";

type Msg = { from: "raymond" | "user"; text: string };

const initial: Msg[] = [
  { from: "raymond", text: "Salut Alexandre. J'ai regardé tes 25 chantiers." },
  { from: "raymond", text: "Aujourd'hui : 3 alertes importantes — retard fournisseur chez Martin, document manquant chez Dupont, et un dépassement probable sur le budget de Lefort." },
];

export default function RaymondProPage() {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [value, setValue] = useState("");

  function send(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    setMessages((m) => [
      ...m,
      { from: "user", text: value },
      { from: "raymond", text: "(démo) Ici Raymond appellerait l'API Claude/Anthropic pour répondre avec les données réelles de l'entreprise." },
    ]);
    setValue("");
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Raymond</h1>
      <Card className="flex flex-col h-[520px]">
        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin pr-2">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${m.from === "user" ? "bg-brand text-white" : "bg-canvas text-ink"}`}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={send} className="mt-4 flex gap-2 border-t border-line pt-4">
          <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Écris à Raymond…" className="flex-1 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-brand" />
          <button className="bg-ink text-white text-sm font-semibold px-4 py-2 rounded-lg">Envoyer</button>
        </form>
      </Card>
    </div>
  );
}
