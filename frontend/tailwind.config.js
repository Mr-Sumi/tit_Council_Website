/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          Bebrush: ['Bebrush', 'sans-serif'],
          GilroyBlack: ['Gilroy-black', 'sans-serif'],
          GilroyMedium: ['GilroyMedium', 'sans-serif'],
        }
      },
    },
    plugins: [],
  }
  