'use client';

import { useMemo, useState } from 'react';
import type { FormEvent } from 'react';

import { ThemeColorPicker } from '@/components/ThemeColorPicker';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { createBrowserClient } from '@/lib/supabase-browser';
import {
  DEFAULT_THEME_TOKENS,
  ThemeTokens,
  ThemeTokensInput,
  normalizeThemeTokens,
} from '@/lib/theme-tokens';
import { cn } from '@/lib/utils';

type AdminTheme = {
  id: string;
  name: string;
  is_active: boolean;
  tokens: ThemeTokensInput | null;
};

type ThemeAdminPanelProps = {
  initialThemes: AdminTheme[];
  initialError?: string | null;
};

type EditorState = {
  open: boolean;
  theme: AdminTheme | null;
  name: string;
  tokensText: string;
  error: string | null;
  saving: boolean;
  initialTokens: ThemeTokens;
};

type ColorTokenKey = keyof typeof DEFAULT_THEME_TOKENS.colors;

const COLOR_FIELDS: Array<{ key: ColorTokenKey; label: string }> = [
  { key: 'primary', label: 'Primaire' },
  { key: 'primaryDark', label: 'Primaire (survol)' },
  { key: 'primaryForeground', label: 'Texte principal' },
  { key: 'background', label: 'Arrière-plan' },
  { key: 'foreground', label: 'Texte' },
  { key: 'accent', label: 'Accent' },
];

const PREVIEW_FIELDS: ColorTokenKey[] = ['primary', 'background', 'foreground'];

function stringifyTokens(tokens: ThemeTokens): string {
  return JSON.stringify(tokens, null, 2);
}

function parseTokensOrNull(value: string): ThemeTokens | null {
  try {
    const parsed = JSON.parse(value) as ThemeTokensInput | ThemeTokens;
    return normalizeThemeTokens(parsed);
  } catch (error) {
    return null;
  }
}

function toEditableName(name: string) {
  return name || 'Thème sans titre';
}

function getColorValue(theme: AdminTheme, key: ColorTokenKey): string {
  const normalized = normalizeThemeTokens(theme.tokens ?? undefined);
  return normalized.colors[key];
}

