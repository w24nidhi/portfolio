/**
 * JS-side color tokens for places Tailwind classes can't reach
 * (icon colors, gradients, shadows, animated styles).
 * Keep these in sync with `tailwind.config.js`.
 */
export const palette = {
  brand: "#4F46E5",
  brandSoft: "#818CF8",
  aqua: "#06B6D4",
  rose: "#F43F5E",
  amber: "#F59E0B",
  emerald: "#10B981",
} as const;

export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  accent: string;
  accentSoft: string;
  icon: string;
  blobA: string;
  blobB: string;
  blobC: string;
}

export const lightColors: ThemeColors = {
  background: "#FAFAF9",
  surface: "#FFFFFF",
  text: "#0B1220",
  textMuted: "#475569",
  border: "#E2E8F0",
  accent: palette.brand,
  accentSoft: "#EEF2FF",
  icon: "#334155",
  blobA: "rgba(99, 102, 241, 0.22)",
  blobB: "rgba(6, 182, 212, 0.18)",
  blobC: "rgba(244, 63, 94, 0.10)",
};

export const darkColors: ThemeColors = {
  background: "#090D18",
  surface: "#111827",
  text: "#F1F5F9",
  textMuted: "#94A3B8",
  border: "#1F2937",
  accent: palette.brandSoft,
  accentSoft: "rgba(99, 102, 241, 0.16)",
  icon: "#CBD5E1",
  blobA: "rgba(99, 102, 241, 0.28)",
  blobB: "rgba(6, 182, 212, 0.16)",
  blobC: "rgba(236, 72, 153, 0.10)",
};

export const brandGradient = [palette.brand, palette.aqua] as const;

export const motion = {
  /** Default entrance duration (ms). */
  duration: 650,
  /** Delay between staggered items (ms). */
  stagger: 80,
  hover: 220,
} as const;
