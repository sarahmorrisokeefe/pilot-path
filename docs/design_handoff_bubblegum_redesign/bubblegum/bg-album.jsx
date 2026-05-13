/* Bubblegum × Live Set — Album detail (one course's track list) */

function BGAlbum() {
  const tracks = [
    { n: 'A1', name: 'The 5 Lines', desc: 'Naming staff lines & spaces',
      pct: 100, xp: 25, status: 'done' },
    { n: 'A2', name: 'Treble Clef Basics', desc: 'Where the G lives',
      pct: 100, xp: 25, status: 'done' },
    { n: 'A3', name: 'Treble Staff Notes', desc: 'Identifying notes A–G',
      pct: 60, xp: 25, status: 'playing', current: true },
    { n: 'A4', name: 'Bass Clef Basics', desc: 'The F clef and friends',
      pct: 0, xp: 25, status: 'up next' },
    { n: 'B1', name: 'Ledger Lines', desc: 'Going above and below',
      pct: 0, xp: 30, status: 'queued' },
    { n: 'B2', name: 'Accidentals', desc: 'Sharps, flats, naturals',
      pct: 0, xp: 30, status: 'queued' },
    { n: 'B3', name: 'Key Signatures', desc: 'Reading the sharps & flats up top',
      pct: 0, xp: 35, status: 'queued' },
    { n: '★',  name: 'Encore: Mode Shifts', desc: 'Bonus advanced track',
      pct: 0, xp: 50, status: 'locked', encore: true },
  ];

  return (
    <div style={{ ...bgPageBase, overflow: 'auto' }}>

      {/* hero header — lavender album cover */}
      <div style={{ position: 'relative', background: BG.lavender,
        padding: '60px 20px 24px', overflow: 'hidden' }}>
        <Doodle ch="♬" x={300} y={36} size={56} rot={12} color={BG.plum} op={.15} />
        <Doodle ch="♪" x={32} y={84} size={36} rot={-12} color={BG.plum} op={.2} />

        <button style={{ position: 'absolute', top: 16, left: 16,
          width: 38, height: 38, borderRadius: 999, background: BG.white,
          border: 0, fontSize: 18, fontWeight: 900, color: BG.plum,
          cursor: 'pointer' }}>←</button>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <Mono color={BG.plumSoft}>album · 8 tracks · 1 encore</Mono>
          <p style={{ margin: '6px 0 0', fontSize: 40, fontWeight: 900,
            letterSpacing: '-0.035em', lineHeight: .95, color: BG.plum }}>
            Notation
          </p>
          <p style={{ margin: '8px 0 0', fontSize: 14, fontWeight: 600,
            color: BG.plum, opacity: .8 }}>
            Read the staff, name every note, fly through clefs.
          </p>

          <div style={{ marginTop: 16, display: 'flex',
            alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, height: 10, background: BG.white + 'cc',
              borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '32%',
                background: BG.plum, borderRadius: 99 }} />
            </div>
            <span style={{ fontWeight: 900, fontSize: 13, color: BG.plum }}>
              2 of 8 · 32%
            </span>
          </div>
        </div>
      </div>

      {/* track list */}
      <main style={{ padding: '20px 20px 110px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10,
          marginBottom: 14, padding: '0 4px' }}>
          <Eyebrow>track list</Eyebrow>
        </div>

        <div style={bubbleCard({ padding: 6, background: BG.white })}>
          {tracks.map((t, i) => {
            const done = t.status === 'done';
            const playing = t.status === 'playing';
            const locked = t.status === 'locked';
            return (
              <div key={t.n} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 12px',
                borderRadius: 18,
                background: playing ? BG.butter : 'transparent',
                opacity: locked ? .5 : 1,
                marginBottom: i < tracks.length - 1 ? 2 : 0,
              }}>
                {/* track number circle */}
                <div style={{
                  width: 44, height: 44, borderRadius: 999, flexShrink: 0,
                  background: done ? BG.mint
                            : playing ? BG.plum
                            : t.encore ? BG.peach
                            : BG.cream,
                  color: done ? BG.plum
                       : playing ? BG.white
                       : BG.plum,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: 14, fontFamily: 'ui-monospace, monospace',
                  letterSpacing: '0.05em',
                }}>
                  {done ? '✓' : t.n}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <p style={{ margin: 0, fontWeight: 900, fontSize: 14,
                      color: BG.plum, lineHeight: 1.2 }}>{t.name}</p>
                    {playing && <span style={{ background: BG.plum, color: BG.white,
                      fontSize: 9, fontWeight: 900, padding: '2px 6px',
                      borderRadius: 99, letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontFamily: 'ui-monospace, monospace' }}>NOW</span>}
                    {t.encore && <span style={{ background: BG.peach, color: BG.plum,
                      fontSize: 9, fontWeight: 900, padding: '2px 6px',
                      borderRadius: 99, letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontFamily: 'ui-monospace, monospace' }}>ENCORE</span>}
                  </div>
                  <p style={{ margin: '2px 0 0', fontSize: 11, fontWeight: 600,
                    color: BG.plumSoft }}>{t.desc}</p>
                  {playing && (
                    <div style={{ marginTop: 6, height: 4, background: BG.plum + '22',
                      borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${t.pct}%`,
                        background: BG.plum, borderRadius: 99 }} />
                    </div>
                  )}
                </div>

                {/* right side: XP or status */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <Mono color={done ? BG.green : playing ? BG.plum : BG.plumDim}
                    size={10}>
                    +{t.xp} XP
                  </Mono>
                  {playing && <div style={{ marginTop: 2, fontSize: 18,
                    color: BG.plum }}>▶</div>}
                  {locked && <div style={{ marginTop: 2, fontSize: 14,
                    color: BG.plumDim }}>🔒</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* primary CTA stuck to bottom of content */}
        <div style={{ position: 'sticky', bottom: 90, marginTop: 18,
          background: BG.cream + 'f0', backdropFilter: 'blur(8px)',
          borderRadius: 999, padding: 0 }}>
          <PrimaryButton color={BG.plum}>Keep playing Track A3 →</PrimaryButton>
        </div>
      </main>

      <TabBar active="learn" />
    </div>
  );
}

window.BGAlbum = BGAlbum;
