import React from 'react';
import type { ReactNode } from 'react';
import { renderSections, type RenderableSection } from './renderSections';

export type PageShellProps = {
  title?: string;
  description?: string;
  /** Declares the page's sections in order; each entry describes a slot/block. */
  sections?: RenderableSection[];
  /** Fallback children if no sections provided. */
  children?: ReactNode;
};

/**
 * Stable API: the page exports a data-only “sections” array and PageShell renders
 * them in order. Later we can swap a section’s implementation without touching
 * the page route file.
 */
export default function PageShell({ title, description, sections, children }: PageShellProps) {
  return (
    <>
      {/* meta could be handled with next/head in future */}
      <div className="sr-only">
        {title} {description}
      </div>
      <div>{sections && sections.length ? renderSections(sections) : children}</div>
    </>
  );
}
