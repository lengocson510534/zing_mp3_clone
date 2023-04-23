/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'main-100': '#E7EBEB',
        'main-200': '#DDE3E3',
        'main-300': '#CED9D9',
        'main-400': '#C1D7D8',
        'main-highlight': '#0F8080',
        'gray-69': '#696969',
        'gray-32': '#32323d',
        'gray-c2': '#ADC1C2'
      },
      colors: {
        'main-100': '#E7EBEB',
        'main-200': '#DDE3E3',
        'main-300': '#CED9D9',
        'main-400': '#C1D7D8',
        'main-highlight': '#0F8080',
        'gray-69': '#696969',
        'gray-32': '#32323d',
        'gray-c2': '#ADC1C2'
      },
      keyframes: {
        'slide-right': {
          '0%': {
            '-webkit-transform': 'translateX(-500px);',
            transform: 'translateX(-500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'slide-left': {
          '0%': {
            '-webkit-transform': 'translateX(500px);',
            transform: 'translateX(500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'slide-left2': {
          '0%': {
            '-webkit-transform': 'translateX(500px);',
            transform: 'translateX(500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        }
      },
      animation: {
        'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left2': 'slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;'
      },
    },
  },
  plugins: [],
}

