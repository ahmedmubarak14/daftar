import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4ffd9",
          100: "#e5ffa8",
          200: "#d4ff6e",
          300: "#ceff5a",
          400: "#b9e846",
          500: "#9fc921",
          600: "#7ea114",
          700: "#637f0f",
          800: "#4d620e",
          900: "#3f5011",
          950: "#1d2805",
        },
        ink: {
          50: "#f7f7f6",
          100: "#ececea",
          200: "#d6d5d1",
          300: "#b1afa9",
          400: "#87847c",
          500: "#6a6761",
          600: "#54514c",
          700: "#45423e",
          800: "#3a3834",
          900: "#33312e",
          950: "#1e1c1a",
        },
        accent: {
          50: "#fff4ed",
          100: "#ffe5d4",
          200: "#ffc6a8",
          300: "#ff9e70",
          400: "#ff7a44",
          500: "#ff5a1f",
          600: "#f04715",
          700: "#c83512",
          800: "#9e2b16",
          900: "#7f2615",
          950: "#451108",
        },
        canvas: {
          DEFAULT: "#f5f4f0",
          50: "#faf9f6",
          100: "#f5f4f0",
          200: "#ecebe5",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.06)",
        soft: "0 4px 12px rgba(16, 24, 40, 0.06), 0 2px 4px rgba(16, 24, 40, 0.04)",
        hero: "0 20px 60px -20px rgba(29, 40, 5, 0.35), 0 8px 24px -12px rgba(29, 40, 5, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
