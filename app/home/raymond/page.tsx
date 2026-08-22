"use client";
import { useState } from "react";
import { Card } from "@/components/ui/Card";

type Msg = { from: "raymond" | "user"; text: string };

const initial: Msg[] = [
  { from: "raymond", text: "Salut Julie 👋 J'ai analysé ton dossier. Voici ce qui mérite ton attention aujourd'hui." },
  { from: "raymond", text: "1) La décennale de ton maçon n'a pas encore été transmise — je te recommande de la réclamer avant le coulage de dalle. 2) L'appel de fonds n°4 arrive à échéance dans 5 jours." },
];

export default function RaymondPage() {
  const [messages, setMessages] = useState<Msg[]>(initial);
  const [value, setValue] = useState("");

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    const question = value;
    setValue("");
    setMessages((m) => [...m, { from: "user", text: question }]);
    try {
      const res = await fetch("/api/raymond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, space: "home" }),
      });
      const json = await res.json();
      setMessages((m) => [...m, { from: "raymond", text: json.reply ?? "Raymond n'a pas pu répondre." }]);
    } catch {
      setMessages((m) => [...m, { from: "raymond", text: "Raymond est momentanément indisponible — réessaie dans un instant." }]);
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">Raymond</h1>
      <Card className="flex flex-col h-[520px]">
        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-thin pr-2">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  m.from === "user" ? "bg-brand text-white" : "bg-canvas text-ink"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={send} className="mt-4 flex gap-2 border-t border-line pt-4">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Écris à Raymond…"
            className="flex-1 border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-brand"
          />
          <button className="bg-ink text-white text-sm font-semibold px-4 py-2 rounded-lg">Envoyer</button>
        </form>
      </Card>
    </div>
  );
}
