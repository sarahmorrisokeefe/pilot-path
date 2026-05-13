/* Bubblegum × Live Set — Bubblegum Night (dark mode)
   ───────────────────────────────────────────────────────────
   Strategy: don't invert. Go from cream → deep plum (warm
   dark, never cool). Pastels stay — they become glowing
   accents against the dark. Cards are slightly-lighter plum;
   butter/peach take over as the "ink" highlight that plum
   used to do in light mode. Primary CTA is butter.
*/

const NIGHT = {
  // surfaces — warm purples, never blue-black
  ink:     '#180e23',        // body bg
  panel:   '#261735',        // card / surface
  panel2:  '#34234a',        // pressed / tinted card
  panelHi: '#3d2b58',        // hovered
  // pastels — same hues, slightly punchier
  butter:  '#ffd66b',
  peach:   '#ffaf95',
  mint:    '#9bdfb0',
  sky:     '#a0d2ff',
  lavender:'#d3baff',
  pink:    '#ffaad4',
  cherry:  '#ff7faf',
  // text
  fg:      '#fff7e0',        // primary text — cream
  fg2:     '#d8c8e8',        // secondary
  fg3:     '#a191b0',        // tertiary
  fgDim:   '#6e5e80',        // dim / placeholder
};

const nightBubblePattern = `
  radial-gradient(circle at 12% 18%, ${NIGHT.peach}24 0 10px, transparent 11px),
  radial-gradient(circle at 78% 8%, ${NIGHT.mint}1c 0 12px, transparent 13px),
  radial-gradient(circle at 90% 70%, ${NIGHT.lavender}2a 0 14px, transparent 15px),
  radial-gradient(circle at 6% 80%, ${NIGHT.sky}22 0 10px, transparent 11px),
  radial-gradient(circle at 50% 40%, ${NIGHT.butter}1a 0 8px, transparent 9px)
`;

const nightPageBase = {
  background: NIGHT.ink,
  backgroundImage: nightBubblePattern,
  backgroundSize: '420px 800px',
  width: '100%', height: '100%',
  fontFamily: 'Inter, system-ui, sans-serif',
  color: NIGHT.fg,
  position: 'relative',
};

const nightCard = (extra = {}) => ({
  background: NIGHT.panel,
  borderRadius: 26,
  padding: 18,
  border: 'none',
  ...extra,
});

const NightDoodle = ({ ch, x, y, size = 22, rot = 0, color = NIGHT.fg2, op = .25 }) => (
  <span style={{ position: 'absolute', left: x, top: y, fontSize: size,
    color, opacity: op, transform: `rotate(${rot}deg)`, lineHeight: 1,
    fontFamily: 'serif', pointerEvents: 'none' }}>{ch}</span>
);

const NightWordmark = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <span style={{ fontSize: 30, color: NIGHT.peach, lineHeight: 1,
      fontFamily: 'serif', transform: 'rotate(-8deg)',
      display: 'inline-block', filter: `drop-shadow(0 0 12px ${NIGHT.peach}55)` }}>♩</span>
    <span style={{ fontWeight: 900, fontSize: 22, letterSpacing: '-0.03em',
      color: NIGHT.fg }}>cadence</span>
  </div>
);

const NightHeader = ({ back = false, title, right = null }) => (
  <header style={{ display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', padding: '16px 20px',
    position: 'relative', zIndex: 1 }}>
    {back ? (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={{ width: 36, height: 36, borderRadius: 999,
          background: NIGHT.panel, border: 0, fontSize: 18, fontWeight: 900,
          color: NIGHT.fg, cursor: 'pointer' }}>←</button>
        {title && <span style={{ fontWeight: 900, fontSize: 16,
          color: NIGHT.fg }}>{title}</span>}
      </div>
    ) : <NightWordmark />}
    {right !== null ? right : (
      <div style={{ width: 38, height: 38, borderRadius: 999, background: NIGHT.lavender,
        color: NIGHT.ink, fontWeight: 900, fontSize: 15, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        border: `3px solid ${NIGHT.panel}` }}>S</div>
    )}
  </header>
);

const NightMono = ({ children, size = 11, color = NIGHT.fg3, weight = 800,
                     ls = '0.12em', uppercase = true }) => (
  <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: size, color, fontWeight: weight, letterSpacing: ls,
    textTransform: uppercase ? 'uppercase' : 'none' }}>{children}</span>
);

