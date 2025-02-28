/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spotify-dark': '#191414',
        'spotify-green': '#1DB954',
        'spotify-light': '#FFFFFF',
      },
    },
  },
  plugins: [],
}