/* Cadence Bubblegum × Live Set — shared tokens, palette, helpers
   ───────────────────────────────────────────────────────────────
   Visual = Bubblegum (candy pastels on cream, ultra-round, no
   shadows, doodled notes). Copy = Live Set (setlist, tracks,
   encore, tonight's set). Used by every screen in this kit.
*/

const BG = {
  // surfaces
  cream:    '#fff7e0',
  creamHi:  '#fffdf3',
  white:    '#ffffff',
  // pastel palette
  butter:   '#ffd66b',
  peach:    '#ffaf95',
  mint:     '#a8e6b8',
  sky:      '#a8d8ff',
  lavender: '#cfb6ff',
  pink:     '#ffb3d9',
  cherry:   '#ff7faf',
  // ink (the only "dark" we use)
  plum:     '#3a224f',
  plumSoft: '#6b4a85',
  plumDim:  '#9d85b6',
  // states
  green:    '#27a059',     // for success accents over pastels
  rose:     '#e84d6f',     // for off-key (not red — keep the candy vibe)
};

const bgBubblePattern = `
  radial-gradient(circle at 12% 18%, ${BG.peach}55 0 8px, transparent 9px),
  radial-gradient(circle at 78% 8%, ${BG.mint}55 0 10px, transparent 11px),
  radial-gradient(circle at 90% 70%, ${BG.lavender}55 0 12px, transparent 13px),
  radial-gradient(circle at 6% 80%, ${BG.sky}55 0 8px, transparent 9px),
  radial-gradient(circle at 50% 40%, ${BG.butter}33 0 6px, transparent 7px)
`;

const bgPageBase = {
  background: BG.cream,
  backgroundImage: bgBubblePattern,
  backgroundSize: '420px 800px',
  width: '100%', height: '100%',
  fontFamily: 'Inter, system-ui, sans-serif',
  color: BG.plum,
  position: 'relative',
};

const bubbleCard = (extra = {}) => ({
  background: BG.white,
  borderRadius: 26,
  padding: 18,
  border: 'none',
  ...extra,
});

/* Doodled note glyph — slightly rotated, drawn in pastel */
const Doodle = ({ ch, x, y, size = 22, rot = 0, color = BG.plum, op = 1 }) => (
  <span style={{ position: 'absolute', left: x, top: y, fontSize: size,
    color, opacity: op, transform: `rotate(${rot}deg)`, lineHeight: 1,
    fontFamily: 'serif', pointerEvents: 'none' }}>{ch}</span>
);

/* Cadence wordmark — quarter note in peach, lowercase wordmark */
const Wordmark = ({ size = 22, gap = 6 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap }}>
    <span style={{ fontSize: size + 8, color: BG.peach, lineHeight: 1,
      fontFamily: 'serif', transform: 'rotate(-8deg)',
      display: 'inline-block' }}>♩</span>
    <span style={{ fontWeight: 900, fontSize: size, letterSpacing: '-0.03em',
      color: BG.plum }}>cadence</span>
  </div>
);

/* Status pill — used a lot. Pastel-bg + plum text + 900 weight. */
const Pill = ({ bg = BG.peach, color = BG.plum, children, size = 12, pad = '6px 12px' }) => (
  <span style={{ background: bg, color, padding: pad, borderRadius: 999,
    fontSize: size, fontWeight: 800, display: 'inline-flex',
    alignItems: 'center', gap: 4, letterSpacing: '-0.01em' }}>{children}</span>
);

/* Monospace track number / time stamp */
const Mono = ({ children, size = 11, color = BG.plumSoft, weight = 800,
                ls = '0.12em', uppercase = true }) => (
  <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: size, color, fontWeight: weight, letterSpacing: ls,
    textTransform: uppercase ? 'uppercase' : 'none' }}>{children}</span>
);

/* Section eyebrow — lowercase ✨ */
const Eyebrow = ({ children, color = BG.plumSoft }) => (
  <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 900, color,
    letterSpacing: '-0.01em' }}>{children}</p>
);

