// ============================================================================
// CHAMAK CHALLO — Indian Festive Visual Motifs (SVG)
// Intricate vector-based decorative assets in Refined Bright Gold & Fiery Orange
// ============================================================================

export function MandalaMotif({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* Outer concentric filigree ring */}
      <circle cx="200" cy="200" r="190" stroke="#7EB6FF" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.55" />
      <circle cx="200" cy="200" r="176" stroke="#F3CA66" strokeWidth="1" opacity="0.6" />
      <circle cx="200" cy="200" r="162" stroke="#FF4DB8" strokeWidth="0.7" strokeDasharray="2 3" opacity="0.45" />

      {/* 16-point outer floral petals */}
      <g stroke="#F3CA66" strokeWidth="0.9" opacity="0.55">
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle, i) => (
          <path
            key={i}
            d="M200 40 C210 90 225 130 200 160 C175 130 190 90 200 40 Z"
            transform={`rotate(${angle} 200 200)`}
            fill="none"
          />
        ))}
      </g>

      {/* Mid concentric circles */}
      <circle cx="200" cy="200" r="120" stroke="#FFE08A" strokeWidth="1.2" opacity="0.7" />
      <circle cx="200" cy="200" r="105" stroke="#7EB6FF" strokeWidth="0.8" strokeDasharray="4 4" opacity="0.5" />

      {/* 8-point inner lotus petals */}
      <g stroke="#F3CA66" strokeWidth="1.1" opacity="0.7" fill="#F3CA66" fillOpacity="0.05">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <path
            key={i}
            d="M200 95 C220 135 228 165 200 185 C172 165 180 135 200 95 Z"
            transform={`rotate(${angle} 200 200)`}
          />
        ))}
      </g>

      {/* Core floral mandala */}
      <circle cx="200" cy="200" r="60" stroke="#F3CA66" strokeWidth="1.2" opacity="0.65" />
      <circle cx="200" cy="200" r="42" stroke="#FF4DB8" strokeWidth="0.9" opacity="0.65" />
      <circle cx="200" cy="200" r="24" stroke="#FFE08A" strokeWidth="1.4" opacity="0.8" fill="#FFE08A" fillOpacity="0.14" />
      <circle cx="200" cy="200" r="8" fill="#FF6F1E" opacity="0.9" />
    </svg>
  );
}

export function OrnateDivider({ className = '', subtitle }: { className?: string; subtitle?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      {/* Left rule */}
      <div
        className="flex-1 max-w-28 sm:max-w-36 h-[1.5px]"
        style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(243, 202, 102, 0.7) 100%)' }}
      />

      {/* Central Diya / Lotus Icon */}
      <div className="flex items-center justify-center gap-2 px-1 min-w-0 max-w-[70%] sm:max-w-xl">
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
          <path d="M12 2C12 2 8 7 8 11C8 13.2 9.8 15 12 15C14.2 15 16 13.2 16 11C16 7 12 2 12 2Z" fill="#FF6F1E" />
          <path d="M4 14C4 18.4 7.6 22 12 22C16.4 22 20 14 20 14C20 14 17 17 12 17C7 17 4 14 4 14Z" fill="#F3CA66" />
        </svg>
        {subtitle && (
          <span className="font-display italic text-[18px] sm:text-[21px] heading-highlight font-normal tracking-wide px-1 leading-snug text-center">
            {subtitle}
          </span>
        )}
      </div>

      {/* Right rule */}
      <div
        className="flex-1 max-w-28 sm:max-w-36 h-[1.5px]"
        style={{ background: 'linear-gradient(90deg, rgba(243, 202, 102, 0.7) 0%, transparent 100%)' }}
      />
    </div>
  );
}

