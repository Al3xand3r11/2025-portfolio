/** @type {import('tailwindcss').Config} */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-ezcar)'],
      }
    }
  }
}