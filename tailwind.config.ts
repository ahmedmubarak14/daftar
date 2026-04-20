import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f7f5",
          100: "#dce7e0",
          200: "#b7cdc1",
          300: "#8aaf9c",
          400: "#628f7b",
          500: "#467461",
          600: "#355c4d",
          700: "#2a4940",
          800: "#233b34",
          900: "#1d312c",
          950: "#0f1c18",
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
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
