import { useRef, useEffect } from 'react'
import { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } from 'vexflow'
import type { StaffConfig } from '../../types'
import { useDarkMode } from '../../hooks/useDarkMode'

interface StaffNotationProps extends StaffConfig {
  className?: string
}

export function StaffNotation({
  notes,
  clef = 'treble',
  keySignature,
  timeSignature,
  width = 300,
  height = 150,
  showLabels = false,
  className = '',
}: StaffNotationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { isDark } = useDarkMode()

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.innerHTML = ''

    const renderer = new Renderer(containerRef.current, Renderer.Backends.SVG)
    renderer.resize(width, height)
    const context = renderer.getContext()

    const color = isDark ? '#e2e8f0' : '#1e293b'
    context.setFillStyle(color)
    context.setStrokeStyle(color)

    const stave = new Stave(10, 20, width - 20)
    stave.addClef(clef)
    if (keySignature) stave.addKeySignature(keySignature)
    if (timeSignature) stave.addTimeSignature(timeSignature)
    stave.setStyle({ strokeStyle: color, fillStyle: color })
    stave.setContext(context).draw()

    if (notes.length === 0) return

    const staveNotes = notes.map((note) => {
      const staveNote = new StaveNote({
        keys: note.keys,
        duration: note.duration,
        clef,
      })
      staveNote.setStyle({ strokeStyle: color, fillStyle: color })
      if (note.accidental) {
        staveNote.addModifier(new Accidental(note.accidental), 0)
      }
      return staveNote
    })

    const voice = new Voice({ numBeats: 4, beatValue: 4 }).setStrict(false)
    voice.addTickables(staveNotes)
    new Formatter().joinVoices([voice]).format([voice], width - 60)
    voice.draw(context, stave)

    // Force dark mode colors on all SVG elements
    const svg = containerRef.current.querySelector('svg')
    if (svg) {
      svg.querySelectorAll('*').forEach((el) => {
        const element = el as SVGElement
        if (
          element.getAttribute('stroke') &&
          element.getAttribute('stroke') !== 'none'
        ) {
          element.setAttribute('stroke', color)
        }
        if (
          element.getAttribute('fill') &&
          element.getAttribute('fill') !== 'none'
        ) {
          element.setAttribute('fill', color)
        }
      })
    }
  }, [notes, clef, keySignature, timeSignature, width, height, isDark, showLabels])

  return <div ref={containerRef} className={className} />
}
