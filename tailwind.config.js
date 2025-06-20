const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "380px",
      ...defaultTheme.screens,
      "2xl": "1440px",

      // sm: '640px',
      // // => @media (min-width: 640px) { ... }

      // md: '768px',
      // // => @media (min-width: 768px) { ... }

      // lg: '1024px',
      // // => @media (min-width: 1028px) { ... }

      // xl: '1280px',
      // // => @media (min-width: 1280px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ['"Public Sans"'],
      },
    },
  },
  plugins: [],
};
