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

Boutons Stripe déjà intégrés (`lib/stripe-links.ts`) : abonnement Home 29€/mois, forfait Home 299€, forfait Premium 349€ sur le dashboard Home ; ajout client 300€ sur le dashboard Pro. **Ces liens sont en mode test** (`buy.stripe.com/test_...`) — aucun paiement réel n'est débité. Pour encaisser réellement :
1. Basculer le compte Stripe en mode production (bouton "Activate account" / toggle Test-Live sur le dashboard Stripe), renseigner les infos légales/bancaires.
2. Recréer les mêmes Payment Links en mode "live" (même procédure).
3. Remplacer les URLs dans `lib/stripe-links.ts` par les nouveaux liens live.

Étape suivante recommandée pour aller plus loin : Stripe Checkout via une route API Next.js avec webhook, pour activer automatiquement le compte du client à la confirmation du paiement (au lieu d'une activation manuelle après réception du paiement via Payment Link).

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

## Mise à jour du schéma (11 étapes persistées)

Le fichier `lib/supabase/schema.sql` a été complété avec une table `project_steps`. Si Supabase est déjà branché, retourne dans le **SQL Editor** de ton projet Supabase et exécute à nouveau tout le fichier (il est écrit pour être rejoué sans risque — `create table if not exists`). Dès qu'un utilisateur se connecte sur l'espace Home, son projet et ses 11 étapes sont créés automatiquement en base s'ils n'existent pas encore.

## Prochaines étapes techniques recommandées
1. Remplacer les tableaux `lib/mock-data.ts` par des requêtes Supabase (`lib/supabase/client.ts` déjà prêt).
2. Stripe Checkout intégré (au-delà des Payment Links) pour l'activation automatique des comptes payants.
3. Étendre le contexte transmis à Raymond avec les vraies données Supabase.
