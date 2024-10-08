/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#494949',
        'light-graye': '#D9D9D9',
        'greene': '#00FF00',
        'dark-greene': "#235123",
        'middle-greene': "#5AA95A",
        '565656': "#565656",
        '8B8B8B': "#8B8B8B",
        '1B1B1B': "#1B1B1B",
      },
      fontFamily: {
        'courier': 'courier new, monospace',
      },
      keyframes: {
        move: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(10px)' },
          '60%': { transform: 'translateY(5px)' },
        },
      },
      animation: {
        'move-down-up': 'move 2s infinite ease-in-out',
      },
      fontSize: {
        'onesixrem': '1.6rem',
      },
      width: {
        'giga': '40rem',
      },
    },
  },
  plugins: [],
}
