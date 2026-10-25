function ChibiHero({ variant = "wave" }) {
  const poses = {
    wave: (
      <>
        <ellipse cx="40" cy="88" rx="22" ry="8" fill="#0a0a0a" opacity="0.2" />
        <path d="M22 78 Q18 55 28 42 Q38 28 52 32 Q68 36 72 52 Q76 68 68 78 L58 82 Z" fill="#ff4da6" />
        <path d="M28 42 Q34 22 48 18 Q58 16 62 28 L58 38 Q48 32 38 38 Z" fill="#ffffff" />
        <path d="M48 18 Q52 8 58 12 L62 22 Q56 20 50 24 Z" fill="#00d4ff" />
        <circle cx="52" cy="48" r="14" fill="#ffe4f0" />
        <path d="M40 48 Q52 38 64 48" fill="none" stroke="#0a0a0a" strokeWidth="2" />
        <ellipse cx="46" cy="46" rx="3" ry="4" fill="#0a0a0a" />
        <ellipse cx="58" cy="46" rx="3" ry="4" fill="#0a0a0a" />
        <path d="M48 54 Q52 58 56 54" fill="none" stroke="#0a0a0a" strokeWidth="1.5" />
        <path d="M68 58 L78 48 L82 52 L72 62 Z" fill="#00d4ff" />
        <path d="M24 62 L14 52 L18 48 L28 58 Z" fill="#ffffff" stroke="#0a0a0a" strokeWidth="1" />
        <path d="M34 78 L30 92 M50 82 L50 96 M66 78 L70 92" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
    swing: (
      <>
        <ellipse cx="40" cy="90" rx="20" ry="7" fill="#0a0a0a" opacity="0.2" />
        <path d="M8 20 Q40 8 72 24" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
        <line x1="40" y1="20" x2="40" y2="38" stroke="#ffffff" strokeWidth="1.5" />
        <path d="M26 78 Q20 58 32 44 Q44 32 56 36 Q70 42 74 58 L68 76 Z" fill="#ff4da6" />
        <path d="M32 44 Q38 26 50 24 Q58 22 60 34 L54 40 Q46 36 38 42 Z" fill="#fff" />
        <circle cx="52" cy="50" r="13" fill="#ffe4f0" />
        <ellipse cx="47" cy="49" rx="2.5" ry="3.5" fill="#0a0a0a" />
        <ellipse cx="57" cy="49" rx="2.5" ry="3.5" fill="#0a0a0a" />
        <path d="M74 52 L88 44 L90 50 L76 58 Z" fill="#00d4ff" />
        <path d="M28 55 L16 48" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" />
        <path d="M36 78 L32 94 M48 80 L48 96 M60 78 L64 94" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
    sit: (
      <>
        <ellipse cx="42" cy="92" rx="24" ry="6" fill="#0a0a0a" opacity="0.2" />
        <path d="M20 70 Q18 50 30 40 Q42 32 54 38 Q66 44 68 58 L64 72 Q48 76 32 72 Z" fill="#ff4da6" />
        <path d="M30 40 Q36 24 48 22 Q56 20 58 32 L52 38 Q44 34 36 38 Z" fill="#fff" />
        <path d="M48 22 L52 14 L58 18 L54 26 Z" fill="#00d4ff" />
        <circle cx="50" cy="46" r="12" fill="#ffe4f0" />
        <ellipse cx="45" cy="45" rx="2" ry="3" fill="#0a0a0a" />
        <ellipse cx="55" cy="45" rx="2" ry="3" fill="#0a0a0a" />
        <path d="M68 62 L78 68 L74 74 L64 68 Z" fill="#00d4ff" />
        <path d="M24 68 L18 78 L24 82 L30 72 Z" fill="#fff" stroke="#0a0a0a" strokeWidth="1" />
        <path d="M28 72 L22 88 M44 74 L44 90 M56 74 L62 88" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
    jump: (
      <>
        <path d="M12 30 L28 18 M68 30 L52 18" stroke="#00d4ff" strokeWidth="2" opacity="0.5" />
        <path d="M28 72 Q24 48 36 36 Q48 26 58 32 Q72 40 74 58 L70 70 Z" fill="#ff4da6" />
        <path d="M36 36 Q42 20 52 18 Q60 16 62 28 L56 34 Q48 30 40 34 Z" fill="#ffffff" />
        <circle cx="54" cy="44" r="12" fill="#ffe4f0" />
        <ellipse cx="49" cy="43" rx="2.5" ry="3" fill="#0a0a0a" />
        <ellipse cx="59" cy="43" rx="2.5" ry="3" fill="#0a0a0a" />
        <path d="M74 48 L86 38 L90 44 L78 54 Z" fill="#00d4ff" />
        <path d="M26 48 L14 38 L10 44 L22 54 Z" fill="#ffffff" />
        <path d="M32 70 L24 58 M48 72 L48 58 M64 70 L72 58" stroke="#0a0a0a" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="48" cy="88" rx="18" ry="5" fill="#0a0a0a" opacity="0.15" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 96 100" className="theme-decor__chibi" aria-hidden="true">
      {poses[variant] ?? poses.wave}
    </svg>
  );
}

function GwenDecor() {
  const left = [
    { variant: "swing", style: { top: "8%", animationDelay: "0s" } },
    { variant: "sit", style: { top: "42%", animationDelay: "1.2s" } },
    { variant: "jump", style: { top: "72%", animationDelay: "0.6s" } },
  ];
  const right = [
    { variant: "wave", style: { top: "15%", animationDelay: "0.3s" } },
    { variant: "jump", style: { top: "55%", animationDelay: "1.5s" } },
    { variant: "swing", style: { top: "78%", animationDelay: "0.9s" } },
  ];

  return (
    <>
      <div className="theme-decor theme-decor--gwen theme-decor--left">
        {left.map((item, i) => (
          <div
            key={i}
            className="theme-decor__sprite theme-decor__sprite--float"
            style={item.style}
          >
            <ChibiHero variant={item.variant} />
          </div>
        ))}
      </div>
      <div className="theme-decor theme-decor--gwen theme-decor--right">
        {right.map((item, i) => (
          <div
            key={i}
            className="theme-decor__sprite theme-decor__sprite--float"
            style={item.style}
          >
            <ChibiHero variant={item.variant} />
          </div>
        ))}
      </div>
    </>
  );
}

function SpiderWeb({ className }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.35">
        <line x1="60" y1="10" x2="60" y2="110" />
        <line x1="10" y1="60" x2="110" y2="60" />
        <line x1="25" y1="25" x2="95" y2="95" />
        <line x1="95" y1="25" x2="25" y2="95" />
        <path d="M60 10 Q90 35 110 60 Q90 85 60 110 Q30 85 10 60 Q30 35 60 10" />
        <path d="M60 25 Q80 40 95 60 Q80 80 60 95 Q40 80 25 60 Q40 40 60 25" />
        <path d="M60 40 Q72 50 80 60 Q72 70 60 80 Q48 70 40 60 Q48 50 60 40" />
      </g>
    </svg>
  );
}

function SpiderDecor() {
  return (
    <>
      <div className="theme-decor theme-decor--spider theme-decor--left">
        <SpiderWeb className="theme-decor__web theme-decor__web--tl" />
        <SpiderWeb className="theme-decor__web theme-decor__web--bl" />
        <span className="theme-decor__emoji" style={{ top: "35%" }}>
          🕷️
        </span>
        <span className="theme-decor__emoji" style={{ top: "68%" }}>
          🕸️
        </span>
      </div>
      <div className="theme-decor theme-decor--spider theme-decor--right">
        <SpiderWeb className="theme-decor__web theme-decor__web--tr" />
        <SpiderWeb className="theme-decor__web theme-decor__web--br" />
        <span className="theme-decor__emoji" style={{ top: "28%" }}>
          🕸️
        </span>
        <span className="theme-decor__emoji" style={{ top: "62%" }}>
          🕷️
        </span>
      </div>
    </>
  );
}

export default function ThemeDecorations({ theme }) {
  if (theme === "gwen") return <GwenDecor />;
  if (theme === "spiderman") return <SpiderDecor />;
  return null;
}
