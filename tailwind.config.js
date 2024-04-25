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
      }
    },
  },
  plugins: [],
  darkMode: "selector",
}

