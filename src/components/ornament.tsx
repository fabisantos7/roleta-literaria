interface OrnamentProps {
  className?: string
  color?: string
}

/** Editorial flourish — small ornamental divider in editorial / book style */
export function Ornament({ className = '', color = '#8B5733' }: OrnamentProps) {
  return (
    <svg
      className={className}
      width="120"
      height="14"
      viewBox="0 0 120 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 7 L40 7"
        stroke={color}
        strokeWidth="0.75"
        opacity="0.6"
      />
      <path
        d="M40 7 Q50 2, 60 7 Q70 12, 80 7"
        stroke={color}
        strokeWidth="0.75"
        fill="none"
        opacity="0.8"
      />
      <circle cx="60" cy="7" r="1.8" fill={color} />
      <circle cx="44" cy="7" r="0.9" fill={color} opacity="0.7" />
      <circle cx="76" cy="7" r="0.9" fill={color} opacity="0.7" />
      <path
        d="M80 7 L120 7"
        stroke={color}
        strokeWidth="0.75"
        opacity="0.6"
      />
    </svg>
  )
}

/** Larger decorative book-plate corner ornament */
export function CornerFlourish({ className = '', color = '#8B5733' }: OrnamentProps) {
  return (
    <svg
      className={className}
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M2 2 L2 30 M2 2 L30 2"
        stroke={color}
        strokeWidth="0.75"
        opacity="0.5"
      />
      <path
        d="M2 18 Q12 18, 12 8 L12 2"
        stroke={color}
        strokeWidth="0.75"
        fill="none"
        opacity="0.7"
      />
      <circle cx="12" cy="12" r="1.5" fill={color} opacity="0.6" />
    </svg>
  )
}

/** Tiny decorative star/diamond bullet */
export function Diamond({ className = '', color = '#8B5733' }: OrnamentProps) {
  return (
    <svg
      className={className}
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M3 0 L6 3 L3 6 L0 3 Z" fill={color} />
    </svg>
  )
}
