/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Playfair Display"', '"Times New Roman"', 'serif'],
        mono: ['"Chivo Mono"', 'monospace'],
      },
      colors: {
        primary: '#141414',
        'primary-dark': '#000000',
        'primary-light': '#e6e6de',
        'brand-green': '#2c9a62',
        'bg-stone': '#f5f5f0',
      },
    },
  },
  plugins: [],
}
