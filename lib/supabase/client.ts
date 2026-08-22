import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Valeurs de secours en dur : ce sont des clés PUBLIQUES par conception
// (l'URL du projet et la "publishable key" Supabase sont faites pour être
// exposées côté navigateur — la vraie sécurité vient des policies RLS déjà
// configurées, jamais de garder ces valeurs secrètes). On les utilise en
// repli si les variables d'environnement Vercel ne sont pas récupérées au
// build, pour ne plus dépendre de la fiabilité de cette transmission.
const FALLBACK_URL = "https://yagjecmlxukjchdiwgan.supabase.co";
const FALLBACK_ANON_KEY = "sb_publishable_9mp1XQ9Oi5OA0dqj2JZiCA_9q8SX-Qa";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_ANON_KEY;

let client: SupabaseClient | null = null;
let configured = false;

// createClient() lève une exception si l'URL est mal formée. On l'isole ici
// pour qu'une valeur invalide ne puisse jamais faire planter la compilation
// ni le site — dans ce cas l'app retombe simplement en mode démo.
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

// En mode démo (aucune URL/clé disponible, ni env var ni secours), l'app
// tourne uniquement sur les données d'exemple (lib/mock-data.ts).
export const supabase = client;
