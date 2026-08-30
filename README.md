# Project X — MVP commercial (Home / Pro / Promoteur)

Nom temporaire en attendant validation juridique du nom définitif.

## Démarrer en local
```bash
npm install
npm run dev
```
Ouvre http://localhost:3000 — écran de sélection entre les 3 espaces (Home, Pro, Promoteur), tous fonctionnels immédiatement en données de démonstration.

## Brancher Supabase
1. Créer un projet sur supabase.com.
2. SQL Editor → coller `lib/supabase/schema.sql` → Run (rejouable sans risque).
3. Renseigner `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` (localement dans `.env.local`, sur Vercel dans Environment Variables).
4. Ces deux valeurs ont aussi un secours en dur dans `lib/supabase/client.ts` (clé publique par conception) — l'app reste fonctionnelle même si les variables d'environnement ne remontent pas correctement.

## Authentification réelle
Page `/login?espace=home|pro|promoteur` : espace pré-sélectionné depuis l'accueil (fallback sur les 3 bandeaux si accès direct sans paramètre). Dès qu'un compte se connecte sur Home, son projet + 11 étapes + alertes + documents de départ sont créés automatiquement en base.

## Raymond
Route serveur `app/api/raymond/route.ts`, clé `ANTHROPIC_API_KEY` (Vercel Environment Variables). Reçoit en contexte les données du projet et les 50 règles Opéris (`lib/rules.ts`). Message d'attente propre tant que la clé n'est pas créditée.

## Paiement
Liens Stripe en mode test dans `lib/stripe-links.ts`. Basculer en mode "live" sur le dashboard Stripe puis remplacer les URLs pour encaisser réellement.

## Règles Opéris
`lib/rules.ts` centralise les 50 règles métier (Terrain/Administratif/Financement/Construction/Livraison), chacune avec formulation négative (le risque), positive (une fois traité), niveau d'alerte et conseil du fondateur. Intégrées de façon interactive (cartes "C'est fait / Pas encore") dans Planning (Home) et Chantiers (Pro), pas comme menu séparé.

## Diagnostic
Route `app/api/diag` : vérifie côté serveur si les variables d'environnement sont vues et si Supabase répond, sans dépendre du rendu navigateur.

## Prochaines étapes recommandées
1. Webhook Stripe pour activation automatique des droits.
2. Étendre la persistance Supabase aux espaces Pro et Promoteur (actuellement seul Home est branché).
3. Onboarding et gestion de mot de passe oublié.
