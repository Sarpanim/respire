'use client';

import { useId } from 'react';

import { cn } from '@/lib/utils';

const DEFAULT_PRESETS = [
  '#3A8DFF',
  '#6366F1',
  '#22C55E',
  '#F97316',
  '#EC4899',
  '#EAB308',
  '#0EA5E9',
  '#9333EA',
];

type ThemeColorPickerProps = {
  label: string;
  value?: string | null;
  onChange: (next: string) => void;
  presets?: string[];
};

function sanitizeColor(value?: string | null): string {
  if (typeof value === 'string') {
    const trimmed = value.trim();

    if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(trimmed)) {
      return trimmed;
    }
  }

  return '#000000';
}

function colorsEqual(a?: string | null, b?: string | null) {
  if (!a || !b) {
    return false;
  }

  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

export function ThemeColorPicker({ label, value, onChange, presets = DEFAULT_PRESETS }: ThemeColorPickerProps) {
  const inputId = useId();
  const colorInputValue = sanitizeColor(value);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={inputId} className="text-sm font-medium text-foreground">
          {label}
        </label>
        <span className="font-mono text-xs text-muted-foreground">{value ?? '—'}</span>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <input
          id={inputId}
          type="color"
          value={colorInputValue}
          onChange={(event) => onChange(event.target.value)}
          className="h-10 w-16 cursor-pointer overflow-hidden rounded-md border border-border bg-transparent p-0"
        />
        <div className="flex flex-wrap gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              type="button"
              aria-label={`Choisir la couleur ${preset}`}
              className={cn(
                'h-8 w-8 rounded-md border border-border shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                colorsEqual(value, preset) && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
              )}
              style={{ backgroundColor: preset }}
              onClick={() => onChange(preset)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
