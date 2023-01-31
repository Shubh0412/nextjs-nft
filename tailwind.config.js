/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      animation: {
        shine: 'shine 1s',
        wiggle: 'wiggle 1s ease-in-out infinite'
      },
      keyframes: {
        shine: {
          '100%': { left: '125%' }
        }
      }
    }
  },
  plugins: []
}
