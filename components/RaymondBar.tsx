"use client";
import { useState } from "react";

export function RaymondBar({ sidebarWidth = 260 }: { sidebarWidth?: number }) {
  const [value, setValue] = useState("");

  function handleAsk(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    alert(
      "Raymond (démo) — brancher ici l'appel à l'API Claude/Anthropic pour répondre à :\n\n« " + value + " »"
    );
    setValue("");
  }

  return (
    <form
      onSubmit={handleAsk}
      className="fixed bottom-0 right-0 z-20 flex items-center gap-3 border-t border-line bg-surface/95 backdrop-blur px-6 py-3.5 shadow-[0_-8px_24px_rgba(18,24,31,0.06)]"
      style={{ left: sidebarWidth }}
    >
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-brand-soft text-brand font-display font-semibold text-sm flex-shrink-0">
        R
      </div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Demander à Raymond…"
        className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-soft"
      />
      <button
        type="submit"
        className="bg-ink text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-dark transition-colors"
      >
        Envoyer
      </button>
    </form>
  );
}
