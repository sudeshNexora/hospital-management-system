/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0E7C66",
        "primary-dark": "#0B5F4E",
        "primary-light": "#E6F4F0",
        accent: "#FF6B4A",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
