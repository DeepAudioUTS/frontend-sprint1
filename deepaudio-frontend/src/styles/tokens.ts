// ─────────────────────────────────────────────────────────────────────────────
// Design Tokens
// ─────────────────────────────────────────────────────────────────────────────

// ── Color Palette (hex) ───────────────────────────────────────────────────────
export const colors = {
  // Violet brand scale
  violet600: '#7c3aed',  // primary violet
  violet500: '#8b5cf6',  // medium violet
  violet400: '#a78bfa',  // light violet
  violet200: '#c4b5fd',  // pale violet

  // Blue brand scale
  blue600: '#2563eb',   // primary blue
  blue400: '#60a5fa',   // light blue
  indigo400: '#818cf8', // indigo (InProgressCard progress)
  indigo600: '#4338ca', // dark indigo (avatar button)

  // Semantic accents
  green: '#34d399',
  amber: '#fbbf24',
  cyan: '#2dd4bf',
  red: '#f87171',

  // Text
  textPrimary: '#f1f5ff',
  textLight: '#cbd5e1',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  textSubtle: '#374151',
  textFaint: '#334155',
  white: '#ffffff',

  // Backgrounds
  bgPage: '#06091a',
  bgDeep: '#1e2d5e',
  bgDeeper: '#0d1835',
} as const;

// ── Gradients ─────────────────────────────────────────────────────────────────
export const gradients = {
  // Brand
  primary: 'linear-gradient(171deg, #7c3aed 0%, #2563eb 100%)',
  primaryDiag: 'linear-gradient(135deg, #7c3aed, #2563eb)',
  avatar: 'linear-gradient(135deg, #7c3aed, #4338ca)',

  // Progress bars
  progressBlue: 'linear-gradient(90deg, #7c3aed, #60a5fa)',
  progressIndigo: 'linear-gradient(90deg, #7c3aed, #818cf8)',

  // Dark card backgrounds
  cardDeep: 'linear-gradient(135deg, #1e2d5e, #0d1835)',

  // Story themes
  space: 'linear-gradient(135deg, #1e3a6e, #0f2447)',
  forest: 'linear-gradient(135deg, #064e3b, #065f46)',
  ocean: 'linear-gradient(135deg, #0c4a6e, #075985)',
  castle: 'linear-gradient(135deg, #4c1d95, #3730a3)',
  dinosaur: 'linear-gradient(135deg, #14532d, #166534)',
} as const;

// ── Glass / Transparency ──────────────────────────────────────────────────────
export const glass = {
  // White alpha — backgrounds
  bgFaint: 'rgba(255, 255, 255, 0.05)',   // subtle tint (≈0.04–0.05)
  bgDim: 'rgba(255, 255, 255, 0.06)',     // slightly more visible
  bg: 'rgba(255, 255, 255, 0.07)',        // standard glass surface
  bgMedium: 'rgba(255, 255, 255, 0.08)', // slightly stronger

  // White alpha — borders
  border: 'rgba(255, 255, 255, 0.1)',
  borderStrong: 'rgba(255, 255, 255, 0.12)',

  // White alpha — misc
  alpha20: 'rgba(255, 255, 255, 0.2)',
  alpha30: 'rgba(255, 255, 255, 0.3)',

  // Dark alpha
  darkBg: 'rgba(0, 0, 0, 0.25)',
  darkShadow: 'rgba(0, 0, 0, 0.3)',
  darkHeavy: 'rgba(0, 0, 0, 0.5)',
} as const;

// ── Violet 500 (#8b5cf6) with opacity — status / badge / border ───────────────
export const violetA = {
  a12: 'rgba(139, 92, 246, 0.12)',
  a15: 'rgba(139, 92, 246, 0.15)',
  a20: 'rgba(139, 92, 246, 0.2)',
  a25: 'rgba(139, 92, 246, 0.25)',
  a28: 'rgba(139, 92, 246, 0.28)',
  a35: 'rgba(139, 92, 246, 0.35)',
  a40: 'rgba(139, 92, 246, 0.4)',
  a50: 'rgba(139, 92, 246, 0.5)',
  a60: 'rgba(139, 92, 246, 0.6)',
} as const;

