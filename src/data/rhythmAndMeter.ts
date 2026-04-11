import type { Module } from '../types'

export const rhythmAndMeterModules: Module[] = [
  // ── Module 1: Note Values & Rests ─────────────────────────────────────────
  {
    id: 'rm-note-values',
    courseId: 'rhythm-and-meter',
    title: 'Note Values & Rests',
    description:
      'Learn the duration of whole, half, quarter, eighth, and sixteenth notes and their equivalent rests.',
    icon: '🎵',
    order: 1,
    lessons: [
      {
        id: 'rm-m1-l1',
        title: 'Understanding Note Durations',
        xpReward: 15,
        slides: [
          {
            id: 'rm-s1',
            topic: 'Whole & Half Notes',
            explanation:
              'A whole note lasts for four beats in common time (4/4) and is represented by an open oval with no stem. A half note lasts for two beats and is an open oval with a stem. Each whole note can be divided into two half notes.',
            keyFact:
              'Whole note = 4 beats; half note = 2 beats.',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['c/4'], duration: 'w' },
              ],
              timeSignature: '4/4',
            },
            diagramType: 'notation',
          },
          {
            id: 'rm-s2',
            topic: 'Quarter & Eighth Notes',
            explanation:
              'A quarter note lasts for one beat and is a filled-in oval with a stem. An eighth note lasts for half a beat and adds a single flag to the stem. Two eighth notes equal one quarter note, and they are often beamed together.',
            keyFact:
              'Quarter note = 1 beat; eighth note = 1/2 beat.',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['c/4'], duration: 'q' },
                { keys: ['d/4'], duration: 'q' },
                { keys: ['e/4'], duration: '8' },
                { keys: ['f/4'], duration: '8' },
              ],
              timeSignature: '4/4',
            },
            diagramType: 'notation',
          },
          {
            id: 'rm-s3',
            topic: 'Sixteenth Notes',
            explanation:
              'A sixteenth note lasts for one quarter of a beat and has two flags on its stem. Four sixteenth notes equal one quarter note. They are frequently beamed together in groups for easier reading.',
            keyFact:
              'Sixteenth note = 1/4 beat; four sixteenths equal one quarter note.',
          },
          {
            id: 'rm-s4',
            topic: 'Rests',
            explanation:
              'Every note value has a corresponding rest of equal duration. A whole rest hangs below a staff line, a half rest sits on top of a line, a quarter rest is a zigzag shape, and eighth and sixteenth rests use flags. Rests indicate silence for a specific duration.',
            keyFact:
              'Each note value has a matching rest: whole rest (4 beats), half rest (2 beats), quarter rest (1 beat).',
          },
        ],
        questions: [
          {
            id: 'rm-q1',
            text: 'How many beats does a whole note receive in 4/4 time?',
            type: 'multiple-choice',
            options: ['1', '2', '3', '4'],
            correctAnswer: 3,
            explanation:
              'In 4/4 time, a whole note receives four beats, filling an entire measure.',
            topic: 'Whole & Half Notes',
            difficulty: 1,
          },
          {
            id: 'rm-q2',
            text: 'A half note receives two beats in common time.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'A half note lasts for two beats in 4/4 (common) time.',
            topic: 'Whole & Half Notes',
            difficulty: 1,
          },
          {
            id: 'rm-q3',
            text: 'How many eighth notes equal one quarter note?',
            type: 'multiple-choice',
            options: ['1', '2', '4', '8'],
            correctAnswer: 1,
            explanation:
              'Two eighth notes have the same total duration as one quarter note.',
            topic: 'Quarter & Eighth Notes',
            difficulty: 1,
          },
          {
            id: 'rm-q4',
            text: 'How many sixteenth notes fit in one beat of 4/4 time?',
            type: 'multiple-choice',
            options: ['2', '4', '8', '16'],
            correctAnswer: 1,
            explanation:
              'Four sixteenth notes equal one quarter note, which is one beat in 4/4 time.',
            topic: 'Sixteenth Notes',
            difficulty: 2,
          },
          {
            id: 'rm-q5',
            text: 'A whole rest hangs below a staff line, while a half rest sits on top of a line.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'The whole rest hangs below the line (like a hole in the ground), and the half rest sits on top (like a hat).',
            topic: 'Rests',
            difficulty: 2,
          },
          {
            id: 'rm-q6',
            text: 'How many quarter notes equal one whole note?',
            type: 'multiple-choice',
            options: ['2', '3', '4', '8'],
            correctAnswer: 2,
            explanation:
              'A whole note equals four quarter notes: 4 beats divided by 1 beat each.',
            topic: 'Whole & Half Notes',
            difficulty: 1,
          },
          {
            id: 'rm-q7',
            text: 'An eighth note has two flags on its stem.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation:
              'An eighth note has one flag. A sixteenth note has two flags.',
            topic: 'Quarter & Eighth Notes',
            difficulty: 2,
          },
        ],
      },
    ],
  },

  // ── Module 2: Time Signatures ─────────────────────────────────────────────
  {
    id: 'rm-time-signatures',
    courseId: 'rhythm-and-meter',
    title: 'Time Signatures',
    description:
      'Learn simple and compound meters and how time signatures organize music.',
    icon: '⏱️',
    order: 2,
    lessons: [
      {
        id: 'rm-m2-l1',
        title: 'Reading Time Signatures',
        xpReward: 15,
        slides: [
          {
            id: 'rm-s5',
            topic: 'What Time Signatures Tell Us',
            explanation:
              'A time signature appears at the beginning of a piece. The top number indicates how many beats are in each measure. The bottom number indicates which note value receives one beat. For example, in 4/4 time there are four beats per measure and the quarter note gets one beat.',
            keyFact:
              'Top number = beats per measure; bottom number = which note gets one beat.',
          },
          {
            id: 'rm-s6',
            topic: 'Simple Meter',
            explanation:
              'In simple meter, each beat divides naturally into two equal parts. The most common simple meters are 2/4 (two quarter-note beats per measure), 3/4 (three quarter-note beats, as in a waltz), and 4/4 (four quarter-note beats, also called common time).',
            keyFact:
              'Simple meters (2/4, 3/4, 4/4) divide each beat into two equal parts.',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['c/4'], duration: 'q' },
                { keys: ['e/4'], duration: 'q' },
                { keys: ['g/4'], duration: 'q' },
                { keys: ['c/5'], duration: 'q' },
              ],
              timeSignature: '4/4',
            },
            diagramType: 'notation',
          },
          {
            id: 'rm-s7',
            topic: 'Compound Meter',
            explanation:
              'In compound meter, each beat divides naturally into three equal parts. Common compound meters include 6/8 (two dotted-quarter beats per measure), 9/8 (three dotted-quarter beats), and 12/8 (four dotted-quarter beats). The top number is always divisible by 3.',
            keyFact:
              'Compound meters (6/8, 9/8, 12/8) divide each beat into three equal parts.',
            staffConfig: {
              clef: 'treble',
              notes: [
                { keys: ['c/4'], duration: '8' },
                { keys: ['e/4'], duration: '8' },
                { keys: ['g/4'], duration: '8' },
                { keys: ['c/5'], duration: '8' },
                { keys: ['g/4'], duration: '8' },
                { keys: ['e/4'], duration: '8' },
              ],
              timeSignature: '6/8',
            },
            diagramType: 'notation',
          },
          {
            id: 'rm-s8',
            topic: 'Simple vs. Compound',
            explanation:
              'The key distinction is beat subdivision. Simple meter divides each beat into two; compound meter divides each beat into three. A 6/8 measure has six eighth notes but only two main beats (each a dotted quarter), while 3/4 also has six eighth notes but three main beats (each a quarter).',
            keyFact:
              '6/8 has two main beats with triple subdivision; 3/4 has three main beats with duple subdivision.',
          },
        ],
        questions: [
          {
            id: 'rm-q8',
            text: 'In a 3/4 time signature, how many beats are in each measure?',
            type: 'multiple-choice',
            options: ['2', '3', '4', '6'],
            correctAnswer: 1,
            explanation:
              'The top number tells us there are 3 beats per measure in 3/4 time.',
            topic: 'Simple Meter',
            difficulty: 1,
          },
          {
            id: 'rm-q9',
            text: 'In 4/4 time, the bottom number means the quarter note gets one beat.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'The bottom number 4 represents the quarter note, meaning the quarter note receives one beat.',
            topic: 'What Time Signatures Tell Us',
            difficulty: 1,
          },
          {
            id: 'rm-q10',
            text: 'Which of these is a compound time signature?',
            type: 'multiple-choice',
            options: ['2/4', '3/4', '4/4', '6/8'],
            correctAnswer: 3,
            explanation:
              '6/8 is compound because the top number (6) is divisible by 3, giving two groups of three eighth notes per measure.',
            topic: 'Compound Meter',
            difficulty: 2,
          },
          {
            id: 'rm-q11',
            text: 'How many main beats does a 6/8 measure have?',
            type: 'multiple-choice',
            options: ['2', '3', '4', '6'],
            correctAnswer: 0,
            explanation:
              'Although there are six eighth notes, 6/8 has two main beats, each a dotted quarter note.',
            topic: 'Compound Meter',
            difficulty: 2,
          },
          {
            id: 'rm-q12',
            text: '3/4 and 6/8 have the same number of main beats per measure.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation:
              '3/4 has three main beats per measure, while 6/8 has two main beats per measure.',
            topic: 'Simple vs. Compound',
            difficulty: 2,
          },
          {
            id: 'rm-q13',
            text: 'What does the bottom number of a time signature indicate?',
            type: 'multiple-choice',
            options: [
              'Beats per measure',
              'Note value that gets one beat',
              'Tempo of the piece',
              'Number of measures',
            ],
            correctAnswer: 1,
            explanation:
              'The bottom number indicates which note value receives one beat (4 = quarter, 8 = eighth, 2 = half).',
            topic: 'What Time Signatures Tell Us',
            difficulty: 1,
          },
          {
            id: 'rm-q14',
            text: 'In compound meter, each beat divides naturally into how many equal parts?',
            type: 'multiple-choice',
            options: ['2', '3', '4', '6'],
            correctAnswer: 1,
            explanation:
              'Compound meter divides each beat into three equal parts, unlike simple meter which divides into two.',
            topic: 'Compound Meter',
            difficulty: 2,
          },
        ],
      },
    ],
  },

  // ── Module 3: Dots, Ties & Syncopation ────────────────────────────────────
  {
    id: 'rm-dots-ties',
    courseId: 'rhythm-and-meter',
    title: 'Dots, Ties & Syncopation',
    description:
      'Extend note values with dots and ties, and learn about syncopation.',
    icon: '🔗',
    order: 3,
    lessons: [
      {
        id: 'rm-m3-l1',
        title: 'Extending Rhythms',
        xpReward: 15,
        slides: [
          {
            id: 'rm-s9',
            topic: 'Dotted Notes',
            explanation:
              'A dot placed after a note increases its duration by half of its original value. A dotted half note lasts 3 beats (2 + 1), a dotted quarter note lasts 1.5 beats (1 + 0.5), and a dotted eighth note lasts 0.75 beats (0.5 + 0.25).',
            keyFact:
              'A dot adds half the note\'s value: dotted half = 3 beats, dotted quarter = 1.5 beats.',
          },
          {
            id: 'rm-s10',
            topic: 'Ties',
            explanation:
              'A tie is a curved line connecting two notes of the same pitch. The tied notes are played as a single sustained sound equal to the sum of both values. Ties allow notes to extend across barlines, which dots cannot do.',
            keyFact:
              'A tie connects two notes of the same pitch into one longer note.',
          },
          {
            id: 'rm-s11',
            topic: 'Dots vs. Ties',
            explanation:
              'Dots and ties both extend note durations, but ties can cross barlines and connect any combination of rhythmic values. Dots can only add exactly half the original value. A dotted half note and a half note tied to a quarter note both last 3 beats.',
            keyFact:
              'Ties cross barlines; dots cannot. Both extend duration.',
          },
          {
            id: 'rm-s12',
            topic: 'Syncopation',
            explanation:
              'Syncopation places emphasis on beats or parts of beats that are normally weak or unaccented. It creates rhythmic surprise and energy. Common syncopation techniques include accenting the "and" of a beat, placing notes on off-beats, or tying notes over strong beats.',
            keyFact:
              'Syncopation emphasizes normally weak beats or off-beats.',
          },
        ],
        questions: [
          {
            id: 'rm-q15',
            text: 'How many beats does a dotted half note receive in 4/4 time?',
            type: 'multiple-choice',
            options: ['2', '2.5', '3', '4'],
            correctAnswer: 2,
            explanation:
              'A half note is 2 beats; the dot adds half (1 beat), totaling 3 beats.',
            topic: 'Dotted Notes',
            difficulty: 1,
          },
          {
            id: 'rm-q16',
            text: 'A tie connects two notes of different pitches.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation:
              'A tie connects two notes of the same pitch. A curved line between different pitches is a slur, not a tie.',
            topic: 'Ties',
            difficulty: 1,
          },
          {
            id: 'rm-q17',
            text: 'How many beats does a dotted quarter note receive in 4/4 time?',
            type: 'multiple-choice',
            options: ['1', '1.5', '2', '2.5'],
            correctAnswer: 1,
            explanation:
              'A quarter note is 1 beat; the dot adds half (0.5 beats), totaling 1.5 beats.',
            topic: 'Dotted Notes',
            difficulty: 2,
          },
          {
            id: 'rm-q18',
            text: 'What is syncopation?',
            type: 'multiple-choice',
            options: [
              'Playing notes very quickly',
              'Emphasis on normally weak beats',
              'Playing notes very slowly',
              'Repeating the same note',
            ],
            correctAnswer: 1,
            explanation:
              'Syncopation is the placement of rhythmic stress on normally weak or off-beats.',
            topic: 'Syncopation',
            difficulty: 2,
          },
          {
            id: 'rm-q19',
            text: 'A dot can extend a note across a barline.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 1,
            explanation:
              'Only ties can extend a note across a barline. Dots add duration within the note\'s value but cannot cross barlines.',
            topic: 'Dots vs. Ties',
            difficulty: 2,
          },
          {
            id: 'rm-q20',
            text: 'A half note tied to a quarter note lasts how many beats?',
            type: 'multiple-choice',
            options: ['2', '2.5', '3', '3.5'],
            correctAnswer: 2,
            explanation:
              'A half note (2 beats) tied to a quarter note (1 beat) equals 3 beats total.',
            topic: 'Ties',
            difficulty: 1,
          },
          {
            id: 'rm-q21',
            text: 'A dotted whole note lasts for 6 beats in 4/4 time.',
            type: 'true-false',
            options: ['True', 'False'],
            correctAnswer: 0,
            explanation:
              'A whole note is 4 beats; the dot adds half (2 beats), totaling 6 beats. This would need a tie across barlines in 4/4.',
            topic: 'Dotted Notes',
            difficulty: 3,
          },
        ],
      },
    ],
  },
]
