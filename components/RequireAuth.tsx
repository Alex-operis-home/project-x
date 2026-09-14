"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push("/login"); else setReady(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => { if (!session) router.push("/login"); });
    return () => listener.subscription.unsubscribe();
  }, [router]);
  if (!ready) return null;
  return <>{children}</>;
}
