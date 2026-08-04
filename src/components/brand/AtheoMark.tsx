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
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="atheo-mark-gradient" x1="6" y1="10" x2="42" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--atheo-coral)" />
          <stop offset="100%" stopColor="var(--atheo-apricot)" />
        </linearGradient>
      </defs>
      <path
        d="M31 32.5
          c0 4.8-4.6 7.7-9.8 6.1
          c-6-1.8-9.5-7.4-7.6-12.2
          c1.7-4.3 6.6-6.4 11.3-4.9
          c3.8 1.3 5.9 4.7 4.6 7.7
          c-1.1 2.6-4.2 3.7-6.8 2.5
          c-2.1-.9-3.2-3.2-2.3-4.8"
        fill="none"
        stroke="url(#atheo-mark-gradient)"
        strokeWidth={3.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
