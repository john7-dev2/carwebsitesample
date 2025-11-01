/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand': {
          'black': '#1a1a1a',
          'burgundy': '#a41e3c',
          'burgundy-dark': '#8b1a32',
          'burgundy-light': '#c42a47',
        },
      },
    },
  },
  plugins: [],
};
