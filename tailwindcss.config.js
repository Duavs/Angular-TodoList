/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enables dark mode (toggle with a class)
  content: [
    "./src/**/*.{html,ts}" // Ensure Tailwind scans Angular components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
