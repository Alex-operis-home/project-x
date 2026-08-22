"use client";
import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export function useDisplayName(fallback: string): string {
  const [name, setName] = useState(fallback);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return; // mode démo : garde le nom fictif
    supabase.auth.getUser().then(({ data }) => {
      const fullName = data.user?.user_metadata?.full_name as string | undefined;
      const firstName = fullName?.split(" ")[0];
      if (firstName) setName(firstName);
      else if (data.user?.email) setName(data.user.email.split("@")[0]);
    });
  }, [fallback]);

  return name;
}
