/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest: '#14532d',
        'forest-dark': '#103f24',
        amber: '#d97706',
        cream: '#fafaf9',
        ink: '#202820'
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        heading: ['Inter', 'sans-serif']
      },
      boxShadow: {
        soft: '0 14px 40px rgba(24, 39, 28, .08)'
      }
    }
  },
  plugins: []
}
