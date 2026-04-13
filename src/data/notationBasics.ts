import type { Module } from '../types'

export const notationBasicsModules: Module[] = [
  // ── Module 1: Clefs & the Staff ───────────────────────────────────────────
  {
    id: 'nb-clefs-staff',
    courseId: 'notation-basics',
    title: 'Clefs & the Staff',
    description:
      'Learn the five-line staff and the clefs that give it meaning.',
    icon: '🎼',
    order: 1,
    lessons: [
      {
        id: 'nb-m1-l1',
        title: 'Introduction to Clefs',
        xpReward: 15,
        slides: [
          {
            id: 'nb-s1',
            topic: 'The Five-Line Staff',
            explanation:
              'The musical staff consists of five horizontal lines and four spaces. Each line and space represents a different pitch. Notes placed higher on the staff sound higher; notes placed lower sound lower.',
            keyFact:
              'The staff has five lines and four spaces, each representing a different pitch.',
          },
          {
            id: 'nb-s2',
            topic: 'The Treble Clef',
            explanation:
              'The treble clef, also called the G clef, curls around the second line of the staff, designating it as the note G above middle C. It is the most commonly used clef and is standard for instruments such as violin, flute, trumpet, and the right hand of the piano.',
            keyFact:
              'The treble clef marks the second staff line as G4.',
            staffConfig: {
              clef: 'treble',
              notes: [],
            },
            diagramType: 'notation',
          },
          {
            id: 'nb-s3',
            topic: 'The Bass Clef',
            explanation:
              'The bass clef, also called the F clef, has two dots that straddle the fourth line of the staff, designating it as F below middle C. It is used for lower-pitched instruments such as cello, bassoon, trombone, and the left hand of the piano.',
            keyFact:
              'The bass clef marks the fourth staff line as F3.',
            staffConfig: {
              clef: 'bass',
              notes: [],
            },
            diagramType: 'notation',
          },
          {
            id: 'nb-s4',
            topic: 'The Alto Clef',
            explanation:
              'The alto clef is a C clef that centers on the third line of the staff, designating it as middle C. It is primarily used by the viola. The C clef can move to different lines, but when on the third line it is specifically called the alto clef.',
            keyFact:
              'The alto clef places middle C on the third staff line and is the standard clef for viola.',
            staffConfig: {
              clef: 'alto',
              notes: [],
            },
            diagramType: 'notation',
          },
          {
            id: 'nb-s5',
            topic: 'The Tenor Clef',
            explanation:
              'The tenor clef is another position of the C clef, centered on the fourth line of the staff to designate it as middle C. It is used by the cello, bassoon, and trombone when playing in their upper registers, reducing the need for ledger lines.',
            keyFact:
              'The tenor clef places middle C on the fourth staff line.',
            staffConfig: {
              clef: 'tenor',
              notes: [],
            },
            diagramType: 'notation',
          },
        ],
        questions: [
          {
            id: 'nb-q1',
            text: 'How many lines does a standard musical staff have?',
            type: 'multiple-choice',
            options: ['3', '4', '5', '6'],
            correctAnswer: 2,
            explanation:
              'The standard musical staff has five horizontal lines and four spaces.',
            topic: 'The Five-Line Staff',
            difficulty: 1,
          },
          {
            id: 'nb-q2',
            text: 'The treble clef is also known as the G clef because it designates the second line as G.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'The treble clef curls around the second line of the staff, marking it as the note G4.',
            topic: 'The Treble Clef',
            difficulty: 1,
          },
          {
            id: 'nb-q3',
            text: 'Which line does the bass clef designate as F?',
            type: 'multiple-choice',
            options: [
              'Second line',
              'Third line',
              'Fourth line',
              'Fifth line',
            ],
            correctAnswer: 2,
            explanation:
              'The bass clef places its two dots around the fourth line, designating it as F3.',
            topic: 'The Bass Clef',
            difficulty: 1,
          },
          {
            id: 'nb-q4',
            text: 'Which instrument primarily uses the alto clef?',
            type: 'multiple-choice',
            options: ['Violin', 'Cello', 'Viola', 'Trumpet'],
            correctAnswer: 2,
            explanation:
              'The viola is the instrument that primarily reads music in the alto clef.',
            topic: 'The Alto Clef',
            difficulty: 2,
          },
          {
            id: 'nb-q5',
            text: 'The tenor clef places middle C on the third line of the staff.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation:
              'The tenor clef places middle C on the fourth line, not the third. The alto clef places middle C on the third line.',
            topic: 'The Tenor Clef',
            difficulty: 2,
          },
          {
            id: 'nb-q6',
            text: 'Which clef would a flute player read?',
            type: 'multiple-choice',
            options: ['Bass clef', 'Alto clef', 'Tenor clef', 'Treble clef'],
            correctAnswer: 3,
            explanation:
              'The flute is a high-pitched instrument that reads music in the treble clef.',
            topic: 'The Treble Clef',
            difficulty: 1,
          },
          {
            id: 'nb-q7',
            text: 'Both the alto clef and tenor clef are types of C clefs.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'Both clefs use the same C clef symbol placed on different lines: the third line for alto and the fourth line for tenor.',
            topic: 'The Alto Clef',
            difficulty: 2,
          },
          {
            id: 'nb-q8',
            text: 'Which clef is commonly used for the left hand of the piano?',
            type: 'multiple-choice',
            options: [
              'Treble clef',
              'Bass clef',
              'Alto clef',
              'Tenor clef',
            ],
            correctAnswer: 1,
            explanation:
              'The left hand of the piano typically plays lower notes and reads from the bass clef.',
            topic: 'The Bass Clef',
            difficulty: 1,
          },
        ],
      },
    ],
  },

  // ── Module 2: Note Names & Ledger Lines ───────────────────────────────────
  {
    id: 'nb-note-names',
    courseId: 'notation-basics',
    title: 'Note Names & Ledger Lines',
    description:
      'Identify notes on treble and bass clef staves and learn about ledger lines.',
    icon: '🎵',
    order: 2,
    lessons: [
      {
        id: 'nb-m2-l1',
        title: 'Reading Notes on the Staff',
        xpReward: 15,
        slides: [
          {
            id: 'nb-s6',
            topic: 'Treble Clef Lines',
            explanation:
              'The lines of the treble clef from bottom to top are E, G, B, D, and F. A common mnemonic is "Every Good Boy Does Fine." These notes are essential for reading melodies in most instruments.',
            keyFact:
              'Treble clef lines from bottom to top: E, G, B, D, F.',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['e/4'], duration: 'w' },
                { keys: ['g/4'], duration: 'w' },
                { keys: ['b/4'], duration: 'w' },
                { keys: ['d/5'], duration: 'w' },
                { keys: ['f/5'], duration: 'w' },
              ],
              showLabels: true,
            },
            diagramType: 'notation',
          },
          {
            id: 'nb-s7',
            topic: 'Treble Clef Spaces',
            explanation:
              'The spaces of the treble clef from bottom to top spell F-A-C-E. This is easy to remember because the spaces literally spell the word "FACE." Together with the lines, these notes cover the full range of the treble staff.',
            keyFact:
              'Treble clef spaces from bottom to top: F, A, C, E.',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['f/4'], duration: 'w' },
                { keys: ['a/4'], duration: 'w' },
                { keys: ['c/5'], duration: 'w' },
                { keys: ['e/5'], duration: 'w' },
              ],
              showLabels: true,
            },
            diagramType: 'notation',
          },
          {
            id: 'nb-s8',
            topic: 'Bass Clef Lines',
            explanation:
              'The lines of the bass clef from bottom to top are G, B, D, F, and A. A common mnemonic is "Good Boys Do Fine Always." The bass clef covers a range roughly two octaves below the treble clef.',
            keyFact:
              'Bass clef lines from bottom to top: G, B, D, F, A.',
            staffConfig: {
              clef: 'bass',
              notes: [
                { keys: ['g/2'], duration: 'w' },
                { keys: ['b/2'], duration: 'w' },
                { keys: ['d/3'], duration: 'w' },
                { keys: ['f/3'], duration: 'w' },
                { keys: ['a/3'], duration: 'w' },
              ],
              showLabels: true,
            },
            diagramType: 'notation',
          },
          {
            id: 'nb-s9',
            topic: 'Bass Clef Spaces',
            explanation:
              'The spaces of the bass clef from bottom to top are A, C, E, and G. A common mnemonic is "All Cows Eat Grass." These spaces, combined with the lines, give the full range of the bass staff.',
            keyFact:
              'Bass clef spaces from bottom to top: A, C, E, G.',
            staffConfig: {
              clef: 'bass',
              notes: [
                { keys: ['a/2'], duration: 'w' },
                { keys: ['c/3'], duration: 'w' },
                { keys: ['e/3'], duration: 'w' },
                { keys: ['g/3'], duration: 'w' },
              ],
              showLabels: true,
            },
            diagramType: 'notation',
          },
          {
            id: 'nb-s10',
            topic: 'Ledger Lines & Middle C',
            explanation:
              'Ledger lines are short lines added above or below the staff to extend its range. Middle C (C4) sits on one ledger line below the treble clef or one ledger line above the bass clef. It is the linking pitch between the two staves in the grand staff.',
            keyFact:
              'Middle C sits on one ledger line below the treble staff or one ledger line above the bass staff.',
            staffConfig: {
              clef: 'treble',
              notes: [{ keys: ['c/4'], duration: 'w' }],
              showLabels: true,
            },
            diagramType: 'notation',
          },
        ],
        questions: [
          {
            id: 'nb-q9',
            text: 'What are the treble clef line notes from bottom to top?',
            type: 'multiple-choice',
            options: [
              'E, G, B, D, F',
              'F, A, C, E, G',
              'G, B, D, F, A',
              'D, F, A, C, E',
            ],
            correctAnswer: 0,
            explanation:
              'The treble clef lines from bottom to top are E, G, B, D, F — "Every Good Boy Does Fine."',
            topic: 'Treble Clef Lines',
            difficulty: 1,
          },
          {
            id: 'nb-q10',
            text: 'The spaces of the treble clef spell the word FACE.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'The four spaces of the treble clef from bottom to top are F, A, C, E, which spells FACE.',
            topic: 'Treble Clef Spaces',
            difficulty: 1,
          },
          {
            id: 'nb-q11',
            text: 'What are the bass clef line notes from bottom to top?',
            type: 'multiple-choice',
            options: [
              'E, G, B, D, F',
              'A, C, E, G, B',
              'G, B, D, F, A',
              'F, A, C, E, G',
            ],
            correctAnswer: 2,
            explanation:
              'The bass clef lines from bottom to top are G, B, D, F, A — "Good Boys Do Fine Always."',
            topic: 'Bass Clef Lines',
            difficulty: 1,
          },
          {
            id: 'nb-q12',
            text: 'What note sits on one ledger line below the treble staff?',
            type: 'multiple-choice',
            options: ['A', 'B', 'C', 'D'],
            correctAnswer: 2,
            explanation:
              'Middle C (C4) sits on the first ledger line below the treble clef staff.',
            topic: 'Ledger Lines & Middle C',
            staffConfig: {
              clef: 'treble',
              notes: [{ keys: ['c/4'], duration: 'w' }],
            },
            diagramType: 'notation',
            difficulty: 2,
          },
          {
            id: 'nb-q13',
            text: 'What are the bass clef space notes from bottom to top?',
            type: 'multiple-choice',
            options: [
              'F, A, C, E',
              'A, C, E, G',
              'G, B, D, F',
              'B, D, F, A',
            ],
            correctAnswer: 1,
            explanation:
              'The bass clef spaces from bottom to top are A, C, E, G — "All Cows Eat Grass."',
            topic: 'Bass Clef Spaces',
            difficulty: 1,
          },
          {
            id: 'nb-q14',
            text: 'Middle C is in the same position on both the treble and bass clef staves.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation:
              'Middle C appears on one ledger line below the treble staff and one ledger line above the bass staff — different physical positions on each staff, but the same pitch.',
            topic: 'Ledger Lines & Middle C',
            difficulty: 2,
          },
          {
            id: 'nb-q15',
            text: 'What is the second space from the bottom in the treble clef?',
            type: 'multiple-choice',
            options: ['F', 'A', 'C', 'E'],
            correctAnswer: 1,
            explanation:
              'The treble clef spaces from bottom to top are F, A, C, E. The second space is A.',
            topic: 'Treble Clef Spaces',
            difficulty: 2,
          },
        ],
      },
    ],
  },

  // ── Module 3: Accidentals ─────────────────────────────────────────────────
  {
    id: 'nb-accidentals',
    courseId: 'notation-basics',
    title: 'Accidentals',
    description:
      'Understand sharps, flats, naturals, and enharmonic equivalents.',
    icon: '♯',
    order: 3,
    lessons: [
      {
        id: 'nb-m3-l1',
        title: 'Sharps, Flats, and Naturals',
        xpReward: 15,
        slides: [
          {
            id: 'nb-s11',
            topic: 'The Sharp',
            explanation:
              'A sharp (♯) raises a note by one half step. For example, F♯ is one half step higher than F. When a sharp appears before a note, it applies to that note for the rest of the measure unless cancelled by another accidental.',
            keyFact:
              'A sharp raises a pitch by one half step.',
            staffConfig: {
              clef: 'treble',
              notes: [{ keys: ['f/4'], duration: 'w', accidental: '#' }],
              showLabels: true,
            },
            diagramType: 'notation',
          },
          {
            id: 'nb-s12',
            topic: 'The Flat',
            explanation:
              'A flat (♭) lowers a note by one half step. For example, B♭ is one half step lower than B. Like sharps, a flat applies for the remainder of the measure in which it appears.',
            keyFact:
              'A flat lowers a pitch by one half step.',
            staffConfig: {
              clef: 'treble',
              notes: [{ keys: ['b/4'], duration: 'w', accidental: 'b' }],
              showLabels: true,
            },
            diagramType: 'notation',
          },
          {
            id: 'nb-s13',
            topic: 'The Natural',
            explanation:
              'A natural (♮) cancels a previous sharp or flat, returning the note to its unaltered pitch. For example, if a key signature has B♭, placing a natural before B restores it to B natural for that measure.',
            keyFact:
              'A natural cancels any sharp or flat applied to the note.',
          },
          {
            id: 'nb-s14',
            topic: 'Double Sharps & Double Flats',
            explanation:
              'A double sharp (𝄪) raises a note by two half steps (one whole step), and a double flat (𝄫) lowers a note by two half steps. These are less common but appear when composers need to maintain correct spelling within a key.',
            keyFact:
              'Double sharps raise by a whole step; double flats lower by a whole step.',
          },
          {
            id: 'nb-s15',
            topic: 'Enharmonic Equivalents',
            explanation:
              'Enharmonic equivalents are notes that sound the same but are spelled differently. For example, F♯ and G♭ produce the same pitch, as do C♯ and D♭. The choice of spelling depends on the musical context and key.',
            keyFact:
              'Enharmonic equivalents sound identical but have different names (e.g., F♯ = G♭).',
          },
        ],
        questions: [
          {
            id: 'nb-q16',
            text: 'What does a sharp do to a note?',
            type: 'multiple-choice',
            options: [
              'Lowers it by a half step',
              'Raises it by a half step',
              'Raises it by a whole step',
              'Cancels a previous accidental',
            ],
            correctAnswer: 1,
            explanation:
              'A sharp raises a note by one half step.',
            topic: 'The Sharp',
            difficulty: 1,
          },
          {
            id: 'nb-q17',
            text: 'A flat lowers a note by one whole step.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation:
              'A flat lowers a note by one half step, not a whole step.',
            topic: 'The Flat',
            difficulty: 1,
          },
          {
            id: 'nb-q18',
            text: 'What is the purpose of a natural sign?',
            type: 'multiple-choice',
            options: [
              'Raises a note by a half step',
              'Lowers a note by a half step',
              'Cancels a previous sharp or flat',
              'Raises a note by a whole step',
            ],
            correctAnswer: 2,
            explanation:
              'A natural cancels any previous sharp or flat, returning the note to its unaltered pitch.',
            topic: 'The Natural',
            difficulty: 1,
          },
          {
            id: 'nb-q19',
            text: 'Which of the following are enharmonic equivalents?',
            type: 'multiple-choice',
            options: ['C♯ and D♭', 'C and D', 'E and F♯', 'A♭ and B'],
            correctAnswer: 0,
            explanation:
              'C♯ and D♭ sound the same pitch and are enharmonic equivalents.',
            topic: 'Enharmonic Equivalents',
            difficulty: 2,
          },
          {
            id: 'nb-q20',
            text: 'A double sharp raises a note by two half steps (one whole step).',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'A double sharp raises a note by two half steps, which equals one whole step.',
            topic: 'Double Sharps & Double Flats',
            difficulty: 2,
          },
          {
            id: 'nb-q21',
            text: 'An accidental applies to a note for how long?',
            type: 'multiple-choice',
            options: [
              'Only that one note',
              'The rest of the measure',
              'The rest of the piece',
              'The rest of the line',
            ],
            correctAnswer: 1,
            explanation:
              'An accidental applies to every occurrence of that note for the remainder of the measure, unless cancelled by another accidental.',
            topic: 'The Sharp',
            difficulty: 2,
          },
          {
            id: 'nb-q22',
            text: 'Which pair of notes are NOT enharmonic equivalents?',
            type: 'multiple-choice',
            options: ['F♯ and G♭', 'C♯ and D♭', 'E and F♭', 'A and B♭'],
            correctAnswer: 3,
            explanation:
              'A and B♭ are a half step apart and are not enharmonic equivalents. E and F♭ are enharmonic because F♭ sounds the same as E.',
            topic: 'Enharmonic Equivalents',
            difficulty: 3,
          },
        ],
      },
    ],
  },
]
