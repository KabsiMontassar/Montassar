/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffffff',
        secondary: '#000000',
        accent1: '#ffdb26',
        accent2: '#661fff',
        accent3: '#f8376f',
        accent4: '#00fba9',
      },
    },
  },
  plugins: [],
}