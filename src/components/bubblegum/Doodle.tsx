import { type CSSProperties } from 'react'

interface DoodleProps {
  ch: string
  x: number | string
  y: number | string
  size?: number
  rot?: number
  color?: string
  opacity?: number
}

export function Doodle({
  ch,
  x,
  y,
  size = 22,
  rot = 0,
  color,
  opacity = 1,
}: DoodleProps) {
  const style: CSSProperties = {
    left: typeof x === 'number' ? `${x}px` : x,
    top: typeof y === 'number' ? `${y}px` : y,
    fontSize: `${size}px`,
    transform: `rotate(${rot}deg)`,
    opacity,
    color,
  }
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute font-serif leading-none text-bubblegum-plum"
      style={style}
    >
      {ch}
    </span>
  )
}
