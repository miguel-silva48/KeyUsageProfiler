/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        sm: '0.750rem',
        base: '1rem',
        xl: '1.333rem',
        '2xl': '1.777rem',
        '3xl': '2.369rem',
        '4xl': '3.158rem',
        '5xl': '4.210rem',
      },
      fontFamily: {
        heading: 'Poppins',
        body: 'Poppins',
      },
      fontWeight: {
        normal: '400',
        bold: '700',
      },
    },
    colors: {
      '-card-color': 'var(--color-card)',
    },
  },
  plugins: [require('daisyui')],
  darkMode: 'class', // enable dark mode
  daisyui: {
    themes: [
      {
        light: {
          primary: '#65de4a',
          secondary: '#cfc9ca',
          accent: '#8c7469',
          neutral: '#1c1c30',
          'base-100': '#e2e2ee',
          '--color-card': '#f5f5f5',
        },
        dark: {
          primary: '#3cb521',
          secondary: '#363031',
          accent: '#967e73',
          neutral: '#1d1d30',
          'base-100': '#181A1B',
          '--color-card': '#2f3132',
        },
      },
    ],
  },
};
