/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'nav-blue': '#747bff;',
      },
      fontSize: {
        '4mxl': ['2.5rem', '2.5rem'],
      },
    },
  },
  plugins: [],
};
