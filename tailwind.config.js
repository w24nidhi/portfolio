const { platformSelect } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Page backgrounds
        canvas: { DEFAULT: "#FAFAF9", dark: "#090D18" },
        surface: { DEFAULT: "#FFFFFF", dark: "#111827" },
        // Text
        ink: { DEFAULT: "#0B1220", soft: "#475569", faint: "#94A3B8" },
        // Primary accent (indigo-violet)
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
        },
        // Secondary accent (aqua)
        aqua: { 300: "#67E8F9", 400: "#22D3EE", 500: "#06B6D4", 600: "#0891B2" },
      },
      // Slightly larger than Tailwind's defaults so body copy stays readable on desktop.
      fontSize: {
        xs: ["13px", { lineHeight: "20px" }],
        sm: ["15px", { lineHeight: "24px" }],
        base: ["17px", { lineHeight: "28px" }],
        lg: ["19px", { lineHeight: "30px" }],
        xl: ["22px", { lineHeight: "32px" }],
      },
      fontFamily: {
        sans: platformSelect({
          web: '"Plus Jakarta Sans", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          default: "System",
        }),
        mono: platformSelect({
          web: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
          ios: "Menlo",
          android: "monospace",
          default: "monospace",
        }),
      },
    },
  },
  plugins: [],
};
