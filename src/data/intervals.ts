import type { Module } from '../types'

export const intervalsModules: Module[] = [
  // ── Module 1: Half Steps & Whole Steps ────────────────────────────────────
  {
    id: 'iv-half-whole',
    courseId: 'intervals',
    title: 'Half Steps & Whole Steps',
    description:
      'Understand the two smallest building blocks of Western music.',
    icon: '📏',
    order: 1,
    lessons: [
      {
        id: 'iv-m1-l1',
        title: 'Half Steps and Whole Steps',
        xpReward: 15,
        slides: [
          {
            id: 'iv-s1',
            topic: 'The Half Step',
            explanation:
              'A half step (also called a semitone) is the smallest interval in Western music. On the piano, it is the distance from one key to the very next key, whether black or white. Examples include E to F and B to C, which are natural half steps between white keys.',
            keyFact:
              'A half step is the distance between two adjacent keys on the piano.',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['e/4'], duration: 'h' },
                { keys: ['f/4'], duration: 'h' },
              ],
            },
            diagramType: 'interval',
          },
          {
            id: 'iv-s2',
            topic: 'The Whole Step',
            explanation:
              'A whole step (also called a whole tone) equals two half steps. On the piano, there is always one key between two notes a whole step apart. C to D is a whole step because C# sits between them. Most adjacent white keys are a whole step apart, except E-F and B-C.',
            keyFact:
              'A whole step equals two half steps.',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['c/4'], duration: 'h' },
                { keys: ['d/4'], duration: 'h' },
              ],
            },
            diagramType: 'interval',
          },
          {
            id: 'iv-s3',
            topic: 'Chromatic vs. Diatonic Half Steps',
            explanation:
              'A chromatic half step is between two notes with the same letter name, such as C to C#. A diatonic half step is between two notes with different letter names, such as E to F. Both are the same distance (one semitone), but the spelling differs based on musical context.',
            keyFact:
              'Chromatic half step: same letter name (C to C#). Diatonic half step: different letter names (E to F).',
          },
          {
            id: 'iv-s4',
            topic: 'Natural Half Steps',
            explanation:
              'On the piano keyboard, there are two pairs of white keys with no black key between them: E-F and B-C. These are the natural half steps. All other adjacent white keys have a black key between them and are whole steps apart. This pattern repeats in every octave.',
            keyFact:
              'The natural half steps are E-F and B-C (no black key between them).',
          },
        ],
        questions: [
          {
            id: 'iv-q1',
            text: 'How many half steps equal one whole step?',
            type: 'multiple-choice',
            options: ['1', '2', '3', '4'],
            correctAnswer: 1,
            explanation:
              'A whole step is made up of two half steps.',
            topic: 'The Whole Step',
            difficulty: 1,
          },
          {
            id: 'iv-q2',
            text: 'E to F is a natural half step.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'E to F is one of the two natural half steps on the piano (the other is B to C).',
            topic: 'Natural Half Steps',
            difficulty: 1,
          },
          {
            id: 'iv-q3',
            text: 'What type of half step is C to C#?',
            type: 'multiple-choice',
            options: [
              'Diatonic',
              'Chromatic',
              'Harmonic',
              'Melodic',
            ],
            correctAnswer: 1,
            explanation:
              'C to C# is a chromatic half step because both notes share the same letter name.',
            topic: 'Chromatic vs. Diatonic Half Steps',
            difficulty: 2,
          },
          {
            id: 'iv-q4',
            text: 'Which pair of white keys does NOT have a black key between them?',
            type: 'multiple-choice',
            options: ['C and D', 'D and E', 'E and F', 'G and A'],
            correctAnswer: 2,
            explanation:
              'E and F have no black key between them, making them a natural half step apart.',
            topic: 'Natural Half Steps',
            difficulty: 1,
          },
          {
            id: 'iv-q5',
            text: 'C to D is a half step.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation:
              'C to D is a whole step. There is a black key (C#/Db) between them.',
            topic: 'The Whole Step',
            difficulty: 1,
          },
          {
            id: 'iv-q6',
            text: 'How many half steps are in an octave?',
            type: 'multiple-choice',
            options: ['7', '8', '10', '12'],
            correctAnswer: 3,
            explanation:
              'There are 12 half steps in an octave, corresponding to the 12 different pitches in Western music.',
            topic: 'The Half Step',
            difficulty: 2,
          },
          {
            id: 'iv-q7',
            text: 'E to F is a diatonic half step because the notes have different letter names.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'A diatonic half step involves two different letter names. E and F are different letters, so it is diatonic.',
            topic: 'Chromatic vs. Diatonic Half Steps',
            difficulty: 2,
          },
        ],
      },
    ],
  },

  // ── Module 2: Interval Quality ────────────────────────────────────────────
  {
    id: 'iv-interval-quality',
    courseId: 'intervals',
    title: 'Interval Quality',
    description:
      'Classify intervals by number and quality: perfect, major, minor, augmented, and diminished.',
    icon: '🔍',
    order: 2,
    lessons: [
      {
        id: 'iv-m2-l1',
        title: 'Naming Intervals',
        xpReward: 15,
        slides: [
          {
            id: 'iv-s5',
            topic: 'Interval Number',
            explanation:
              'An interval number is found by counting the letter names from the bottom note to the top note, inclusive. C to E is a 3rd (C-D-E = 3 letters). C to G is a 5th (C-D-E-F-G = 5 letters). The number tells you the generic size but not the exact quality.',
            keyFact:
              'Count both letter names inclusively to find the interval number.',
          },
          {
            id: 'iv-s6',
            topic: 'Perfect Intervals',
            explanation:
              'The unison, 4th, 5th, and octave are called perfect intervals. These intervals have a uniquely stable, consonant sound. In a major scale, the 1st, 4th, 5th, and 8th degrees form perfect intervals with the tonic. A perfect 5th from C is G (7 half steps); a perfect 4th from C is F (5 half steps).',
            keyFact:
              'Perfect intervals: unison (P1), perfect 4th (P4), perfect 5th (P5), octave (P8).',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['c/4'], duration: 'h' },
                { keys: ['g/4'], duration: 'h' },
              ],
            },
            diagramType: 'interval',
          },
          {
            id: 'iv-s7',
            topic: 'Major & Minor Intervals',
            explanation:
              'The 2nd, 3rd, 6th, and 7th can be major or minor. In a major scale, the interval from the tonic to the 2nd, 3rd, 6th, or 7th degree is always major. Lowering the top note by a half step makes it minor. A major 3rd from C is E (4 half steps); a minor 3rd from C is Eb (3 half steps).',
            keyFact:
              'Major intervals: M2, M3, M6, M7. Lower the top note one half step to get minor.',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['c/4'], duration: 'h' },
                { keys: ['e/4'], duration: 'h' },
              ],
            },
            diagramType: 'interval',
          },
          {
            id: 'iv-s8',
            topic: 'Augmented & Diminished',
            explanation:
              'Raising a perfect or major interval by a half step makes it augmented. Lowering a perfect or minor interval by a half step makes it diminished. For example, a perfect 5th (C-G, 7 half steps) becomes augmented (C-G#, 8 half steps) or diminished (C-Gb, 6 half steps).',
            keyFact:
              'Augmented = perfect or major raised by a half step. Diminished = perfect or minor lowered by a half step.',
          },
        ],
        questions: [
          {
            id: 'iv-q8',
            text: 'What interval number is C to E?',
            type: 'multiple-choice',
            options: ['2nd', '3rd', '4th', '5th'],
            correctAnswer: 1,
            explanation:
              'Count C-D-E: three letter names, so C to E is a 3rd.',
            topic: 'Interval Number',
            difficulty: 1,
          },
          {
            id: 'iv-q9',
            text: 'Which of these is NOT a perfect interval?',
            type: 'multiple-choice',
            options: ['Unison', '3rd', '5th', 'Octave'],
            correctAnswer: 1,
            explanation:
              'The 3rd is a major or minor interval, not a perfect interval. Perfect intervals are the unison, 4th, 5th, and octave.',
            topic: 'Perfect Intervals',
            difficulty: 1,
          },
          {
            id: 'iv-q10',
            text: 'A major 3rd contains 4 half steps.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'A major 3rd spans 4 half steps (e.g., C to E).',
            topic: 'Major & Minor Intervals',
            difficulty: 2,
          },
          {
            id: 'iv-q11',
            text: 'How many half steps are in a perfect 5th?',
            type: 'multiple-choice',
            options: ['5', '6', '7', '8'],
            correctAnswer: 2,
            explanation:
              'A perfect 5th contains 7 half steps (e.g., C to G).',
            topic: 'Perfect Intervals',
            difficulty: 2,
          },
          {
            id: 'iv-q12',
            text: 'Lowering a major interval by a half step produces a minor interval.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'Lowering the top note of a major interval by one half step converts it to a minor interval.',
            topic: 'Major & Minor Intervals',
            difficulty: 2,
          },
          {
            id: 'iv-q13',
            text: 'What quality is a 5th with 6 half steps?',
            type: 'multiple-choice',
            options: ['Perfect', 'Augmented', 'Diminished', 'Minor'],
            correctAnswer: 2,
            explanation:
              'A perfect 5th has 7 half steps. With only 6, it is diminished.',
            topic: 'Augmented & Diminished',
            difficulty: 3,
          },
          {
            id: 'iv-q14',
            text: 'How many half steps are in a minor 3rd?',
            type: 'multiple-choice',
            options: ['2', '3', '4', '5'],
            correctAnswer: 1,
            explanation:
              'A minor 3rd contains 3 half steps (e.g., C to Eb).',
            topic: 'Major & Minor Intervals',
            difficulty: 2,
          },
        ],
      },
    ],
  },

  // ── Module 3: Interval Inversion ──────────────────────────────────────────
  {
    id: 'iv-inversion',
    courseId: 'intervals',
    title: 'Interval Inversion',
    description:
      'Learn how intervals transform when inverted.',
    icon: '🔄',
    order: 3,
    lessons: [
      {
        id: 'iv-m3-l1',
        title: 'Inverting Intervals',
        xpReward: 15,
        slides: [
          {
            id: 'iv-s9',
            topic: 'What Is Interval Inversion?',
            explanation:
              'Inverting an interval means moving the lower note up an octave or the upper note down an octave so their positions swap. For example, C up to E is a major 3rd; inverting it (E up to C) produces a minor 6th. Every interval has a unique inversion.',
            keyFact:
              'To invert an interval, move the bottom note up an octave (or the top note down).',
          },
          {
            id: 'iv-s10',
            topic: 'The Number Rule',
            explanation:
              'When you invert an interval, the two interval numbers always sum to 9. A 2nd inverts to a 7th (2 + 7 = 9). A 3rd inverts to a 6th (3 + 6 = 9). A 4th inverts to a 5th (4 + 5 = 9). A unison inverts to an octave (1 + 8 = 9).',
            keyFact:
              'Inverted interval numbers sum to 9: 2nd↔7th, 3rd↔6th, 4th↔5th, 1st↔8th.',
          },
          {
            id: 'iv-s11',
            topic: 'The Quality Rule',
            explanation:
              'When an interval is inverted, its quality also changes following specific rules: major becomes minor (and vice versa), augmented becomes diminished (and vice versa), and perfect stays perfect. So a major 3rd inverts to a minor 6th, and an augmented 4th inverts to a diminished 5th.',
            keyFact:
              'Inversion quality rules: M↔m, A↔d, P↔P.',
          },
          {
            id: 'iv-s12',
            topic: 'Practical Examples',
            explanation:
              'C to E is a major 3rd. Inverted: E to C is a minor 6th (M→m, 3→6). C to G is a perfect 5th. Inverted: G to C is a perfect 4th (P→P, 5→4). C to G# is an augmented 5th. Inverted: G# to C is a diminished 4th (A→d, 5→4).',
            keyFact:
              'Example: major 3rd (C-E) inverts to minor 6th (E-C).',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['c/4'], duration: 'h' },
                { keys: ['e/4'], duration: 'h' },
              ],
            },
            diagramType: 'interval',
          },
        ],
        questions: [
          {
            id: 'iv-q15',
            text: 'What does a major 3rd invert to?',
            type: 'multiple-choice',
            options: ['Major 6th', 'Minor 6th', 'Perfect 6th', 'Diminished 6th'],
            correctAnswer: 1,
            explanation:
              'A major 3rd inverts to a minor 6th. Major becomes minor, and 3 + 6 = 9.',
            topic: 'The Quality Rule',
            difficulty: 1,
          },
          {
            id: 'iv-q16',
            text: 'The numbers of an interval and its inversion always sum to 9.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'Interval inversion numbers sum to 9 (e.g., 3rd + 6th = 9, 2nd + 7th = 9).',
            topic: 'The Number Rule',
            difficulty: 1,
          },
          {
            id: 'iv-q17',
            text: 'What does a perfect 5th invert to?',
            type: 'multiple-choice',
            options: [
              'Perfect 4th',
              'Major 4th',
              'Minor 4th',
              'Augmented 4th',
            ],
            correctAnswer: 0,
            explanation:
              'A perfect 5th inverts to a perfect 4th. Perfect stays perfect, and 5 + 4 = 9.',
            topic: 'The Quality Rule',
            difficulty: 1,
          },
          {
            id: 'iv-q18',
            text: 'An augmented interval inverts to a diminished interval.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'Augmented inverts to diminished, and diminished inverts to augmented.',
            topic: 'The Quality Rule',
            difficulty: 2,
          },
          {
            id: 'iv-q19',
            text: 'A 2nd inverts to what interval number?',
            type: 'multiple-choice',
            options: ['5th', '6th', '7th', '8th'],
            correctAnswer: 2,
            explanation:
              '2 + 7 = 9, so a 2nd inverts to a 7th.',
            topic: 'The Number Rule',
            difficulty: 1,
          },
          {
            id: 'iv-q20',
            text: 'What does a minor 7th invert to?',
            type: 'multiple-choice',
            options: ['Major 2nd', 'Minor 2nd', 'Perfect 2nd', 'Augmented 2nd'],
            correctAnswer: 0,
            explanation:
              'A minor 7th inverts to a major 2nd. Minor becomes major, and 7 + 2 = 9.',
            topic: 'The Quality Rule',
            difficulty: 2,
          },
          {
            id: 'iv-q21',
            text: 'A perfect 4th inverts to a perfect 5th.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'Perfect stays perfect, and 4 + 5 = 9, so a perfect 4th inverts to a perfect 5th.',
            topic: 'The Number Rule',
            difficulty: 1,
          },
        ],
      },
    ],
  },
]
