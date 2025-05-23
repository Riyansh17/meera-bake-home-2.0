/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Existing colors
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        whatsapp: {
          500: '#25D366',
          600: '#20b858',
        },
        // New Daisy Creative color palette
        teal: {
          500: '#134949',
          600: '#0f3a3a',
          700: '#0b2d2d',
        },
        coral: {
          500: '#F8ABAC',
          400: '#fab4b5',
          300: '#fcbdbe',
          200: '#fdc6c7',
        },
        cream: {
          500: '#F5E6DA',
          400: '#f7ebe1',
          300: '#f9f0e8',
          200: '#fbf5ef',
        },
        vanilla: {
          500: '#FFF3E2',
          400: '#fff6e8',
          300: '#fff9ee',
          200: '#fffcf4',
        },
        gold: {
          500: '#FCD680',
          400: '#fcdc93',
          300: '#fde2a6',
          200: '#fde8b9',
        },
        // Alternative naming for easier reference
        brand: {
          dark: '#134949',
          coral: '#F8ABAC',
          cream: '#F5E6DA',
          vanilla: '#FFF3E2',
          gold: '#FCD680',
        }
      },
    },
  },
  plugins: [],
}