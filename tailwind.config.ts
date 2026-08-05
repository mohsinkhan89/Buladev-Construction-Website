import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coal: "#071018",
        ember: "#f57216",
        copper: "#cf5f19",
        steel: "#8793a0",
      },
      boxShadow: {
        "orange-glow": "0 18px 40px rgba(245, 114, 22, 0.22)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
