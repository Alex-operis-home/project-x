"use client";
import { useState } from "react";

type SpaceKey = "home" | "pro" | "promoteur";

export function RaymondBar({ space = "home" }: { space?: SpaceKey }) {
  const [value, setValue] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim() || loading) return;
    const question = value;
    setValue("");
    setLoading(true);
    setReply(null);
    try {
      const res = await fetch("/api/raymond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, space }),
      });
      const json = await res.json();
      setReply(json.reply ?? "Raymond n'a pas pu répondre.");
    } catch {
      setReply("Raymond est momentanément indisponible — réessaie dans un instant.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 md:left-[260px] z-20">
      {reply && (
        <div className="mx-4 md:mx-6 mb-2 max-w-2xl bg-ink text-white text-sm leading-relaxed rounded-xl p-4 shadow-floating relative">
          <button onClick={() => setReply(null)} className="absolute top-2 right-3 text-white/50 hover:text-white text-xs">✕</button>
          <span className="text-brand font-semibold">Raymond — </span>
          {reply}
        </div>
      )}
      <form
        onSubmit={handleAsk}
        className="flex items-center gap-3 border-t border-line bg-surface/95 backdrop-blur px-4 md:px-6 py-3.5 shadow-[0_-8px_24px_rgba(18,24,31,0.06)]"
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-soft text-brand font-display font-semibold text-sm flex-shrink-0">
          R
        </div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={loading ? "Raymond réfléchit…" : "Demander à Raymond…"}
          disabled={loading}
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-soft"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-ink text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50"
        >
          {loading ? "…" : "Envoyer"}
        </button>
      </form>
    </div>
  );
}
