interface AtheoMarkProps {
  className?: string;
  size?: number;
}

/**
 * The Atheo symbol: a coral-to-apricot hook crossed by a rising, curl-tipped
 * stroke. Isolated in its own file so a real vector export can replace the
 * <path> data here without touching AtheoLogo or any page markup.
 */
export function AtheoMark({ className, size = 32 }: AtheoMarkProps) {
  return (
    <svg
      viewBox="-15 -10 220 210"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="atheo-mark-gradient" x1="5" y1="178" x2="188" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--atheo-coral)" />
          <stop offset="100%" stopColor="var(--atheo-apricot)" />
        </linearGradient>
      </defs>
      <path
        d="M 8 175
          C -8 130, 8 78, 45 58
          C 72 44, 98 55, 98 82
          C 98 100, 85 112, 68 108
          C 58 105, 55 95, 62 88"
        fill="none"
        stroke="url(#atheo-mark-gradient)"
        strokeWidth={15}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M 72 178
          C 78 148, 85 118, 98 95
          C 118 62, 142 38, 163 22
          C 172 15, 178 6, 170 1
          C 165 -2, 158 2, 160 9"
        fill="none"
        stroke="url(#atheo-mark-gradient)"
        strokeWidth={15}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