const NightEyebrow = ({ children }) => (
  <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 900,
    color: NIGHT.fg2, letterSpacing: '-0.01em' }}>{children}</p>
);

const NightPill = ({ bg = NIGHT.peach, color = NIGHT.ink, children, size = 12 }) => (
  <span style={{ background: bg, color, padding: '6px 12px', borderRadius: 999,
    fontSize: size, fontWeight: 800 }}>{children}</span>
);

const NightTabBar = ({ active = 'home' }) => {
  const tabs = [
    { id: 'home',     i: '🏠', l: 'Home' },
    { id: 'learn',    i: '📚', l: 'Setlist' },
    { id: 'practice', i: '🎯', l: 'Soundcheck' },
    { id: 'review',   i: '🔄', l: 'B-Sides' },
    { id: 'progress', i: '📊', l: 'Records' },
  ];
  return (
    <nav style={{ position: 'absolute', left: 16, right: 16, bottom: 18, zIndex: 5,
      background: NIGHT.panel, borderRadius: 999, display: 'flex',
      padding: 6, boxShadow: `0 8px 32px -8px #000a` }}>
      {tabs.map(t => {
        const isActive = t.id === active;
        return (
          <div key={t.id} style={{ flex: 1, textAlign: 'center', padding: '7px 0',
            background: isActive ? NIGHT.butter : 'transparent',
            color: isActive ? NIGHT.ink : NIGHT.fg2,
            borderRadius: 999, fontWeight: isActive ? 900 : 600 }}>
            <div style={{ fontSize: 20, lineHeight: 1 }}>{t.i}</div>
            <div style={{ fontSize: 9, marginTop: 2,
              opacity: isActive ? 1 : .7 }}>{t.l}</div>
          </div>
        );
      })}
    </nav>
  );
};

