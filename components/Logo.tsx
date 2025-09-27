export default function Logo({
  size = 22,
  withText = false,
}: {
  size?: number;
  withText?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="block"
      >
        <defs>
          <linearGradient id="rg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#60adff" />
            <stop offset=".55" stopColor="#a855f7" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="44" height="44" rx="12" fill="url(#rg)" />
        {/* learner L */}
        <rect x="7" y="8" width="11" height="11" rx="2" fill="#fff" />
        <path d="M11 10v7h4" stroke="#ef4444" strokeWidth="2.4" fill="none" />
        {/* simple car */}
        <path
          d="M18 26c0-5 3-8 10-8s10 3 10 8v5a2 2 0 0 1-2 2h-3a3 3 0 0 1-3-3h-4a3 3 0 0 1-3 3h-3a2 2 0 0 1-2-2v-5Z"
          fill="#fff"
          opacity=".9"
        />
      </svg>
      {withText && (
        <span className="font-semibold tracking-tight text-sm sm:text-[0.95rem]">
          Ranandeh
        </span>
      )}
    </span>
  );
}
