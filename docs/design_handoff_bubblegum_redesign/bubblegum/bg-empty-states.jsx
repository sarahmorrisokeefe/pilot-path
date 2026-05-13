/* Bubblegum × Live Set — Empty / Locked states
   ───────────────────────────────────────────────────────────
   Five components in one file. Each is a full screen variant
   of an existing screen, designed for "nothing here yet" or
   "you can't get in yet" without feeling like a dead-end.
*/

/* ─── 1. SIGNED-OUT HOME ───────────────────────────────────
   The production app's hero ("Track your progress / Sign in
   to earn XP, build streaks, and resume lessons") is the
   biggest single driver of the businessy feel. New treatment:
   you can still browse — there's a real preview of what
   tonight's set would look like — but the call to action is
   warm and tour-themed.                                   */
function BGSignedOutHome() {
  return (
    <div style={{ ...bgPageBase, overflow: 'auto' }}>
      <AppHeader right={
        <button style={{ background: BG.plum, color: BG.white, border: 0,
          padding: '8px 14px', borderRadius: 999, fontFamily: 'inherit',
          fontWeight: 800, fontSize: 12, cursor: 'pointer' }}>
          Sign in
        </button>
      } />

      <main style={{ padding: '4px 20px 110px', display: 'flex',
        flexDirection: 'column', gap: 18, position: 'relative', zIndex: 1 }}>

        {/* Anonymous greeting */}
        <div style={{ padding: '0 4px' }}>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 900,
            letterSpacing: '-0.02em', color: BG.plum }}>
            Hey there <span style={{ display: 'inline-block',
              transform: 'rotate(-10deg)' }}>👋</span>
          </p>
          <p style={{ margin: '4px 0 0', fontSize: 13, fontWeight: 600,
            color: BG.plumSoft }}>Wander the venue — grab a pass when you're ready.</p>
        </div>

        {/* Hero — Sign-in prompt, warm not pushy */}
        <div style={{ position: 'relative', background: BG.butter, borderRadius: 32,
          padding: 22, color: BG.plum, overflow: 'hidden' }}>
          <Doodle ch="♪" x={20} y={10} size={28} rot={-15} color={BG.peach} />
          <Doodle ch="♬" x={290} y={8} size={42} rot={12} color={BG.peach} op={.5} />
          <Doodle ch="✦" x={300} y={130} size={22} rot={0} color={BG.cherry} op={.6} />

          <p style={{ margin: 0, fontSize: 26, fontWeight: 900,
            letterSpacing: '-0.025em', lineHeight: 1.05 }}>
            Get a{' '}
            <span style={{ background: BG.peach, padding: '0 8px',
              borderRadius: 8, display: 'inline-block',
              transform: 'rotate(-1deg)' }}>backstage pass</span><br/>
            to save your set.
          </p>
          <p style={{ margin: '10px 0 0', fontSize: 13, fontWeight: 600,
            color: BG.plumSoft }}>
            Sign in to track tracks, build streaks, and earn records.
          </p>

          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <PrimaryButton color={BG.plum}>Take the stage →</PrimaryButton>
          </div>
        </div>

        {/* Browse-the-venue tease — locked but visible setlist */}
        <div>
          <Eyebrow>walk the venue 🎵</Eyebrow>
          <p style={{ margin: '-6px 4px 12px', fontSize: 12, fontWeight: 600,
            color: BG.plumSoft }}>
            Tap any album to preview — saving progress needs a pass.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[
              { icon: '🎼', name: 'Notation', tracks: 12, bg: BG.lavender },
              { icon: '🥁', name: 'Rhythm', tracks: 10, bg: BG.peach },
              { icon: '🎹', name: 'Scales', tracks: 14, bg: BG.pink },
              { icon: '📏', name: 'Intervals', tracks: 8, bg: BG.sky },
            ].map(t => (
              <div key={t.name} style={bubbleCard({ background: t.bg, padding: 14,
                color: BG.plum, borderRadius: 22 })}>
                <div style={{ fontSize: 38, lineHeight: 1, marginBottom: 4,
                  display: 'inline-block', transform: 'rotate(-4deg)' }}>{t.icon}</div>
                <p style={{ margin: 0, fontWeight: 900, fontSize: 15 }}>{t.name}</p>
                <Mono color={BG.plumSoft} size={10}>{t.tracks} tracks</Mono>
              </div>
            ))}
          </div>
        </div>

        {/* What you get card */}
        <div style={bubbleCard({ background: BG.mint, padding: 16,
          borderRadius: 22 })}>
          <Eyebrow color={BG.plumSoft}>what's in the pass</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8,
            marginTop: 4 }}>
            {[
              ['⭐', 'XP after every quiz'],
              ['🔥', 'Daily streak that survives time-zones'],
              ['🏆', 'Records and gold-album unlocks'],
              ['🔄', 'B-sides — auto-resurfaces what you flubbed'],
            ].map(([i, l]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 22, lineHeight: 1,
                  display: 'inline-block', transform: 'rotate(-6deg)' }}>{i}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: BG.plum }}>{l}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ margin: '4px 0 0', textAlign: 'center', fontSize: 12,
          color: BG.plumDim, fontWeight: 600 }}>
          Or keep wandering — no pass needed to peek.
        </p>

      </main>

      <TabBar active="home" />
    </div>
  );
}

