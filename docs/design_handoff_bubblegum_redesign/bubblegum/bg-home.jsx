/* Bubblegum × Live Set — Home ("Tonight's Set") */

function BGHome() {
  return (
    <div style={{ ...bgPageBase, overflow: 'auto' }}>

      <AppHeader />

      <main style={{ padding: '4px 20px 110px', display: 'flex',
        flexDirection: 'column', gap: 18, position: 'relative', zIndex: 1 }}>

        {/* greeting */}
        <div style={{ padding: '0 4px' }}>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 900,
            letterSpacing: '-0.02em', color: BG.plum }}>
            Hi, Sarah <span style={{ display: 'inline-block',
              transform: 'rotate(-10deg)' }}>👋</span>
          </p>
          <p style={{ margin: '4px 0 0', fontSize: 13, fontWeight: 600,
            color: BG.plumSoft }}>The crowd's warming up. Let's play.</p>
        </div>

        {/* HERO — tonight's set */}
        <div style={{ position: 'relative', background: BG.butter, borderRadius: 32,
          padding: 22, color: BG.plum, overflow: 'hidden' }}>
          <Doodle ch="♪" x={20} y={10} size={28} rot={-15} color={BG.peach} />
          <Doodle ch="♬" x={290} y={8} size={42} rot={12} color={BG.peach} op={.5} />
          <Doodle ch="♫" x={260} y={140} size={30} rot={-8} color={BG.pink} op={.7} />

          <Mono color={BG.plumSoft}>tonight's set · track 06</Mono>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
            <span style={{ fontSize: 78, fontWeight: 900, lineHeight: .9,
              letterSpacing: '-0.05em', fontVariantNumeric: 'tabular-nums',
              display: 'inline-block', transform: 'rotate(-3deg)' }}>540</span>
            <span style={{ fontSize: 18, fontWeight: 900 }}>XP ⭐</span>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <Pill bg={BG.peach}>🔥 7 nights</Pill>
            <Pill bg={BG.white}>🎤 2 of 3 tonight</Pill>
          </div>
        </div>

        {/* DAILY GOAL — mint progress */}
        <div style={bubbleCard({ background: BG.mint, padding: 16, display: 'flex',
          alignItems: 'center', gap: 14 })}>
          <div style={{ position: 'relative', width: 54, height: 54 }}>
            <svg viewBox="0 0 40 40" width="54" height="54">
              <circle cx="20" cy="20" r="16" fill="none" stroke={BG.white} strokeWidth="6" />
              <circle cx="20" cy="20" r="16" fill="none" stroke={BG.plum} strokeWidth="6"
                strokeDasharray={`${(2/3) * 100.5} 100.5`}
                transform="rotate(-90 20 20)" strokeLinecap="round" />
            </svg>
            <span style={{ position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 13, color: BG.plum }}>2/3</span>
          </div>
          <div style={{ flex: 1 }}>
            <Mono>tonight's set</Mono>
            <p style={{ margin: '2px 0 0', fontWeight: 900, fontSize: 16,
              lineHeight: 1.2, color: BG.plum }}>
              One more song for an encore!
            </p>
          </div>
        </div>

        {/* UP NEXT */}
        <div>
          <Eyebrow>up next ✨</Eyebrow>
          <div style={bubbleCard({ background: BG.sky, padding: 16,
            display: 'flex', alignItems: 'center', gap: 14,
            position: 'relative', overflow: 'hidden' })}>
            <Doodle ch="♩" x={280} y={48} size={36} rot={10} color={BG.lavender} op={.6} />
            <div style={{ width: 56, height: 56, borderRadius: 18, background: BG.white,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 30, transform: 'rotate(-4deg)' }}>🎼</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <Mono>track a3 · notation</Mono>
              <p style={{ margin: '2px 0 0', fontWeight: 900, fontSize: 15,
                lineHeight: 1.2, color: BG.plum }}>Treble Staff Notes</p>
              <p style={{ margin: '2px 0 0', fontSize: 11, fontWeight: 700,
                color: BG.plumSoft }}>4 songs · +25 XP</p>
            </div>
            <button style={{ width: 46, height: 46, borderRadius: 999,
              background: BG.plum, color: BG.white, border: 0, fontSize: 16,
              fontWeight: 900, cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              paddingLeft: 4 }}>▶</button>
          </div>
        </div>

        {/* SETLIST */}
        <div>
          <Eyebrow>your setlist 🎵</Eyebrow>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '🎼', name: 'Notation', pct: 88, bg: BG.lavender },
              { icon: '🥁', name: 'Rhythm', pct: 40, bg: BG.peach },
              { icon: '🎹', name: 'Scales', pct: 18, bg: BG.pink },
              { icon: '📏', name: 'Intervals', pct: 0, bg: BG.creamHi },
            ].map(t => (
              <div key={t.name} style={bubbleCard({ background: t.bg, padding: 14,
                color: BG.plum, borderRadius: 22 })}>
                <div style={{ fontSize: 38, lineHeight: 1, marginBottom: 4,
                  display: 'inline-block', transform: 'rotate(-4deg)',
                  filter: t.pct === 0 ? 'grayscale(.5) opacity(.6)' : 'none' }}>{t.icon}</div>
                <p style={{ margin: 0, fontWeight: 900, fontSize: 15 }}>{t.name}</p>
                <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ flex: 1, height: 6, background: BG.white + 'aa',
                    borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.max(t.pct, 0)}%`,
                      background: BG.plum, borderRadius: 99 }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 900 }}>
                    {t.pct === 0 ? 'new!' : `${t.pct}%`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* B-Sides preview */}
        <div>
          <Eyebrow>b-sides to brush up 🔁</Eyebrow>
          <div style={bubbleCard({ background: BG.cherry + '22',
            padding: 14, display: 'flex', alignItems: 'center', gap: 12 })}>
            <span style={{ fontSize: 30, lineHeight: 1,
              display: 'inline-block', transform: 'rotate(-6deg)' }}>🎯</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 900, fontSize: 14,
                color: BG.plum }}>3 tracks to rehearse</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                <CategoryChip bg={BG.white}>Perfect 5ths</CategoryChip>
                <CategoryChip bg={BG.white}>Bass clef</CategoryChip>
                <CategoryChip bg={BG.white}>Sharps</CategoryChip>
              </div>
            </div>
            <span style={{ color: BG.cherry, fontSize: 22, fontWeight: 900 }}>›</span>
          </div>
        </div>

      </main>

      <TabBar active="home" />
    </div>
  );
}

window.BGHome = BGHome;
