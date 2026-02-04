// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Manrope'", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#ECFEFF",
          100: "#CFFAFE",
          200: "#A5F3FC",
          500: "#0EA5E9",
          600: "#0284C7",
          900: "#0F172A",
        },
        clay: {
          100: "#FFEEDD",
          500: "#F97316",
          700: "#EA580C",
        },
      },
      boxShadow: {
        glow: "0 20px 80px rgba(14,165,233,0.3)",
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at 20% 20%, rgba(14,165,233,0.35), transparent 45%), radial-gradient(circle at 80% 0%, rgba(249,115,22,0.4), transparent 55%), radial-gradient(circle at 50% 80%, rgba(14,165,233,0.25), transparent 60%)",
      },
    },
  },
  plugins: [],
};