/* ─── 2. FIRST NIGHT HOME ──────────────────────────────────
   Day 1: just signed up, no XP, no streak, no tracks played.
   The hero is a "soundcheck" — get them into their first
   track in one tap, no dashboard.                          */
function BGFirstNightHome() {
  return (
    <div style={{ ...bgPageBase, overflow: 'auto' }}>
      <AppHeader />

      <main style={{ padding: '4px 20px 110px', display: 'flex',
        flexDirection: 'column', gap: 18, position: 'relative', zIndex: 1 }}>

        <div style={{ padding: '0 4px' }}>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 900,
            letterSpacing: '-0.02em', color: BG.plum }}>
            Welcome, Sarah <span style={{ display: 'inline-block',
              transform: 'rotate(-10deg)' }}>🎤</span>
          </p>
          <p style={{ margin: '4px 0 0', fontSize: 13, fontWeight: 600,
            color: BG.plumSoft }}>The stage is yours. Let's play your first song.</p>
        </div>

        {/* HERO — empty stats with playful zeros */}
        <div style={{ position: 'relative', background: BG.butter, borderRadius: 32,
          padding: 22, color: BG.plum, overflow: 'hidden' }}>
          <Doodle ch="♪" x={20} y={10} size={28} rot={-15} color={BG.peach} />
          <Doodle ch="♬" x={290} y={8} size={42} rot={12} color={BG.peach} op={.5} />

          <Mono color={BG.plumSoft}>opening night · track 01</Mono>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
            <span style={{ fontSize: 78, fontWeight: 900, lineHeight: .9,
              letterSpacing: '-0.05em', fontVariantNumeric: 'tabular-nums',
              display: 'inline-block', transform: 'rotate(-3deg)' }}>0</span>
            <span style={{ fontSize: 18, fontWeight: 900 }}>XP ⭐</span>
          </div>

          <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
            <Pill bg={BG.white}>🎤 First night</Pill>
            <Pill bg={BG.peach}>0 tracks played</Pill>
          </div>
        </div>

        {/* Big "start your first song" CTA */}
        <div style={bubbleCard({ background: BG.sky, padding: 18,
          borderRadius: 24, position: 'relative', overflow: 'hidden' })}>
          <Doodle ch="♩" x={290} y={70} size={56} rot={10} color={BG.lavender} op={.4} />

          <Mono color={BG.plumSoft}>start here</Mono>
          <p style={{ margin: '4px 0 0', fontSize: 22, fontWeight: 900,
            letterSpacing: '-0.02em', lineHeight: 1.05, color: BG.plum }}>
            Play your first track:<br/>
            <span style={{ background: BG.butter, padding: '0 8px',
              borderRadius: 8, display: 'inline-block',
              transform: 'rotate(-1deg)', marginTop: 4 }}>The 5 Lines</span>
          </p>
          <p style={{ margin: '10px 0 14px', fontSize: 12, fontWeight: 600,
            color: BG.plumSoft }}>
            4 short songs · about 3 minutes · +25 XP
          </p>
          <PrimaryButton color={BG.plum}>Open Notation · A1 →</PrimaryButton>
        </div>

        {/* What's coming — the venue tour */}
        <div>
          <Eyebrow>what's on the marquee 🎟</Eyebrow>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[
              { icon: '🎼', name: 'Notation', bg: BG.lavender },
              { icon: '🥁', name: 'Rhythm', bg: BG.peach },
              { icon: '🎹', name: 'Scales', bg: BG.pink },
              { icon: '📏', name: 'Intervals', bg: BG.mint },
              { icon: '🎸', name: 'Chords', bg: BG.sky },
              { icon: '🌟', name: 'Encore', bg: BG.butter },
            ].map(t => (
              <div key={t.name} style={bubbleCard({ background: t.bg, padding: 10,
                color: BG.plum, borderRadius: 18, textAlign: 'center' })}>
                <div style={{ fontSize: 28, lineHeight: 1,
                  display: 'inline-block', transform: 'rotate(-4deg)',
                  filter: t.name === 'Encore' ? 'grayscale(.3) opacity(.7)' : 'none'
                }}>{t.icon}</div>
                <p style={{ margin: '4px 0 0', fontWeight: 900, fontSize: 11,
                  letterSpacing: '-0.01em' }}>{t.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Streak tease */}
        <div style={bubbleCard({ background: BG.peach + '55', padding: 14,
          borderRadius: 22, display: 'flex', alignItems: 'center', gap: 12 })}>
          <span style={{ fontSize: 32, lineHeight: 1,
            display: 'inline-block', transform: 'rotate(-8deg)' }}>🔥</span>
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontWeight: 900, fontSize: 14,
              color: BG.plum }}>Start your first night</p>
            <p style={{ margin: '2px 0 0', fontSize: 12, fontWeight: 600,
              color: BG.plumSoft }}>
              Finish a track today and your streak begins.
            </p>
          </div>
        </div>

      </main>

      <TabBar active="home" />
    </div>
  );
}

