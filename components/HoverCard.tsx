'use client';
import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType; // ⬅️ به‌جای keyof JSX.IntrinsicElements
};

/**
 * باکس شیشه‌ای + هاله گرادیانی
 */
export default function HoverCard({ className = '', children, as: Tag = 'div' }: Props) {
  return (
    <Tag
      className={[
        'group relative overflow-hidden rounded-2xl',
        'border border-white/10 bg-white/5 dark:bg-black/30',
        'backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,.25)]',
        'transition-all duration-300',
        className,
      ].join(' ')}
    >
      {/* هاله گرادیانی */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-30 blur-xl transition-opacity duration-300 group-hover:opacity-60"
        style={{
          background:
            'conic-gradient(from 180deg at 50% 50%, #1f92ff, #a855f7, #22d3ee, #1f92ff)',
        }}
      />
      {/* محتوا */}
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
