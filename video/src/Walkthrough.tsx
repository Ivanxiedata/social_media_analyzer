import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

const C = {
  ink: '#241C3B',
  muted: '#756E88',
  purple: '#7C5CFC',
  purpleDark: '#5B3FD8',
  lavender: '#EAE4FF',
  blue: '#58A6FF',
  mint: '#40C6A1',
  coral: '#FF7F73',
  yellow: '#FFC857',
  paper: '#FFFCF9',
  background: '#F7F4FF',
};

const font = 'Inter, ui-rounded, "SF Pro Rounded", system-ui, sans-serif';

const clamp = {
  extrapolateLeft: 'clamp' as const,
  extrapolateRight: 'clamp' as const,
};

const fadeFor = (frame: number, duration: number) =>
  interpolate(frame, [0, 14, duration - 14, duration], [0, 1, 1, 0], {
    ...clamp,
    easing: Easing.inOut(Easing.cubic),
  });

const pop = (frame: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps: 30,
    config: {damping: 16, stiffness: 120, mass: 0.8},
  });

const Badge: React.FC<{children: React.ReactNode; color?: string}> = ({
  children,
  color = C.purple,
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      borderRadius: 999,
      padding: '12px 22px',
      color,
      background: `${color}16`,
      fontSize: 24,
      fontWeight: 800,
      letterSpacing: 0.3,
    }}
  >
    {children}
  </div>
);

const Scene: React.FC<{
  duration: number;
  children: React.ReactNode;
}> = ({duration, children}) => {
  const frame = useCurrentFrame();
  const opacity = fadeFor(frame, duration);
  const scale = interpolate(frame, [0, duration], [0.985, 1.015], clamp);

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `scale(${scale})`,
        padding: '90px 120px 130px',
        fontFamily: font,
        color: C.ink,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const title = pop(frame, 5);
  const flow = pop(frame, 25);
  const dotX = interpolate(frame, [30, 84], [6, 94], clamp);

  return (
    <Scene duration={90}>
      <div style={{textAlign: 'center'}}>
        <div style={{opacity: pop(frame, 0)}}>
          <Badge>✨ SOCIAL MEDIA VIDEO ANALYZER</Badge>
        </div>
        <h1
          style={{
            margin: '34px auto 16px',
            maxWidth: 1400,
            fontSize: 92,
            lineHeight: 0.98,
            letterSpacing: -4,
            transform: `translateY(${(1 - title) * 40}px)`,
            opacity: title,
          }}
        >
          Turn any social video link into{' '}
          <span style={{color: C.purple}}>actionable insight.</span>
        </h1>
        <p
          style={{
            margin: '0 auto',
            fontSize: 34,
            color: C.muted,
            opacity: pop(frame, 18),
          }}
        >
          Instagram Reels · TikTok · YouTube Shorts & videos
        </p>
        <div
          style={{
            width: 1160,
            height: 300,
            margin: '44px auto 0',
            borderRadius: 40,
            overflow: 'hidden',
            background: C.paper,
            boxShadow: '0 24px 80px rgba(78, 58, 130, 0.14)',
            transform: `translateY(${(1 - flow) * 30}px)`,
            opacity: flow,
          }}
        >
          <Img
            src={staticFile('social-media-analyzer-flow.png')}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        </div>
        <div
          style={{
            width: 1120,
            height: 7,
            margin: '-13px auto 0',
            borderRadius: 99,
            background: C.lavender,
            position: 'relative',
            overflow: 'visible',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: `${dotX}%`,
              top: -8,
              width: 23,
              height: 23,
              borderRadius: '50%',
              background: C.yellow,
              boxShadow: '0 0 0 10px rgba(255,200,87,.18)',
            }}
          />
        </div>
      </div>
    </Scene>
  );
};

const typed = (text: string, frame: number, start: number, speed = 1.7) =>
  text.slice(0, Math.max(0, Math.floor((frame - start) * speed)));

const TerminalLine: React.FC<{
  prompt?: boolean;
  text: string;
  color?: string;
}> = ({prompt = false, text, color = '#EDE8FF'}) => (
  <div style={{minHeight: 46, whiteSpace: 'pre'}}>
    {prompt && <span style={{color: C.mint}}>➜ </span>}
    <span style={{color}}>{text}</span>
  </div>
);

