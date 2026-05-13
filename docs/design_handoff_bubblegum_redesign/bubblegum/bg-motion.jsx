/* Bubblegum × Live Set — Motion playground
   ───────────────────────────────────────────────────────────
   Four key motion moments, each as its own auto-playing
   component with a Replay button. Pure React state + CSS
   transitions — no extra deps. Each component loops on its
   own timer so the design canvas always shows motion.
*/

/* ────────────────────────────────────────────────────────────
   Keyframes — injected once.
   ──────────────────────────────────────────────────────────── */
if (typeof document !== 'undefined' && !document.getElementById('bg-motion-styles')) {
  const s = document.createElement('style');
  s.id = 'bg-motion-styles';
  s.textContent = `
    @keyframes bg-pop-in {
      0%   { opacity: 0; transform: scale(.6) rotate(-12deg); }
      55%  { opacity: 1; transform: scale(1.15) rotate(-3deg); }
      100% { opacity: 1; transform: scale(1)    rotate(-3deg); }
    }
    @keyframes bg-shake {
      0%, 100% { transform: translateX(0) rotate(0deg); }
      10% { transform: translateX(-8px) rotate(-1deg); }
      30% { transform: translateX(8px)  rotate(1deg); }
      50% { transform: translateX(-6px) rotate(-.5deg); }
      70% { transform: translateX(6px)  rotate(.5deg); }
      90% { transform: translateX(-3px) rotate(0deg); }
    }
    @keyframes bg-rise {
      0%   { opacity: 0; transform: translateY(60px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes bg-rise-fade {
      0%   { opacity: 0; transform: translateY(40px) scale(.85); }
      30%  { opacity: 1; transform: translateY(-20px) scale(1.1); }
      100% { opacity: 0; transform: translateY(-80px) scale(1); }
    }
    @keyframes bg-confetti {
      0%   { opacity: 1; transform: translate(0, 0) rotate(0deg); }
      100% { opacity: 0; transform: var(--end) rotate(var(--rot)); }
    }
    @keyframes bg-sparkle {
      0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
      50%      { opacity: 1; transform: scale(1) rotate(180deg); }
    }
    @keyframes bg-streak-glow {
      0%, 100% { transform: scale(1) rotate(-8deg);
                 filter: drop-shadow(0 0 0 transparent); }
      50%      { transform: scale(1.18) rotate(-12deg);
                 filter: drop-shadow(0 0 18px #ff7faf88); }
    }
    @keyframes bg-bar-fill {
      0%   { width: var(--from, 0%); }
      100% { width: var(--to,   100%); }
    }
    @keyframes bg-fade-in {
      0%   { opacity: 0; }
      100% { opacity: 1; }
    }
    @keyframes bg-tick {
      0%   { transform: scale(0)   rotate(-30deg); }
      60%  { transform: scale(1.3) rotate(8deg); }
      100% { transform: scale(1)   rotate(0deg); }
    }
  `;
  document.head.appendChild(s);
}

/* Small "replay" pill */
function ReplayBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{
      position: 'absolute', top: 12, right: 12, zIndex: 5,
      background: BG.white, color: BG.plum, border: 0,
      padding: '6px 10px', borderRadius: 999,
      fontFamily: 'inherit', fontSize: 11, fontWeight: 800,
      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
      boxShadow: `0 2px 8px -2px ${BG.plum}33`,
    }}>↻ Replay</button>
  );
}

/* ────────────────────────────────────────────────────────────
   1. ENCORE — full correct-answer celebration choreography
   ──────────────────────────────────────────────────────────── */