export function CornerFiligree({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <path d="M4 56 L4 8 C4 5.8 5.8 4 8 4 L56 4" stroke="#F3CA66" strokeWidth="1.2" strokeOpacity="0.5" />
      <path d="M10 50 L10 12 C10 10.9 10.9 10 12 10 L50 10" stroke="#F3CA66" strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="2 3" />
      <circle cx="8" cy="8" r="3" fill="#FFE08A" fillOpacity="0.7" />
      <circle cx="56" cy="4" r="2.2" fill="#FF4DB8" fillOpacity="0.8" />
      <circle cx="4" cy="56" r="2.2" fill="#7EB6FF" fillOpacity="0.85" />
      <path d="M14 22 C18 18 18 18 22 14" stroke="#F3CA66" strokeWidth="1" strokeOpacity="0.45" />
    </svg>
  );
}

const LIGHT_TONES = {
  saffron: {
    background: 'radial-gradient(circle, rgba(255, 176, 48, 0.95) 0%, rgba(255, 111, 30, 0.28) 60%, transparent 100%)',
    boxShadow: '0 0 16px rgba(255, 140, 40, 0.7)',
  },
  gold: {
    background: 'radial-gradient(circle, rgba(255, 232, 140, 0.95) 0%, rgba(255, 196, 70, 0.28) 60%, transparent 100%)',
    boxShadow: '0 0 16px rgba(255, 214, 110, 0.75)',
  },
  magenta: {
    background: 'radial-gradient(circle, rgba(255, 120, 200, 0.95) 0%, rgba(255, 77, 184, 0.28) 60%, transparent 100%)',
    boxShadow: '0 0 16px rgba(255, 77, 184, 0.65)',
  },
  azure: {
    background: 'radial-gradient(circle, rgba(160, 205, 255, 0.95) 0%, rgba(80, 140, 255, 0.28) 60%, transparent 100%)',
    boxShadow: '0 0 16px rgba(90, 150, 255, 0.7)',
  },
} as const;

export function FestiveLightDot({
  className = '',
  style = {},
  tone = 'saffron',
}: {
  className?: string;
  style?: React.CSSProperties;
  tone?: keyof typeof LIGHT_TONES;
}) {
  return (
    <div
      className={`pointer-events-none rounded-full ${className}`}
      style={{ ...LIGHT_TONES[tone], ...style }}
      aria-hidden="true"
    />
  );
}

const SPARKS: { t: string; l: string; c: string; d: string; s: number }[] = [
  { t: '16%', l: '9%', c: '#FFE873', d: '0s', s: 5 },
  { t: '18%', l: '86%', c: '#FF4DB8', d: '0.7s', s: 4 },
  { t: '34%', l: '14%', c: '#7EB6FF', d: '1.2s', s: 3 },
  { t: '28%', l: '74%', c: '#FFE08A', d: '0.4s', s: 3 },
  { t: '62%', l: '8%', c: '#FFB020', d: '1.5s', s: 4 },
  { t: '72%', l: '90%', c: '#C084FC', d: '0.9s', s: 4 },
  { t: '80%', l: '22%', c: '#7EB6FF', d: '1.8s', s: 3 },
  { t: '48%', l: '93%', c: '#FF6F1E', d: '0.3s', s: 3 },
];

export function SparkleField({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {SPARKS.map((spark) => (
        <span
          key={`${spark.t}-${spark.l}`}
          className="absolute rounded-full animate-twinkle"
          style={{
            top: spark.t,
            left: spark.l,
            width: spark.s,
            height: spark.s,
            background: spark.c,
            boxShadow: `0 0 10px ${spark.c}`,
            animationDelay: spark.d,
          }}
        />
      ))}
    </div>
  );
}

export function FestiveRibbon({ className = '' }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute top-0 left-0 right-0 h-[3px] ${className}`}
      style={{
        background: 'linear-gradient(90deg, #2456E0, #7A3CFF, #FF3D9A, #FF8A1E, #FFE36A, #FF8A1E, #FF3D9A, #7A3CFF, #2456E0)',
        boxShadow: '0 0 16px rgba(255, 140, 60, 0.35)',
      }}
      aria-hidden="true"
    />
  );
}
