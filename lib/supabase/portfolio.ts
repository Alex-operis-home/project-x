import { supabase } from "./client";

export type DbPortfolioProject = { id: string; name: string; client_name: string | null; budget_planned: number; budget_spent: number; progress: number; status: string };
export type PortfolioResult = { projects: DbPortfolioProject[]; debugError: string | null };
export type PortfolioSeed = { name: string; client_name?: string; budget_planned?: number; budget_spent?: number; progress?: number; status?: string };

async function ensureProfile(userId: string, space: "pro" | "promoteur"): Promise<string | null> {
  if (!supabase) return null;
  const { data: userData } = await supabase.auth.getUser();
  const meta = userData.user?.user_metadata as { full_name?: string; company_name?: string } | undefined;
  const { error } = await supabase.from("profiles").upsert(
    { id: userId, space, full_name: meta?.full_name ?? null, company_name: meta?.company_name ?? null },
    { onConflict: "id", ignoreDuplicates: true }
  );
  return error ? `profil: ${error.message}` : null;
}

export async function getOrCreatePortfolio(space: "pro" | "promoteur", seeds: PortfolioSeed[]): Promise<PortfolioResult> {
  const empty: PortfolioResult = { projects: [], debugError: null };
  if (!supabase) return empty;
  try {
    return await getOrCreatePortfolioUnsafe(space, seeds, empty);
  } catch (err) {
    return { ...empty, debugError: `exception inattendue: ${err instanceof Error ? err.message : String(err)}` };
  }
}

async function getOrCreatePortfolioUnsafe(space: "pro" | "promoteur", seeds: PortfolioSeed[], empty: PortfolioResult): Promise<PortfolioResult> {
  const db = supabase!;
  const { data: userData, error: userError } = await db.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return { ...empty, debugError: userError ? `auth: ${userError.message}` : "auth: utilisateur non connecté" };

  const profileError = await ensureProfile(userId, space);
  if (profileError) return { ...empty, debugError: profileError };

  const { data: existing, error: fetchError } = await db.from("projects").select("*").eq("owner_id", userId).eq("space", space).order("created_at", { ascending: true });
  if (fetchError) return { ...empty, debugError: `lecture portefeuille: ${fetchError.message}` };

  if (existing && existing.length > 0) return { projects: existing as DbPortfolioProject[], debugError: null };

  const toInsert = seeds.map((s) => ({
    owner_id: userId, space, name: s.name, client_name: s.client_name ?? null,
    budget_planned: s.budget_planned ?? 0, budget_spent: s.budget_spent ?? 0, progress: s.progress ?? 0, status: s.status ?? "actif",
  }));

  const { data: created, error: createError } = await db.from("projects").insert(toInsert).select();
  if (createError || !created) return { ...empty, debugError: `création portefeuille: ${createError?.message ?? "inconnue"}` };
  return { projects: created as DbPortfolioProject[], debugError: null };
}
