/* Bubblegum × Live Set — Backstage (Settings / Account) */

/* Reusable settings row */
function SettingRow({ icon, label, sub, right, accent = BG.lavender }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 14px' }}>
      <div style={{ width: 38, height: 38, borderRadius: 12,
        background: accent, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        fontSize: 20, flexShrink: 0,
        transform: 'rotate(-4deg)' }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontWeight: 900, fontSize: 14,
          color: BG.plum, lineHeight: 1.2 }}>{label}</p>
        {sub && <p style={{ margin: '2px 0 0', fontSize: 11, fontWeight: 600,
          color: BG.plumSoft }}>{sub}</p>}
      </div>
      <div style={{ flexShrink: 0 }}>{right}</div>
    </div>
  );
}

/* Toggle switch */
function Toggle({ on = false }) {
  return (
    <div style={{
      width: 46, height: 28, borderRadius: 999,
      background: on ? BG.plum : BG.cream,
      position: 'relative', cursor: 'pointer',
      transition: 'background .2s',
    }}>
      <div style={{
        position: 'absolute', top: 3, left: on ? 22 : 3,
        width: 22, height: 22, borderRadius: 999,
        background: BG.white,
        transition: 'left .2s',
        boxShadow: '0 1px 3px rgba(0,0,0,.15)',
      }} />
    </div>
  );
}

