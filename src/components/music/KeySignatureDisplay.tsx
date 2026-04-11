import { StaffNotation } from './StaffNotation'

interface KeySignatureDisplayProps {
  keySignature: string
  clef?: 'treble' | 'bass' | 'alto' | 'tenor'
  label?: string
  width?: number
  height?: number
  className?: string
}

export function KeySignatureDisplay({
  keySignature,
  clef = 'treble',
  label,
  width = 200,
  height = 150,
  className = '',
}: KeySignatureDisplayProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <StaffNotation
        notes={[]}
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
