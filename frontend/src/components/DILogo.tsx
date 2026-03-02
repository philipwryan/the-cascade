interface DILogoProps {
  size?: number;
  className?: string;
}

/** Digital Innovations logo mark — rendered from official brand asset. */
export function DILogo({ size = 32, className = '' }: DILogoProps) {
  return (
    <img
      src="/di-logo-mark.png"
      alt="Digital Innovations"
      width={size}
      height={size}
      style={{ objectFit: 'contain', display: 'inline-block' }}
      className={className}
    />
  );
}
