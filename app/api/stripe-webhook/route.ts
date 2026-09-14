import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";
// Webhook Stripe — pas encore actif. Pour l'activer :
// 1. npm install stripe
// 2. Ajouter STRIPE_SECRET_KEY et STRIPE_WEBHOOK_SECRET en variables d'environnement
// 3. Dashboard Stripe > Developers > Webhooks > Add endpoint > /api/stripe-webhook > checkout.session.completed
export async function POST(req: NextRequest) {
  const configured = Boolean(process.env.STRIPE_WEBHOOK_SECRET);
  if (!configured) return NextResponse.json({ received: false, reason: "STRIPE_WEBHOOK_SECRET non configuré" }, { status: 200 });
  await req.text();
  return NextResponse.json({ received: true, note: "logique de traitement à implémenter" });
}
