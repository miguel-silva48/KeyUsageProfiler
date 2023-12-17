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
  },
  plugins: [require('daisyui')],
  darkMode: 'class', // enable dark mode
  daisyui: {
    themes: [
      {
        light: {
          primary: '#6941C6',
          secondary: '#FFFFFF',
          accent: '#F9FAFB',
          neutral: '#181A1B',
          'base-100': '#ffffff',
          '--color-card': '#f5f5f5',
        },
        dark: {
          primary: '#6941C6',
          secondary: '#181A1B',
          accent: '#3C247B',
          neutral: '#999999',
          'base-100': '#181A1B',
          '--color-card': '#2f3132',
        },
      },
    ],
  },
};
