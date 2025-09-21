"use client";

import React from 'react';

export type SectionProps = {
  id?: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
  role?: string;
  ariaLabel?: string;
};

export default function Section({ id, as = 'section', className, children, role, ariaLabel }: SectionProps) {
  const Tag = as as any;
  return (
    <Tag id={id} className={className} role={role} aria-label={ariaLabel}>
      {children}
    </Tag>
  );
}
