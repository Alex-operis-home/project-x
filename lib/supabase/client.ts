import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Valeurs PUBLIQUES par conception (l'URL du projet et la "publishable key"
// sont faites pour être exposées côté navigateur — la vraie sécurité vient
// des policies RLS déjà configurées). Toujours utilisées directement, sans
// dépendre de la fiabilité de la transmission des variables d'environnement.
const SUPABASE_URL = "https://yagjecmlxukjchdiwgan.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_9mp1XQ9Oi5OA0dqj2JZiCA_9q8SX-Qa";

export const isSupabaseConfigured = true;
export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
