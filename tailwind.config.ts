import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#12181F",
        "ink-soft": "#57626F",
        canvas: "#F7F7F5",
        surface: "#FFFFFF",
        line: "#E6E4DD",
        brand: {
          DEFAULT: "#2451B5",
          soft: "#E9EFFB",
          dark: "#173C8C",
        },
        gold: {
          DEFAULT: "#C9A227",
          soft: "#FAF3DD",
        },
        signal: {
          green: "#2E8B57",
          "green-soft": "#E6F2EB",
          orange: "#D98A3D",
          "orange-soft": "#FBEEDF",
          red: "#C0463C",
          "red-soft": "#F8E6E4",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        xl2: "18px",
      },
      boxShadow: {
        card: "0 2px 10px rgba(18, 24, 31, 0.05)",
        floating: "0 16px 40px rgba(18, 24, 31, 0.12)",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(0.85)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-dot": "pulseDot 1.8s ease-in-out infinite",
        "fade-up": "fadeUp 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
