/* Bubblegum × Live Set — Study card ("Key fact") */

function BGStudy() {
  return (
    <div style={{ ...bgPageBase, overflow: 'hidden',
      display: 'flex', flexDirection: 'column' }}>

      {/* progress dots header */}
      <div style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={{ width: 36, height: 36, borderRadius: 999,
          background: BG.white, border: 0, fontSize: 16, fontWeight: 900,
          color: BG.plum, cursor: 'pointer' }}>✕</button>
        <div style={{ flex: 1, display: 'flex', gap: 4 }}>
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{ flex: 1, height: 8, borderRadius: 99,
              background: i < 2 ? BG.peach : BG.white + '99' }} />
          ))}
        </div>
        <Mono color={BG.plumSoft}>02/06</Mono>
      </div>

      {/* main card */}
      <div style={{ flex: 1, padding: '8px 20px', overflow: 'auto' }}>
        <Mono color={BG.plumSoft}>album notation · track a3 · key fact</Mono>

        <p style={{ margin: '6px 0 0', fontSize: 30, fontWeight: 900,
          letterSpacing: '-0.025em', lineHeight: 1.05, color: BG.plum }}>
          The treble clef wraps around{' '}
          <span style={{ background: BG.butter, padding: '0 8px',
            borderRadius: 8, display: 'inline-block',
            transform: 'rotate(-1deg)' }}>the G line</span>.
        </p>

        {/* staff with G highlighted */}
        <div style={bubbleCard({ background: BG.white, padding: 22,
          marginTop: 18, position: 'relative', overflow: 'hidden' })}>
          <Doodle ch="♪" x={20} y={14} size={20} rot={-15} color={BG.peach} op={.4} />
          <Doodle ch="♬" x={280} y={120} size={24} rot={10} color={BG.lavender} op={.5} />

          <div style={{ display: 'flex', justifyContent: 'center',
            marginTop: 6, marginBottom: 6 }}>
            <svg viewBox="0 0 280 130" width="260" style={{ color: BG.plum }}>
              {[0,1,2,3,4].map(i => (
                <line key={i} x1="8" x2="272" y1={42 + i*12} y2={42 + i*12}
                  stroke={i === 3 ? BG.peach : 'currentColor'}
                  strokeWidth={i === 3 ? '3.5' : '1.5'} />
              ))}
              <text x="14" y="88" fontSize="62" fill={BG.cherry}
                fontFamily="serif">𝄞</text>
              {/* G note ON the highlighted line */}
              <ellipse cx="200" cy="78" rx="11" ry="7.5" fill={BG.plum}
                transform="rotate(-22 200 78)" />
              <line x1="209" y1="78" x2="209" y2="46"
                stroke={BG.plum} strokeWidth="2.5" />
              <text x="180" y="118" fontSize="14" fontWeight="900"
                fill={BG.peach} letterSpacing="0.2em">G</text>
            </svg>
          </div>

          <div style={{ background: BG.peach + '40', borderRadius: 16,
            padding: '12px 14px', marginTop: 8, display: 'flex',
            alignItems: 'flex-start', gap: 10 }}>
            <span style={{ fontSize: 24, lineHeight: 1,
              display: 'inline-block', transform: 'rotate(-8deg)' }}>💡</span>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700,
              color: BG.plum, lineHeight: 1.5 }}>
              The curl of the clef hugs the second line from the bottom —
              that's why we call it the <strong>G clef</strong>. Every other
              line and space gets its name from there.
            </p>
          </div>
        </div>

        {/* mnemonic */}
        <div style={bubbleCard({ background: BG.mint, padding: 16, marginTop: 14 })}>
          <Mono color={BG.plumSoft}>memorize this</Mono>
          <p style={{ margin: '4px 0 0', fontWeight: 900, fontSize: 17,
            color: BG.plum, letterSpacing: '-0.01em' }}>
            <span style={{ color: BG.cherry }}>E</span>very{' '}
            <span style={{ color: BG.cherry }}>G</span>ood{' '}
            <span style={{ color: BG.cherry }}>B</span>oy{' '}
            <span style={{ color: BG.cherry }}>D</span>oes{' '}
            <span style={{ color: BG.cherry }}>F</span>ine
          </p>
          <p style={{ margin: '6px 0 0', fontSize: 12, fontWeight: 600,
            color: BG.plumSoft }}>
            The five lines, bottom to top: E – G – B – D – F.
          </p>
        </div>

      </div>

      {/* CTA stuck to the bottom */}
      <div style={{ padding: '14px 20px 20px' }}>
        <PrimaryButton>Got it — quiz me →</PrimaryButton>
      </div>
    </div>
  );
}

window.BGStudy = BGStudy;
