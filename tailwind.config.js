export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/Layouts/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  plugins: [require("@tailwindcss/line-clamp")],
};