export default function ThemeAdminPanel({ initialThemes, initialError }: ThemeAdminPanelProps) {
  const [themes, setThemes] = useState<AdminTheme[]>(initialThemes);
  const [feedback, setFeedback] = useState<string | null>(initialError ?? null);
  const [activatingId, setActivatingId] = useState<string | null>(null);
  const [editor, setEditor] = useState<EditorState>({
    open: false,
    theme: null,
    name: '',
    tokensText: stringifyTokens(DEFAULT_THEME_TOKENS),
    error: null,
    saving: false,
    initialTokens: DEFAULT_THEME_TOKENS,
  });

  const parsedEditorTokens = useMemo(() => parseTokensOrNull(editor.tokensText), [editor.tokensText]);

  const handleActivate = async (themeId: string) => {
    setFeedback(null);
    setActivatingId(themeId);

    try {
      const supabase = createBrowserClient();

      const deactivate = await supabase.from('themes').update({ is_active: false }).neq('id', themeId);

      if (deactivate.error) {
        throw deactivate.error;
      }

      const activate = await supabase.from('themes').update({ is_active: true }).eq('id', themeId).select('id');

      if (activate.error) {
        throw activate.error;
      }

      setThemes((previous) =>
        previous.map((theme) => ({
          ...theme,
          is_active: theme.id === themeId,
        }))
      );

      setFeedback('Thème activé avec succès.');
    } catch (error) {
      console.error('Failed to activate theme', error);
      setFeedback("Impossible d’activer le thème. Veuillez réessayer.");
    } finally {
      setActivatingId(null);
    }
  };

  const openEditor = (theme: AdminTheme) => {
    const normalized = normalizeThemeTokens(theme.tokens ?? undefined);

    setEditor({
      open: true,
      theme,
      name: toEditableName(theme.name),
      tokensText: stringifyTokens(normalized),
      error: null,
      saving: false,
      initialTokens: normalized,
    });
  };

  const closeEditor = () => {
    setEditor((previous) => ({
      ...previous,
      open: false,
      theme: null,
    }));
  };

  const handleEditorNameChange = (value: string) => {
    setEditor((previous) => ({ ...previous, name: value }));
  };

  const handleTokensTextChange = (value: string) => {
    setEditor((previous) => ({ ...previous, tokensText: value }));
  };

  const handleColorChange = (key: ColorTokenKey, nextColor: string) => {
    setEditor((previous) => {
      const parsed = parseTokensOrNull(previous.tokensText) ?? previous.initialTokens;
      const next = normalizeThemeTokens({
        ...parsed,
        colors: {
          ...parsed.colors,
          [key]: nextColor,
        },
      });

      return {
        ...previous,
        tokensText: stringifyTokens(next),
        error: null,
      };
    });
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editor.theme) {
      return;
    }

    const parsed = parseTokensOrNull(editor.tokensText);

    if (!parsed) {
      setEditor((previous) => ({
        ...previous,
        error: 'Le JSON des tokens est invalide. Veuillez vérifier la syntaxe.',
      }));
      return;
    }

    const supabase = createBrowserClient();

    setEditor((previous) => ({ ...previous, saving: true, error: null }));
    setFeedback(null);

    try {
      const trimmedName = editor.name.trim() || editor.theme.name || 'Thème';
      const { data, error } = await supabase
        .from('themes')
        .update({ name: trimmedName, tokens: parsed })
        .eq('id', editor.theme.id)
        .select('id, name, is_active, tokens')
        .single();

      if (error) {
        throw error;
      }

      setThemes((previous) =>
        previous.map((theme) =>
          theme.id === editor.theme?.id
            ? {
                id: data.id,
                name: data.name ?? trimmedName,
                is_active: Boolean(data.is_active),
                tokens: (data.tokens as ThemeTokensInput | null) ?? parsed,
              }
            : theme
        )
      );

      setEditor((previous) => ({
        ...previous,
        open: false,
        theme: null,
        saving: false,
      }));

      setFeedback('Le thème a été mis à jour.');
    } catch (error) {
      console.error('Failed to update theme tokens', error);
      setEditor((previous) => ({
        ...previous,
        saving: false,
        error: "Impossible d’enregistrer les modifications. Veuillez réessayer.",
      }));
    }
  };

  return (
    <div className="space-y-8">
      {feedback ? (
        <p className="rounded-lg border border-border bg-card/60 px-4 py-3 text-sm text-muted-foreground">{feedback}</p>
      ) : null}

      <div className="overflow-hidden rounded-2xl border border-border bg-card/70 shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Actif</TableHead>
              <TableHead>Couleurs</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {themes.map((theme) => (
              <TableRow key={theme.id} className={cn(theme.is_active && 'bg-primary/5')}>
                <TableCell className="font-medium text-foreground">{theme.name}</TableCell>
                <TableCell>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                    <input
                      type="radio"
                      name="active-theme"
                      className="h-4 w-4 cursor-pointer accent-primary"
                      checked={theme.is_active}
                      onChange={() => handleActivate(theme.id)}
                      disabled={activatingId !== null}
                    />
                    {theme.is_active ? 'Actif' : 'Inactif'}
                  </label>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {PREVIEW_FIELDS.map((token) => {
                      const color = getColorValue(theme, token);
                      return (
                        <span
                          key={`${theme.id}-${token}`}
                          className="h-8 w-8 rounded-md border border-border shadow-sm"
                          style={{ backgroundColor: color }}
                          title={`${token} – ${color}`}
                        />
                      );
                    })}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm" onClick={() => openEditor(theme)}>
                    Éditer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>Activez un thème pour mettre à jour instantanément les couleurs de l’application.</TableCaption>
        </Table>
      </div>

      <Dialog open={editor.open} onOpenChange={(open) => (open ? editor.theme && openEditor(editor.theme) : closeEditor())}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier le thème</DialogTitle>
            <DialogDescription>
              Ajustez les couleurs principales ou modifiez directement le JSON des tokens pour personnaliser le thème.
            </DialogDescription>
          </DialogHeader>

          <form className="mt-6 space-y-6" onSubmit={handleSave}>
            <div className="space-y-2">
              <Label htmlFor="theme-name">Nom du thème</Label>
              <Input
                id="theme-name"
                value={editor.name}
                onChange={(event) => handleEditorNameChange(event.target.value)}
                placeholder="Nom du thème"
                disabled={editor.saving}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {COLOR_FIELDS.map(({ key, label }) => (
                <ThemeColorPicker
                  key={key}
                  label={label}
                  value={parsedEditorTokens?.colors?.[key] ?? editor.initialTokens.colors[key]}
                  onChange={(color) => handleColorChange(key, color)}
                />
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme-json">Tokens JSON</Label>
              <Textarea
                id="theme-json"
                value={editor.tokensText}
                onChange={(event) => handleTokensTextChange(event.target.value)}
                spellCheck={false}
                rows={12}
                disabled={editor.saving}
              />
              <p className="text-xs text-muted-foreground">
                Les modifications manuelles sont appliquées telles quelles. Veillez à fournir un objet JSON valide respectant la structure des tokens.
              </p>
              {editor.error ? <p className="text-sm text-primary">{editor.error}</p> : null}
            </div>

            <DialogFooter>
              <Button type="button" variant="ghost" onClick={closeEditor} disabled={editor.saving}>
                Annuler
              </Button>
              <Button type="submit" disabled={editor.saving}>
                {editor.saving ? 'Enregistrement…' : 'Enregistrer'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
