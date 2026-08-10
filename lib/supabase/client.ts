import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

let client: SupabaseClient | null = null;
let configured = false;

// createClient() lève une exception si l'URL est mal formée (espace, chemin
// en trop, etc.). On l'isole ici pour qu'une variable d'environnement mal
// renseignée ne puisse jamais faire planter la compilation ni le site —
// dans ce cas l'app retombe simplement en mode démo.
if (supabaseUrl && supabaseAnonKey) {
  try {
    client = createClient(supabaseUrl, supabaseAnonKey);
    configured = true;
  } catch {
    client = null;
    configured = false;
  }
}

export const isSupabaseConfigured = configured;

// En mode démo (variables d'environnement absentes ou invalides), l'app
// tourne uniquement sur les données d'exemple (lib/mock-data.ts) — utile
// pour les rendez-vous clients avant que Supabase ne soit branché.
export const supabase = client;
