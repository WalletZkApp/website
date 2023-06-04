/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#804BDB",
        secondary: "#ECAC18",
        background: "#10172a",
        darkgrey: "#5B5B5B",
      },
    },
  },
  plugins: [],
};
