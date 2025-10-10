'use client';

import { useTheme } from '@/lib/theme';
import { colorThemeOptions } from '@/lib/theme-options';

export default function AdminThemeManager() {
  const { colorTheme, setColorTheme } = useTheme();

  return (
    <section className="space-y-6 p-6 sm:p-8">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-foreground">Thèmes de couleur</h2>
        <p className="text-sm text-muted-foreground">
          Harmonisez l&apos;interface en choisissant un accent unique ou un dégradé vibrant. Le thème sélectionné est
          appliqué instantanément à l&apos;ensemble du site.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {colorThemeOptions.map((option) => {
          const isActive = option.id === colorTheme;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setColorTheme(option.id)}
              className="group relative flex flex-col gap-4 rounded-2xl border border-border/60 bg-card/80 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-pressed={isActive}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-80 group-focus-visible:opacity-80"
                style={{
                  background:
                    option.swatch.length > 1
                      ? `linear-gradient(135deg, ${option.swatch[0]}, ${option.swatch[1]})`
                      : option.swatch[0],
                  mixBlendMode: 'screen',
                  filter: 'blur(30px)',
                }}
              />
              <div className="relative flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {option.tone === 'solid' ? 'Couleur pleine' : 'Dégradé'}
                  </span>
                  <p className="text-base font-semibold text-foreground">{option.label}</p>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-xl border border-border/70 bg-muted shadow-inner"
                >
                  <span
                    className="h-10 w-10 rounded-lg shadow-md"
                    style={{
                      background:
                        option.swatch.length > 1
                          ? `linear-gradient(135deg, ${option.swatch[0]}, ${option.swatch[1]})`
                          : option.swatch[0],
                    }}
                  />
                </span>
              </div>
              <span
                className="relative inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary"
              >
                {isActive ? 'Thème sélectionné' : 'Activer ce thème'}
                <span
                  className="h-2 w-2 rounded-full"
                  style={{
                    background:
                      option.swatch.length > 1
                        ? `linear-gradient(135deg, ${option.swatch[0]}, ${option.swatch[1]})`
                        : option.swatch[0],
                  }}
                />
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