/* ─── 3. LOCKED ALBUM ──────────────────────────────────────
   The Encore album — what you see when you tap it before you
   qualify. Show the gate clearly, but tease what's inside.  */
function BGLockedAlbum() {
  return (
    <div style={{ ...bgPageBase, overflow: 'auto' }}>

      {/* hero — gated */}
      <div style={{ position: 'relative', background: BG.butter,
        padding: '60px 20px 24px', overflow: 'hidden' }}>
        <Doodle ch="♬" x={300} y={36} size={56} rot={12} color={BG.plum} op={.15} />
        <Doodle ch="♪" x={32} y={84} size={36} rot={-12} color={BG.plum} op={.18} />

        <button style={{ position: 'absolute', top: 16, left: 16,
          width: 38, height: 38, borderRadius: 999, background: BG.white,
          border: 0, fontSize: 18, fontWeight: 900, color: BG.plum,
          cursor: 'pointer' }}>←</button>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Mono color={BG.plumSoft}>album · encore · 6 tracks</Mono>
            <span style={{ background: BG.plum, color: BG.white,
              padding: '3px 10px', borderRadius: 999, fontSize: 10, fontWeight: 900,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              fontFamily: 'ui-monospace, monospace' }}>LOCKED</span>
          </div>
          <p style={{ margin: '6px 0 0', fontSize: 40, fontWeight: 900,
            letterSpacing: '-0.035em', lineHeight: .95, color: BG.plum }}>
            Encore: <br/>
            <span style={{ display: 'inline-block', transform: 'rotate(-2deg)',
              color: BG.cherry }}>Advanced Theory</span>
          </p>
          <p style={{ margin: '8px 0 0', fontSize: 14, fontWeight: 600,
            color: BG.plum, opacity: .8 }}>
            Modes, harmonic minor, secondary dominants — the songs that
            close out the night.
          </p>
        </div>
      </div>

      {/* unlock progress */}
      <main style={{ padding: '20px 20px 110px', position: 'relative', zIndex: 1 }}>
        <div style={bubbleCard({ background: BG.white, padding: 18,
          borderRadius: 22, position: 'relative' })}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12,
            marginBottom: 14 }}>
            <div style={{ width: 56, height: 56, borderRadius: 999,
              background: BG.lavender, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 28,
              transform: 'rotate(-6deg)', border: `4px solid ${BG.white}` }}>🔒</div>
            <div style={{ flex: 1 }}>
              <Mono color={BG.plumSoft}>how to unlock</Mono>
              <p style={{ margin: '2px 0 0', fontSize: 18, fontWeight: 900,
                color: BG.plum, lineHeight: 1.15 }}>
                Finish 3 albums first
              </p>
            </div>
          </div>

          {/* Album checklist */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { icon: '🎼', name: 'Notation', done: true, pct: 100 },
              { icon: '🥁', name: 'Rhythm', done: false, pct: 40 },
              { icon: '🎹', name: 'Scales', done: false, pct: 18 },
              { icon: '📏', name: 'Intervals', done: false, pct: 0 },
              { icon: '🎸', name: 'Chords', done: false, pct: 0 },
            ].map(a => (
              <div key={a.name} style={{ display: 'flex', alignItems: 'center',
                gap: 10, padding: '8px 0' }}>
                <div style={{ width: 28, height: 28, borderRadius: 999,
                  background: a.done ? BG.green : BG.cream,
                  color: a.done ? BG.white : BG.plumDim,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: 13 }}>
                  {a.done ? '✓' : ''}
                </div>
                <span style={{ fontSize: 20, lineHeight: 1,
                  filter: a.done ? 'none' : 'grayscale(.4)' }}>{a.icon}</span>
                <span style={{ flex: 1, fontWeight: 800, fontSize: 14,
                  color: a.done ? BG.plum : BG.plumSoft,
                  textDecoration: a.done ? 'line-through' : 'none',
                  textDecorationColor: BG.green, textDecorationThickness: 2 }}>
                  {a.name}
                </span>
                <Mono color={a.done ? BG.green : BG.plumDim} size={10}>
                  {a.pct}%
                </Mono>
              </div>
            ))}
          </div>

          <p style={{ margin: '14px 0 0', fontSize: 12, fontWeight: 700,
            color: BG.plumSoft, textAlign: 'center' }}>
            <strong style={{ color: BG.plum }}>1 of 5 done.</strong>{' '}
            Keep going — the encore's waiting.
          </p>
        </div>

        {/* Track preview — blurred/muted */}
        <Eyebrow color={BG.plumSoft}>peek inside</Eyebrow>
        <div style={bubbleCard({ background: BG.white, padding: 6,
          position: 'relative', overflow: 'hidden' })}>
          {[
            { n: '★1', name: 'Mode Shifts' },
            { n: '★2', name: 'Modal Interchange' },
            { n: '★3', name: 'Harmonic Minor' },
            { n: '★4', name: 'Secondary Dominants' },
          ].map(t => (
            <div key={t.n} style={{ display: 'flex', alignItems: 'center',
              gap: 12, padding: '12px 12px', opacity: .45 }}>
              <div style={{ width: 36, height: 36, borderRadius: 999,
                background: BG.peach, color: BG.plum,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: 12,
                fontFamily: 'ui-monospace, monospace' }}>{t.n}</div>
              <span style={{ flex: 1, fontWeight: 800, fontSize: 14,
                color: BG.plum, filter: 'blur(2px)' }}>{t.name}</span>
              <span style={{ color: BG.plumDim, fontSize: 14 }}>🔒</span>
            </div>
          ))}
        </div>

        <PrimaryButton>Keep playing Notation →</PrimaryButton>
      </main>

      <TabBar active="learn" />
    </div>
  );
}

