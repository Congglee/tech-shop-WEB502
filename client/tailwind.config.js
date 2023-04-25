/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/**/*.{html,js}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        digital: {
          200: "#b7b7b7",
          400: "#ee3131",
          600: "#1d1d1d",
          800: "#0f0f0f",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
