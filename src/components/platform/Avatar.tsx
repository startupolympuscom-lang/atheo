interface AvatarProps {
  url: string | null;
  initials: string;
  size?: number;
  className?: string;
}

export function Avatar({ url, initials, size = 32, className = "" }: AvatarProps) {
  if (url) {
    return (
      // Data-URL avatar from a local upload — next/image doesn't add value here.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt=""
        className={`rounded-full object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-atheo-coral to-atheo-apricot font-display font-bold text-atheo-white ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </span>
  );
}
