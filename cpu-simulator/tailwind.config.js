/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4fc3f7',
        dark: '#1a1a2e',
        secondary: '#16213e'
      }
    }
  },
  plugins: [],
}