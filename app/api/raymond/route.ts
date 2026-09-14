import { NextRequest, NextResponse } from "next/server";
import { homeUser, homeProject, homeAlerts, homeTasks, homeBudget, proUser, proStats, proAlerts, proClients, promoteurUser, promoteurStats, promoteurAlerts, promoteurOperations } from "@/lib/mock-data";
import { rules } from "@/lib/rules";

export const runtime = "nodejs";
type SpaceKey = "home" | "pro" | "promoteur";

function buildContext(space: SpaceKey): { persona: string; data: string } {
  if (space === "home") {
    return {
      persona: `Tu es Raymond, le copilote de Project X Home pour un particulier qui fait construire sa maison. Utilisateur : ${homeUser.firstName}. Ton chaleureux, rassurant, jamais anxiogène, concret. Appuie-toi sur le référentiel des règles Opéris quand c'est pertinent, en citant leur id (ex. "règle admin-05").`,
      data: JSON.stringify({ projet: homeProject, budget: homeBudget, alertes: homeAlerts, taches: homeTasks, reglesOperis: rules }),
    };
  }
  if (space === "pro") {
    return {
      persona: `Tu es Raymond, le copilote de Project X Pro pour un constructeur qui pilote plusieurs chantiers. Utilisateur : ${proUser.firstName}. Ton direct, orienté action, protège la marge et les délais.`,
      data: JSON.stringify({ stats: proStats, alertes: proAlerts, clients: proClients }),
    };
  }
  return {
    persona: `Tu es Raymond, le copilote de Project X Promoteur — un directeur d'opération augmenté. Utilisateur : ${promoteurUser.firstName}. Ton stratégique, orienté trésorerie, risques et marge.`,
    data: JSON.stringify({ stats: promoteurStats, alertes: promoteurAlerts, operations: promoteurOperations }),
  };
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const body = await req.json().catch(() => null);
  const message: string | undefined = body?.message;
  const space: SpaceKey = body?.space === "pro" || body?.space === "promoteur" ? body.space : "home";
  if (!message) return NextResponse.json({ error: "message manquant" }, { status: 400 });
  if (!apiKey) return NextResponse.json({ reply: "Raymond n'est pas encore branché — ajoute ANTHROPIC_API_KEY dans les variables d'environnement Vercel." });

  const { persona, data } = buildContext(space);
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6", max_tokens: 500,
        system: `${persona}\n\nDonnées actuelles du dossier (JSON) — appuie-toi dessus sans inventer de chiffres :\n${data}\n\nRéponds en français, concis, concret et actionnable.`,
        messages: [{ role: "user", content: message }],
      }),
    });
    if (!response.ok) return NextResponse.json({ reply: "Raymond n'est pas encore disponible pour le moment — reviens un peu plus tard." }, { status: 200 });
    const dataResp = await response.json();
    const reply = dataResp.content?.map((c: { type: string; text?: string }) => (c.type === "text" ? c.text : "")).join("\n") ?? "Raymond n'a pas pu formuler de réponse.";
    return NextResponse.json({ reply });
  } catch { return NextResponse.json({ reply: "Raymond est momentanément indisponible — réessaie dans un instant." }, { status: 200 }); }
}
