/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}", // all your source files
      "./public/index.html"         // any HTML files
    ],
    theme: {
      extend: {}, // you can customize fonts, colors, spacing here
    },
    plugins: [],  // add Tailwind plugins here if needed
  };