// components/Badge.tsx
'use client';

import React from 'react';

export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/90 shadow-soft backdrop-blur">
      {/* چراغ سبز ملایم */}
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-70 animate-ping [animation-duration:1800ms]" />
        <span className="relative h-2 w-2 rounded-full bg-green-400" />
      </span>
      <span>{children}</span>
    </span>
  );
}
