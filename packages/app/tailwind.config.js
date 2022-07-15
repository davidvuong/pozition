/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        misto: ["Misto"],
      },
      colors: {
        // @see: https://www.tailwindshades.com/
        black: {
          50: "#A8A8A8",
          100: "#9E9E9E",
          200: "#898989",
          300: "#757575",
          400: "#606060",
          500: "#4C4C4C",
          600: "#303030",
          700: "#141414",
          800: "#0a0a0a",
          900: "#000000",
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
