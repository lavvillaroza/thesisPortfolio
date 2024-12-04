/** @type {import('tailwindcss').Config} */
import scrollbarPlugin from 'tailwind-scrollbar';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'custom-bg': "url('/assets/background.png')",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('flowbite/plugin'),
    scrollbarPlugin,
    
  ],
}

