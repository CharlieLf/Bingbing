/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      fontFamily: {
        marcellus: ['Marcellus SC', 'sans-serif'],
        sans: ['Inter']
      },
    },
  },
  plugins: [],
}

