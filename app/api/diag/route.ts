import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Route de diagnostic PROTÉGÉE : invisible (404) sauf si DIAG_SECRET est défini
// dans Vercel ET fourni en paramètre : /api/diag?key=VOTRE_SECRET
export async function GET(req: NextRequest) {
  const secret = process.env.DIAG_SECRET;
  const key = req.nextUrl.searchParams.get("key");
  if (!secret || key !== secret) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let reachable = false;
  try {
    const client = createClient("https://yagjecmlxukjchdiwgan.supabase.co", "sb_publishable_9mp1XQ9Oi5OA0dqj2JZiCA_9q8SX-Qa");
    const { error } = await client.from("profiles").select("*", { count: "exact", head: true });
    reachable = !error;
  } catch { reachable = false; }
  return NextResponse.json({ timestamp: new Date().toISOString(), supabase_reachable: reachable, anthropic_key_present: Boolean(process.env.ANTHROPIC_API_KEY) });
}
