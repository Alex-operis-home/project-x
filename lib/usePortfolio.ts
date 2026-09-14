"use client";
import { useEffect, useState } from "react";
import { getOrCreatePortfolio, DbPortfolioProject, PortfolioSeed } from "./supabase/portfolio";

export function usePortfolio(space: "pro" | "promoteur", seeds: PortfolioSeed[]) {
  const [loading, setLoading] = useState(true);
  const [demo, setDemo] = useState(true);
  const [debugError, setDebugError] = useState<string | null>(null);
  const [projects, setProjects] = useState<DbPortfolioProject[]>([]);

  useEffect(() => {
    let cancelled = false;
    const timeout = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error("délai dépassé (8s) — la requête vers Supabase n'a jamais répondu")), 8000);
    });
    Promise.race([getOrCreatePortfolio(space, seeds), timeout])
      .then((result) => {
        if (cancelled) return;
        if (result.debugError) setDebugError(result.debugError);
        if (result.projects.length > 0) { setDemo(false); setProjects(result.projects); }
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setDebugError(`exception: ${err instanceof Error ? err.message : String(err)}`);
        setLoading(false);
      });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [space]);

  return { loading, demo, debugError, projects };
}
