/* Bubblegum × Live Set — Quiz screens
   Three states share the same skeleton:
   1. BGQuizDefault  — question, no answer yet
   2. BGQuizCorrect  — answered, "Encore!" celebration
   3. BGQuizWrong    — answered, "Off-key" warm correction
*/

/* Shared shell */
function QuizShell({ progress = [true, true, false, false], step = '03/04',
                     prompt, selected, options, feedback, footer }) {
  return (
    <div style={{ ...bgPageBase, overflow: 'hidden',
      display: 'flex', flexDirection: 'column' }}>

      {/* header */}
      <div style={{ padding: '18px 20px', display: 'flex',
        alignItems: 'center', gap: 10 }}>
        <button style={{ width: 36, height: 36, borderRadius: 999,
          background: BG.white, border: 0, fontSize: 16, fontWeight: 900,
          color: BG.plum, cursor: 'pointer' }}>✕</button>
        <div style={{ flex: 1, display: 'flex', gap: 4 }}>
          {progress.map((on, i) => (
            <div key={i} style={{ flex: 1, height: 8, borderRadius: 99,
              background: on ? BG.peach : BG.white + '99' }} />
          ))}
        </div>
        <Mono color={BG.plumSoft}>{step}</Mono>
      </div>

      {/* question */}
      <div style={{ padding: '4px 20px', flex: 1, overflow: 'auto' }}>
        <Mono color={BG.plumSoft}>track a3 · question</Mono>
        <p style={{ margin: '4px 0 0', fontSize: 22, fontWeight: 900,
          letterSpacing: '-0.02em', lineHeight: 1.15, color: BG.plum }}>
          {prompt}
        </p>

        {/* staff */}
        <div style={bubbleCard({ background: BG.white,
          padding: 22, marginTop: 14, display: 'flex',
          justifyContent: 'center', position: 'relative', overflow: 'hidden' })}>
          <Doodle ch="♪" x={18} y={14} size={18} rot={-15} color={BG.peach} op={.4} />
          <TrebleStaff />
        </div>

        {/* options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 10, marginTop: 14 }}>
          {options.map(o => {
            const isSelected = o.l === selected;
            const isCorrect = o.correct;
            // colors:
            const state = !selected ? 'idle'
              : isSelected && isCorrect ? 'right'
              : isSelected && !isCorrect ? 'wrong'
              : !isSelected && isCorrect ? 'reveal'
              : 'dim';
            const bg = {
              idle:   BG.white,
              right:  BG.mint,
              wrong:  BG.cherry + '33',
              reveal: BG.mint,
              dim:    BG.white,
            }[state];
            const borderColor = {
              idle:   BG.cream,
              right:  BG.plum,
              wrong:  BG.cherry,
              reveal: BG.plum,
              dim:    BG.cream,
            }[state];
            return (
              <div key={o.l} style={{
                background: bg,
                border: `3px solid ${borderColor}`,
                borderRadius: 18, padding: '16px 12px',
                fontWeight: 900, fontSize: 22, textAlign: 'center',
                color: BG.plum, position: 'relative',
                opacity: state === 'dim' ? .55 : 1,
              }}>
                {o.l}
                {state === 'right' && (
                  <span style={{ position: 'absolute', top: -10, right: -8,
                    background: BG.plum, color: BG.white, width: 26, height: 26,
                    borderRadius: 99, fontSize: 14, display: 'flex',
                    alignItems: 'center', justifyContent: 'center' }}>✓</span>
                )}
                {state === 'wrong' && (
                  <span style={{ position: 'absolute', top: -10, right: -8,
                    background: BG.cherry, color: BG.white, width: 26, height: 26,
                    borderRadius: 99, fontSize: 14, display: 'flex',
                    alignItems: 'center', justifyContent: 'center' }}>✕</span>
                )}
                {state === 'reveal' && (
                  <Mono size={9} color={BG.green} ls="0.15em">CORRECT</Mono>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {feedback}
      {footer}
    </div>
  );
}

/* ─── 1. Default — no answer selected ─── */
function BGQuizDefault() {
  return (
    <QuizShell
      prompt="Which note is this?"
      options={[{l:'F'},{l:'A'},{l:'G'},{l:'B'}]}
      selected={null}
      footer={
        <div style={{ padding: '14px 20px 20px' }}>
          <button style={{ width: '100%', background: BG.cream,
            color: BG.plumDim, border: `2px dashed ${BG.plumDim}`,
            padding: '14px 22px', borderRadius: 999,
            fontFamily: 'inherit', fontWeight: 800, fontSize: 14,
            cursor: 'not-allowed' }}>Tap a note to answer</button>
        </div>
      }
    />
  );
}

/* ─── 2. Encore (correct) ─── */
function BGQuizCorrect() {
  return (
    <QuizShell
      prompt="Which note is this?"
      options={[
        {l:'F'},
        {l:'A'},
        {l:'G', correct: true},
        {l:'B'},
      ]}
      selected="G"
      feedback={
        <div style={{ background: BG.mint, borderTopLeftRadius: 32,
          borderTopRightRadius: 32, padding: '22px 24px 18px',
          position: 'relative', overflow: 'hidden' }}>
          <Doodle ch="♪" x={20} y={14} size={22} rot={-20} color={BG.plum} op={.25} />
          <Doodle ch="♬" x={340} y={10} size={30} rot={15} color={BG.plum} op={.25} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 56, lineHeight: 1, display: 'inline-block',
              transform: 'rotate(-12deg)' }}>🎉</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 32, fontWeight: 900,
                letterSpacing: '-0.03em', lineHeight: 1, color: BG.plum }}>
                Encore!
              </p>
              <Mono color={BG.plumSoft} size={11}>+15 XP · combo ×3 🔥</Mono>
            </div>
          </div>
          <p style={{ margin: '12px 0 0', fontSize: 13, fontWeight: 700,
            color: BG.plum, lineHeight: 1.5 }}>
            That's a <strong>G</strong> — the second line of the treble staff.
            Right where the clef's curl is.
          </p>
        </div>
      }
      footer={
        <div style={{ padding: '14px 20px 20px', background: BG.mint }}>
          <PrimaryButton>Next track →</PrimaryButton>
        </div>
      }
    />
  );
}