const Install: React.FC = () => {
  const frame = useCurrentFrame();
  const line1 = typed(
    'git clone https://github.com/Ivanxiedata/social_media_analyzer.git',
    frame,
    12,
    2.5,
  );
  const line2 = typed('cd social_media_analyzer', frame, 48, 2.2);
  const line3 = typed('./install.sh', frame, 72, 2);
  const done = pop(frame, 105);

  return (
    <Scene duration={150}>
      <div style={{display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 90}}>
        <div style={{paddingTop: 100}}>
          <Badge color={C.blue}>STEP 1 · INSTALL ONCE</Badge>
          <h2
            style={{
              fontSize: 82,
              lineHeight: 1.02,
              letterSpacing: -3,
              margin: '30px 0 24px',
            }}
          >
            One command sets up the whole skill.
          </h2>
          <p style={{fontSize: 32, lineHeight: 1.5, color: C.muted, margin: 0}}>
            The installer links the skill, checks dependencies, and downloads
            the local Whisper model.
          </p>
        </div>
        <div
          style={{
            alignSelf: 'center',
            height: 590,
            borderRadius: 34,
            overflow: 'hidden',
            background: '#211B35',
            boxShadow: '0 32px 90px rgba(34, 26, 62, .28)',
            transform: `translateY(${(1 - pop(frame, 4)) * 50}px)`,
          }}
        >
          <div
            style={{
              height: 68,
              background: '#302743',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '0 24px',
            }}
          >
            {[C.coral, C.yellow, C.mint].map((color) => (
              <div
                key={color}
                style={{width: 18, height: 18, borderRadius: '50%', background: color}}
              />
            ))}
            <span
              style={{
                marginLeft: 20,
                color: '#AFA6C7',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                fontSize: 21,
              }}
            >
              terminal
            </span>
          </div>
          <div
            style={{
              padding: '42px 44px',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
              fontSize: 19,
              lineHeight: 2.1,
            }}
          >
            <TerminalLine prompt text={line1} />
            <TerminalLine prompt text={line2} />
            <TerminalLine prompt text={line3} />
            {frame > 88 && (
              <>
                <TerminalLine text="==> checking dependencies" color="#B9ACF8" />
                <TerminalLine text="==> whisper model · ready" color="#75E0C0" />
              </>
            )}
            {frame > 106 && (
              <div
                style={{
                  marginTop: 18,
                  opacity: done,
                  transform: `scale(${done})`,
                  transformOrigin: 'left center',
                  color: '#FFDC7A',
                  fontWeight: 800,
                }}
              >
                ✓ done — analyze-media is ready
              </div>
            )}
          </div>
        </div>
      </div>
    </Scene>
  );
};

const Prompt: React.FC = () => {
  const frame = useCurrentFrame();
  const bubble = pop(frame, 16);
  const response = pop(frame, 78);

  return (
    <Scene duration={150}>
      <div style={{textAlign: 'center'}}>
        <Badge color={C.coral}>STEP 2 · SHARE A LINK</Badge>
        <h2
          style={{
            fontSize: 80,
            letterSpacing: -3,
            lineHeight: 1,
            margin: '28px 0 48px',
          }}
        >
          Ask the question you actually care about.
        </h2>
      </div>
      <div
        style={{
          width: 1320,
          margin: '0 auto',
          padding: 42,
          borderRadius: 40,
          background: 'rgba(255,255,255,.86)',
          border: '2px solid rgba(124,92,252,.12)',
          boxShadow: '0 24px 80px rgba(73, 55, 124, .13)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            fontSize: 25,
            fontWeight: 800,
            color: C.muted,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 16,
              display: 'grid',
              placeItems: 'center',
              background: C.ink,
              color: 'white',
            }}
          >
            ✦
          </div>
          Your AI agent
        </div>
        <div
          style={{
            marginLeft: 260,
            borderRadius: '30px 30px 8px 30px',
            padding: '26px 34px',
            background: `linear-gradient(135deg, ${C.purple}, ${C.purpleDark})`,
            color: 'white',
            fontSize: 31,
            lineHeight: 1.4,
            transform: `scale(${bubble})`,
            transformOrigin: 'bottom right',
            opacity: bubble,
          }}
        >
          Analyze this reel. Explain the hook, retention devices, payoff, and CTA.
          <div style={{fontSize: 24, opacity: 0.75, marginTop: 10}}>
            instagram.com/reel/XXXXXXXXX/
          </div>
        </div>
        <div
          style={{
            width: '70%',
            marginTop: 28,
            borderRadius: '30px 30px 30px 8px',
            padding: '24px 32px',
            background: C.lavender,
            fontSize: 28,
            lineHeight: 1.4,
            color: C.ink,
            opacity: response,
            transform: `translateY(${(1 - response) * 30}px)`,
          }}
        >
          Got it — I’ll download the post, transcribe the audio, inspect its
          frames, and connect the creative choices to the engagement signals.
        </div>
      </div>
    </Scene>
  );
};

