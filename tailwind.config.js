/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        catamaran: ['Catamaran', 'sans-serif'],
      },
      backgroundImage : {
        'clear-bulb': "url('../public/lightbulb-icon-light.svg')",
        'fill-bulb': "url('../public/lightbulb-icon-dark.svg')",
      },
      keyframes:{
        fadeUpKF:{
          '0%': {
            transform: 'translateY(100%)',
            opacity: 0
          },
          '100%': {
            transform: 'translateY(0%)',
            opacity: 1
          }
        }
      },
      animation: {
        'fadeUp': 'fadeUpKF 1s backwards',
      },
    },
  },
  plugins: [],
  darkMode: "selector",
}

