/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6F5EE0',
      },
    }
  },
  plugins: [
    require('preline/plugin'),
  ],
}

