# Respire – Application de méditation

Respire est un MVP construit avec Next.js 14, TailwindCSS et Supabase pour proposer des séances de méditation simples, un lecteur audio avec reprise et une authentification par lien magique.

## 🚀 Fonctionnalités clés

- Authentification Supabase via Magic Link (`supabase.auth.signInWithOtp`).
- Middleware qui rafraîchit la session et protège l’accès au tableau de bord.
- Catalogue d’au moins 9 cours avec filtres catégorie/niveau et pages de détail.
- Lecteur audio HTML5 qui mémorise la progression dans `localStorage` par cours.
- Design mobile-first avec Tailwind et composants accessibles (focus visible, aria label sur le player).

## 🛠️ Prérequis

- Node.js 18 ou supérieur.
- npm (inclus avec Node.js).
- Un projet Supabase configuré avec les redirections `http://localhost:3000/auth/callback` et `https://<votre-domaine>/auth/callback`.

## ⚙️ Variables d’environnement

Créer un fichier `.env.local` (non versionné) et y placer :

```bash
NEXT_PUBLIC_SUPABASE_URL=VotreURLSupabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=VotreCléAnonyme
```

Ces variables sont nécessaires pour l’authentification côté client et côté serveur.

## 📦 Installation locale

1. Installer les dépendances :

   ```bash
   npm install
   ```

2. Lancer le serveur de développement :

   ```bash
   npm run dev
   ```

   L’application est disponible sur [http://localhost:3000](http://localhost:3000).

3. Exécuter l’analyse statique :

   ```bash
   npm run lint
   ```

## 📁 Structure principale

```
app/
  layout.tsx             # Layout racine + Header
  page.tsx               # Page d’accueil
  (auth)/login/          # Page de connexion
  (auth)/auth/callback/  # Route de callback Supabase
  dashboard/             # Page protégée SSR
  courses/               # Catalogue et page de détail
  data/courses.ts        # Dataset local (MVP)
components/              # Header, cartes, lecteur audio, filtres
lib/                     # Clients Supabase + actions serveur
middleware.ts            # Protection /dashboard + refresh session
```

## 🔐 Parcours d’authentification

1. L’utilisateur saisit son e-mail sur `/login`.
2. Supabase envoie un lien magique redirigeant vers `/auth/callback`.
3. La route échange le code contre une session et redirige vers `/dashboard`.
4. Le middleware vérifie la session sur chaque visite du tableau de bord.
5. Le bouton « Se déconnecter » appelle un server action qui termine la session et renvoie vers l’accueil.

## 🎧 Lecteur audio avec reprise

- Composant `AudioPlayer` enregistré dans `components/AudioPlayer.tsx`.
- À chaque `timeupdate`, la progression est sauvegardée via `localStorage` (`course:<slug>:progress`).
- À la fin de la lecture (`ended`), la progression est effacée.

## 📚 Allers plus loin

- Remplacer le dataset local par une table `courses` dans Supabase (SQL fourni dans le cahier des charges).
- Ajouter des tests end-to-end (Playwright) et un design system.
- Connecter un stockage Supabase pour héberger les fichiers audio.

## 💳 Billing & Admin

Une base de données orientée facturation est disponible pour préparer l’espace d’administration sans impacter l’interface :

- Migration SQL : `supabase/migrations/20240601090000_billing_admin.sql` crée les tables `profiles`, `plans`, `subscriptions`, `app_settings` et `audit_logs`, ainsi que les fonctions `is_admin` et `get_active_subscription`.
- RLS : chaque table est protégée (lecture propriétaire, rôles admin via `is_admin()`, service role pour les automatisations).
- Seed : deux plans factices (mensuel et annuel) sont insérés de manière idempotente.

### Variables d’environnement supplémentaires

Pour l’Edge Function Stripe, configurez les secrets suivants côté Supabase :

```
STRIPE_API_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
```

Dans l’application Next.js, exposez la cible du webhook si besoin :

```
NEXT_PUBLIC_SUPABASE_FUNCTION_URL=https://<project>.functions.supabase.co/stripe-webhook
```

### Commandes utiles

- Appliquer la migration : `npm run db:migrate` (alias de `supabase db push`).
- Déployer l’Edge Function : `npm run fn:deploy` (alias de `supabase functions deploy stripe-webhook`).

Le webhook Stripe est servi via Supabase (`supabase/functions/stripe-webhook`). La route Next.js `/api/stripe/webhook` répond `410 Gone` et documente l’URL cible pour les intégrations externes.

### Promouvoir un administrateur

Une fois un utilisateur créé, connectez-vous à Supabase (SQL Editor) et exécutez :

```sql
update public.profiles set role = 'admin' where user_id = '<uuid>'; 
```

Les administrateurs disposent d’un accès lecture/écriture sur les nouvelles tables et pourront consommer les helpers `lib/billing.ts` (`getUserSubscription`, `requireActiveSub`).

## ✅ Définition de Done du MVP

- Pages `/`, `/login`, `/dashboard`, `/courses`, `/courses/[slug]` disponibles.
- Authentification fonctionnelle avec Supabase (login/logout/callback).
- Filtres et lecteur audio opérationnels.
- README à jour (vous y êtes !).

Bonnes séances de méditation ✨
