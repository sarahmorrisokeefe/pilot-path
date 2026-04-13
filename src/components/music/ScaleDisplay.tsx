import { StaffNotation } from './StaffNotation'
import type { NoteSpec } from '../../types'

interface ScaleDisplayProps {
  notes: string[]
  clef?: 'treble' | 'bass' | 'alto' | 'tenor'
  keySignature?: string
  label?: string
  width?: number
  height?: number
  className?: string
}

export function ScaleDisplay({
  notes,
  clef = 'treble',
  keySignature,
  label,
  width = 400,
  height = 150,
  className = '',
}: ScaleDisplayProps) {
  const noteSpecs: NoteSpec[] = notes.map((key) => ({
    keys: [key],
    duration: 'q',
  }))
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <StaffNotation
        notes={noteSpecs}
        clef={clef}
        keySignature={keySignature}
        width={width}
        height={height}
      />
      {label && (
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
          {label}
        </p>
      )}
    </div>
  )
}
