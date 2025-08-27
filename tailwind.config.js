/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        anime: {
          primary: '#FF6B6B',
          secondary: '#4ECDC4', 
          accent: '#45B7D1',
          dark: '#1a1a2e',
          darker: '#16213e',
        }
      },
      fontFamily: {
        anime: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}