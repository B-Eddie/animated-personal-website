/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#494949',
        'light-graye': '#D9D9D9',
      },
      fontFamily: {
        'courier': 'courier new, monospace',
      },
    },
  },
  plugins: [],
}