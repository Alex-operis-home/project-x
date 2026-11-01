import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const URL_ = "https://yagjecmlxukjchdiwgan.supabase.co";
const KEY_ = "sb_publishable_9mp1XQ9Oi5OA0dqj2JZiCA_9q8SX-Qa";
export async function GET() {
  let reachable = false, connErr: string | null = null, profErr: string | null = null, count: number | null = null;
  try {
    const client = createClient(URL_, KEY_);
    const { error, count: c } = await client.from("profiles").select("*", { count: "exact", head: true });
    if (error) profErr = error.message; else { reachable = true; count = c; }
  } catch (err) { connErr = err instanceof Error ? err.message : String(err); }
  return NextResponse.json({
    timestamp: new Date().toISOString(),
    anthropic_key_present: Boolean(process.env.ANTHROPIC_API_KEY),
    supabase_test: { reachable, connection_error: connErr, profiles_query_error: profErr, profiles_count: count },
  });
}
