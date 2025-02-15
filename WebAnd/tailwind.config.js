/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

import tailwindcss from '@tailwindcss/vite'

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui, tailwindcss()],
  daisyui: {
    themes: ["light"],
  },
};
