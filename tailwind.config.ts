import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#A68B4B",
          light: "#C4A960",
          dark: "#7A6530",
          bg: "rgba(166,139,75,0.06)",
        },
        cream: {
          DEFAULT: "#FAF8F3",
          dark: "#F2EFE7",
        },
        ink: {
          DEFAULT: "#1A1A1A",
          light: "#4A4A4A",
          muted: "#555555",
        },
        border: {
          DEFAULT: "#E8E4DC",
          light: "#F0EDE5",
        },
        green: {
          DEFAULT: "#2B4C35",
          bg: "rgba(74,124,89,0.08)",
        },
        blue: "#3D5A80",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1100px",
      },
      borderRadius: {
        DEFAULT: "12px",
        sm: "8px",
      },
    },
  },
  plugins: [],
};
export default config;
