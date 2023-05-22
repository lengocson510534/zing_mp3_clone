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
        'gray-c2': '#ADC1C2',
        'overlay': 'rgba(0, 0, 0, 0.3)',
        'gray-220': 'rgba(220,220,220,0.5)',
        'purple-42': '#42195D',
        'grey-4d': '#ffffff4d',
      },
      colors: {
        'main-100': '#E7EBEB',
        'main-200': '#DDE3E3',
        'main-300': '#CED9D9',
        'main-400': '#C1D7D8',
        'main-highlight': '#0F8080',
        'gray-69': '#696969',
        'gray-32': '#32323d',
        'gray-c2': '#ADC1C2',
        'gray-94': '#948E96',
        'overlay': 'rgba(0, 0, 0, 0.3)',
        'gray-220': 'rgba(220,220,220,0.5)',
        'purple-42': '#42195D',
        'grey-4d': '#ffffff4d',
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
      flex: {
        '4': '4 4 0%',
        '6': '6 6 0%',
        '5': '5 5 0%',
        '3': '3 3 0%',
        '7': '7 7 0%'

      },
      fontFamily: {
        'roboto': 'Roboto, sans-serif',
      },
      boxShadow: {
        'btn': '0 1px 3px 0 rgba(0,0,0,.07);',
        'menu-right': '0 1px 0 rgba(0,0,0,0.3),0 1px 6px rgba(0,0,0,0.3),inset 0 1px 1px hsla(0,0%,100%,0.3);'
      }
    },
  },
  plugins: [],
}