/* ─── 3. Off-key (wrong) ─── */
function BGQuizWrong() {
  return (
    <QuizShell
      prompt="Which note is this?"
      options={[
        {l:'F'},
        {l:'A'},
        {l:'G', correct: true},
        {l:'B'},
      ]}
      selected="B"
      feedback={
        <div style={{ background: BG.cherry + '22',
          borderTop: `4px solid ${BG.cherry}`,
          borderTopLeftRadius: 32, borderTopRightRadius: 32,
          padding: '22px 24px 18px', position: 'relative', overflow: 'hidden' }}>
          <Doodle ch="♭" x={20} y={14} size={26} rot={-12} color={BG.cherry} op={.4} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 50, lineHeight: 1, display: 'inline-block',
              transform: 'rotate(-8deg)' }}>🎧</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 28, fontWeight: 900,
                letterSpacing: '-0.02em', lineHeight: 1, color: BG.plum }}>
                Off-key — close though!
              </p>
              <Mono color={BG.cherry} size={11}>combo reset · no XP this song</Mono>
            </div>
          </div>
          <p style={{ margin: '12px 0 0', fontSize: 13, fontWeight: 700,
            color: BG.plum, lineHeight: 1.5 }}>
            It's actually <strong style={{ color: BG.green }}>G</strong>, not B.
            The note sits <em>on</em> the second line — B would be the line above.
          </p>
          <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
            <button style={{ background: BG.white, color: BG.plum, border: 0,
              padding: '8px 12px', borderRadius: 999, fontFamily: 'inherit',
              fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>
              💡 Show me the trick
            </button>
            <button style={{ background: 'transparent', color: BG.plumSoft,
              border: 0, padding: '8px 12px', fontFamily: 'inherit',
              fontWeight: 700, fontSize: 12, cursor: 'pointer',
              textDecoration: 'underline' }}>
              Add to B-sides
            </button>
          </div>
        </div>
      }
      footer={
        <div style={{ padding: '14px 20px 20px', background: BG.cherry + '22' }}>
          <PrimaryButton>Got it, next one →</PrimaryButton>
        </div>
      }
    />
  );
}

window.BGQuizDefault = BGQuizDefault;
window.BGQuizCorrect = BGQuizCorrect;
window.BGQuizWrong = BGQuizWrong;