function MotionEncore() {
  const [k, setK] = React.useState(0);
  const [phase, setPhase] = React.useState(0);
  // 0: idle question · 1: option turning green · 2: pop · 3: full panel
  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1200);
    const loop = setTimeout(() => { setPhase(0); setK(k => k + 1); }, 5200);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(loop); };
  }, [k]);

  const correctAt = phase >= 1;
  const xpVisible = phase >= 2;
  const panelVisible = phase >= 3;

  // confetti particles — generated once per replay
  const particles = React.useMemo(() => Array.from({ length: 22 }, (_, i) => {
    const angle = (i / 22) * Math.PI * 2;
    const dist = 90 + Math.random() * 60;
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist - 20,
      rot: Math.floor(Math.random() * 720 - 360),
      delay: Math.random() * 200,
      color: [BG.cherry, BG.peach, BG.butter, BG.mint, BG.sky, BG.lavender][i % 6],
      size: 6 + Math.floor(Math.random() * 6),
      shape: i % 3,
    };
  }), [k]);

  return (
    <div key={k} style={{ ...bgPageBase, overflow: 'hidden',
      display: 'flex', flexDirection: 'column' }}>
      <ReplayBtn onClick={() => { setPhase(0); setK(k => k + 1); }} />

      {/* header */}
      <div style={{ padding: '18px 20px', display: 'flex',
        alignItems: 'center', gap: 10 }}>
        <button style={{ width: 36, height: 36, borderRadius: 999,
          background: BG.white, border: 0, fontSize: 16, fontWeight: 900,
          color: BG.plum }}>✕</button>
        <div style={{ flex: 1, display: 'flex', gap: 4 }}>
          {[true, true, correctAt, false].map((on, i) => (
            <div key={i} style={{ flex: 1, height: 8, borderRadius: 99,
              background: on ? BG.peach : BG.white + '99',
              transition: 'background .25s' }} />
          ))}
        </div>
        <Mono color={BG.plumSoft}>{correctAt ? '04' : '03'}/04</Mono>
      </div>

      {/* question */}
      <div style={{ padding: '4px 20px', flex: 1 }}>
        <Mono color={BG.plumSoft}>track a3 · question</Mono>
        <p style={{ margin: '4px 0 0', fontSize: 22, fontWeight: 900,
          letterSpacing: '-0.02em', lineHeight: 1.15, color: BG.plum }}>
          Which note is this?
        </p>

        <div style={bubbleCard({ background: BG.white, padding: 22,
          marginTop: 14, display: 'flex', justifyContent: 'center',
          position: 'relative', overflow: 'hidden' })}>
          <TrebleStaff />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 10, marginTop: 14, position: 'relative' }}>
          {[{l:'F'},{l:'A'},{l:'G', correct:true},{l:'B'}].map(o => {
            const isCorrect = o.correct;
            const showRight = correctAt && isCorrect;
            return (
              <div key={o.l} style={{
                background: showRight ? BG.mint : BG.white,
                border: showRight ? `3px solid ${BG.plum}` : `3px solid ${BG.cream}`,
                borderRadius: 18, padding: '16px 12px',
                fontWeight: 900, fontSize: 22, textAlign: 'center',
                color: BG.plum, position: 'relative',
                transition: 'background .25s, border-color .25s',
              }}>
                {o.l}
                {showRight && (
                  <span style={{ position: 'absolute', top: -10, right: -8,
                    background: BG.plum, color: BG.white,
                    width: 26, height: 26, borderRadius: 99,
                    fontSize: 14, display: 'flex', alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'bg-tick .35s cubic-bezier(.36,.07,.19,.97) both' }}>✓</span>
                )}
              </div>
            );
          })}

          {/* confetti burst — anchored to the G option */}
          {xpVisible && (
            <div style={{ position: 'absolute', left: '75%', top: '50%',
              width: 0, height: 0, pointerEvents: 'none', zIndex: 4 }}>
              {particles.map((p, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  width: p.size, height: p.size,
                  background: p.color,
                  borderRadius: p.shape === 0 ? '50%' : p.shape === 1 ? 2 : 0,
                  transform: p.shape === 2 ? 'rotate(45deg)' : 'none',
                  animation: `bg-confetti 1.2s cubic-bezier(.18,.79,.42,1) ${p.delay}ms both`,
                  '--end': `translate(${p.x}px, ${p.y}px)`,
                  '--rot': `${p.rot}deg`,
                }} />
              ))}

              {/* +15 XP floater */}
              <div style={{
                position: 'absolute', left: -28, top: -12,
                background: BG.plum, color: BG.butter,
                padding: '6px 12px', borderRadius: 999,
                fontWeight: 900, fontSize: 14, whiteSpace: 'nowrap',
                animation: 'bg-rise-fade 1.4s cubic-bezier(.36,.07,.19,.97) 100ms both',
              }}>+15 XP ⭐</div>
            </div>
          )}
        </div>
      </div>

      {/* encore panel — slides up */}
      {panelVisible && (
        <div style={{ background: BG.mint, borderTopLeftRadius: 32,
          borderTopRightRadius: 32, padding: '22px 24px 22px',
          animation: 'bg-rise .45s cubic-bezier(.36,.07,.19,.97) both',
          position: 'relative', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 56, lineHeight: 1, display: 'inline-block',
              animation: 'bg-pop-in .5s cubic-bezier(.36,.07,.19,.97) both' }}>🎉</span>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 32, fontWeight: 900,
                letterSpacing: '-0.03em', lineHeight: 1, color: BG.plum,
                animation: 'bg-pop-in .5s cubic-bezier(.36,.07,.19,.97) 50ms both' }}>
                Encore!
              </p>
              <Mono color={BG.plumSoft} size={11}>+15 XP · combo ×3 🔥</Mono>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   2. SCORE DONUT — fills from 0 to 92, number counts up
   ──────────────────────────────────────────────────────────── */
