interface CubeLogoProps {
  size?: number;
  className?: string;
}

export function CubeLogo({ size = 32, className = '' }: CubeLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      {/* Top face — white */}
      <polygon points="20,4 36,12 20,20 4,12" fill="white" />
      {/* Left face — Toyota red */}
      <polygon points="4,12 20,20 20,36 4,28" fill="#EB0A1E" />
      {/* Right face — dark red */}
      <polygon points="36,12 20,20 20,36 36,28" fill="#9B0613" />
    </svg>
  );
}
