"use client";
import { useEffect, useState } from "react";
import { getOrCreateHomeProject, DbAlert, DbDocument, DbStep } from "./supabase/project";
import { homeProject, homePlanning, homeAlerts, homeDocuments } from "./mock-data";

export type StepView = { step: string; status: "todo" | "current" | "done"; advice: string; id?: string };
export type AlertView = { id: string; level: "vert" | "orange" | "rouge"; title: string; detail: string };
export type DocView = { id: string; name: string; category: string; status: "conforme" | "manquant" | "bloquant" };

export function useHomeProject() {
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(true);
  const [debugError, setDebugError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(homeProject.address);
  const [steps, setSteps] = useState<StepView[]>(
    homePlanning.map((s) => ({ step: s.step, status: s.status as StepView["status"], advice: s.advice }))
  );
  const [alerts, setAlerts] = useState<AlertView[]>(
    homeAlerts.map((a) => ({ id: a.id, level: a.level, title: a.title, detail: a.detail }))
  );
  const [documents, setDocuments] = useState<DocView[]>(
    homeDocuments.map((d) => ({ id: d.id, name: d.name, category: d.category, status: d.status }))
  );

  useEffect(() => {
    let cancelled = false;
    getOrCreateHomeProject()
      .then((result) => {
        if (cancelled) return;
        if (result.debugError) setDebugError(result.debugError);
        if (result.project) {
          setDemo(false);
          setAddress(result.project.address);
          setSteps(
            result.steps.map((s: DbStep) => ({ id: s.id, step: s.step_name, status: s.status, advice: s.advice ?? "" }))
          );
          setAlerts(
            result.alerts.map((a: DbAlert) => ({ id: a.id, level: a.level, title: a.title, detail: a.detail ?? "" }))
          );
          setDocuments(
            result.documents.map((d: DbDocument) => ({
              id: d.id,
              name: d.name,
              category: d.category ?? "",
              status: d.status,
            }))
          );
        }
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setDebugError(`exception: ${err instanceof Error ? err.message : String(err)}`);
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
    debugError,
    address,
    builder: homeProject.builder, // pas encore en base — reste en démo pour l'instant
    steps,
    alerts,
    documents,
    progress,
    currentStep,
  };
}