/* ─── 4. EMPTY RECORDS ─────────────────────────────────────
   Progress tab on Day 1 — no records, no stats, no graph.   */
function BGEmptyRecords() {
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

        {/* stat hero — all zeros */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: 10, marginBottom: 18 }}>
          {[
            { l: 'total XP', v: '0', bg: BG.peach },
            { l: 'track', v: '01', bg: BG.lavender },
            { l: 'nights', v: '0', bg: BG.mint },
          ].map(s => (
            <div key={s.l} style={bubbleCard({ background: s.bg, padding: 12,
              borderRadius: 20, textAlign: 'center' })}>
              <Mono color={BG.plumSoft} size={9} ls="0.18em">{s.l}</Mono>
              <p style={{ margin: '4px 0 0', fontSize: 32, fontWeight: 900,
                letterSpacing: '-0.03em', color: BG.plum, lineHeight: .9,
                fontVariantNumeric: 'tabular-nums',
                display: 'inline-block', transform: 'rotate(-2deg)',
                opacity: s.v === '0' ? .35 : 1 }}>{s.v}</p>
            </div>
          ))}
        </div>

        {/* Big empty state */}
        <div style={bubbleCard({ background: BG.white, padding: '32px 22px',
          borderRadius: 28, textAlign: 'center', marginBottom: 18,
          position: 'relative', overflow: 'hidden' })}>
          <Doodle ch="✦" x={30} y={20} size={18} rot={0} color={BG.peach} op={.6} />
          <Doodle ch="✦" x={300} y={28} size={22} rot={0} color={BG.lavender} op={.6} />
          <Doodle ch="♪" x={50} y={200} size={26} rot={-15} color={BG.mint} op={.5} />
          <Doodle ch="♬" x={300} y={210} size={30} rot={12} color={BG.sky} op={.5} />

          {/* trophy case — empty silhouettes */}
          <div style={{ display: 'flex', justifyContent: 'center',
            gap: 14, marginBottom: 18 }}>
            {[BG.peach, BG.butter, BG.lavender].map((bg, i) => (
              <div key={i} style={{
                width: 64, height: 64, borderRadius: 999,
                background: bg, opacity: i === 1 ? 1 : .55,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 32, transform: `rotate(${i === 1 ? -8 : 0}deg)`,
                filter: 'grayscale(.4) opacity(.6)',
                border: `4px solid ${BG.white}`,
              }}>{['🥉', '🏆', '🥈'][i]}</div>
            ))}
          </div>

          <p style={{ margin: 0, fontSize: 24, fontWeight: 900,
            letterSpacing: '-0.025em', color: BG.plum, lineHeight: 1.1 }}>
            No records yet —<br/>
            <span style={{ color: BG.cherry }}>but tonight's the night.</span>
          </p>
          <p style={{ margin: '12px 0 18px', fontSize: 13, fontWeight: 600,
            color: BG.plumSoft, lineHeight: 1.55 }}>
            Finish your first track to earn the "First Song" record.
            Records pile up as you play — gold for 90%, perfect for 100%,
            week warriors for 7 nights in a row.
          </p>
          <PrimaryButton color={BG.plum}>Play your first track →</PrimaryButton>
        </div>

        {/* Locked record previews */}
        <Eyebrow color={BG.plumSoft}>records you'll chase</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 12 }}>
          {[
            { icon: '🎼', name: 'First Song', desc: 'Finish track A1',
              bg: BG.lavender },
            { icon: '🔥', name: 'Week Warrior', desc: '7 nights in a row',
              bg: BG.peach },
            { icon: '💯', name: 'Perfect Set', desc: '100% on any quiz',
              bg: BG.mint },
            { icon: '🏆', name: 'Gold Record', desc: '90% on an album',
              bg: BG.butter },
          ].map(r => (
            <div key={r.name} style={bubbleCard({ background: r.bg + '55',
              padding: 16, borderRadius: 22, textAlign: 'center' })}>
              <div style={{
                width: 60, height: 60, borderRadius: 999, margin: '0 auto',
                background: BG.white, opacity: .6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 30, transform: 'rotate(-6deg)',
                filter: 'grayscale(.6)',
                border: `4px solid ${BG.white}`,
              }}>{r.icon}</div>
              <p style={{ margin: '8px 0 0', fontWeight: 900, fontSize: 13,
                color: BG.plum, lineHeight: 1.2 }}>{r.name}</p>
              <p style={{ margin: '2px 0 0', fontSize: 11, fontWeight: 600,
                color: BG.plumSoft, lineHeight: 1.3 }}>{r.desc}</p>
            </div>
          ))}
        </div>

      </main>

      <TabBar active="progress" />
    </div>
  );
}

