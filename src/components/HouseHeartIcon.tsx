export function HouseHeartIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect
        x="0.75"
        y="0.75"
        width="62.5"
        height="62.5"
        rx="13.5"
        fill="#1F2933"
        stroke="rgba(255, 255, 255, 0.22)"
        strokeWidth="1.5"
      />
      <path d="M32 11 L51 29.5 L13 29.5 Z" fill="#A32020" />
      <rect x="18" y="29" width="28" height="20" rx="1.5" fill="#A32020" />
      <circle cx="28.6" cy="35.6" r="3.4" fill="#1F2933" />
      <circle cx="35.4" cy="35.6" r="3.4" fill="#1F2933" />
      <path d="M 28.6 35.6 L 35.4 35.6 L 32 45.2 Z" fill="#1F2933" />
    </svg>
  );
}
