/* Bubblegum × Live Set — End of set (Results) */

function BGResults() {
  const score = 92;       // %
  const correct = 11;
  const total = 12;
  const xpEarned = 165;
  const headline = score >= 90 ? "Crowd's going wild!"
                 : score >= 70 ? 'Solid set!'
                 : score >= 50 ? 'Almost there!'
                 : 'Tune up!';
  const tag = score >= 90 ? '🌟 STANDING OVATION'
            : score >= 70 ? '👏 GREAT SET'
            : score >= 50 ? '🎤 KEEP PLAYING'
            : '🎧 ENCORE LATER';

  return (
    <div style={{ ...bgPageBase, overflow: 'hidden',
      display: 'flex', flexDirection: 'column' }}>

      {/* confetti doodles all over */}
      <Doodle ch="♪" x={28} y={70} size={36} rot={-15} color={BG.peach} op={.55} />
      <Doodle ch="♬" x={330} y={60} size={42} rot={12} color={BG.lavender} op={.55} />
      <Doodle ch="♫" x={50} y={210} size={28} rot={-8} color={BG.mint} op={.65} />
      <Doodle ch="♩" x={340} y={260} size={38} rot={18} color={BG.sky} op={.6} />
      <Doodle ch="♪" x={30} y={400} size={26} rot={-20} color={BG.butter} op={.7} />
      <Doodle ch="✦" x={360} y={410} size={24} rot={0} color={BG.cherry} op={.5} />
      <Doodle ch="✦" x={20} y={520} size={20} rot={0} color={BG.peach} op={.6} />

      {/* close button */}
      <div style={{ padding: '18px 20px', position: 'relative', zIndex: 1 }}>
        <button style={{ width: 36, height: 36, borderRadius: 999,
          background: BG.white, border: 0, fontSize: 16, fontWeight: 900,
          color: BG.plum, cursor: 'pointer' }}>✕</button>
      </div>

      {/* The big card */}
      <div style={{ flex: 1, padding: '0 20px',
        position: 'relative', zIndex: 1, overflow: 'auto' }}>

        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <Mono color={BG.cherry} size={11} ls="0.2em">{tag}</Mono>
          <p style={{ margin: '8px 0 0', fontSize: 42, fontWeight: 900,
            letterSpacing: '-0.035em', lineHeight: 1, color: BG.plum }}>
            {headline}
          </p>
        </div>

        {/* score donut */}
        <div style={{ marginTop: 26, display: 'flex',
          justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'relative', width: 200, height: 200 }}>
            <svg viewBox="0 0 100 100" width="200" height="200">
              <circle cx="50" cy="50" r="42" fill="none"
                stroke={BG.white} strokeWidth="12" />
              <circle cx="50" cy="50" r="42" fill="none"
                stroke={BG.butter} strokeWidth="12"
                strokeDasharray={`${score * 2.638} 263.8`}
                transform="rotate(-90 50 50)" strokeLinecap="round" />
            </svg>
            <div style={{ position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 64, fontWeight: 900,
                letterSpacing: '-0.04em', lineHeight: .9, color: BG.plum,
                fontVariantNumeric: 'tabular-nums',
                display: 'inline-block', transform: 'rotate(-2deg)' }}>{score}</span>
              <Mono color={BG.plumSoft} size={11}>{correct}/{total} CORRECT</Mono>
            </div>
            {/* sparkles on the donut edge */}
            <span style={{ position: 'absolute', top: 6, right: 30,
              fontSize: 22, color: BG.cherry,
              transform: 'rotate(20deg)' }}>✦</span>
            <span style={{ position: 'absolute', bottom: 20, left: -4,
              fontSize: 16, color: BG.peach }}>✦</span>
          </div>
        </div>

        {/* stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: 10, marginTop: 24 }}>
          {[
            { l: 'XP earned', v: '+' + xpEarned, bg: BG.butter },
            { l: 'Best combo', v: '×5', bg: BG.peach },
            { l: 'Time on stage', v: '4:18', bg: BG.lavender },
          ].map(s => (
            <div key={s.l} style={bubbleCard({ background: s.bg, padding: 12,
              textAlign: 'center', borderRadius: 18 })}>
              <Mono color={BG.plumSoft} size={9} ls="0.15em">{s.l}</Mono>
              <p style={{ margin: '4px 0 0', fontWeight: 900, fontSize: 22,
                letterSpacing: '-0.02em', color: BG.plum,
                fontVariantNumeric: 'tabular-nums' }}>{s.v}</p>
            </div>
          ))}
        </div>

        {/* unlock card — new record earned */}
        <div style={bubbleCard({ background: BG.mint, marginTop: 14, padding: 16,
          display: 'flex', alignItems: 'center', gap: 14, borderRadius: 22,
          position: 'relative', overflow: 'hidden' })}>
          <Doodle ch="✦" x={260} y={6} size={20} rot={0} color={BG.plum} op={.2} />
          <div style={{ width: 56, height: 56, borderRadius: 999,
            background: BG.butter, display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: 28,
            transform: 'rotate(-6deg)',
            border: `4px solid ${BG.white}` }}>🏆</div>
          <div style={{ flex: 1 }}>
            <Mono color={BG.plumSoft} size={10}>new record unlocked</Mono>
            <p style={{ margin: '2px 0 0', fontWeight: 900, fontSize: 15,
              color: BG.plum, lineHeight: 1.2 }}>Gold Record · Notation</p>
            <p style={{ margin: '2px 0 0', fontSize: 11, fontWeight: 600,
              color: BG.plumSoft }}>Crossed 90% on the album.</p>
          </div>
        </div>

        {/* streak nudge */}
        <p style={{ margin: '18px 0 0', textAlign: 'center', fontSize: 13,
          fontWeight: 700, color: BG.plumSoft }}>
          🔥 <strong style={{ color: BG.plum }}>8 nights in a row.</strong>{' '}
          Tomorrow's track is queued up.
        </p>

      </div>

      {/* CTAs */}
      <div style={{ padding: '14px 20px 20px', display: 'flex',
        flexDirection: 'column', gap: 8, position: 'relative', zIndex: 1 }}>
        <PrimaryButton>Play next track →</PrimaryButton>
        <GhostButton>Back to setlist</GhostButton>
      </div>
    </div>
  );
}

window.BGResults = BGResults;