function MotionDonut() {
  const [k, setK] = React.useState(0);
  const [n, setN] = React.useState(0);
  const target = 92;

  React.useEffect(() => {
    setN(0);
    const start = performance.now();
    const dur = 1500;
    let raf;
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const loop = setTimeout(() => setK(k => k + 1), 4200);
    return () => { cancelAnimationFrame(raf); clearTimeout(loop); };
  }, [k]);

  const circumference = 263.8;
  const offset = circumference - (n / 100) * circumference;

  return (
    <div key={k} style={{ ...bgPageBase, overflow: 'hidden',
      display: 'flex', flexDirection: 'column' }}>
      <ReplayBtn onClick={() => setK(k => k + 1)} />

      {/* confetti background */}
      <Doodle ch="✦" x={30} y={70} size={20} rot={0} color={BG.cherry} op={.6} />
      <Doodle ch="✦" x={350} y={120} size={24} rot={0} color={BG.peach} op={.6} />
      <Doodle ch="♪" x={50} y={220} size={26} rot={-15} color={BG.mint} op={.5} />
      <Doodle ch="♬" x={340} y={300} size={28} rot={12} color={BG.lavender} op={.5} />

      <div style={{ padding: '18px 20px' }}>
        <button style={{ width: 36, height: 36, borderRadius: 999,
          background: BG.white, border: 0, fontSize: 16, fontWeight: 900,
          color: BG.plum }}>✕</button>
      </div>

      <div style={{ flex: 1, padding: '0 20px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 20 }}>

        <div style={{ textAlign: 'center',
          animation: 'bg-fade-in .4s ease both' }}>
          <Mono color={BG.cherry} size={11} ls="0.2em">🌟 STANDING OVATION</Mono>
          <p style={{ margin: '8px 0 0', fontSize: 36, fontWeight: 900,
            letterSpacing: '-0.035em', lineHeight: 1, color: BG.plum,
            animation: 'bg-pop-in .5s cubic-bezier(.36,.07,.19,.97) 200ms both' }}>
            Crowd's going wild!
          </p>
        </div>

        <div style={{ position: 'relative', width: 220, height: 220 }}>
          <svg viewBox="0 0 100 100" width="220" height="220">
            <circle cx="50" cy="50" r="42" fill="none"
              stroke={BG.white} strokeWidth="12" />
            <circle cx="50" cy="50" r="42" fill="none"
              stroke={BG.butter} strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 50 50)" strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset .05s linear' }} />
          </svg>
          <div style={{ position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 72, fontWeight: 900,
              letterSpacing: '-0.04em', lineHeight: .9, color: BG.plum,
              fontVariantNumeric: 'tabular-nums',
              display: 'inline-block', transform: 'rotate(-2deg)' }}>{n}</span>
            <Mono color={BG.plumSoft} size={11}>
              {Math.round(n / 100 * 12)}/12 CORRECT
            </Mono>
          </div>

          {/* sparkles when complete */}
          {n >= target && (
            <>
              <span style={{ position: 'absolute', top: 8, right: 28,
                fontSize: 26, color: BG.cherry,
                animation: 'bg-sparkle 1.4s ease-out both' }}>✦</span>
              <span style={{ position: 'absolute', bottom: 24, left: -2,
                fontSize: 20, color: BG.peach,
                animation: 'bg-sparkle 1.4s ease-out 200ms both' }}>✦</span>
              <span style={{ position: 'absolute', top: 40, left: 0,
                fontSize: 16, color: BG.lavender,
                animation: 'bg-sparkle 1.4s ease-out 400ms both' }}>✦</span>
            </>
          )}
        </div>

        {/* stats */}
        {n >= target && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
            gap: 10, width: '100%',
            animation: 'bg-rise .4s cubic-bezier(.36,.07,.19,.97) 200ms both' }}>
            {[
              { l: 'XP', v: '+165', bg: BG.butter },
              { l: 'Combo', v: '×5', bg: BG.peach },
              { l: 'Time', v: '4:18', bg: BG.lavender },
            ].map(s => (
              <div key={s.l} style={bubbleCard({ background: s.bg, padding: 12,
                textAlign: 'center', borderRadius: 18 })}>
                <Mono color={BG.plumSoft} size={9} ls="0.15em">{s.l}</Mono>
                <p style={{ margin: '4px 0 0', fontWeight: 900, fontSize: 22,
                  letterSpacing: '-0.02em', color: BG.plum,
                  fontVariantNumeric: 'tabular-nums' }}>{s.v}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   3. STREAK IGNITION — daily goal 2/3 → 3/3
   ──────────────────────────────────────────────────────────── */
function MotionStreak() {
  const [k, setK] = React.useState(0);
  const [phase, setPhase] = React.useState(0); // 0: 2/3 · 1: filling · 2: 3/3 fire

  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 1600);
    const loop = setTimeout(() => { setPhase(0); setK(k => k + 1); }, 4400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(loop); };
  }, [k]);

  const dashTo = phase >= 2 ? 100.5 : phase === 1 ? 100.5 : 67;

  return (
    <div key={k} style={{ ...bgPageBase, overflow: 'hidden',
      display: 'flex', flexDirection: 'column' }}>
      <ReplayBtn onClick={() => { setPhase(0); setK(k => k + 1); }} />

      <AppHeader />

      <main style={{ padding: '4px 20px', display: 'flex',
        flexDirection: 'column', gap: 18 }}>

        {/* DAILY GOAL — mint card */}
        <div style={bubbleCard({ background: BG.mint, padding: 16,
          display: 'flex', alignItems: 'center', gap: 14, position: 'relative',
          overflow: 'hidden' })}>

          {/* burst when full */}
          {phase >= 2 && Array.from({ length: 10 }).map((_, i) => {
            const angle = (i / 10) * Math.PI * 2;
            return (
              <span key={i} style={{
                position: 'absolute', left: 32, top: 32,
                width: 6, height: 6, background: BG.butter,
                borderRadius: 999, pointerEvents: 'none',
                animation: `bg-confetti .9s ease-out ${i * 30}ms both`,
                '--end': `translate(${Math.cos(angle) * 60}px, ${Math.sin(angle) * 60}px)`,
                '--rot': '0deg',
              }} />
            );
          })}

          <div style={{ position: 'relative', width: 54, height: 54 }}>
            <svg viewBox="0 0 40 40" width="54" height="54">
              <circle cx="20" cy="20" r="16" fill="none"
                stroke={BG.white} strokeWidth="6" />
              <circle cx="20" cy="20" r="16" fill="none"
                stroke={BG.plum} strokeWidth="6"
                strokeDasharray={`${dashTo} 100.5`}
                transform="rotate(-90 20 20)" strokeLinecap="round"
                style={{ transition: 'stroke-dasharray .8s cubic-bezier(.36,.07,.19,.97)' }} />
            </svg>
            <span style={{ position: 'absolute', inset: 0, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: 13, color: BG.plum,
              transition: 'transform .3s',
              transform: phase >= 2 ? 'scale(1.15)' : 'scale(1)' }}>
              {phase >= 2 ? '3/3' : phase === 1 ? '⋯' : '2/3'}
            </span>
          </div>
          <div style={{ flex: 1 }}>
            <Mono>tonight's set</Mono>
            <p style={{ margin: '2px 0 0', fontWeight: 900, fontSize: 16,
              lineHeight: 1.2, color: BG.plum }}>
              {phase >= 2 ? "Set complete — encore unlocked!"
                : phase === 1 ? "One more song coming up…"
                : "One more song for an encore!"}
            </p>
          </div>
        </div>

        {/* Streak card — ignites when goal hits */}
        <div style={bubbleCard({ background: BG.peach + '88', padding: 16,
          display: 'flex', alignItems: 'center', gap: 14, position: 'relative' })}>
          <span style={{ fontSize: 38, lineHeight: 1,
            display: 'inline-block', transformOrigin: 'center',
            animation: phase >= 2 ? 'bg-streak-glow 1s ease-in-out infinite'
              : 'none',
            transform: phase >= 2 ? 'rotate(-8deg)' : 'rotate(-8deg)' }}>🔥</span>
          <div style={{ flex: 1 }}>
            <Mono color={BG.plumSoft}>streak</Mono>
            <p style={{ margin: '2px 0 0', fontWeight: 900, fontSize: 22,
              letterSpacing: '-0.02em', color: BG.plum, lineHeight: 1.1,
              fontVariantNumeric: 'tabular-nums' }}>
              {phase >= 2 ? '8' : '7'} nights
            </p>
            <p style={{ margin: '2px 0 0', fontSize: 12, fontWeight: 700,
              color: BG.plumSoft }}>
              {phase >= 2 ? 'New personal best!' : 'Keep it lit.'}
            </p>
          </div>
          {phase >= 2 && (
            <Pill bg={BG.cherry} color={BG.white} size={11}>
              +1 night
            </Pill>
          )}
        </div>
      </main>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   4. OFF-KEY SHAKE — wrong answer feedback
   ──────────────────────────────────────────────────────────── */
function MotionShake() {
  const [k, setK] = React.useState(0);
  const [phase, setPhase] = React.useState(0); // 0: idle · 1: shake · 2: panel up

  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 700);
    const t2 = setTimeout(() => setPhase(2), 1300);
    const loop = setTimeout(() => { setPhase(0); setK(k => k + 1); }, 4400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(loop); };
  }, [k]);

  return (
    <div key={k} style={{ ...bgPageBase, overflow: 'hidden',
      display: 'flex', flexDirection: 'column' }}>
      <ReplayBtn onClick={() => { setPhase(0); setK(k => k + 1); }} />

      <div style={{ padding: '18px 20px', display: 'flex',
        alignItems: 'center', gap: 10 }}>
        <button style={{ width: 36, height: 36, borderRadius: 999,
          background: BG.white, border: 0, fontSize: 16, fontWeight: 900,
          color: BG.plum }}>✕</button>
        <div style={{ flex: 1, display: 'flex', gap: 4 }}>
          {[true, true, false, false].map((on, i) => (
            <div key={i} style={{ flex: 1, height: 8, borderRadius: 99,
              background: on ? BG.peach : BG.white + '99' }} />
          ))}
        </div>
        <Mono color={BG.plumSoft}>03/04</Mono>
      </div>

      <div style={{ padding: '4px 20px', flex: 1 }}>
        <Mono color={BG.plumSoft}>track a3 · question</Mono>
        <p style={{ margin: '4px 0 0', fontSize: 22, fontWeight: 900,
          letterSpacing: '-0.02em', lineHeight: 1.15, color: BG.plum }}>
          Which note is this?
        </p>

        <div style={bubbleCard({ background: BG.white, padding: 22,
          marginTop: 14, display: 'flex', justifyContent: 'center',
          animation: phase === 1 ? 'bg-shake .5s cubic-bezier(.36,.07,.19,.97)'
            : 'none' })}>
          <TrebleStaff />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 10, marginTop: 14 }}>
          {[{l:'F'},{l:'A'},{l:'G',correct:true},{l:'B'}].map(o => {
            const wrong = phase >= 1 && o.l === 'B';
            const reveal = phase >= 2 && o.correct;
            return (
              <div key={o.l} style={{
                background: wrong ? BG.cherry + '33'
                  : reveal ? BG.mint
                  : BG.white,
                border: wrong ? `3px solid ${BG.cherry}`
                  : reveal ? `3px solid ${BG.plum}`
                  : `3px solid ${BG.cream}`,
                borderRadius: 18, padding: '16px 12px',
                fontWeight: 900, fontSize: 22, textAlign: 'center',
                color: BG.plum, position: 'relative',
                transition: 'background .25s, border-color .25s',
                animation: wrong && phase === 1 ? 'bg-shake .5s' : 'none',
              }}>
                {o.l}
                {wrong && (
                  <span style={{ position: 'absolute', top: -10, right: -8,
                    background: BG.cherry, color: BG.white,
                    width: 26, height: 26, borderRadius: 99,
                    fontSize: 14, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    animation: 'bg-tick .35s' }}>✕</span>
                )}
                {reveal && (
                  <Mono size={9} color={BG.green} ls="0.15em">CORRECT</Mono>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {phase >= 2 && (
        <div style={{ background: BG.cherry + '22',
          borderTop: `4px solid ${BG.cherry}`,
          borderTopLeftRadius: 32, borderTopRightRadius: 32,
          padding: '22px 24px 22px',
          animation: 'bg-rise .4s cubic-bezier(.36,.07,.19,.97) both' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 50, lineHeight: 1,
              animation: 'bg-pop-in .5s cubic-bezier(.36,.07,.19,.97) both' }}>🎧</span>
            <div>
              <p style={{ margin: 0, fontSize: 26, fontWeight: 900,
                letterSpacing: '-0.02em', lineHeight: 1, color: BG.plum }}>
                Off-key — close though!
              </p>
              <Mono color={BG.cherry} size={11}>combo reset</Mono>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

window.MotionEncore = MotionEncore;
window.MotionDonut = MotionDonut;
window.MotionStreak = MotionStreak;
window.MotionShake = MotionShake;
