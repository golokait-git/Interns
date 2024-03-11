/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // extend: {},
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }
      sml: "800px",
      sm1: "500px",
      md: "1000px",
      mdl: "950px",
      mdl1: "800px",

      mdl2: "1010px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
