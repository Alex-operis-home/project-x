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

// S'assure qu'un profil existe pour l'utilisateur connecté (obligatoire avant
// de créer un projet, car projects.owner_id référence profiles.id).
async function ensureProfile(userId: string) {
  if (!supabase) return;
  const { data: userData } = await supabase.auth.getUser();
  const meta = userData.user?.user_metadata as { space?: string; full_name?: string } | undefined;
  await supabase.from("profiles").upsert(
    {
      id: userId,
      space: meta?.space ?? "home",
      full_name: meta?.full_name ?? null,
    },
    { onConflict: "id", ignoreDuplicates: true }
  );
}

// Récupère le projet Home de l'utilisateur connecté, ou le crée (avec ses 11
// étapes, alertes et documents de départ) s'il n'en a pas encore.
// Retourne null en mode démo ou si l'utilisateur n'est pas connecté.
export async function getOrCreateHomeProject(): Promise<{
  project: DbProject;
  steps: DbStep[];
  alerts: DbAlert[];
  documents: DbDocument[];
} | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return null;

  await ensureProfile(userId);

  const { data: existing } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", userId)
    .eq("space", "home")
    .limit(1)
    .maybeSingle();

  let project = existing as DbProject | null;

  if (!project) {
    const { data: created, error } = await supabase
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
    if (error || !created) return null;
    project = created as DbProject;

    const stepsToInsert = homePlanning.map((s, i) => ({
      project_id: project!.id,
      step_order: i + 1,
      step_name: s.step,
      status: s.status,
      advice: s.advice,
    }));
    await supabase.from("project_steps").insert(stepsToInsert);

    const alertsToInsert = homeAlerts.map((a) => ({
      project_id: project!.id,
      level: a.level,
      title: a.title,
      detail: a.detail,
    }));
    await supabase.from("alerts").insert(alertsToInsert);

    const documentsToInsert = homeDocuments.map((d) => ({
      project_id: project!.id,
      name: d.name,
      category: d.category,
      status: d.status,
    }));
    await supabase.from("documents").insert(documentsToInsert);
  }

  const [{ data: steps }, { data: alerts }, { data: documents }] = await Promise.all([
    supabase.from("project_steps").select("*").eq("project_id", project.id).order("step_order", { ascending: true }),
    supabase.from("alerts").select("*").eq("project_id", project.id).order("created_at", { ascending: true }),
    supabase.from("documents").select("*").eq("project_id", project.id).order("created_at", { ascending: true }),
  ]);

  return {
    project,
    steps: (steps as DbStep[]) ?? [],
    alerts: (alerts as DbAlert[]) ?? [],
    documents: (documents as DbDocument[]) ?? [],
  };
}

// Met à jour le statut d'une étape (utilisée plus tard pour rendre le planning interactif).
export async function updateStepStatus(stepId: string, status: DbStep["status"]) {
  if (!isSupabaseConfigured || !supabase) return;
  await supabase.from("project_steps").update({ status }).eq("id", stepId);
}
