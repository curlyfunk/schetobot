
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#EDE9F5',
          DEFAULT: '#6B47DC',
          dark: '#4C34A0',
        },
        gray: {
          light: '#F8F9FA',
          DEFAULT: '#6B7280',
          dark: '#374151',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