/* ─── HOME · NIGHT ──────────────────────────────────────── */
function BGNightHome() {
  return (
    <div style={{ ...nightPageBase, overflow: 'auto' }}>
      <NightHeader />

      <main style={{ padding: '4px 20px 110px', display: 'flex',
        flexDirection: 'column', gap: 18, position: 'relative', zIndex: 1 }}>

        <div style={{ padding: '0 4px' }}>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 900,
            letterSpacing: '-0.02em', color: NIGHT.fg }}>
            Hi, Sarah <span style={{ display: 'inline-block',
              transform: 'rotate(-10deg)' }}>🌙</span>
          </p>
          <p style={{ margin: '4px 0 0', fontSize: 13, fontWeight: 600,
            color: NIGHT.fg3 }}>Late set tonight. House lights down.</p>
        </div>

        {/* HERO — butter glow */}
        <div style={{ position: 'relative', background: NIGHT.butter,
          borderRadius: 32, padding: 22, color: NIGHT.ink, overflow: 'hidden',
          boxShadow: `0 0 60px -20px ${NIGHT.butter}77` }}>
          <NightDoodle ch="♪" x={20} y={10} size={28} rot={-15}
            color={NIGHT.ink} op={.25} />
          <NightDoodle ch="♬" x={290} y={8} size={42} rot={12}
            color={NIGHT.ink} op={.15} />

          <NightMono color={NIGHT.ink + 'aa'}>tonight's set · track 06</NightMono>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
            <span style={{ fontSize: 78, fontWeight: 900, lineHeight: .9,
              letterSpacing: '-0.05em', fontVariantNumeric: 'tabular-nums',
              display: 'inline-block', transform: 'rotate(-3deg)',
              color: NIGHT.ink }}>540</span>
            <span style={{ fontSize: 18, fontWeight: 900, color: NIGHT.ink }}>XP ⭐</span>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <NightPill bg={NIGHT.peach}>🔥 7 nights</NightPill>
            <NightPill bg={NIGHT.ink} color={NIGHT.butter}>🎤 2 of 3 tonight</NightPill>
          </div>
        </div>

        {/* DAILY GOAL — mint glow */}
        <div style={nightCard({ background: NIGHT.mint, padding: 16,
          display: 'flex', alignItems: 'center', gap: 14, color: NIGHT.ink,
          boxShadow: `0 0 40px -16px ${NIGHT.mint}77` })}>
          <div style={{ position: 'relative', width: 54, height: 54 }}>
            <svg viewBox="0 0 40 40" width="54" height="54">
              <circle cx="20" cy="20" r="16" fill="none"
                stroke={NIGHT.fg} strokeWidth="6" opacity=".4" />
              <circle cx="20" cy="20" r="16" fill="none"
                stroke={NIGHT.ink} strokeWidth="6"
                strokeDasharray={`${(2/3) * 100.5} 100.5`}
                transform="rotate(-90 20 20)" strokeLinecap="round" />
            </svg>
            <span style={{ position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 13, color: NIGHT.ink }}>2/3</span>
          </div>
          <div style={{ flex: 1 }}>
            <NightMono color={NIGHT.ink + 'aa'}>tonight's set</NightMono>
            <p style={{ margin: '2px 0 0', fontWeight: 900, fontSize: 16,
              lineHeight: 1.2, color: NIGHT.ink }}>
              One more song for an encore!
            </p>
          </div>
        </div>

        {/* UP NEXT — dark card w/ sky accent */}
        <div>
          <NightEyebrow>up next ✨</NightEyebrow>
          <div style={nightCard({ background: NIGHT.panel, padding: 16,
            display: 'flex', alignItems: 'center', gap: 14,
            border: `1.5px solid ${NIGHT.sky}55`,
            position: 'relative', overflow: 'hidden' })}>
            <NightDoodle ch="♩" x={280} y={48} size={36} rot={10}
              color={NIGHT.lavender} op={.3} />
            <div style={{ width: 56, height: 56, borderRadius: 18, background: NIGHT.sky,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 30, transform: 'rotate(-4deg)',
              boxShadow: `0 0 24px -6px ${NIGHT.sky}88` }}>🎼</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <NightMono color={NIGHT.sky}>track a3 · notation</NightMono>
              <p style={{ margin: '2px 0 0', fontWeight: 900, fontSize: 15,
                lineHeight: 1.2, color: NIGHT.fg }}>Treble Staff Notes</p>
              <p style={{ margin: '2px 0 0', fontSize: 11, fontWeight: 700,
                color: NIGHT.fg3 }}>4 songs · +25 XP</p>
            </div>
            <button style={{ width: 46, height: 46, borderRadius: 999,
              background: NIGHT.butter, color: NIGHT.ink, border: 0, fontSize: 16,
              fontWeight: 900, cursor: 'pointer',
              boxShadow: `0 0 20px -4px ${NIGHT.butter}77`,
              paddingLeft: 4 }}>▶</button>
          </div>
        </div>

        {/* SETLIST */}
        <div>
          <NightEyebrow>your setlist 🎵</NightEyebrow>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '🎼', name: 'Notation', pct: 88, bg: NIGHT.lavender },
              { icon: '🥁', name: 'Rhythm', pct: 40, bg: NIGHT.peach },
              { icon: '🎹', name: 'Scales', pct: 18, bg: NIGHT.pink },
              { icon: '📏', name: 'Intervals', pct: 0, bg: NIGHT.panel2 },
            ].map(t => {
              const isPanel = t.bg === NIGHT.panel2;
              return (
                <div key={t.name} style={nightCard({ background: t.bg,
                  padding: 14, borderRadius: 22,
                  color: isPanel ? NIGHT.fg : NIGHT.ink,
                  boxShadow: isPanel ? 'none' : `0 0 30px -16px ${t.bg}88` })}>
                  <div style={{ fontSize: 38, lineHeight: 1, marginBottom: 4,
                    display: 'inline-block', transform: 'rotate(-4deg)',
                    filter: t.pct === 0 ? 'grayscale(.5) opacity(.6)' : 'none' }}>
                    {t.icon}
                  </div>
                  <p style={{ margin: 0, fontWeight: 900, fontSize: 15,
                    color: isPanel ? NIGHT.fg : NIGHT.ink }}>{t.name}</p>
                  <div style={{ marginTop: 6, display: 'flex',
                    alignItems: 'center', gap: 6 }}>
                    <div style={{ flex: 1, height: 6,
                      background: isPanel ? NIGHT.panelHi : `${NIGHT.ink}33`,
                      borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${Math.max(t.pct, 0)}%`,
                        background: isPanel ? NIGHT.fg3 : NIGHT.ink,
                        borderRadius: 99 }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 900,
                      color: isPanel ? NIGHT.fg3 : NIGHT.ink }}>
                      {t.pct === 0 ? 'new!' : `${t.pct}%`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* B-sides */}
        <div>
          <NightEyebrow>b-sides to brush up 🔁</NightEyebrow>
          <div style={nightCard({ background: NIGHT.panel,
            border: `1.5px solid ${NIGHT.cherry}55`,
            padding: 14, display: 'flex', alignItems: 'center', gap: 12 })}>
            <span style={{ fontSize: 30, lineHeight: 1,
              display: 'inline-block', transform: 'rotate(-6deg)' }}>🎯</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 900, fontSize: 14,
                color: NIGHT.fg }}>3 tracks to rehearse</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                {['Perfect 5ths','Bass clef','Sharps'].map(c => (
                  <span key={c} style={{ background: NIGHT.cherry + '33',
                    color: NIGHT.cherry, padding: '4px 10px', borderRadius: 999,
                    fontSize: 11, fontWeight: 900 }}>{c}</span>
                ))}
              </div>
            </div>
            <span style={{ color: NIGHT.cherry, fontSize: 22, fontWeight: 900 }}>›</span>
          </div>
        </div>

      </main>

      <NightTabBar active="home" />
    </div>
  );
}

/* ─── QUIZ ENCORE · NIGHT ───────────────────────────────── */
function BGNightEncore() {
  return (
    <div style={{ ...nightPageBase, overflow: 'hidden',
      display: 'flex', flexDirection: 'column' }}>

      <div style={{ padding: '18px 20px', display: 'flex',
        alignItems: 'center', gap: 10 }}>
        <button style={{ width: 36, height: 36, borderRadius: 999,
          background: NIGHT.panel, border: 0, fontSize: 16, fontWeight: 900,
          color: NIGHT.fg }}>✕</button>
        <div style={{ flex: 1, display: 'flex', gap: 4 }}>
          {[true, true, true, false].map((on, i) => (
            <div key={i} style={{ flex: 1, height: 8, borderRadius: 99,
              background: on ? NIGHT.peach : NIGHT.panel,
              boxShadow: on ? `0 0 12px ${NIGHT.peach}77` : 'none' }} />
          ))}
        </div>
        <NightMono>04/04</NightMono>
      </div>

      <div style={{ padding: '4px 20px', flex: 1 }}>
        <NightMono>track a3 · question</NightMono>
        <p style={{ margin: '4px 0 0', fontSize: 22, fontWeight: 900,
          letterSpacing: '-0.02em', lineHeight: 1.15, color: NIGHT.fg }}>
          Which note is this?
        </p>

        {/* staff card */}
        <div style={nightCard({ background: NIGHT.panel, padding: 22,
          marginTop: 14, display: 'flex', justifyContent: 'center',
          position: 'relative', overflow: 'hidden' })}>
          <NightDoodle ch="♪" x={18} y={14} size={18} rot={-15}
            color={NIGHT.peach} op={.3} />
          <svg viewBox="0 0 280 110" width={240} style={{ color: NIGHT.fg }}>
            {[0,1,2,3,4].map(i => (
              <line key={i} x1="8" x2="272" y1={32 + i*12} y2={32 + i*12}
                stroke="currentColor" strokeWidth="1.5" opacity=".7" />
            ))}
            <text x="14" y="78" fontSize="62" fill={NIGHT.peach}
              fontFamily="serif"
              style={{ filter: `drop-shadow(0 0 6px ${NIGHT.peach}66)` }}>𝄞</text>
            <ellipse cx="180" cy="56" rx="9" ry="6.5" fill={NIGHT.mint}
              transform="rotate(-22 180 56)"
              style={{ filter: `drop-shadow(0 0 8px ${NIGHT.mint}aa)` }} />
            <line x1="188" y1="56" x2="188" y2="22"
              stroke={NIGHT.mint} strokeWidth="2" />
          </svg>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 10, marginTop: 14 }}>
          {[{l:'F'},{l:'A'},{l:'G', correct:true},{l:'B'}].map(o => {
            const right = o.correct;
            return (
              <div key={o.l} style={{
                background: right ? NIGHT.mint : NIGHT.panel,
                border: right ? `3px solid ${NIGHT.mint}` : `3px solid ${NIGHT.panel2}`,
                borderRadius: 18, padding: '16px 12px',
                fontWeight: 900, fontSize: 22, textAlign: 'center',
                color: right ? NIGHT.ink : NIGHT.fg,
                position: 'relative',
                boxShadow: right ? `0 0 24px -4px ${NIGHT.mint}99` : 'none',
              }}>
                {o.l}
                {right && (
                  <span style={{ position: 'absolute', top: -10, right: -8,
                    background: NIGHT.ink, color: NIGHT.mint,
                    width: 26, height: 26, borderRadius: 99,
                    fontSize: 14, display: 'flex',
                    alignItems: 'center', justifyContent: 'center' }}>✓</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background: NIGHT.mint, borderTopLeftRadius: 32,
        borderTopRightRadius: 32, padding: '22px 24px 18px', color: NIGHT.ink,
        position: 'relative', overflow: 'hidden',
        boxShadow: `0 -12px 50px -8px ${NIGHT.mint}66` }}>
        <NightDoodle ch="♪" x={20} y={14} size={22} rot={-20}
          color={NIGHT.ink} op={.25} />
        <NightDoodle ch="♬" x={340} y={10} size={30} rot={15}
          color={NIGHT.ink} op={.25} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: 56, lineHeight: 1, display: 'inline-block',
            transform: 'rotate(-12deg)' }}>🎉</span>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 32, fontWeight: 900,
              letterSpacing: '-0.03em', lineHeight: 1, color: NIGHT.ink }}>
              Encore!
            </p>
            <NightMono color={NIGHT.ink + 'aa'} size={11}>+15 XP · combo ×3 🔥</NightMono>
          </div>
        </div>
        <p style={{ margin: '12px 0 0', fontSize: 13, fontWeight: 700,
          color: NIGHT.ink, lineHeight: 1.5 }}>
          That's a <strong>G</strong> — the second line of the treble staff.
          Right where the clef's curl is.
        </p>

        <div style={{ marginTop: 14 }}>
          <button style={{ width: '100%', background: NIGHT.ink, color: NIGHT.butter,
            border: 0, padding: '16px 22px', borderRadius: 999,
            fontFamily: 'inherit', fontWeight: 900, fontSize: 15,
            cursor: 'pointer' }}>
            Next track →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── BACKSTAGE · NIGHT (settings) ──────────────────────── */
function BGNightBackstage() {
  const NightRow = ({ icon, label, sub, right, accent = NIGHT.lavender }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 14px' }}>
      <div style={{ width: 38, height: 38, borderRadius: 12,
        background: accent + '33',
        border: `1.5px solid ${accent}55`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, flexShrink: 0,
        transform: 'rotate(-4deg)' }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: 900, fontSize: 14,
          color: NIGHT.fg, lineHeight: 1.2 }}>{label}</p>
        {sub && <p style={{ margin: '2px 0 0', fontSize: 11, fontWeight: 600,
          color: NIGHT.fg3 }}>{sub}</p>}
      </div>
      <div style={{ flexShrink: 0 }}>{right}</div>
    </div>
  );

  const NightToggle = ({ on = false }) => (
    <div style={{
      width: 46, height: 28, borderRadius: 999,
      background: on ? NIGHT.butter : NIGHT.panel2,
      position: 'relative',
      boxShadow: on ? `0 0 16px -2px ${NIGHT.butter}77` : 'none',
    }}>
      <div style={{
        position: 'absolute', top: 3, left: on ? 22 : 3,
        width: 22, height: 22, borderRadius: 999,
        background: on ? NIGHT.ink : NIGHT.fg,
      }} />
    </div>
  );

  return (
    <div style={{ ...nightPageBase, overflow: 'auto' }}>
      <NightHeader back title="Backstage" right={<div />} />

      <main style={{ padding: '4px 20px 40px', position: 'relative', zIndex: 1 }}>

        {/* Performer card */}
        <div style={{ position: 'relative', background: NIGHT.butter,
          borderRadius: 32, padding: '22px 20px', color: NIGHT.ink,
          overflow: 'hidden', marginBottom: 18,
          boxShadow: `0 0 60px -20px ${NIGHT.butter}66` }}>
          <NightDoodle ch="♪" x={20} y={10} size={28} rot={-15}
            color={NIGHT.ink} op={.2} />
          <NightDoodle ch="♬" x={290} y={120} size={42} rot={12}
            color={NIGHT.ink} op={.15} />

          <NightMono color={NIGHT.ink + 'aa'}>performer card</NightMono>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16,
            marginTop: 12 }}>
            <div style={{ width: 72, height: 72, borderRadius: 999,
              background: NIGHT.lavender, color: NIGHT.ink,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 30,
              border: `5px solid ${NIGHT.ink}`,
              transform: 'rotate(-4deg)' }}>S</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontWeight: 900, fontSize: 22,
                color: NIGHT.ink, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Sarah O.
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 12, fontWeight: 600,
                color: NIGHT.ink + 'aa' }}>sarah.morris@example.com</p>
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                <NightPill bg={NIGHT.ink} color={NIGHT.butter} size={10}>Track 06</NightPill>
                <NightPill bg={NIGHT.peach} size={10}>🔥 7 nights</NightPill>
              </div>
            </div>
          </div>

          <button style={{ marginTop: 14, width: '100%',
            background: NIGHT.ink, color: NIGHT.butter, border: 0,
            padding: '12px 18px', borderRadius: 999,
            fontFamily: 'inherit', fontWeight: 800, fontSize: 13,
            cursor: 'pointer' }}>
            Edit your card
          </button>
        </div>

        <NightEyebrow>the show 🎤</NightEyebrow>
        <div style={nightCard({ background: NIGHT.panel, padding: 6,
          marginBottom: 18 })}>
          <NightRow icon="🎯" label="Set length" sub="3 songs per night"
            accent={NIGHT.peach}
            right={<span style={{ color: NIGHT.fg, fontWeight: 900, fontSize: 14 }}>›</span>} />
          <div style={{ height: 1, background: NIGHT.panel2, margin: '0 14px' }} />
          <NightRow icon="🔁" label="B-sides" sub="Auto-resurface flubs after 3 days"
            accent={NIGHT.mint} right={<NightToggle on />} />
          <div style={{ height: 1, background: NIGHT.panel2, margin: '0 14px' }} />
          <NightRow icon="🌶" label="Hard mode" sub="Encore difficulty everywhere"
            accent={NIGHT.cherry} right={<NightToggle on={false} />} />
        </div>

        <NightEyebrow>the venue 🎚</NightEyebrow>
        <div style={nightCard({ background: NIGHT.panel, padding: 6,
          marginBottom: 18 })}>
          <NightRow icon="🔊" label="Audio" sub="Note playback in study cards"
            accent={NIGHT.lavender} right={<NightToggle on />} />
          <div style={{ height: 1, background: NIGHT.panel2, margin: '0 14px' }} />
          <NightRow icon="🎉" label="Confetti" sub="Encore celebrations"
            accent={NIGHT.pink} right={<NightToggle on />} />
          <div style={{ height: 1, background: NIGHT.panel2, margin: '0 14px' }} />
          <NightRow icon="🌙" label="House lights" sub="Dark mode — bubblegum night"
            accent={NIGHT.butter} right={<NightToggle on />} />
        </div>

        <div style={nightCard({ background: NIGHT.cherry + '22',
          padding: 16, marginBottom: 18, border: `1px solid ${NIGHT.cherry}55` })}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 36, lineHeight: 1,
              display: 'inline-block', transform: 'rotate(-8deg)' }}>☕</div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 900, fontSize: 14,
                color: NIGHT.fg }}>Drop a tip in the jar</p>
              <p style={{ margin: '2px 0 0', fontSize: 12, fontWeight: 600,
                color: NIGHT.fg3 }}>Cadence is made by one person.</p>
            </div>
            <span style={{ color: NIGHT.cherry, fontWeight: 900, fontSize: 18 }}>›</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', padding: '10px 0 4px' }}>
          <span style={{ fontSize: 26, color: NIGHT.peach, lineHeight: 1,
            fontFamily: 'serif', display: 'inline-block',
            transform: 'rotate(-10deg)',
            filter: `drop-shadow(0 0 12px ${NIGHT.peach}77)` }}>♩</span>
          <p style={{ margin: '6px 0 0', fontSize: 11, fontWeight: 700,
            color: NIGHT.fgDim }}>
            Cadence v2.0 · Bubblegum night
          </p>
        </div>
      </main>
    </div>
  );
}

/* ─── SIGN IN · NIGHT ───────────────────────────────────── */
function BGNightSignIn() {
  return (
    <div style={{ ...nightPageBase, overflow: 'hidden', display: 'flex',
      flexDirection: 'column' }}>

      <NightDoodle ch="♪" x={32} y={70} size={36} rot={-15}
        color={NIGHT.peach} op={.5} />
      <NightDoodle ch="♬" x={330} y={120} size={52} rot={12}
        color={NIGHT.lavender} op={.5} />
      <NightDoodle ch="♫" x={48} y={300} size={28} rot={-8}
        color={NIGHT.mint} op={.55} />
      <NightDoodle ch="♩" x={350} y={420} size={42} rot={18}
        color={NIGHT.sky} op={.5} />
      <NightDoodle ch="♪" x={28} y={520} size={32} rot={-20}
        color={NIGHT.butter} op={.6} />

      <div style={{ height: 50 }} />

      <div style={{ flex: 1, padding: '40px 32px 0', display: 'flex',
        flexDirection: 'column', alignItems: 'flex-start',
        position: 'relative', zIndex: 1 }}>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10,
          marginBottom: 8 }}>
          <span style={{ fontSize: 92, fontFamily: 'serif', color: NIGHT.peach,
            lineHeight: .9, transform: 'rotate(-10deg)', display: 'inline-block',
            fontWeight: 400,
            filter: `drop-shadow(0 0 20px ${NIGHT.peach}88)` }}>♩</span>
          <span style={{ fontSize: 32, fontWeight: 900, color: NIGHT.fg,
            letterSpacing: '-0.03em' }}>cadence</span>
        </div>

        <p style={{ margin: '24px 0 0', fontSize: 44, fontWeight: 900,
          letterSpacing: '-0.035em', lineHeight: 1, color: NIGHT.fg }}>
          Learn music<br/>theory like<br/>
          <span style={{ color: NIGHT.cherry, display: 'inline-block',
            transform: 'rotate(-2deg)',
            filter: `drop-shadow(0 0 24px ${NIGHT.cherry}66)` }}>your next</span><br/>
          <span style={{ background: NIGHT.butter, color: NIGHT.ink,
            padding: '0 12px', borderRadius: 12, display: 'inline-block',
            boxShadow: `0 0 32px -4px ${NIGHT.butter}77` }}>tour</span>.
        </p>

        <p style={{ margin: '20px 0 0', fontSize: 14, color: NIGHT.fg3,
          fontWeight: 600, lineHeight: 1.55, maxWidth: 320 }}>
          Bite-size lessons, friendly tutor, real progress. Build your setlist,
          chase the encore, never lose a streak.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
          <NightPill bg={NIGHT.mint}>🎼 Notation</NightPill>
          <NightPill bg={NIGHT.sky}>🥁 Rhythm</NightPill>
          <NightPill bg={NIGHT.lavender}>🎹 Scales</NightPill>
          <NightPill bg={NIGHT.peach}>📏 Intervals</NightPill>
          <NightPill bg={NIGHT.pink}>🎸 Chords</NightPill>
        </div>
      </div>

      <div style={{ padding: '0 24px 36px', position: 'relative', zIndex: 1 }}>
        <button style={{ width: '100%', background: NIGHT.butter, color: NIGHT.ink,
          border: 0, padding: '16px 22px', borderRadius: 999,
          fontFamily: 'inherit', fontWeight: 900, fontSize: 15, cursor: 'pointer',
          boxShadow: `0 0 32px -6px ${NIGHT.butter}88` }}>
          Take the stage →
        </button>
        <button style={{ width: '100%', marginTop: 10,
          background: NIGHT.panel, color: NIGHT.fg, border: 0,
          padding: '15px 22px', borderRadius: 999,
          fontFamily: 'inherit', fontWeight: 800, fontSize: 14,
          cursor: 'pointer' }}>
          I already have an account
        </button>
        <p style={{ margin: '14px 0 0', textAlign: 'center', fontSize: 12,
          color: NIGHT.fgDim, fontWeight: 600 }}>
          Skip for now — browse without a backstage pass.
        </p>
      </div>
    </div>
  );
}

window.BGNightHome = BGNightHome;
window.BGNightEncore = BGNightEncore;
window.BGNightBackstage = BGNightBackstage;
window.BGNightSignIn = BGNightSignIn;
