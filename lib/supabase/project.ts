import { supabase, isSupabaseConfigured } from "./client";
import { homeProject, homePlanning, homeAlerts, homeDocuments } from "../mock-data";

export type DbProject = {
  id: string;
  name: string;
  address: string | null;
  budget_planned: number;
  budget_spent: number;
  progress: number;
  status: string;
};

export type DbStep = {
  id: string;
  step_order: number;
  step_name: string;
  status: "todo" | "current" | "done";
  advice: string | null;
};

export type DbAlert = {
  id: string;
  level: "vert" | "orange" | "rouge";
  title: string;
  detail: string | null;
  resolved: boolean;
};

export type DbDocument = {
  id: string;
  name: string;
  category: string | null;
  status: "conforme" | "manquant" | "bloquant";
};

export type HomeProjectResult = {
  project: DbProject | null;
  steps: DbStep[];
  alerts: DbAlert[];
  documents: DbDocument[];
  debugError: string | null;
};

// S'assure qu'un profil existe pour l'utilisateur connecté (obligatoire avant
// de créer un projet, car projects.owner_id référence profiles.id).
async function ensureProfile(userId: string): Promise<string | null> {
  if (!supabase) return null;
  const { data: userData } = await supabase.auth.getUser();
  const meta = userData.user?.user_metadata as { space?: string; full_name?: string } | undefined;
  const { error } = await supabase.from("profiles").upsert(
    {
      id: userId,
      space: meta?.space ?? "home",
      full_name: meta?.full_name ?? null,
    },
    { onConflict: "id", ignoreDuplicates: true }
  );
  return error ? `profil: ${error.message}` : null;
}

// Récupère le projet Home de l'utilisateur connecté, ou le crée (avec ses 11
// étapes, alertes et documents de départ) s'il n'en a pas encore.
// debugError contient le message d'erreur exact en cas d'échec, pour diagnostic.
export async function getOrCreateHomeProject(): Promise<HomeProjectResult> {
  const empty: HomeProjectResult = { project: null, steps: [], alerts: [], documents: [], debugError: null };
  if (!isSupabaseConfigured || !supabase) return empty;

  try {
    return await getOrCreateHomeProjectUnsafe(empty);
  } catch (err) {
    return { ...empty, debugError: `exception inattendue: ${err instanceof Error ? err.message : String(err)}` };
  }
}

async function getOrCreateHomeProjectUnsafe(empty: HomeProjectResult): Promise<HomeProjectResult> {
  const db = supabase!;
  const { data: userData, error: userError } = await db.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return { ...empty, debugError: userError ? `auth: ${userError.message}` : "auth: utilisateur non connecté" };

  const profileError = await ensureProfile(userId);
  if (profileError) return { ...empty, debugError: profileError };

  const { data: existing, error: fetchError } = await db
    .from("projects")
    .select("*")
    .eq("owner_id", userId)
    .eq("space", "home")
    .limit(1)
    .maybeSingle();

  if (fetchError) return { ...empty, debugError: `lecture projet: ${fetchError.message}` };

  let project = existing as DbProject | null;

  if (!project) {
    const { data: created, error } = await db
      .from("projects")
      .insert({
        owner_id: userId,
        space: "home",
        name: homeProject.name,
        address: homeProject.address,
        budget_planned: 0,
        budget_spent: 0,
        progress: 0,
        status: "actif",
      })
      .select()
      .single();
    if (error || !created) return { ...empty, debugError: `création projet: ${error?.message ?? "inconnue"}` };
    project = created as DbProject;

    const stepsToInsert = homePlanning.map((s, i) => ({
      project_id: project!.id,
      step_order: i + 1,
      step_name: s.step,
      status: s.status,
      advice: s.advice,
    }));
    const { error: stepsError } = await db.from("project_steps").insert(stepsToInsert);
    if (stepsError) return { ...empty, project, debugError: `étapes: ${stepsError.message}` };

    const alertsToInsert = homeAlerts.map((a) => ({
      project_id: project!.id,
      level: a.level,
      title: a.title,
      detail: a.detail,
    }));
    const { error: alertsError } = await db.from("alerts").insert(alertsToInsert);
    if (alertsError) return { ...empty, project, debugError: `alertes: ${alertsError.message}` };

    const documentsToInsert = homeDocuments.map((d) => ({
      project_id: project!.id,
      name: d.name,
      category: d.category,
      status: d.status,
    }));
    const { error: docsError } = await db.from("documents").insert(documentsToInsert);
    if (docsError) return { ...empty, project, debugError: `documents: ${docsError.message}` };
  }

  const [{ data: steps }, { data: alerts }, { data: documents }] = await Promise.all([
    db.from("project_steps").select("*").eq("project_id", project.id).order("step_order", { ascending: true }),
    db.from("alerts").select("*").eq("project_id", project.id).order("created_at", { ascending: true }),
    db.from("documents").select("*").eq("project_id", project.id).order("created_at", { ascending: true }),
  ]);

  return {
    project,
    steps: (steps as DbStep[]) ?? [],
    alerts: (alerts as DbAlert[]) ?? [],
    documents: (documents as DbDocument[]) ?? [],
    debugError: null,
  };
}

// Met à jour le statut d'une étape (utilisée plus tard pour rendre le planning interactif).
export async function updateStepStatus(stepId: string, status: DbStep["status"]) {
  if (!isSupabaseConfigured || !supabase) return;
  await supabase.from("project_steps").update({ status }).eq("id", stepId);
}
