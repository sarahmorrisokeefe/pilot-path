import type { Module } from '../types'

export const scalesAndKeysModules: Module[] = [
  // ── Module 1: Major Scales ────────────────────────────────────────────────
  {
    id: 'sk-major-scales',
    courseId: 'scales-and-keys',
    title: 'Major Scales',
    description:
      'Learn the whole-step/half-step pattern that defines every major scale.',
    icon: '🎹',
    order: 1,
    lessons: [
      {
        id: 'sk-m1-l1',
        title: 'Building Major Scales',
        xpReward: 15,
        slides: [
          {
            id: 'sk-s1',
            topic: 'The Major Scale Pattern',
            explanation:
              'Every major scale follows the same interval pattern: Whole-Whole-Half-Whole-Whole-Whole-Half (W-W-H-W-W-W-H). Starting from any note and applying this pattern produces a major scale. This consistent pattern is what gives all major scales their characteristic bright, happy sound.',
            keyFact:
              'Major scale pattern: W-W-H-W-W-W-H.',
          },
          {
            id: 'sk-s2',
            topic: 'C Major Scale',
            explanation:
              'C major is the simplest major scale because it uses only the white keys on the piano: C-D-E-F-G-A-B-C. There are no sharps or flats. It is often the first scale students learn and serves as a reference point for understanding all other scales.',
            keyFact:
              'C major has no sharps or flats: C-D-E-F-G-A-B-C.',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['c/4'], duration: 'q' },
                { keys: ['d/4'], duration: 'q' },
                { keys: ['e/4'], duration: 'q' },
                { keys: ['f/4'], duration: 'q' },
                { keys: ['g/4'], duration: 'q' },
                { keys: ['a/4'], duration: 'q' },
                { keys: ['b/4'], duration: 'q' },
                { keys: ['c/5'], duration: 'q' },
              ],
            },
            diagramType: 'scale',
          },
          {
            id: 'sk-s3',
            topic: 'G Major Scale',
            explanation:
              'G major contains one sharp: F#. Following the W-W-H-W-W-W-H pattern from G gives us G-A-B-C-D-E-F#-G. The F must be sharped to maintain the correct whole step between the 6th and 7th scale degrees and the half step between the 7th and 8th.',
            keyFact:
              'G major has one sharp (F#): G-A-B-C-D-E-F#-G.',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['g/4'], duration: 'q' },
                { keys: ['a/4'], duration: 'q' },
                { keys: ['b/4'], duration: 'q' },
                { keys: ['c/5'], duration: 'q' },
                { keys: ['d/5'], duration: 'q' },
                { keys: ['e/5'], duration: 'q' },
                { keys: ['f/5'], duration: 'q', accidental: '#' },
                { keys: ['g/5'], duration: 'q' },
              ],
              keySignature: 'G',
            },
            diagramType: 'scale',
          },
          {
            id: 'sk-s4',
            topic: 'D Major Scale',
            explanation:
              'D major contains two sharps: F# and C#. The notes are D-E-F#-G-A-B-C#-D. Each new sharp key adds one sharp to the previous key. G major has one sharp (F#); D major adds C# for a total of two sharps.',
            keyFact:
              'D major has two sharps (F# and C#): D-E-F#-G-A-B-C#-D.',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['d/4'], duration: 'q' },
                { keys: ['e/4'], duration: 'q' },
                { keys: ['f/4'], duration: 'q', accidental: '#' },
                { keys: ['g/4'], duration: 'q' },
                { keys: ['a/4'], duration: 'q' },
                { keys: ['b/4'], duration: 'q' },
                { keys: ['c/5'], duration: 'q', accidental: '#' },
                { keys: ['d/5'], duration: 'q' },
              ],
              keySignature: 'D',
            },
            diagramType: 'scale',
          },
        ],
        questions: [
          {
            id: 'sk-q1',
            text: 'What is the interval pattern of a major scale?',
            type: 'multiple-choice',
            options: [
              'W-W-H-W-W-W-H',
              'W-H-W-W-H-W-W',
              'H-W-W-H-W-W-W',
              'W-W-W-H-W-W-H',
            ],
            correctAnswer: 0,
            explanation:
              'The major scale pattern is Whole-Whole-Half-Whole-Whole-Whole-Half.',
            topic: 'The Major Scale Pattern',
            difficulty: 1,
          },
          {
            id: 'sk-q2',
            text: 'C major has no sharps or flats.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'C major uses only the white keys on the piano and contains no sharps or flats.',
            topic: 'C Major Scale',
            difficulty: 1,
          },
          {
            id: 'sk-q3',
            text: 'How many sharps does G major have?',
            type: 'multiple-choice',
            options: ['0', '1', '2', '3'],
            correctAnswer: 1,
            explanation:
              'G major has one sharp: F#.',
            topic: 'G Major Scale',
            difficulty: 1,
          },
          {
            id: 'sk-q4',
            text: 'Which notes are sharp in D major?',
            type: 'multiple-choice',
            options: [
              'F# only',
              'C# only',
              'F# and C#',
              'F#, C#, and G#',
            ],
            correctAnswer: 2,
            explanation:
              'D major has two sharps: F# and C#.',
            topic: 'D Major Scale',
            difficulty: 2,
          },
          {
            id: 'sk-q5',
            text: 'Where do the half steps occur in a major scale?',
            type: 'multiple-choice',
            options: [
              'Between scale degrees 2-3 and 6-7',
              'Between scale degrees 3-4 and 7-8',
              'Between scale degrees 1-2 and 5-6',
              'Between scale degrees 4-5 and 7-8',
            ],
            correctAnswer: 1,
            explanation:
              'In a major scale, the half steps fall between the 3rd and 4th degrees and between the 7th and 8th degrees.',
            topic: 'The Major Scale Pattern',
            difficulty: 2,
          },
          {
            id: 'sk-q6',
            text: 'The 7th note of the G major scale is F#.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'G major: G-A-B-C-D-E-F#-G. The 7th scale degree is F#.',
            topic: 'G Major Scale',
            difficulty: 2,
          },
          {
            id: 'sk-q7',
            text: 'What is the 3rd note of the D major scale?',
            type: 'multiple-choice',
            options: ['E', 'F', 'F#', 'G'],
            correctAnswer: 2,
            explanation:
              'D major: D-E-F#-G-A-B-C#-D. The 3rd note is F#.',
            topic: 'D Major Scale',
            difficulty: 2,
          },
        ],
      },
    ],
  },

  // ── Module 2: Minor Scales ────────────────────────────────────────────────
  {
    id: 'sk-minor-scales',
    courseId: 'scales-and-keys',
    title: 'Minor Scales',
    description:
      'Explore natural, harmonic, and melodic minor scales.',
    icon: '🎶',
    order: 2,
    lessons: [
      {
        id: 'sk-m2-l1',
        title: 'The Three Minor Scales',
        xpReward: 15,
        slides: [
          {
            id: 'sk-s5',
            topic: 'Natural Minor Scale',
            explanation:
              'The natural minor scale follows the pattern W-H-W-W-H-W-W. Starting from A, the natural minor scale is A-B-C-D-E-F-G-A, using only white keys. Minor scales sound darker or more melancholy than major scales.',
            keyFact:
              'Natural minor pattern: W-H-W-W-H-W-W. A natural minor has no sharps or flats.',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['a/4'], duration: 'q' },
                { keys: ['b/4'], duration: 'q' },
                { keys: ['c/5'], duration: 'q' },
                { keys: ['d/5'], duration: 'q' },
                { keys: ['e/5'], duration: 'q' },
                { keys: ['f/5'], duration: 'q' },
                { keys: ['g/5'], duration: 'q' },
                { keys: ['a/5'], duration: 'q' },
              ],
            },
            diagramType: 'scale',
          },
          {
            id: 'sk-s6',
            topic: 'Harmonic Minor Scale',
            explanation:
              'The harmonic minor scale raises the 7th degree of the natural minor by a half step. In A harmonic minor, the G becomes G#, creating a leading tone that pulls toward the tonic. This produces a characteristic augmented 2nd interval between the 6th and 7th degrees.',
            keyFact:
              'Harmonic minor = natural minor with a raised 7th degree.',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['a/4'], duration: 'q' },
                { keys: ['b/4'], duration: 'q' },
                { keys: ['c/5'], duration: 'q' },
                { keys: ['d/5'], duration: 'q' },
                { keys: ['e/5'], duration: 'q' },
                { keys: ['f/5'], duration: 'q' },
                { keys: ['g/5'], duration: 'q', accidental: '#' },
                { keys: ['a/5'], duration: 'q' },
              ],
            },
            diagramType: 'scale',
          },
          {
            id: 'sk-s7',
            topic: 'Melodic Minor Scale',
            explanation:
              'The melodic minor scale raises both the 6th and 7th degrees when ascending, smoothing out the augmented 2nd of the harmonic minor. When descending, it reverts to the natural minor. In A melodic minor ascending: A-B-C-D-E-F#-G#-A; descending: A-G-F-E-D-C-B-A.',
            keyFact:
              'Melodic minor raises the 6th and 7th ascending, reverts to natural minor descending.',
          },
          {
            id: 'sk-s8',
            topic: 'Comparing the Three Minor Scales',
            explanation:
              'All three minor scales share the same first five notes. They differ only in the 6th and 7th degrees. Natural minor: lowered 6th and 7th. Harmonic minor: lowered 6th, raised 7th. Melodic minor ascending: raised 6th and 7th. Understanding these differences is essential for minor-key harmony.',
            keyFact:
              'The three minor scales differ only in their 6th and 7th scale degrees.',
          },
        ],
        questions: [
          {
            id: 'sk-q8',
            text: 'What is the interval pattern of the natural minor scale?',
            type: 'multiple-choice',
            options: [
              'W-W-H-W-W-W-H',
              'W-H-W-W-H-W-W',
              'W-H-W-W-W-H-W',
              'H-W-W-H-W-W-W',
            ],
            correctAnswer: 1,
            explanation:
              'The natural minor scale follows W-H-W-W-H-W-W.',
            topic: 'Natural Minor Scale',
            difficulty: 1,
          },
          {
            id: 'sk-q9',
            text: 'The harmonic minor scale raises the 7th degree by a half step.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'The harmonic minor raises only the 7th degree, creating a leading tone.',
            topic: 'Harmonic Minor Scale',
            difficulty: 1,
          },
          {
            id: 'sk-q10',
            text: 'In A harmonic minor, which note is raised?',
            type: 'multiple-choice',
            options: ['F', 'G', 'D', 'E'],
            correctAnswer: 1,
            explanation:
              'In A harmonic minor, G is raised to G#, creating the leading tone.',
            topic: 'Harmonic Minor Scale',
            difficulty: 2,
          },
          {
            id: 'sk-q11',
            text: 'The melodic minor scale has the same notes ascending and descending.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation:
              'The melodic minor raises the 6th and 7th degrees when ascending, but reverts to the natural minor when descending.',
            topic: 'Melodic Minor Scale',
            difficulty: 2,
          },
          {
            id: 'sk-q12',
            text: 'Which degrees are raised in the ascending melodic minor?',
            type: 'multiple-choice',
            options: [
              '6th only',
              '7th only',
              '6th and 7th',
              '5th and 7th',
            ],
            correctAnswer: 2,
            explanation:
              'The melodic minor raises both the 6th and 7th degrees when ascending.',
            topic: 'Melodic Minor Scale',
            difficulty: 2,
          },
          {
            id: 'sk-q13',
            text: 'A natural minor uses only white keys on the piano.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation:
              'Only A natural minor uses exclusively white keys. Other natural minor scales include sharps or flats.',
            topic: 'Natural Minor Scale',
            difficulty: 2,
          },
          {
            id: 'sk-q14',
            text: 'What interval is created between the 6th and 7th degrees of the harmonic minor?',
            type: 'multiple-choice',
            options: [
              'Minor 2nd',
              'Major 2nd',
              'Augmented 2nd',
              'Perfect 4th',
            ],
            correctAnswer: 2,
            explanation:
              'The raised 7th with the lowered 6th creates an augmented 2nd (3 half steps) in the harmonic minor scale.',
            topic: 'Harmonic Minor Scale',
            difficulty: 3,
          },
        ],
      },
    ],
  },

  // ── Module 3: Key Signatures & Circle of Fifths ───────────────────────────
  {
    id: 'sk-key-signatures',
    courseId: 'scales-and-keys',
    title: 'Key Signatures & Circle of Fifths',
    description:
      'Decode key signatures and navigate the circle of fifths.',
    icon: '🔑',
    order: 3,
    lessons: [
      {
        id: 'sk-m3-l1',
        title: 'Key Signatures & the Circle of Fifths',
        xpReward: 15,
        slides: [
          {
            id: 'sk-s9',
            topic: 'What Key Signatures Do',
            explanation:
              'A key signature appears at the beginning of each staff line, between the clef and the time signature. It tells the performer which notes are consistently sharp or flat throughout the piece, eliminating the need to write accidentals before every affected note.',
            keyFact:
              'Key signatures indicate which notes are sharp or flat throughout the piece.',
            staffConfig: {
              clef: 'treble',
              notes: [],
              keySignature: 'G',
            },
            diagramType: 'key-signature',
          },
          {
            id: 'sk-s10',
            topic: 'Order of Sharps',
            explanation:
              'Sharps always appear in the same order: F, C, G, D, A, E, B. A common mnemonic is "Father Charles Goes Down And Ends Battle." A key with one sharp has F#; two sharps has F# and C#; three sharps adds G#, and so on.',
            keyFact:
              'Order of sharps: F-C-G-D-A-E-B.',
            staffConfig: {
              clef: 'treble',
              notes: [],
              keySignature: 'A',
            },
            diagramType: 'key-signature',
          },
          {
            id: 'sk-s11',
            topic: 'Order of Flats',
            explanation:
              'Flats appear in the reverse order of sharps: B, E, A, D, G, C, F. A mnemonic is "Battle Ends And Down Goes Charles\' Father." A key with one flat has Bb; two flats has Bb and Eb, and so on.',
            keyFact:
              'Order of flats: B-E-A-D-G-C-F (reverse of sharps).',
            staffConfig: {
              clef: 'treble',
              notes: [],
              keySignature: 'Eb',
            },
            diagramType: 'key-signature',
          },
          {
            id: 'sk-s12',
            topic: 'The Circle of Fifths',
            explanation:
              'The circle of fifths is a diagram showing all 12 major and minor keys arranged by ascending fifths clockwise and ascending fourths (descending fifths) counterclockwise. Moving clockwise adds one sharp; moving counterclockwise adds one flat. It is an essential tool for understanding key relationships.',
            keyFact:
              'Clockwise on the circle of fifths adds one sharp; counterclockwise adds one flat.',
          },
          {
            id: 'sk-s13',
            topic: 'Relative Major & Minor',
            explanation:
              'Every major key has a relative minor that shares the same key signature. The relative minor starts on the 6th degree of the major scale. For example, A minor is the relative minor of C major (both have no sharps or flats), and E minor is the relative minor of G major (both have one sharp).',
            keyFact:
              'The relative minor starts on the 6th degree of the major scale and shares its key signature.',
          },
        ],
        questions: [
          {
            id: 'sk-q15',
            text: 'What is the order of sharps in key signatures?',
            type: 'multiple-choice',
            options: [
              'F, C, G, D, A, E, B',
              'B, E, A, D, G, C, F',
              'C, D, E, F, G, A, B',
              'G, D, A, E, B, F, C',
            ],
            correctAnswer: 0,
            explanation:
              'Sharps always appear in the order F, C, G, D, A, E, B.',
            topic: 'Order of Sharps',
            difficulty: 1,
          },
          {
            id: 'sk-q16',
            text: 'The order of flats is the reverse of the order of sharps.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'Flats follow B-E-A-D-G-C-F, which is the reverse of the sharp order F-C-G-D-A-E-B.',
            topic: 'Order of Flats',
            difficulty: 1,
          },
          {
            id: 'sk-q17',
            text: 'What is the relative minor of C major?',
            type: 'multiple-choice',
            options: ['D minor', 'E minor', 'A minor', 'G minor'],
            correctAnswer: 2,
            explanation:
              'A minor is the relative minor of C major. Both have no sharps or flats.',
            topic: 'Relative Major & Minor',
            difficulty: 1,
          },
          {
            id: 'sk-q18',
            text: 'Moving clockwise on the circle of fifths adds one sharp.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'Each clockwise step on the circle of fifths adds one sharp to the key signature.',
            topic: 'The Circle of Fifths',
            difficulty: 2,
          },
          {
            id: 'sk-q19',
            text: 'How many sharps does the key of A major have?',
            type: 'multiple-choice',
            options: ['1', '2', '3', '4'],
            correctAnswer: 2,
            explanation:
              'A major has three sharps: F#, C#, and G#.',
            topic: 'Order of Sharps',
            difficulty: 2,
          },
          {
            id: 'sk-q20',
            text: 'Which key has two flats (Bb and Eb)?',
            type: 'multiple-choice',
            options: ['F major', 'Bb major', 'Eb major', 'Ab major'],
            correctAnswer: 1,
            explanation:
              'Bb major has two flats: Bb and Eb.',
            topic: 'Order of Flats',
            difficulty: 2,
          },
          {
            id: 'sk-q21',
            text: 'The relative minor of G major is E minor.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'E minor is the relative minor of G major. Both share one sharp (F#).',
            topic: 'Relative Major & Minor',
            difficulty: 2,
          },
        ],
      },
    ],
  },
]
