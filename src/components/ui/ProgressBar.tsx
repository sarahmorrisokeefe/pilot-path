interface ProgressBarProps {
  value: number // 0-100
  color?: string
  height?: string
  showLabel?: boolean
  animated?: boolean
}

export function ProgressBar({
  value,
  color = 'bg-sky-500',
  height = 'h-2',
  showLabel = false,
  animated = true,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className="w-full">
      <div className={`w-full ${height} bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden`}>
        <div
          className={`${height} ${color} rounded-full ${animated ? 'transition-all duration-500 ease-out' : ''}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-right">
          {Math.round(clamped)}%
        </p>
      )}
    </div>
  )
}
