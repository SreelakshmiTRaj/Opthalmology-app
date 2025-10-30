/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'page-bg': '#031524', 
        'nav-dark-bg': '#192A40',
        'primary-blue': '#489FF5', 
        'link-active': '#489FF5', 
        'text-light': '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-body)', ...require('tailwindcss/defaultTheme').fontFamily.sans],
      },
    },
  },
  plugins: [],
}