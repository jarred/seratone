/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      fontFamily: {
        'ocrb': ["OCRB"]
      }
    },
  },

  plugins: [],
};

module.exports = config;
