/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {
      scale: {
        'img': 'var(--img-size)',
      },
      fontFamily: {
        'poppins': ['Poppins'],
      }
    }
    
  },
  plugins: [],
}
