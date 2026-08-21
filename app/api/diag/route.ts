import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const FALLBACK_URL = "https://yagjecmlxukjchdiwgan.supabase.co";
const FALLBACK_ANON_KEY = "sb_publishable_9mp1XQ9Oi5OA0dqj2JZiCA_9q8SX-Qa";

export async function GET() {
  const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? null;
  const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? null;
  const anthropicKeyPresent = Boolean(process.env.ANTHROPIC_API_KEY);

  const usedUrl = envUrl || FALLBACK_URL;
  const usedKey = envKey || FALLBACK_ANON_KEY;

  let supabaseReachable = false;
  let supabaseError: string | null = null;
  let profilesCount: number | null = null;
  let profilesError: string | null = null;

  try {
    const client = createClient(usedUrl, usedKey);
    const { error, count } = await client.from("profiles").select("*", { count: "exact", head: true });
    if (error) {
      profilesError = error.message;
    } else {
      supabaseReachable = true;
      profilesCount = count;
    }
  } catch (err) {
    supabaseError = err instanceof Error ? err.message : String(err);
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    env_vars: {
      NEXT_PUBLIC_SUPABASE_URL_present: Boolean(envUrl),
      NEXT_PUBLIC_SUPABASE_URL_preview: envUrl ? envUrl.slice(0, 25) + "…" : null,
      NEXT_PUBLIC_SUPABASE_ANON_KEY_present: Boolean(envKey),
      ANTHROPIC_API_KEY_present: anthropicKeyPresent,
    },
    fallback_used: {
      url: !envUrl,
      key: !envKey,
    },
    supabase_test: {
      reachable: supabaseReachable,
      connection_error: supabaseError,
      profiles_query_error: profilesError,
      profiles_count: profilesCount,
    },
  });
}