// ── Violet 600 (#7c3aed) with opacity — glow / shadow / spin ─────────────────
export const violetGlow = {
  a15: 'rgba(124, 58, 237, 0.15)',
  a20: 'rgba(124, 58, 237, 0.2)',
  a25: 'rgba(124, 58, 237, 0.25)',
  a30: 'rgba(124, 58, 237, 0.3)',
  a45: 'rgba(124, 58, 237, 0.45)',
  a50: 'rgba(124, 58, 237, 0.5)',
} as const;

// ── Green (#34d399) with opacity ──────────────────────────────────────────────
export const greenA = {
  a12: 'rgba(52, 211, 153, 0.12)',
  a25: 'rgba(52, 211, 153, 0.25)',
  a60: 'rgba(52, 211, 153, 0.6)',
} as const;

// ── Amber (#fbbf24) with opacity ──────────────────────────────────────────────
export const amberA = {
  a06: 'rgba(251, 191, 36, 0.06)',
  a08: 'rgba(251, 191, 36, 0.08)',
  a10: 'rgba(251, 191, 36, 0.1)',
  a15: 'rgba(251, 191, 36, 0.15)',
  a20: 'rgba(251, 191, 36, 0.2)',
} as const;

// ── Red with opacity ──────────────────────────────────────────────────────────
export const redA = {
  a10: 'rgba(239, 68, 68, 0.1)',
} as const;

// ── Background blob colors ────────────────────────────────────────────────────
export const blobColors = {
  // StoryLayout / LoginPage
  top: 'rgba(109, 40, 217, 0.28)',
  left: 'rgba(14, 165, 233, 0.14)',
  right: 'rgba(124, 58, 237, 0.1)',
  // AppLayout (slightly different)
  topApp: 'rgba(109, 40, 217, 0.25)',
  leftApp: 'rgba(14, 165, 233, 0.15)',
  rightApp: 'rgba(251, 191, 36, 0.08)', // amber blob
} as const;

// ── Shadows ───────────────────────────────────────────────────────────────────
export const shadows = {
  primaryButton: '0 4px 24px rgba(124, 58, 237, 0.45)',
  playButton: '0 8px 32px rgba(124, 58, 237, 0.5)',
  card: '0 8px 32px rgba(0, 0, 0, 0.3)',
  cardSubtle: '0 8px 32px rgba(0, 0, 0, 0.25)',
  logo: '0 0 16px rgba(124, 58, 237, 0.5)',
  logoLg: '0 0 20px rgba(124, 58, 237, 0.5)',
  avatar: '0 0 12px rgba(139, 92, 246, 0.3)',
  hero: '0 20px 60px rgba(0, 0, 0, 0.5)',
  readyDot: '0 0 8px rgba(52, 211, 153, 0.6)',
} as const;

// ── Border radius ─────────────────────────────────────────────────────────────
export const radius = {
  sm: '0.75rem',   // 12px
  md: '1rem',      // 16px
  lg: '18px',      // abstract card
  xl: '22px',      // GlassCard, InProgressCard, AudioPlayer skip
  pill: '9999px',  // pill / tag shapes
  circle: '50%',
  icon: '10px',    // small icon boxes, story card icon
} as const;

// ── Typography ────────────────────────────────────────────────────────────────
export const fontSize = {
  xxs: '10px',
  xs: '11px',
  sm: '12px',
  md: '13px',
  base: '14px',
  lg: '18px',
  xl: '20px',
  xl2: '22px',
  xl3: '26px',
  xl4: '28px',
} as const;

export const fontWeight = {
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

export const letterSpacing = {
  tight: '-0.025em',  // headings
  label: '1.2px',     // section labels
  labelSm: '0.88px',  // FormField label
} as const;

// ── Transitions ───────────────────────────────────────────────────────────────
export const transition = {
  fast: '0.1s',
  default: '0.2s',
  slow: '0.5s',
  spinDuration: '0.7s',
} as const;
