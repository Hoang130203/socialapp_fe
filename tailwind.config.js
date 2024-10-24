/** @type {import('tailwindcss').Config} */
import tailwindScrollbarHide from "tailwind-scrollbar-hide";
import tailwindScrollbar from "tailwind-scrollbar";
import twElements from "tw-elements-react/dist/plugin.cjs";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [tailwindScrollbarHide, tailwindScrollbar, twElements],
}