function BGBackstage() {
  return (
    <div style={{ ...bgPageBase, overflow: 'auto' }}>
      <AppHeader back title="Backstage" right={<div />} />

      <main style={{ padding: '4px 20px 110px', position: 'relative', zIndex: 1 }}>

        {/* PERFORMER CARD — profile hero */}
        <div style={{ position: 'relative', background: BG.butter, borderRadius: 32,
          padding: '22px 20px', color: BG.plum, overflow: 'hidden',
          marginBottom: 18 }}>
          <Doodle ch="♪" x={20} y={10} size={28} rot={-15} color={BG.peach} />
          <Doodle ch="♬" x={290} y={120} size={42} rot={12} color={BG.peach} op={.5} />

          <Mono color={BG.plumSoft}>performer card</Mono>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16,
            marginTop: 12 }}>
            <div style={{ width: 72, height: 72, borderRadius: 999,
              background: BG.lavender, color: BG.plum,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 30,
              border: `5px solid ${BG.white}`,
              transform: 'rotate(-4deg)' }}>S</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: 0, fontWeight: 900, fontSize: 22,
                color: BG.plum, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Sarah O.
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 12, fontWeight: 600,
                color: BG.plumSoft }}>sarah.morris@example.com</p>
              <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                <Pill bg={BG.white} size={10}>Track 06</Pill>
                <Pill bg={BG.peach} size={10}>🔥 7 nights</Pill>
              </div>
            </div>
          </div>

          <button style={{ marginTop: 14, width: '100%', background: BG.white,
            color: BG.plum, border: 0, padding: '12px 18px', borderRadius: 999,
            fontFamily: 'inherit', fontWeight: 800, fontSize: 13,
            cursor: 'pointer' }}>
            Edit your card
          </button>
        </div>

        {/* THE SHOW */}
        <Eyebrow>the show 🎤</Eyebrow>
        <div style={bubbleCard({ background: BG.white, padding: 6,
          marginBottom: 18 })}>
          <SettingRow icon="🎯" label="Set length" sub="3 songs per night"
            accent={BG.peach}
            right={<span style={{ color: BG.plum, fontWeight: 900, fontSize: 14 }}>›</span>} />
          <div style={{ height: 1, background: BG.cream, margin: '0 14px' }} />
          <SettingRow icon="🔁" label="B-sides" sub="Auto-resurface flubs after 3 days"
            accent={BG.mint}
            right={<Toggle on />} />
          <div style={{ height: 1, background: BG.cream, margin: '0 14px' }} />
          <SettingRow icon="🌶" label="Hard mode" sub="Encore difficulty everywhere"
            accent={BG.cherry + '99'}
            right={<Toggle on={false} />} />
        </div>

        {/* THE VENUE */}
        <Eyebrow>the venue 🎚</Eyebrow>
        <div style={bubbleCard({ background: BG.white, padding: 6,
          marginBottom: 18 })}>
          <SettingRow icon="🔊" label="Audio" sub="Note playback in study cards"
            accent={BG.lavender}
            right={<Toggle on />} />
          <div style={{ height: 1, background: BG.cream, margin: '0 14px' }} />
          <SettingRow icon="🎉" label="Confetti" sub="Encore celebrations"
            accent={BG.pink}
            right={<Toggle on />} />
          <div style={{ height: 1, background: BG.cream, margin: '0 14px' }} />
          <SettingRow icon="🌙" label="House lights" sub="Dark mode — bubblegum night"
            accent={BG.plum}
            right={<Toggle on={false} />} />
          <div style={{ height: 1, background: BG.cream, margin: '0 14px' }} />
          <SettingRow icon="🌐" label="Language" sub="English (US)"
            accent={BG.sky}
            right={<span style={{ color: BG.plum, fontWeight: 900, fontSize: 14 }}>›</span>} />
        </div>

        {/* DOOR MAN — notifications */}
        <Eyebrow>setlist reminders 📣</Eyebrow>
        <div style={bubbleCard({ background: BG.white, padding: 6,
          marginBottom: 18 })}>
          <SettingRow icon="📩" label="Showtime nudge"
            sub="Tap me when it's set time — 7pm"
            accent={BG.butter}
            right={<Toggle on />} />
          <div style={{ height: 1, background: BG.cream, margin: '0 14px' }} />
          <SettingRow icon="🔥" label="Streak saver"
            sub="Last-call ping if you haven't played"
            accent={BG.peach}
            right={<Toggle on />} />
          <div style={{ height: 1, background: BG.cream, margin: '0 14px' }} />
          <SettingRow icon="📰" label="Weekly review"
            sub="Sunday recap — what you played"
            accent={BG.mint}
            right={<Toggle on={false} />} />
        </div>

        {/* TIP JAR */}
        <div style={bubbleCard({ background: BG.cherry + '33', padding: 16,
          marginBottom: 18, borderRadius: 22 })}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ fontSize: 36, lineHeight: 1,
              display: 'inline-block', transform: 'rotate(-8deg)' }}>☕</div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 900, fontSize: 14,
                color: BG.plum }}>Drop a tip in the jar</p>
              <p style={{ margin: '2px 0 0', fontSize: 12, fontWeight: 600,
                color: BG.plumSoft }}>
                Cadence is made by one person. Buy them a coffee on Ko-fi.
              </p>
            </div>
            <span style={{ color: BG.cherry, fontWeight: 900, fontSize: 18 }}>›</span>
          </div>
        </div>

        {/* THE FINE PRINT */}
        <Eyebrow>the fine print 📜</Eyebrow>
        <div style={bubbleCard({ background: BG.white, padding: 6,
          marginBottom: 18 })}>
          <SettingRow icon="🔐" label="Account" sub="Email, password, sign-in"
            accent={BG.lavender}
            right={<span style={{ color: BG.plum, fontWeight: 900, fontSize: 14 }}>›</span>} />
          <div style={{ height: 1, background: BG.cream, margin: '0 14px' }} />
          <SettingRow icon="📋" label="Privacy & terms"
            sub="The boring-but-important docs"
            accent={BG.sky}
            right={<span style={{ color: BG.plum, fontWeight: 900, fontSize: 14 }}>›</span>} />
          <div style={{ height: 1, background: BG.cream, margin: '0 14px' }} />
          <SettingRow icon="💌" label="Send a postcard"
            sub="Email the maker"
            accent={BG.pink}
            right={<span style={{ color: BG.plum, fontWeight: 900, fontSize: 14 }}>›</span>} />
        </div>

        {/* DANGER ZONE — wipe the setlist */}
        <div style={bubbleCard({ background: BG.white, padding: 6,
          marginBottom: 18, border: `2px dashed ${BG.cherry}66` })}>
          <SettingRow icon="🧨" label="Wipe the setlist"
            sub="Reset all XP, streaks, and records. No undo."
            accent={BG.cherry + '55'}
            right={<span style={{ color: BG.cherry, fontWeight: 900, fontSize: 14 }}>›</span>} />
          <div style={{ height: 1, background: BG.cream, margin: '0 14px' }} />
          <SettingRow icon="🚪" label="Leave the stage"
            sub="Sign out of this device"
            accent={BG.cream}
            right={<span style={{ color: BG.plum, fontWeight: 900, fontSize: 14 }}>›</span>} />
        </div>

        {/* Footer credit */}
        <div style={{ textAlign: 'center', padding: '10px 0 4px' }}>
          <span style={{ fontSize: 26, color: BG.peach, lineHeight: 1,
            fontFamily: 'serif', display: 'inline-block',
            transform: 'rotate(-10deg)' }}>♩</span>
          <p style={{ margin: '6px 0 0', fontSize: 11, fontWeight: 700,
            color: BG.plumDim }}>
            Cadence v2.0 · Bubblegum night
          </p>
          <p style={{ margin: '4px 0 0', fontSize: 11, fontWeight: 600,
            color: BG.plumDim }}>
            Built with love by Sarah O'Keefe.
          </p>
        </div>

      </main>
    </div>
  );
}

window.BGBackstage = BGBackstage;
