# Project X — MVP commercial (Home / Pro / Promoteur)

Nom temporaire en attendant validation juridique du nom définitif.

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvre http://localhost:3000 — un écran de sélection permet de basculer entre les 3 espaces :
- `/home` — particulier
- `/pro` — constructeur
- `/promoteur` — promoteur

Toutes les pages fonctionnent immédiatement avec des **données de démonstration réalistes** (`lib/mock-data.ts`) — idéal pour un rendez-vous client, avant même de brancher Supabase.

## Brancher Supabase (auth + données réelles)

1. Créer un projet sur supabase.com.
2. SQL Editor → coller `lib/supabase/schema.sql` → Run.
3. Copier `.env.local.example` en `.env.local` et renseigner `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings > API).
4. Redémarrer `npm run dev` — l'app est alors prête à utiliser l'authentification Supabase réelle (le câblage des formulaires de connexion et le remplacement des données de démo par de vraies requêtes reste à faire page par page, en s'appuyant sur `lib/supabase/client.ts`).

## Déploiement

Le plus simple : connecter le repo à **Vercel**, ajouter les deux variables d'environnement ci-dessus dans les settings du projet Vercel, déployer.

## Authentification réelle

Une page `/login` commune permet de choisir un espace puis de se connecter/créer un compte via Supabase Auth. Tant que `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` ne sont pas renseignées, l'app reste en mode démo (accès libre, sans vraie auth) pour continuer à faire des démonstrations. Dès que ces variables sont ajoutées (localement dans `.env.local`, et sur Vercel dans Environment Variables), chaque espace (`/home`, `/pro`, `/promoteur`) exige une session valide — sinon redirection automatique vers `/login`.

## Paiement

Pas encore branché dans le code — deux options :
1. **Rapide, sans code** : créer des Payment Links Stripe (dashboard Stripe, 5 min) pour chaque offre, et les poser en bouton sur les pages concernées.
2. **Intégré** : Stripe Checkout via une route API Next.js (`app/api/checkout/route.ts` à créer), avec un webhook qui active l'accès du client automatiquement à la confirmation du paiement. Recommandé une fois les 3 espaces stabilisés — dites-le pour que ce soit ajouté au même rythme que Raymond et l'authentification.

## Mobile

Le menu latéral passe en tiroir (bouton ☰) sur les écrans étroits, et la barre Raymond s'adapte à la largeur de l'écran.

## Raymond

Raymond est branché sur l'API Anthropic via la route serveur `app/api/raymond/route.ts` — il répond en s'appuyant sur les données de démo de chaque espace (`lib/mock-data.ts`).

**Pour l'activer :**
1. Créer un compte sur console.anthropic.com et générer une clé API ("API Keys" → "Create Key").
2. En local : ajouter `ANTHROPIC_API_KEY=ta_clé` dans `.env.local`.
3. Sur Vercel : Project Settings → Environment Variables → ajouter `ANTHROPIC_API_KEY` avec la même valeur → redéployer.

Tant que la clé n'est pas renseignée, Raymond répond avec un message expliquant qu'il n'est pas encore branché (pas d'erreur bloquante).

Étape suivante recommandée : remplacer les données de démo passées en contexte par de vraies requêtes Supabase, pour que Raymond réponde sur les projets réels de chaque client.

## Prochaines étapes techniques recommandées
1. Remplacer les tableaux `lib/mock-data.ts` par des requêtes Supabase (`lib/supabase/client.ts` déjà prêt).
2. Stripe Checkout intégré (au-delà des Payment Links) pour l'activation automatique des comptes payants.
3. Étendre le contexte transmis à Raymond avec les vraies données Supabase.
