/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wax: {
          50: '#FDFCFB',
          100: '#FAF9F6', // Alap háttér
          200: '#F0EFE9',
        },
        lavender: {
          light: '#D4C4FB',
          DEFAULT: '#8A6FDF', // Fő lila
          dark: '#6D28D9',
        },
        earth: {
          DEFAULT: '#78716C', // Stone
          dark: '#44403C',
        }
      },
      fontFamily: {
        sans: ['Segoe UI', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
