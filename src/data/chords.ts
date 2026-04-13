import type { Module } from '../types'

export const chordsModules: Module[] = [
  // ── Module 1: Triads ──────────────────────────────────────────────────────
  {
    id: 'ch-triads',
    courseId: 'chords',
    title: 'Triads',
    description:
      'Build and identify the four triad types: major, minor, diminished, and augmented.',
    icon: '🎸',
    order: 1,
    lessons: [
      {
        id: 'ch-m1-l1',
        title: 'Building Triads',
        xpReward: 15,
        slides: [
          {
            id: 'ch-s1',
            topic: 'What Is a Triad?',
            explanation:
              'A triad is a three-note chord built by stacking two intervals of a third. Every triad has a root (bottom note), a third, and a fifth. The quality of the two thirds determines whether the triad is major, minor, diminished, or augmented.',
            keyFact:
              'A triad = root + 3rd + 5th, built from two stacked thirds.',
          },
          {
            id: 'ch-s2',
            topic: 'Major Triad',
            explanation:
              'A major triad is built from a major 3rd (4 half steps) on the bottom and a minor 3rd (3 half steps) on top. A C major triad is C-E-G. The total span from root to fifth is a perfect 5th (7 half steps). Major triads sound bright and stable.',
            keyFact:
              'Major triad = M3 + m3 (e.g., C-E-G).',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['c/4', 'e/4', 'g/4'], duration: 'w' },
              ],
            },
            diagramType: 'chord',
          },
          {
            id: 'ch-s3',
            topic: 'Minor Triad',
            explanation:
              'A minor triad is built from a minor 3rd (3 half steps) on the bottom and a major 3rd (4 half steps) on top. A C minor triad is C-Eb-G. The total span is still a perfect 5th. Minor triads sound darker or sadder than major triads.',
            keyFact:
              'Minor triad = m3 + M3 (e.g., C-Eb-G).',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['c/4', 'e/4', 'g/4'], duration: 'w' },
              ],
            },
            diagramType: 'chord',
          },
          {
            id: 'ch-s4',
            topic: 'Diminished & Augmented Triads',
            explanation:
              'A diminished triad stacks two minor 3rds (m3 + m3), producing a diminished 5th (6 half steps) between root and fifth: C-Eb-Gb. An augmented triad stacks two major 3rds (M3 + M3), producing an augmented 5th (8 half steps): C-E-G#. Both sound unstable and tend to resolve.',
            keyFact:
              'Diminished = m3 + m3 (C-Eb-Gb). Augmented = M3 + M3 (C-E-G#).',
          },
        ],
        questions: [
          {
            id: 'ch-q1',
            text: 'What intervals make up a major triad?',
            type: 'multiple-choice',
            options: [
              'Minor 3rd + Major 3rd',
              'Major 3rd + Minor 3rd',
              'Major 3rd + Major 3rd',
              'Minor 3rd + Minor 3rd',
            ],
            correctAnswer: 1,
            explanation:
              'A major triad is built from a major 3rd on the bottom and a minor 3rd on top.',
            topic: 'Major Triad',
            difficulty: 1,
          },
          {
            id: 'ch-q2',
            text: 'A minor triad has a minor 3rd on the bottom and a major 3rd on top.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'A minor triad is constructed with a minor 3rd (3 half steps) below and a major 3rd (4 half steps) above.',
            topic: 'Minor Triad',
            difficulty: 1,
          },
          {
            id: 'ch-q3',
            text: 'What are the notes of a C major triad?',
            type: 'multiple-choice',
            options: ['C-D-E', 'C-Eb-G', 'C-E-G', 'C-F-A'],
            correctAnswer: 2,
            explanation:
              'C major triad: root C, major 3rd E, perfect 5th G.',
            topic: 'Major Triad',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['c/4', 'e/4', 'g/4'], duration: 'w' },
              ],
            },
            diagramType: 'chord',
            difficulty: 1,
          },
          {
            id: 'ch-q4',
            text: 'A diminished triad contains two minor 3rds.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'A diminished triad is m3 + m3, producing a diminished 5th between root and fifth.',
            topic: 'Diminished & Augmented Triads',
            difficulty: 2,
          },
          {
            id: 'ch-q5',
            text: 'What intervals make up an augmented triad?',
            type: 'multiple-choice',
            options: [
              'Major 3rd + Minor 3rd',
              'Minor 3rd + Major 3rd',
              'Major 3rd + Major 3rd',
              'Minor 3rd + Minor 3rd',
            ],
            correctAnswer: 2,
            explanation:
              'An augmented triad stacks two major 3rds (M3 + M3).',
            topic: 'Diminished & Augmented Triads',
            difficulty: 2,
          },
          {
            id: 'ch-q6',
            text: 'The interval from the root to the fifth in a major triad is a perfect 5th.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'M3 (4 half steps) + m3 (3 half steps) = 7 half steps, which is a perfect 5th.',
            topic: 'Major Triad',
            difficulty: 2,
          },
          {
            id: 'ch-q7',
            text: 'What type of triad is C-Eb-Gb?',
            type: 'multiple-choice',
            options: ['Major', 'Minor', 'Diminished', 'Augmented'],
            correctAnswer: 2,
            explanation:
              'C-Eb is a minor 3rd and Eb-Gb is a minor 3rd. Two minor 3rds stacked = diminished triad.',
            topic: 'Diminished & Augmented Triads',
            difficulty: 2,
          },
        ],
      },
    ],
  },

  // ── Module 2: Triad Inversions ────────────────────────────────────────────
  {
    id: 'ch-inversions',
    courseId: 'chords',
    title: 'Triad Inversions',
    description:
      'Understand root position, first inversion, and second inversion.',
    icon: '🔀',
    order: 2,
    lessons: [
      {
        id: 'ch-m2-l1',
        title: 'Inverting Triads',
        xpReward: 15,
        slides: [
          {
            id: 'ch-s5',
            topic: 'Root Position',
            explanation:
              'A triad is in root position when the root is the lowest note. For C major in root position, the notes from bottom to top are C-E-G. Root position is the most stable and grounded voicing. In figured bass, root position is labeled 5/3 (or simply left unlabeled).',
            keyFact:
              'Root position: root on the bottom (C-E-G). Figured bass: 5/3.',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['c/4', 'e/4', 'g/4'], duration: 'w' },
              ],
            },
            diagramType: 'chord',
          },
          {
            id: 'ch-s6',
            topic: 'First Inversion',
            explanation:
              'First inversion places the 3rd of the chord as the lowest note. For C major in first inversion, the notes from bottom to top are E-G-C. The chord still functions as C major, but with a different bass note. In figured bass, first inversion is labeled 6/3 (or simply 6).',
            keyFact:
              'First inversion: 3rd on the bottom (E-G-C). Figured bass: 6/3.',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['e/4', 'g/4', 'c/5'], duration: 'w' },
              ],
            },
            diagramType: 'chord',
          },
          {
            id: 'ch-s7',
            topic: 'Second Inversion',
            explanation:
              'Second inversion places the 5th of the chord as the lowest note. For C major in second inversion, the notes are G-C-E. Second inversion triads are less stable and often resolve to more grounded voicings. In figured bass, second inversion is labeled 6/4.',
            keyFact:
              'Second inversion: 5th on the bottom (G-C-E). Figured bass: 6/4.',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['g/4', 'c/5', 'e/5'], duration: 'w' },
              ],
            },
            diagramType: 'chord',
          },
          {
            id: 'ch-s8',
            topic: 'Identifying Inversions',
            explanation:
              'To identify a triad inversion, rearrange the notes into stacked thirds to find the root. If the root is on the bottom, it is root position. If the 3rd is on the bottom, it is first inversion. If the 5th is on the bottom, it is second inversion. The root always stays the same regardless of inversion.',
            keyFact:
              'Rearrange into stacked thirds to find the root, then determine the inversion from which note is lowest.',
          },
        ],
        questions: [
          {
            id: 'ch-q8',
            text: 'In first inversion, which chord member is the lowest note?',
            type: 'multiple-choice',
            options: ['Root', '3rd', '5th', '7th'],
            correctAnswer: 1,
            explanation:
              'First inversion places the 3rd as the lowest note.',
            topic: 'First Inversion',
            difficulty: 1,
          },
          {
            id: 'ch-q9',
            text: 'The figured bass symbol for root position is 5/3.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'Root position triads are labeled 5/3 in figured bass (often abbreviated by omitting the numbers entirely).',
            topic: 'Root Position',
            difficulty: 1,
          },
          {
            id: 'ch-q10',
            text: 'Which inversion of C major has the notes E-G-C from bottom to top?',
            type: 'multiple-choice',
            options: [
              'Root position',
              'First inversion',
              'Second inversion',
              'Third inversion',
            ],
            correctAnswer: 1,
            explanation:
              'E is the 3rd of C major. When the 3rd is on the bottom, it is first inversion.',
            topic: 'First Inversion',
            difficulty: 2,
          },
          {
            id: 'ch-q11',
            text: 'The figured bass symbol for second inversion is 6/4.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'Second inversion triads are labeled 6/4 in figured bass.',
            topic: 'Second Inversion',
            difficulty: 1,
          },
          {
            id: 'ch-q12',
            text: 'In second inversion, which chord member is the lowest note?',
            type: 'multiple-choice',
            options: ['Root', '3rd', '5th', '7th'],
            correctAnswer: 2,
            explanation:
              'Second inversion places the 5th as the lowest note.',
            topic: 'Second Inversion',
            difficulty: 1,
          },
          {
            id: 'ch-q13',
            text: 'G-C-E from bottom to top is C major in second inversion.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'G is the 5th of C major. When the 5th is the lowest note, the triad is in second inversion.',
            topic: 'Second Inversion',
            difficulty: 2,
          },
          {
            id: 'ch-q14',
            text: 'What is the figured bass label for first inversion?',
            type: 'multiple-choice',
            options: ['5/3', '6/3', '6/4', '4/3'],
            correctAnswer: 1,
            explanation:
              'First inversion uses the figured bass label 6/3 (often abbreviated to just 6).',
            topic: 'First Inversion',
            difficulty: 2,
          },
        ],
      },
    ],
  },

  // ── Module 3: Seventh Chords ──────────────────────────────────────────────
  {
    id: 'ch-seventh-chords',
    courseId: 'chords',
    title: 'Seventh Chords',
    description:
      'Add a seventh to triads and learn the five common seventh chord types.',
    icon: '7️⃣',
    order: 3,
    lessons: [
      {
        id: 'ch-m3-l1',
        title: 'Seventh Chord Types',
        xpReward: 15,
        slides: [
          {
            id: 'ch-s9',
            topic: 'What Is a Seventh Chord?',
            explanation:
              'A seventh chord is a four-note chord built by adding a third on top of a triad. The added note is a 7th above the root. Seventh chords have richer, more complex sounds than triads and are fundamental to jazz, classical, and popular music harmony.',
            keyFact:
              'A seventh chord = triad + an additional 3rd, creating a four-note chord.',
          },
          {
            id: 'ch-s10',
            topic: 'Major 7th & Dominant 7th',
            explanation:
              'A major 7th chord stacks M3 + m3 + M3, using a major triad with a major 7th on top (e.g., C-E-G-B). A dominant 7th chord stacks M3 + m3 + m3, using a major triad with a minor 7th on top (e.g., C-E-G-Bb). The dominant 7th is the most common seventh chord and creates a strong pull to resolve.',
            keyFact:
              'Major 7th = M3+m3+M3 (C-E-G-B). Dominant 7th = M3+m3+m3 (C-E-G-Bb).',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['c/4', 'e/4', 'g/4', 'b/4'], duration: 'w' },
              ],
            },
            diagramType: 'chord',
          },
          {
            id: 'ch-s11',
            topic: 'Minor 7th Chord',
            explanation:
              'A minor 7th chord stacks m3 + M3 + m3, using a minor triad with a minor 7th on top (e.g., C-Eb-G-Bb). It has a warm, mellow sound and is extremely common in jazz and pop music. The ii chord in a major key is typically a minor 7th.',
            keyFact:
              'Minor 7th = m3 + M3 + m3 (e.g., C-Eb-G-Bb).',
          },
          {
            id: 'ch-s12',
            topic: 'Half-Diminished & Fully Diminished 7th',
            explanation:
              'A half-diminished 7th stacks m3 + m3 + M3, using a diminished triad with a minor 7th (e.g., C-Eb-Gb-Bb). A fully diminished 7th stacks m3 + m3 + m3, using a diminished triad with a diminished 7th (e.g., C-Eb-Gb-Bbb). The fully diminished chord divides the octave into equal minor 3rds.',
            keyFact:
              'Half-diminished = m3+m3+M3. Fully diminished = m3+m3+m3.',
          },
        ],
        questions: [
          {
            id: 'ch-q15',
            text: 'How many notes does a seventh chord have?',
            type: 'multiple-choice',
            options: ['3', '4', '5', '6'],
            correctAnswer: 1,
            explanation:
              'A seventh chord has four notes: root, 3rd, 5th, and 7th.',
            topic: 'What Is a Seventh Chord?',
            difficulty: 1,
          },
          {
            id: 'ch-q16',
            text: 'A dominant 7th chord has a major triad with a minor 7th.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'A dominant 7th = major triad + minor 7th (M3 + m3 + m3).',
            topic: 'Major 7th & Dominant 7th',
            difficulty: 1,
          },
          {
            id: 'ch-q17',
            text: 'What are the notes of a C major 7th chord?',
            type: 'multiple-choice',
            options: [
              'C-E-G-Bb',
              'C-E-G-B',
              'C-Eb-G-Bb',
              'C-Eb-Gb-Bb',
            ],
            correctAnswer: 1,
            explanation:
              'C major 7th = C (root) + E (major 3rd) + G (perfect 5th) + B (major 7th).',
            topic: 'Major 7th & Dominant 7th',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['c/4', 'e/4', 'g/4', 'b/4'], duration: 'w' },
              ],
            },
            diagramType: 'chord',
            difficulty: 2,
          },
          {
            id: 'ch-q18',
            text: 'What intervals make up a minor 7th chord?',
            type: 'multiple-choice',
            options: [
              'M3 + m3 + m3',
              'm3 + M3 + m3',
              'm3 + m3 + M3',
              'M3 + m3 + M3',
            ],
            correctAnswer: 1,
            explanation:
              'A minor 7th chord is built m3 + M3 + m3 (minor triad + minor 7th).',
            topic: 'Minor 7th Chord',
            difficulty: 2,
          },
          {
            id: 'ch-q19',
            text: 'A fully diminished 7th chord consists of three stacked minor 3rds.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'A fully diminished 7th = m3 + m3 + m3, dividing the octave into four equal parts.',
            topic: 'Half-Diminished & Fully Diminished 7th',
            difficulty: 2,
          },
          {
            id: 'ch-q20',
            text: 'Which seventh chord type uses a diminished triad with a minor 7th?',
            type: 'multiple-choice',
            options: [
              'Major 7th',
              'Dominant 7th',
              'Half-diminished 7th',
              'Fully diminished 7th',
            ],
            correctAnswer: 2,
            explanation:
              'The half-diminished 7th combines a diminished triad (m3 + m3) with a minor 7th (+ M3).',
            topic: 'Half-Diminished & Fully Diminished 7th',
            difficulty: 3,
          },
          {
            id: 'ch-q21',
            text: 'What are the notes of a C dominant 7th chord?',
            type: 'multiple-choice',
            options: [
              'C-E-G-B',
              'C-E-G-Bb',
              'C-Eb-G-Bb',
              'C-Eb-Gb-Bb',
            ],
            correctAnswer: 1,
            explanation:
              'C dominant 7th = C (root) + E (major 3rd) + G (perfect 5th) + Bb (minor 7th).',
            topic: 'Major 7th & Dominant 7th',
            difficulty: 2,
          },
        ],
      },
    ],
  },
]
