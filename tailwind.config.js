/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf5f0',
          100: '#f4e7dc',
          200: '#e8cfb9',
          300: '#dcb796',
          400: '#d09f73',
          500: '#c48750',
          600: '#b87946',
          700: '#9d653a',
          800: '#82512e',
          900: '#673d22',
        },
        secondary: {
          50: '#f5f3fa',
          100: '#ebe8f5',
          200: '#d7d1eb',
          300: '#c3bae1',
          400: '#afa3d7',
          500: '#9b8ccd',
          600: '#8775c3',
          700: '#6b5daa',
          800: '#4f4591',
          900: '#332d78',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
}
