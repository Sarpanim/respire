# Respire – Socle Next.js + Supabase

Respire fournit une base **Next.js 14 / TypeScript** connectée à **Supabase** avec gestion de session SSR, internationalisation et un premier domaine métier autour des cours et leçons. Cette branche vise une fondation "core-stable" : authentification Google, navigation localisée et CRUD Supabase pour les entités `courses` et `lessons`.

## 🚀 Fonctionnalités incluses dans `core-stable`

- Authentification Supabase via Google OAuth (client + serveur).
- Session partagée grâce à un `SessionContext` hydraté depuis le layout serveur.
- Internationalisation avec les locales prioritaires **fr → es → en** et redirection automatique vers le français.
- Layout global avec en-tête, sélecteur de langue et panneau d’authentification.
- Pages cours : liste, détail de cours et détail de leçon consommant le CRUD Supabase.
- Jeu de seeds multilingues pour initialiser les tables `course_categories`, `courses`, `course_sections`, `lessons` et `faq_items`.

## 📁 Structure principale

```
src/
  app/
    layout.tsx                    # Layout racine HTML
    page.tsx                      # Redirection vers la locale par défaut
    [locale]/                     # Pages localisées
      layout.tsx                  # Layout SSR + récupération de session
      page.tsx                    # Page d'accueil localisée
    auth/                         # Pages d'authentification génériques
    courses/                      # Domaine cours (liste/détail/lesson)
  components/
    layout/                       # Header, SessionProvider, language switcher
    courses/                      # CourseCard, CoursePlayer, LessonCard, navigation
    ui/                           # Panneau d’authentification
  context/SessionContext.tsx      # Contexte global de session
  lib/
    auth/                         # Actions d’authentification Supabase
    db/                           # CRUD Supabase (courses & lessons)
    navigation/                   # Helpers de routage localisé
    supabase/                     # Clients Supabase SSR/CSR
  data/
    locales/                      # Texte d'accueil par locale
    translations/                 # Seeds multilingues pour le domaine core
  types/index.ts                  # Types TypeScript globaux
```

## 🔐 Variables d'environnement

Fichier `.env.local` (non versionné) à créer à partir de `.env.local.example` :

```bash
SUPABASE_URL="https://wztdkcuigzpnphkwmjsx.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6dGRrY3VpZ3pwbnBoa3dtanN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMzM2MjEsImV4cCI6MjA3NTcwOTYyMX0.gHwdWxtInlWvioFtXMKFfryod1yulaYkDh5GPzqvL6Y"
NEXT_PUBLIC_SUPABASE_URL="https://wztdkcuigzpnphkwmjsx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6dGRrY3VpZ3pwbnBoa3dtanN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMzM2MjEsImV4cCI6MjA3NTcwOTYyMX0.gHwdWxtInlWvioFtXMKFfryod1yulaYkDh5GPzqvL6Y"
```

## 🛠️ Démarrage

```bash
npm install
npm run dev
# lint optionnel
npm run lint
```

## 🌐 Internationalisation

- `src/types/index.ts` définit l’ordre des locales `['fr', 'es', 'en']` avec le français par défaut.
- `src/components/layout/LanguageSwitcher.tsx` reconstruit l’URL courante avec la locale choisie.
- Les contenus textuels (homepage, seeds) utilisent des objets `LocalizedString` pour préparer l’import Supabase.

## 🗄️ Seeds multilingues

Les seeds "core" sont centralisés dans `src/data/translations/core.ts` et regroupés via `coreSeedData`. Ils peuvent être utilisés lors d’une migration initiale pour injecter les traductions dans les tables Supabase du domaine cours.

## 🌱 Stratégie de branches

- `core-stable` : branche de référence contenant **uniquement** l’auth, l’i18n, le layout/navigation et le CRUD `courses/lessons`.
- `billing` : branche dérivée pour ajouter la facturation (plans, promo codes, webhooks…).
- `admin` : branche dérivée pour l’interface et les paramètres d’administration.

> Astuce : créez la branche de base après ce commit stable
> ```bash
> git checkout -b core-stable
> git push origin core-stable
> ```
> puis ouvrez des branches `billing` et `admin` depuis `core-stable` pour isoler vos évolutions futures.

## 📄 Licence

Projet interne – adapter selon vos besoins.
