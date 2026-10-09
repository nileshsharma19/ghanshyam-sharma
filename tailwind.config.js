/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          50: '#FAF6F0',
          100: '#F4ECE0',
          200: '#E6D4BE',
          300: '#D5B796',
          400: '#BE9267',
          500: '#A66E38',
          600: '#8E5528',
          700: '#713F1D',
          800: '#5A3219',
          900: '#3D2010',
          950: '#221108',
        },
        brass: {
          400: '#FBBF24',
          500: '#D97706',
          600: '#B45309',
        }
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 10px 25px -5px rgba(113, 63, 29, 0.1), 0 8px 10px -6px rgba(113, 63, 29, 0.1)',
        'warm-lg': '0 20px 35px -10px rgba(113, 63, 29, 0.18)',
      }
    },
  },
  plugins: [],
};
