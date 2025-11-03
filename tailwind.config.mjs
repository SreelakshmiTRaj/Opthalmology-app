/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: "#0b1626",
        secondaryDark: "#1e2d40",
        primaryBlue: "#38bdf8",
        accentBlue: "#167ee6",
        whiteButtonBg: "#ffffff",
      },
      fontFamily: {
        sans: [
          "var(--font-body)",
          ...require("tailwindcss/defaultTheme").fontFamily.sans,
        ],
      },
    },
  },
  plugins: [],
};
