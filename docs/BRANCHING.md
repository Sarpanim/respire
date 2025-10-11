# Stratégie de branches

Cette documentation accompagne la consolidation de la branche **core-stable** et précise comment préparer les modules futurs sans mélanger les responsabilités.

## 1. Branche `core-stable`

Contenu autorisé :

- Authentification (Google OAuth Supabase, session SSR, contexte client).
- Internationalisation et navigation localisée.
- Layout global (header, switcher de langue, panneau d’auth).
- Domaine cours : pages, composants UI, helpers Supabase (`courses`, `lessons`).
- Seeds multilingues liés à ce domaine (`coreSeedData`).

Toute logique additionnelle (facturation, administration avancée, ambiances, etc.) doit être exclue de cette branche.

## 2. Branches modules

Créer des branches dédiées depuis `core-stable` :

```bash
git checkout core-stable
# Facturation
git checkout -b billing
# Administration
git checkout core-stable
git checkout -b admin
```

Chaque branche peut ensuite ajouter ses propres répertoires (`src/lib/billing`, `src/app/admin`, seeds supplémentaires, migrations Supabase, etc.) sans impacter le socle.

## 3. Checkpoints fréquents

- Valider les lint/build avant chaque merge.
- Rebaser régulièrement `billing` et `admin` sur `core-stable` pour récupérer les mises à jour du socle.
- Utiliser `git tag` pour marquer les versions stables avant des ajouts majeurs.

## 4. Revenir en arrière

En cas de suppression accidentelle de fichiers du socle :

```bash
git checkout core-stable -- <chemin/du/fichier>
```

ou annuler le commit fautif :

```bash
git revert <sha>
```

Ainsi, la base reste propre et prête à accueillir les modules futurs sans dette technique.
