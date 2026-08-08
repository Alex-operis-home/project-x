"use client";
import { useEffect, useState } from "react";
import { getOrCreateHomeProject, DbProject, DbStep } from "./supabase/project";
import { homeProject, homePlanning } from "./mock-data";

export type StepView = { step: string; status: "todo" | "current" | "done"; advice: string; id?: string };

export function useHomeProject() {
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(true);
  const [project, setProject] = useState<DbProject | null>(null);
  const [steps, setSteps] = useState<StepView[]>(
    homePlanning.map((s) => ({ step: s.step, status: s.status as StepView["status"], advice: s.advice }))
  );

  useEffect(() => {
    let cancelled = false;
    getOrCreateHomeProject().then((result) => {
      if (cancelled) return;
      if (result) {
        setDemo(false);
        setProject(result.project);
        setSteps(
          result.steps.map((s: DbStep) => ({
            id: s.id,
            step: s.step_name,
            status: s.status,
            advice: s.advice ?? "",
          }))
        );
      }
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const progress = steps.length
    ? Math.round((steps.filter((s) => s.status === "done").length / steps.length) * 100)
    : homeProject.progress;

  const currentStep = steps.find((s) => s.status === "current")?.step ?? homeProject.step;

  return {
    loading,
    demo,
    address: project?.address ?? homeProject.address,
    builder: homeProject.builder, // pas encore en base — reste en démo pour l'instant
    steps,
    progress,
    currentStep,
  };
}
