import { StaffNotation } from './StaffNotation'
import type { NoteSpec } from '../../types'

interface IntervalDiagramProps {
  lowNote: string
  highNote: string
  clef?: 'treble' | 'bass' | 'alto' | 'tenor'
  label?: string
  width?: number
  height?: number
  className?: string
}

export function IntervalDiagram({
  lowNote,
  highNote,
  clef = 'treble',
  label,
  width = 250,
  height = 150,
  className = '',
}: IntervalDiagramProps) {
  const notes: NoteSpec[] = [
    { keys: [lowNote], duration: 'h' },
    { keys: [highNote], duration: 'h' },
  ]
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <StaffNotation notes={notes} clef={clef} width={width} height={height} />
      {label && (
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
          {label}
        </p>
      )}
    </div>
  )
}
