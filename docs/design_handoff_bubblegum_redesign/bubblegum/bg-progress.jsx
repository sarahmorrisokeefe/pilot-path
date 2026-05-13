/* Bubblegum × Live Set — Progress ("Your Records") */

function BGProgress() {
  const records = [
    { icon: '🏆', name: 'Gold · Notation', date: 'Earned today',
      bg: BG.butter, earned: true },
    { icon: '🎼', name: 'First Track', date: 'Apr 28',
      bg: BG.lavender, earned: true },
    { icon: '🔥', name: 'Week Warrior', date: 'May 5',
      bg: BG.peach, earned: true },
    { icon: '💯', name: 'Perfect Set', date: 'May 9',
      bg: BG.mint, earned: true },
    { icon: '🥁', name: 'Rhythm Rookie', date: 'In progress',
      bg: BG.sky, earned: false, pct: 40 },
    { icon: '🎹', name: 'Scale Climber', date: 'In progress',
      bg: BG.pink, earned: false, pct: 18 },
    { icon: '🎸', name: 'Chord Wizard', date: 'Locked',
      bg: BG.cream, earned: false, locked: true },
    { icon: '🎤', name: 'Headliner', date: 'Locked',
      bg: BG.cream, earned: false, locked: true },
  ];

  return (
    <div style={{ ...bgPageBase, overflow: 'auto' }}>
      <AppHeader />

      <main style={{ padding: '4px 20px 110px', position: 'relative', zIndex: 1 }}>

        <div style={{ padding: '0 4px 14px' }}>
          <p style={{ margin: 0, fontSize: 28, fontWeight: 900,
            letterSpacing: '-0.025em', color: BG.plum }}>
            Your{' '}
            <span style={{ background: BG.butter, padding: '0 8px',
              borderRadius: 8, display: 'inline-block',
              transform: 'rotate(-1deg)' }}>records</span>
          </p>
        </div>

        {/* stat hero — three numbers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: 10, marginBottom: 18 }}>
          {[
            { l: 'total XP', v: '540', bg: BG.peach },
            { l: 'track', v: '06', bg: BG.lavender },
            { l: 'nights', v: '7', bg: BG.mint },
          ].map(s => (
            <div key={s.l} style={bubbleCard({ background: s.bg, padding: 12,
              borderRadius: 20, textAlign: 'center' })}>
              <Mono color={BG.plumSoft} size={9} ls="0.18em">{s.l}</Mono>
              <p style={{ margin: '4px 0 0', fontSize: 32, fontWeight: 900,
                letterSpacing: '-0.03em', color: BG.plum, lineHeight: .9,
                fontVariantNumeric: 'tabular-nums',
                display: 'inline-block', transform: 'rotate(-2deg)' }}>{s.v}</p>
            </div>
          ))}
        </div>

        {/* XP graph — last 7 nights */}
        <div style={bubbleCard({ padding: 18, marginBottom: 18 })}>
          <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'baseline' }}>
            <Eyebrow>last 7 nights</Eyebrow>
            <Mono color={BG.plumSoft} size={11}>540 XP · ↑ 32%</Mono>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8,
            height: 90, marginTop: 6 }}>
            {[
              { d: 'M', v: 45, bg: BG.peach },
              { d: 'T', v: 75, bg: BG.peach },
              { d: 'W', v: 30, bg: BG.peach },
              { d: 'T', v: 90, bg: BG.peach },
              { d: 'F', v: 60, bg: BG.peach },
              { d: 'S', v: 0,  bg: BG.peach + '55' },
              { d: 'S', v: 65, bg: BG.butter, today: true },
            ].map((b, i) => (
              <div key={i} style={{ flex: 1, display: 'flex',
                flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ flex: 1, width: '100%', display: 'flex',
                  alignItems: 'flex-end' }}>
                  <div style={{ width: '100%', height: `${Math.max(b.v, 4)}%`,
                    background: b.bg, borderRadius: 8,
                    border: b.today ? `2.5px solid ${BG.plum}` : 'none' }} />
                </div>
                <Mono color={b.today ? BG.plum : BG.plumDim} size={10}
                  weight={b.today ? 900 : 700}>{b.d}</Mono>
              </div>
            ))}
          </div>
        </div>

        {/* RECORDS section */}
        <Eyebrow>your records 🏆</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 12 }}>
          {records.map(r => (
            <div key={r.name} style={bubbleCard({ background: r.bg,
              padding: 16, borderRadius: 22, textAlign: 'center',
              opacity: r.locked ? .55 : 1, position: 'relative' })}>
              <div style={{
                width: 70, height: 70, borderRadius: 999, margin: '0 auto',
                background: BG.white,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 36, transform: 'rotate(-6deg)',
                border: `4px solid ${BG.white}`,
                filter: r.earned ? 'none' : 'grayscale(.5)',
                position: 'relative',
              }}>
                {r.icon}
                {r.earned && (
                  <span style={{ position: 'absolute', bottom: -4, right: -4,
                    background: BG.green, color: BG.white, width: 24, height: 24,
                    borderRadius: 999, fontSize: 13, fontWeight: 900,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `3px solid ${r.bg}` }}>✓</span>
                )}
                {r.locked && (
                  <span style={{ position: 'absolute', bottom: -4, right: -4,
                    background: BG.plumDim, color: BG.white, width: 24, height: 24,
                    borderRadius: 999, fontSize: 11, fontWeight: 900,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    border: `3px solid ${r.bg}` }}>🔒</span>
                )}
              </div>
              <p style={{ margin: '10px 0 0', fontWeight: 900, fontSize: 13,
                color: BG.plum, lineHeight: 1.2 }}>{r.name}</p>
              <Mono color={BG.plumSoft} size={9}>{r.date}</Mono>
              {r.pct !== undefined && !r.earned && !r.locked && (
                <div style={{ marginTop: 8, height: 4,
                  background: BG.white + 'aa', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${r.pct}%`,
                    background: BG.plum, borderRadius: 99 }} />
                </div>
              )}
            </div>
          ))}
        </div>

      </main>

      <TabBar active="progress" />
    </div>
  );
}

window.BGProgress = BGProgress;
