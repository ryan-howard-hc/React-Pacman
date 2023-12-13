/** @type {import('tailwindcss').Config} */

const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
  content: ['./src/**/*.jsx'],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'), 
    require('autoprefixer'), 
  ],
};
