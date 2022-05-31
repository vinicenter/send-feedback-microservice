module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts,md,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          300: '#996DFF',
          500: '#8257e6',
        },
        bgcolor: {
          500: '#09090A',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
  ],
}