/* ─── 5. EMPTY B-SIDES ─────────────────────────────────────
   Review tab when nothing's flubbed yet. Celebrate clean
   slate rather than apologize for empty list.              */
function BGEmptyBSides() {
  return (
    <div style={{ ...bgPageBase, overflow: 'auto' }}>
      <AppHeader />

      <main style={{ padding: '4px 20px 110px', position: 'relative', zIndex: 1 }}>

        <div style={{ padding: '0 4px 14px' }}>
          <p style={{ margin: 0, fontSize: 28, fontWeight: 900,
            letterSpacing: '-0.025em', color: BG.plum }}>
            <span style={{ background: BG.cherry + '55', padding: '0 8px',
              borderRadius: 8, display: 'inline-block',
              transform: 'rotate(-1deg)' }}>B-sides</span>
          </p>
          <p style={{ margin: '6px 0 0', fontSize: 13, fontWeight: 600,
            color: BG.plumSoft }}>The tracks you flub get queued here for a redo.</p>
        </div>

        {/* Big empty hero — all clear */}
        <div style={bubbleCard({ background: BG.mint, padding: '36px 22px 28px',
          borderRadius: 28, textAlign: 'center', marginBottom: 18,
          position: 'relative', overflow: 'hidden' })}>
          <Doodle ch="✦" x={30} y={20} size={18} rot={0} color={BG.plum} op={.2} />
          <Doodle ch="✦" x={310} y={26} size={22} rot={0} color={BG.plum} op={.2} />
          <Doodle ch="♪" x={50} y={200} size={26} rot={-15} color={BG.plum} op={.2} />
          <Doodle ch="♬" x={300} y={210} size={30} rot={12} color={BG.plum} op={.2} />

          <div style={{ fontSize: 80, lineHeight: 1, marginBottom: 10,
            display: 'inline-block', transform: 'rotate(-8deg)' }}>🎯</div>

          <p style={{ margin: 0, fontSize: 26, fontWeight: 900,
            letterSpacing: '-0.025em', color: BG.plum, lineHeight: 1.1 }}>
            All clear — <br/>
            <span style={{ color: BG.green }}>nothing to rehearse.</span>
          </p>
          <p style={{ margin: '12px 0 0', fontSize: 13, fontWeight: 600,
            color: BG.plum, lineHeight: 1.55, opacity: .85 }}>
            You haven't missed a note. Keep this up and you'll never
            see a B-side here — but if you flub one, it'll show up
            for a quick redo a few days later.
          </p>
        </div>

        {/* "How it works" — gentle explainer */}
        <div style={bubbleCard({ background: BG.white, padding: 16,
          borderRadius: 22 })}>
          <Eyebrow>how b-sides work</Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12,
            marginTop: 4 }}>
            {[
              ['1', BG.peach, 'You flub a note in a quiz', 'It quietly joins your B-sides list.'],
              ['2', BG.butter, 'A few days later it resurfaces', 'Spaced repetition — when forgetting starts to set in.'],
              ['3', BG.mint, 'Nail it twice in a row', 'Off the list, into long-term memory.'],
            ].map(([n, c, h, d]) => (
              <div key={n} style={{ display: 'flex', gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 999,
                  background: c, color: BG.plum,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: 14, flexShrink: 0,
                  fontFamily: 'ui-monospace, monospace' }}>{n}</div>
                <div>
                  <p style={{ margin: 0, fontWeight: 900, fontSize: 13,
                    color: BG.plum }}>{h}</p>
                  <p style={{ margin: '2px 0 0', fontSize: 12, fontWeight: 600,
                    color: BG.plumSoft, lineHeight: 1.4 }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* secondary CTA */}
        <p style={{ margin: '20px 0 0', textAlign: 'center', fontSize: 12,
          fontWeight: 600, color: BG.plumSoft }}>
          Looking to practice anyway?{' '}
          <span style={{ color: BG.plum, fontWeight: 900,
            textDecoration: 'underline' }}>Try Soundcheck →</span>
        </p>

      </main>

      <TabBar active="review" />
    </div>
  );
}

window.BGSignedOutHome = BGSignedOutHome;
window.BGFirstNightHome = BGFirstNightHome;
window.BGLockedAlbum = BGLockedAlbum;
window.BGEmptyRecords = BGEmptyRecords;
window.BGEmptyBSides = BGEmptyBSides;
