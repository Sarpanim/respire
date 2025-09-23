import 'server-only';

import { createClient } from '@/lib/supabase-server';
import {
  DEFAULT_THEME_TOKENS,
  ThemeTokens,
  ThemeTokensInput,
  normalizeThemeTokens,
} from '@/lib/theme-tokens';

export async function fetchActiveThemeTokens(): Promise<ThemeTokens> {
  if (typeof window !== 'undefined') {
    throw new Error('fetchActiveThemeTokens must be executed on the server.');
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('themes')
      .select('tokens')
      .eq('is_active', true)
      .maybeSingle();

    if (error) {
      console.error('Failed to load the active theme from Supabase:', error);
      return DEFAULT_THEME_TOKENS;
    }

    const tokens = (data?.tokens ?? null) as ThemeTokensInput | null;

    if (tokens) {
      return normalizeThemeTokens(tokens);
    }
  } catch (error) {
    console.error('Unexpected error while loading the active theme:', error);
  }

  return DEFAULT_THEME_TOKENS;
}