const OutputChip: React.FC<{
  icon: string;
  label: string;
  delay: number;
  frame: number;
  color: string;
}> = ({icon, label, delay, frame, color}) => {
  const entrance = pop(frame, delay);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '18px 24px',
        borderRadius: 22,
        background: 'white',
        boxShadow: '0 12px 32px rgba(48, 39, 80, .1)',
        transform: `translateY(${(1 - entrance) * 28}px) scale(${0.9 + entrance * 0.1})`,
        opacity: entrance,
        fontSize: 25,
        fontWeight: 800,
      }}
    >
      <span
        style={{
          width: 46,
          height: 46,
          borderRadius: 14,
          display: 'grid',
          placeItems: 'center',
          background: `${color}22`,
        }}
      >
        {icon}
      </span>
      {label}
    </div>
  );
};

const Extract: React.FC = () => {
  const frame = useCurrentFrame();
  const scanX = interpolate(frame, [18, 128], [4, 96], clamp);

  return (
    <Scene duration={150}>
      <div style={{textAlign: 'center'}}>
        <Badge color={C.mint}>STEP 3 · THE SKILL DOES THE HEAVY LIFTING</Badge>
        <h2
          style={{
            fontSize: 72,
            letterSpacing: -2.5,
            lineHeight: 1,
            margin: '26px 0 32px',
          }}
        >
          Video in. Evidence bundle out.
        </h2>
      </div>
      <div
        style={{
          width: 1420,
          height: 530,
          margin: '0 auto',
          borderRadius: 42,
          background: 'white',
          padding: 30,
          boxShadow: '0 25px 80px rgba(64, 48, 110, .13)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Img
          src={staticFile('social-media-analyzer-flow.png')}
          style={{width: '100%', height: 355, objectFit: 'cover', borderRadius: 28}}
        />
        <div
          style={{
            position: 'absolute',
            left: `${scanX}%`,
            top: 45,
            bottom: 165,
            width: 8,
            borderRadius: 99,
            background: `linear-gradient(${C.yellow}, ${C.coral})`,
            boxShadow: '0 0 30px 8px rgba(255, 200, 87, .35)',
          }}
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 18,
            marginTop: 22,
          }}
        >
          <OutputChip frame={frame} delay={48} icon="💬" label="Transcript" color={C.purple} />
          <OutputChip frame={frame} delay={62} icon="🎞️" label="Frames" color={C.blue} />
          <OutputChip frame={frame} delay={76} icon="✍️" label="Caption" color={C.coral} />
          <OutputChip frame={frame} delay={90} icon="📊" label="Metadata" color={C.mint} />
        </div>
      </div>
    </Scene>
  );
};

