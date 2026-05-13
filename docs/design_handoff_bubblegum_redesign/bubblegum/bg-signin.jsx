/* Bubblegum × Live Set — Sign In / first impression
   "Tune in" — the warm hello that sets the whole tour.
*/

function BGSignIn() {
  return (
    <div style={{ ...bgPageBase, overflow: 'hidden', display: 'flex',
      flexDirection: 'column' }}>

      {/* doodled corner notes */}
      <Doodle ch="♪" x={32} y={70} size={36} rot={-15} color={BG.peach} op={.7} />
      <Doodle ch="♬" x={330} y={120} size={52} rot={12} color={BG.lavender} op={.6} />
      <Doodle ch="♫" x={48} y={300} size={28} rot={-8} color={BG.mint} op={.7} />
      <Doodle ch="♩" x={350} y={420} size={42} rot={18} color={BG.sky} op={.7} />
      <Doodle ch="♪" x={28} y={520} size={32} rot={-20} color={BG.butter} op={.8} />

      {/* simple status-bar spacer */}
      <div style={{ height: 50 }} />

      {/* Hero — big mark + headline */}
      <div style={{ flex: 1, padding: '40px 32px 0', display: 'flex',
        flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start',
        position: 'relative', zIndex: 1 }}>

        {/* the ♩ as a hero */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 8 }}>
          <span style={{ fontSize: 92, fontFamily: 'serif', color: BG.peach,
            lineHeight: .9, transform: 'rotate(-10deg)', display: 'inline-block',
            fontWeight: 400 }}>♩</span>
          <span style={{ fontSize: 32, fontWeight: 900, color: BG.plum,
            letterSpacing: '-0.03em' }}>cadence</span>
        </div>

        <p style={{ margin: '24px 0 0', fontSize: 44, fontWeight: 900,
          letterSpacing: '-0.035em', lineHeight: 1, color: BG.plum }}>
          Learn music<br/>theory like<br/>
          <span style={{ color: BG.cherry, display: 'inline-block',
            transform: 'rotate(-2deg)' }}>your next</span><br/>
          <span style={{ background: BG.butter, padding: '0 12px',
            borderRadius: 12, display: 'inline-block' }}>tour</span>.
        </p>

        <p style={{ margin: '20px 0 0', fontSize: 14, color: BG.plumSoft,
          fontWeight: 600, lineHeight: 1.55, maxWidth: 320 }}>
          Bite-size lessons, friendly tutor, real progress. Build your setlist,
          chase the encore, never lose a streak.
        </p>

        {/* feature chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
          <Pill bg={BG.mint}>🎼 Notation</Pill>
          <Pill bg={BG.sky}>🥁 Rhythm</Pill>
          <Pill bg={BG.lavender}>🎹 Scales</Pill>
          <Pill bg={BG.peach}>📏 Intervals</Pill>
          <Pill bg={BG.pink}>🎸 Chords</Pill>
        </div>
      </div>

      {/* CTA panel — sticks to the bottom */}
      <div style={{ padding: '0 24px 36px', position: 'relative', zIndex: 1 }}>
        <PrimaryButton>Take the stage →</PrimaryButton>
        <div style={{ marginTop: 10 }}>
          <GhostButton>I already have an account</GhostButton>
        </div>
        <p style={{ margin: '14px 0 0', textAlign: 'center', fontSize: 12,
          color: BG.plumDim, fontWeight: 600 }}>
          Skip for now — browse without a backstage pass.
        </p>
      </div>
    </div>
  );
}

window.BGSignIn = BGSignIn;
