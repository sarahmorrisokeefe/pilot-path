import { StaffNotation } from './StaffNotation'
import type { NoteSpec } from '../../types'

interface ChordDiagramProps {
  keys: string[]
  clef?: 'treble' | 'bass' | 'alto' | 'tenor'
  label?: string
  width?: number
  height?: number
  className?: string
}

export function ChordDiagram({
  keys,
  clef = 'treble',
  label,
  width = 200,
  height = 150,
  className = '',
}: ChordDiagramProps) {
  const note: NoteSpec = { keys, duration: 'w' }
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <StaffNotation notes={[note]} clef={clef} width={width} height={height} />
      {label && (
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
          {label}
        </p>
      )}
    </div>
  )
}
