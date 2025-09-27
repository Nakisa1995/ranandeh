// components/GreenBadge.tsx
export default function GreenBadge({ text }: { text: string }) {
  return (
    <div
      className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10
                 bg-white/5 dark:bg-black/20 px-2.5 py-0.5 text-[11px] text-foreground/80
                 shadow-sm backdrop-blur"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400"></span>
      </span>
      <span className="select-none">{text}</span>
    </div>
  );
}
