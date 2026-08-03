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

## Raymond

L'assistant "Raymond" est câblé en façade (barre flottante + page dédiée par espace) avec des réponses de démonstration. Pour le rendre réellement intelligent, brancher un appel serveur (route API Next.js `app/api/raymond/route.ts` à créer) vers l'API Anthropic, en lui donnant en contexte les données du projet/chantier/opération concerné.

## Prochaines étapes techniques recommandées
1. Authentification réelle (pages de connexion à créer par espace, sur le modèle Supabase Auth).
2. Remplacer les tableaux `lib/mock-data.ts` par des requêtes Supabase (`lib/supabase/client.ts` déjà prêt).
3. Paiement : Stripe Checkout ou Payment Links pour encaisser rapidement en attendant l'intégration complète.
4. Route API `Raymond` connectée à l'API Anthropic avec le contexte du projet en cours.
