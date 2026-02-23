import { parseReference } from '../../utils/referenceLinks'

interface ReferenceLinkProps {
  reference: string
  className?: string
}

/**
 * Renders a FAA reference string (e.g. "14 CFR 91.131 / AIM 7-1-6") with
 * known references as clickable external links and unknown ones as plain text.
 */
export function ReferenceLink({ reference, className = '' }: ReferenceLinkProps) {
  const parts = parseReference(reference)
  if (parts.length === 0) return null

  return (
    <p className={`text-xs flex items-start gap-1.5 ${className}`}>
      <span className="flex-shrink-0 mt-px">📚</span>
      <span className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
        {parts.map((part, i) => (
          <span key={i} className="inline-flex items-center gap-1">
            {part.url ? (
              <a
                href={part.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-500 dark:text-sky-400 underline underline-offset-2 hover:text-sky-600 dark:hover:text-sky-300 font-mono transition-colors"
              >
                {part.text}
              </a>
            ) : (
              <span className="text-slate-400 dark:text-slate-500 font-mono">
                {part.text}
              </span>
            )}
            {i < parts.length - 1 && (
              <span className="text-slate-300 dark:text-slate-600 select-none">/</span>
            )}
          </span>
        ))}
      </span>
    </p>
  )
}
