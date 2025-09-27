'use client';
import React from 'react';

type Props = React.PropsWithChildren<{
  className?: string;
}>;

/** کارت شیشه‌ای با هاله گرادیانی و بلور */
export default function GlassCard({ className = '', children }: Props) {
  return (
    <div
      className={
        [
          // بدنه شیشه‌ای
          'relative rounded-2xl border border-white/10',
          'bg-white/50 dark:bg-black/30 backdrop-blur-xl',
          'shadow-[0_18px_50px_rgba(0,0,0,.35)]',
          'ring-1 ring-white/10',
          className,
        ].join(' ')
      }
    >
      {/* لایه گرادیان ملایم */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-80 -z-10
                   bg-[radial-gradient(60%_120%_at_20%_0%,#7c3aed22_0%,transparent_35%),radial-gradient(60%_120%_at_80%_100%,#06b6d422_0%,transparent_35%),linear-gradient(90deg,#4f46e522_0%,#06b6d422_100%)]"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
