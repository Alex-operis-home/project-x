"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

type SpaceKey = "home" | "pro" | "promoteur";

const spaces: { key: SpaceKey; label: string; desc: string }[] = [
  { key: "home", label: "Particulier", desc: "Project X Home" },
  { key: "pro", label: "Constructeur", desc: "Project X Pro" },
  { key: "promoteur", label: "Promoteur", desc: "Project X Promoteur" },
];

export default function LoginPage() {
  const router = useRouter();
  const [space, setSpace] = useState<SpaceKey>("home");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isSupabaseConfigured || !supabase) {
      // Mode démo : pas de vraie auth tant que Supabase n'est pas branché
      router.push(`/${space}`);
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { space, full_name: fullName } },
        });
        if (signUpError) throw signUpError;
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
        if (signInError) throw signInError;
      }
      router.push(`/${space}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-canvas flex items-start sm:items-center justify-center px-4 py-8 overflow-y-auto">
      <div className="w-full max-w-md bg-surface border border-line rounded-xl2 shadow-card p-5 sm:p-7 my-4">
        <div className="font-display text-xl font-semibold mb-1">
          Project <span className="text-brand">X</span>
        </div>
        <p className="text-sm text-ink-soft mb-6">Connecte-toi ou crée ton compte.</p>

        {!isSupabaseConfigured && (
          <div className="text-xs bg-gold-soft text-ink-soft rounded-lg p-3 mb-5">
            Mode démonstration — Supabase n'est pas encore branché. Choisis un espace pour l'explorer avec des données d'exemple.
          </div>
        )}

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-6">
          {spaces.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSpace(s.key)}
              className={`text-[11px] sm:text-xs font-semibold px-1 sm:px-2 py-2 sm:py-2.5 rounded-lg border transition-colors leading-tight break-words ${
                space === s.key ? "bg-ink text-white border-ink" : "border-line text-ink-soft hover:bg-canvas"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-5">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 text-sm font-semibold py-2 rounded-lg border ${mode === "login" ? "bg-ink text-white border-ink" : "border-line text-ink-soft"}`}
          >
            Se connecter
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 text-sm font-semibold py-2 rounded-lg border ${mode === "signup" ? "bg-ink text-white border-ink" : "border-line text-ink-soft"}`}
          >
            Créer un compte
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === "signup" && (
            <div>
              <label className="text-xs text-ink-soft font-semibold mb-1 block">Nom</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand"
                placeholder="Julie Martin"
              />
            </div>
          )}
          <div>
            <label className="text-xs text-ink-soft font-semibold mb-1 block">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand"
              placeholder="vous@email.com"
            />
          </div>
          <div>
            <label className="text-xs text-ink-soft font-semibold mb-1 block">Mot de passe</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-line rounded-lg px-3 py-2.5 text-sm outline-none focus:border-brand"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-xs text-signal-red">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-ink text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-brand-dark transition-colors disabled:opacity-50"
          >
            {loading ? "…" : "Continuer"}
          </button>
        </form>
      </div>
    </main>
  );
}