const InsightCard: React.FC<{
  number: string;
  title: string;
  body: string;
  color: string;
  frame: number;
  delay: number;
}> = ({number, title, body, color, frame, delay}) => {
  const entrance = pop(frame, delay);
  return (
    <div
      style={{
        borderRadius: 34,
        padding: '30px 34px',
        background: 'rgba(255,255,255,.92)',
        boxShadow: '0 20px 55px rgba(58, 42, 102, .1)',
        borderTop: `8px solid ${color}`,
        opacity: entrance,
        transform: `translateY(${(1 - entrance) * 45}px)`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h3 style={{fontSize: 34, margin: 0}}>{title}</h3>
        <span
          style={{
            fontSize: 23,
            fontWeight: 900,
            color,
            background: `${color}18`,
            borderRadius: 99,
            padding: '8px 14px',
          }}
        >
          {number}
        </span>
      </div>
      <p style={{fontSize: 25, lineHeight: 1.45, color: C.muted, margin: '16px 0 0'}}>
        {body}
      </p>
    </div>
  );
};

const Insights: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Scene duration={180}>
      <div style={{textAlign: 'center'}}>
        <Badge>STEP 4 · GET A CREATIVE BREAKDOWN</Badge>
        <h2
          style={{
            fontSize: 76,
            lineHeight: 1,
            letterSpacing: -3,
            margin: '28px 0 18px',
          }}
        >
          Learn what works — and what to test next.
        </h2>
        <p style={{fontSize: 29, color: C.muted, margin: '0 0 38px'}}>
          Transcript, visuals, caption, and metrics are analyzed as one story.
        </p>
      </div>
      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
        }}
      >
        <InsightCard
          number="0–2s"
          title="🪝 Hook"
          body="A curiosity gap lands before the viewer has time to scroll."
          color={C.coral}
          frame={frame}
          delay={18}
        />
        <InsightCard
          number="3 sec"
          title="⏱ Retention"
          body="Fast visual resets and on-screen captions keep the story moving."
          color={C.blue}
          frame={frame}
          delay={32}
        />
        <InsightCard
          number="Share"
          title="💫 Shareability"
          body="A relatable pain point gives viewers an immediate “that’s me.”"
          color={C.purple}
          frame={frame}
          delay={46}
        />
        <InsightCard
          number="Next"
          title="↗ Action"
          body="Turn the pattern into stronger hooks and a reusable content template."
          color={C.mint}
          frame={frame}
          delay={60}
        />
      </div>
    </Scene>
  );
};

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = pop(frame, 8);
  return (
    <Scene duration={120}>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        <div style={{opacity: pop(frame, 0)}}>
          <Badge color={C.coral}>▶ 28-SECOND WALKTHROUGH</Badge>
        </div>
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 36,
            display: 'grid',
            placeItems: 'center',
            fontSize: 62,
            background: `linear-gradient(135deg, ${C.purple}, ${C.coral})`,
            color: 'white',
            boxShadow: '0 24px 70px rgba(124,92,252,.28)',
            transform: `scale(${scale}) rotate(${(1 - scale) * -10}deg)`,
            marginTop: 30,
          }}
        >
          ▶
        </div>
        <h2
          style={{
            maxWidth: 1450,
            fontSize: 100,
            lineHeight: 0.98,
            letterSpacing: -4.5,
            margin: '36px 0 24px',
          }}
        >
          Paste a link. Ask a question.
          <br />
          <span style={{color: C.purple}}>Learn what works.</span>
        </h2>
        <div
          style={{
            marginTop: 24,
            borderRadius: 999,
            padding: '20px 34px',
            background: C.ink,
            color: 'white',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: 27,
            opacity: pop(frame, 40),
          }}
        >
          github.com/Ivanxiedata/social_media_analyzer
        </div>
      </div>
    </Scene>
  );
};

const Progress: React.FC = () => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const width = interpolate(frame, [0, durationInFrames - 1], [0, 100], clamp);
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        height: 10,
        width: `${width}%`,
        background: `linear-gradient(90deg, ${C.purple}, ${C.blue}, ${C.mint}, ${C.coral})`,
      }}
    />
  );
};

export const Walkthrough: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: C.background,
        overflow: 'hidden',
        fontFamily: font,
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 900,
          height: 900,
          borderRadius: '50%',
          background: 'rgba(124,92,252,.08)',
          filter: 'blur(8px)',
          top: -520,
          left: -280,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: 750,
          height: 750,
          borderRadius: '50%',
          background: 'rgba(88,166,255,.09)',
          filter: 'blur(8px)',
          right: -220,
          bottom: -480,
        }}
      />

      <Sequence from={0} durationInFrames={90}>
        <Intro />
      </Sequence>
      <Sequence from={90} durationInFrames={150}>
        <Install />
      </Sequence>
      <Sequence from={240} durationInFrames={150}>
        <Prompt />
      </Sequence>
      <Sequence from={390} durationInFrames={150}>
        <Extract />
      </Sequence>
      <Sequence from={540} durationInFrames={180}>
        <Insights />
      </Sequence>
      <Sequence from={720} durationInFrames={120}>
        <Outro />
      </Sequence>

      <Progress />
    </AbsoluteFill>
  );
};
