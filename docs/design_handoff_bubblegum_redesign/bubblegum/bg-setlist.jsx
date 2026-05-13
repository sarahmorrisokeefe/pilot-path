/* Bubblegum × Live Set — Setlist (all albums/courses) */

function BGSetlist() {
  const albums = [
    { id: 'notation', icon: '🎼', name: 'Notation', tagline: 'Reading the staff',
      bg: BG.lavender, tracks: 12, done: 11, pct: 92, status: 'almost' },
    { id: 'rhythm', icon: '🥁', name: 'Rhythm', tagline: 'Time & meter',
      bg: BG.peach, tracks: 10, done: 4, pct: 40, status: 'on tour' },
    { id: 'scales', icon: '🎹', name: 'Scales', tagline: 'Major, minor, modes',
      bg: BG.pink, tracks: 14, done: 2, pct: 14, status: 'on tour' },
    { id: 'intervals', icon: '📏', name: 'Intervals', tagline: 'Distance between notes',
      bg: BG.sky, tracks: 8, done: 0, pct: 0, status: 'opening' },
    { id: 'chords', icon: '🎸', name: 'Chords', tagline: 'Triads, sevenths, voicings',
      bg: BG.mint, tracks: 16, done: 0, pct: 0, status: 'opening' },
    { id: 'encore', icon: '🌟', name: 'Encore', tagline: 'Advanced theory',
      bg: BG.butter, tracks: 6, done: 0, pct: 0, status: 'locked',
      locked: true },
  ];

  return (
    <div style={{ ...bgPageBase, overflow: 'auto' }}>
      <AppHeader />

      <main style={{ padding: '4px 20px 110px', position: 'relative', zIndex: 1 }}>

        <div style={{ padding: '0 4px 18px' }}>
          <p style={{ margin: 0, fontSize: 28, fontWeight: 900,
            letterSpacing: '-0.025em', color: BG.plum }}>
            Your <span style={{ background: BG.peach, padding: '0 8px',
              borderRadius: 8, display: 'inline-block',
              transform: 'rotate(-1deg)' }}>setlist</span>
          </p>
          <p style={{ margin: '6px 0 0', fontSize: 13, fontWeight: 600,
            color: BG.plumSoft }}>Six albums. Pick a track to play tonight.</p>
        </div>

        {/* filter chips */}
        <div style={{ display: 'flex', gap: 8, overflow: 'auto',
          marginBottom: 16, paddingBottom: 4 }}>
          {[
            { l: 'All', active: true },
            { l: 'On tour' },
            { l: 'Almost done' },
            { l: 'Opening' },
          ].map(c => (
            <span key={c.l} style={{
              background: c.active ? BG.plum : BG.white,
              color: c.active ? BG.white : BG.plum,
              padding: '8px 14px', borderRadius: 999, fontSize: 12,
              fontWeight: 800, whiteSpace: 'nowrap', flexShrink: 0,
            }}>{c.l}</span>
          ))}
        </div>

        {/* album cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {albums.map(a => (
            <div key={a.id} style={bubbleCard({ background: a.bg, padding: 16,
              borderRadius: 24, position: 'relative', overflow: 'hidden',
              opacity: a.locked ? .7 : 1 })}>
              {a.locked && (
                <div style={{ position: 'absolute', top: 16, right: 16,
                  background: BG.plum, color: BG.white,
                  width: 30, height: 30, borderRadius: 999,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14 }}>🔒</div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 60, height: 60, borderRadius: 18,
                  background: BG.white, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: 32, transform: 'rotate(-4deg)',
                  filter: a.locked ? 'grayscale(.6)' : 'none' }}>{a.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Mono color={BG.plumSoft}>album · {a.tracks} tracks</Mono>
                  <p style={{ margin: '2px 0 0', fontWeight: 900, fontSize: 18,
                    color: BG.plum, lineHeight: 1.1 }}>{a.name}</p>
                  <p style={{ margin: '3px 0 0', fontSize: 12, fontWeight: 600,
                    color: BG.plumSoft }}>{a.tagline}</p>
                </div>
                {!a.locked && (
                  <span style={{ color: BG.plum, fontSize: 24, fontWeight: 900 }}>›</span>
                )}
              </div>

              {!a.locked && (
                <div style={{ marginTop: 14, display: 'flex',
                  alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, height: 8, background: BG.white + 'aa',
                    borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.max(a.pct, 2)}%`,
                      background: BG.plum, borderRadius: 99 }} />
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 900, color: BG.plum,
                    minWidth: 64, textAlign: 'right' }}>
                    {a.done}/{a.tracks} · {a.pct}%
                  </span>
                </div>
              )}
              {a.locked && (
                <p style={{ margin: '14px 0 0', fontSize: 12, fontWeight: 700,
                  color: BG.plumSoft }}>Finish 3 more albums to unlock the encore.</p>
              )}
            </div>
          ))}
        </div>
      </main>

      <TabBar active="learn" />
    </div>
  );
}

window.BGSetlist = BGSetlist;
