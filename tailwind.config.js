// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // If you have an index.html in the root
    "./src/**/*.{js,ts,jsx,tsx}" // Scan all JS, TS, JSX, and TSX files inside src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
