import { supabase, isSupabaseConfigured } from "./client";
import { homeProject, homePlanning } from "../mock-data";

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

// Récupère le projet Home de l'utilisateur connecté, ou le crée avec ses 11
// étapes par défaut s'il n'en a pas encore. Retourne null en mode démo.
export async function getOrCreateHomeProject(): Promise<{ project: DbProject; steps: DbStep[] } | null> {
  if (!isSupabaseConfigured || !supabase) return null;

  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return null;

  const { data: existing } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", userId)
    .eq("app_type", "home")
    .limit(1)
    .maybeSingle();

  let project = existing as DbProject | null;

  if (!project) {
    const { data: created, error } = await supabase
      .from("projects")
      .insert({
        owner_id: userId,
        app_type: "home",
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
  }

  const { data: steps } = await supabase
    .from("project_steps")
    .select("*")
    .eq("project_id", project.id)
    .order("step_order", { ascending: true });

  return { project, steps: (steps as DbStep[]) ?? [] };
}

// Met à jour le statut d'une étape (utilisée plus tard pour rendre le planning interactif).
export async function updateStepStatus(stepId: string, status: DbStep["status"]) {
  if (!isSupabaseConfigured || !supabase) return;
  await supabase.from("project_steps").update({ status }).eq("id", stepId);
}
