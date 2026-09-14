# Project X — MVP commercial (Home / Pro / Promoteur)
Nom temporaire en attendant validation juridique du nom définitif.

## Démarrer en local
npm install && npm run dev

## Supabase
SQL Editor > coller lib/supabase/schema.sql > Run. Clés déjà en dur dans lib/supabase/client.ts (publiques par conception).

## Raymond
ANTHROPIC_API_KEY dans Vercel Environment Variables.

## Paiement
Liens Stripe test dans lib/stripe-links.ts.

## Règles Opéris
lib/rules.ts — 50 règles, intégrées en cartes interactives (Planning Home, Chantiers Pro, Opérations Promoteur).

## Persistance
Home : un projet par utilisateur (lib/supabase/project.ts).
Pro / Promoteur : plusieurs projets par utilisateur (lib/supabase/portfolio.ts).
