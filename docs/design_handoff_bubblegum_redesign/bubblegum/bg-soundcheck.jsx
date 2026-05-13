/* Bubblegum × Live Set — Soundcheck (practice quiz landing) */

function BGSoundcheck() {
  return (
    <div style={{ ...bgPageBase, overflow: 'auto' }}>
      <AppHeader />

      <main style={{ padding: '4px 20px 110px', position: 'relative', zIndex: 1 }}>

        {/* page heading */}
        <div style={{ padding: '0 4px 18px' }}>
          <p style={{ margin: 0, fontSize: 28, fontWeight: 900,
            letterSpacing: '-0.025em', color: BG.plum }}>
            <span style={{ background: BG.peach, padding: '0 8px',
              borderRadius: 8, display: 'inline-block',
              transform: 'rotate(-1deg)' }}>Soundcheck</span>
          </p>
          <p style={{ margin: '6px 0 0', fontSize: 13, fontWeight: 600,
            color: BG.plumSoft }}>
            Mix tracks from every album. Keep the chops sharp.
          </p>
        </div>

        {/* QUICK SOUNDCHECK — big hero CTA */}
        <div style={{ position: 'relative', background: BG.butter, borderRadius: 32,
          padding: 22, color: BG.plum, overflow: 'hidden', marginBottom: 16 }}>
          <Doodle ch="♪" x={20} y={10} size={28} rot={-15} color={BG.peach} />
          <Doodle ch="♬" x={290} y={8} size={42} rot={12} color={BG.peach} op={.5} />
          <Doodle ch="✦" x={310} y={130} size={22} rot={0} color={BG.cherry} op={.6} />

          <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start' }}>
            <div>
              <Mono color={BG.plumSoft}>quick set · 10 songs</Mono>
              <p style={{ margin: '4px 0 0', fontSize: 26, fontWeight: 900,
                letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                Tonight's mix
              </p>
              <p style={{ margin: '6px 0 14px', fontSize: 13, fontWeight: 600,
                color: BG.plumSoft, maxWidth: 220 }}>
                A random shuffle across what you've played — about 3 minutes.
              </p>
            </div>
            <div style={{ width: 60, height: 60, borderRadius: 999,
              background: BG.plum, color: BG.white,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 900, flexShrink: 0,
              transform: 'rotate(-6deg)' }}>▶</div>
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Pill bg={BG.white} size={11}>🎼 Notation</Pill>
            <Pill bg={BG.white} size={11}>🥁 Rhythm</Pill>
            <Pill bg={BG.white} size={11}>🎹 Scales</Pill>
            <Pill bg={BG.peach} size={11}>+50 XP</Pill>
          </div>
        </div>

        {/* SOUND CHECKS — mode picker */}
        <Eyebrow>pick your set 🎚</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 12, marginBottom: 18 }}>
          {[
            { name: 'Speed run', icon: '⚡', desc: '20 questions · timed',
              bg: BG.cherry + '55', accent: BG.cherry },
            { name: 'Endless', icon: '♾', desc: 'Until you flub',
              bg: BG.lavender, accent: BG.plum },
            { name: 'B-side fix', icon: '🔁', desc: 'Just your stumbles',
              bg: BG.mint, accent: BG.green },
            { name: 'Hard mode', icon: '🌶', desc: 'Encore-difficulty',
              bg: BG.peach, accent: BG.plum, locked: true },
          ].map(m => (
            <div key={m.name} style={bubbleCard({ background: m.bg, padding: 14,
              color: BG.plum, borderRadius: 22, position: 'relative',
              opacity: m.locked ? .55 : 1 })}>
              <div style={{ fontSize: 32, lineHeight: 1, marginBottom: 4,
                display: 'inline-block', transform: 'rotate(-6deg)' }}>{m.icon}</div>
              <p style={{ margin: 0, fontWeight: 900, fontSize: 15,
                letterSpacing: '-0.01em' }}>{m.name}</p>
              <p style={{ margin: '2px 0 0', fontSize: 11, fontWeight: 700,
                color: BG.plumSoft }}>{m.desc}</p>
              {m.locked && (
                <span style={{ position: 'absolute', top: 12, right: 12,
                  background: BG.plum, color: BG.white,
                  width: 24, height: 24, borderRadius: 999,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11 }}>🔒</span>
              )}
            </div>
          ))}
        </div>

        {/* MIX YOUR OWN — album filter chips */}
        <div style={bubbleCard({ background: BG.white, padding: 18,
          borderRadius: 24, marginBottom: 18 })}>
          <Eyebrow>mix your own 🎛</Eyebrow>

          <Mono color={BG.plumSoft} size={10}>pull from these albums</Mono>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {[
              { l: 'Notation', icon: '🎼', on: true, bg: BG.lavender },
              { l: 'Rhythm', icon: '🥁', on: true, bg: BG.peach },
              { l: 'Scales', icon: '🎹', on: true, bg: BG.pink },
              { l: 'Intervals', icon: '📏', on: false, bg: BG.sky },
              { l: 'Chords', icon: '🎸', on: false, bg: BG.mint },
            ].map(a => (
              <span key={a.l} style={{
                background: a.on ? a.bg : BG.cream,
                color: a.on ? BG.plum : BG.plumDim,
                padding: '8px 14px', borderRadius: 999, fontSize: 12,
                fontWeight: 800, display: 'inline-flex', alignItems: 'center',
                gap: 4, border: a.on ? `2px solid ${BG.plum}` : `2px solid transparent`,
              }}>
                <span style={{ fontSize: 14, lineHeight: 1,
                  filter: a.on ? 'none' : 'grayscale(.6)' }}>{a.icon}</span>
                {a.l}
              </span>
            ))}
          </div>

          {/* length slider mock */}
          <div style={{ marginTop: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between',
              alignItems: 'baseline', marginBottom: 8 }}>
              <Mono color={BG.plumSoft} size={10}>set length</Mono>
              <span style={{ fontFamily: 'ui-monospace, monospace',
                fontWeight: 900, fontSize: 14, color: BG.plum }}>15 songs</span>
            </div>
            <div style={{ position: 'relative', height: 24,
              display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '100%', height: 8,
                background: BG.cream, borderRadius: 99 }} />
              <div style={{ position: 'absolute', left: 0, width: '50%',
                height: 8, background: BG.plum, borderRadius: 99 }} />
              <div style={{ position: 'absolute', left: '50%', marginLeft: -14,
                width: 28, height: 28, borderRadius: 999, background: BG.butter,
                border: `4px solid ${BG.plum}`, cursor: 'grab' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between',
              marginTop: 6 }}>
              <Mono color={BG.plumDim} size={10}>5</Mono>
              <Mono color={BG.plumDim} size={10}>15</Mono>
              <Mono color={BG.plumDim} size={10}>30</Mono>
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <PrimaryButton>Start your mix →</PrimaryButton>
          </div>
        </div>

        {/* Recent sessions */}
        <Eyebrow>last few sessions 📻</Eyebrow>
        <div style={bubbleCard({ background: BG.white, padding: 6 })}>
          {[
            { d: 'Mon', t: '7:42p', sc: 92, time: '4:18', tag: 'Quick set',
              best: true },
            { d: 'Sun', t: '9:15p', sc: 78, time: '6:02', tag: 'Endless' },
            { d: 'Sat', t: '8:30p', sc: 88, time: '3:24', tag: 'Quick set' },
            { d: 'Fri', t: '6:55p', sc: 65, time: '5:11', tag: 'Speed run' },
          ].map((s, i, arr) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px',
              borderRadius: 18,
              background: s.best ? BG.butter + '66' : 'transparent',
              marginBottom: i < arr.length - 1 ? 2 : 0,
            }}>
              <div style={{ width: 42, height: 42, borderRadius: 999,
                background: s.sc >= 90 ? BG.mint
                          : s.sc >= 70 ? BG.butter
                          : BG.cherry + '55',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: 13, color: BG.plum,
                fontVariantNumeric: 'tabular-nums', flexShrink: 0,
                transform: 'rotate(-3deg)' }}>{s.sc}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontWeight: 900, fontSize: 13,
                    color: BG.plum }}>{s.tag}</span>
                  {s.best && (
                    <span style={{ background: BG.plum, color: BG.white,
                      fontSize: 9, fontWeight: 900, padding: '2px 6px',
                      borderRadius: 99, letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontFamily: 'ui-monospace, monospace' }}>BEST</span>
                  )}
                </div>
                <Mono color={BG.plumSoft} size={10}>
                  {s.d} {s.t} · {s.time}
                </Mono>
              </div>
              <span style={{ color: BG.plumDim, fontSize: 18 }}>›</span>
            </div>
          ))}
        </div>

        <p style={{ margin: '14px 0 0', textAlign: 'center', fontSize: 12,
          fontWeight: 700, color: BG.plumSoft }}>
          Personal best: <strong style={{ color: BG.plum }}>92</strong> ·{' '}
          12 sessions this week
        </p>

      </main>

      <TabBar active="practice" />
    </div>
  );
}

window.BGSoundcheck = BGSoundcheck;
