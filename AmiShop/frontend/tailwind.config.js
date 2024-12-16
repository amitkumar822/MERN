import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      animation: {
        scroll: "scroll 40s linear infinite",
      },
    },
  },
  plugins: [
    daisyui,
    function ({ addUtilities, addBase }) {
      const newUtilities = {
        ".no-scrollbar": {
          "scrollbar-width": "none", // Firefox
          "-ms-overflow-style": "none", // IE and Edge
        },
      };

      const baseStyles = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none", // Chrome, Safari, and Opera
        },
      };

      addUtilities(newUtilities);
      addBase(baseStyles);
    },
    require("tailwind-scrollbar")({ nocompatible: true }),
  ],
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "white", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
