interface AtheoMarkProps {
  className?: string;
  size?: number;
}

/**
 * The Atheo symbol: a single continuous coral-to-apricot stroke.
 * Isolated in its own file so a real vector export can replace the
 * <path> data here without touching AtheoLogo or any page markup.
 */
export function AtheoMark({ className, size = 32 }: AtheoMarkProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="atheo-mark-gradient" x1="12" y1="140" x2="168" y2="15" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--atheo-coral)" />
          <stop offset="100%" stopColor="var(--atheo-apricot)" />
        </linearGradient>
      </defs>
      <path
        d="M 22 138
          C 2 100, 8 58, 42 38
          C 78 18, 122 26, 132 60
          C 138 82, 122 100, 100 100
          C 84 100, 72 88, 80 76
          C 90 62, 112 68, 122 82
          C 130 94, 128 100, 132 88
          C 142 68, 154 48, 165 28
          C 168 21, 169 12, 160 10
          C 154 9, 149 13, 152 18"
        fill="none"
        stroke="url(#atheo-mark-gradient)"
        strokeWidth={14}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