/* Tab bar — floating lavender pill, used on every "main" screen */
const TabBar = ({ active = 'home' }) => {
  const tabs = [
    { id: 'home',     i: '🏠', l: 'Home' },
    { id: 'learn',    i: '📚', l: 'Setlist' },
    { id: 'practice', i: '🎯', l: 'Soundcheck' },
    { id: 'review',   i: '🔄', l: 'B-Sides' },
    { id: 'progress', i: '📊', l: 'Records' },
  ];
  return (
    <nav style={{ position: 'absolute', left: 16, right: 16, bottom: 18, zIndex: 5,
      background: BG.white, borderRadius: 999, display: 'flex',
      padding: 6, boxShadow: `0 8px 24px -8px ${BG.plum}33` }}>
      {tabs.map(t => {
        const isActive = t.id === active;
        return (
          <div key={t.id} style={{ flex: 1, textAlign: 'center', padding: '7px 0',
            background: isActive ? BG.butter : 'transparent', borderRadius: 999,
            color: BG.plum, fontWeight: isActive ? 900 : 600 }}>
            <div style={{ fontSize: 20, lineHeight: 1 }}>{t.i}</div>
            <div style={{ fontSize: 9, marginTop: 2,
              opacity: isActive ? 1 : .7 }}>{t.l}</div>
          </div>
        );
      })}
    </nav>
  );
};

/* App header — wordmark left, avatar right, optional back chevron */
const AppHeader = ({ back = false, title, right = null }) => (
  <header style={{ display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', padding: '16px 20px',
    position: 'relative', zIndex: 1 }}>
    {back ? (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button style={{ width: 36, height: 36, borderRadius: 999,
          background: BG.white, border: 0, fontSize: 18, fontWeight: 900,
          color: BG.plum, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        {title && <span style={{ fontWeight: 900, fontSize: 16,
          color: BG.plum, letterSpacing: '-0.01em' }}>{title}</span>}
      </div>
    ) : <Wordmark />}
    {right !== null ? right : (
      <div style={{ width: 38, height: 38, borderRadius: 999, background: BG.lavender,
        color: BG.plum, fontWeight: 900, fontSize: 15, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        border: `3px solid ${BG.white}` }}>S</div>
    )}
  </header>
);

/* Primary button — plum pill */
const PrimaryButton = ({ children, onClick, full = true, color = BG.plum,
                         textColor = BG.white }) => (
  <button onClick={onClick} style={{
    width: full ? '100%' : 'auto',
    background: color, color: textColor, border: 0,
    padding: '16px 22px', borderRadius: 999,
    fontFamily: 'inherit', fontWeight: 900, fontSize: 15,
    letterSpacing: '-0.01em', cursor: 'pointer',
  }}>{children}</button>
);

/* Secondary "ghost" pill button */
const GhostButton = ({ children, onClick, full = true }) => (
  <button onClick={onClick} style={{
    width: full ? '100%' : 'auto',
    background: BG.white, color: BG.plum, border: 0,
    padding: '15px 22px', borderRadius: 999,
    fontFamily: 'inherit', fontWeight: 800, fontSize: 14,
    cursor: 'pointer',
  }}>{children}</button>
);

/* Plum-on-pastel chip used for category labels */
const CategoryChip = ({ children, bg = BG.lavender }) => (
  <span style={{ background: bg, color: BG.plum, padding: '4px 10px',
    borderRadius: 999, fontSize: 11, fontWeight: 900,
    letterSpacing: '-0.01em', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
    {children}
  </span>
);

/* Treble-staff SVG (shared between study + quiz) — note position configurable */
const TrebleStaff = ({ noteX = 180, noteY = 56, stemUp = true, color = BG.plum,
                       width = 240 }) => (
  <svg viewBox="0 0 280 110" width={width} style={{ color }}>
    {[0,1,2,3,4].map(i => (
      <line key={i} x1="8" x2="272" y1={32 + i*12} y2={32 + i*12}
        stroke="currentColor" strokeWidth="1.5" />
    ))}
    <text x="14" y="78" fontSize="62" fill="currentColor" fontFamily="serif">𝄞</text>
    <ellipse cx={noteX} cy={noteY} rx="9" ry="6.5" fill="currentColor"
      transform={`rotate(-22 ${noteX} ${noteY})`} />
    <line x1={noteX + 8} y1={noteY} x2={noteX + 8} y2={stemUp ? noteY - 34 : noteY + 34}
      stroke="currentColor" strokeWidth="2" />
  </svg>
);

/* ── Shared styles registered to window for use across screens ── */
Object.assign(window, {
  BG, bgBubblePattern, bgPageBase, bubbleCard,
  Doodle, Wordmark, Pill, Mono, Eyebrow, TabBar, AppHeader,
  PrimaryButton, GhostButton, CategoryChip, TrebleStaff,
});
