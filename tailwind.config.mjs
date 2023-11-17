/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#568CFE",
      },
      backgroundImage: {
        image: "url('/bg.jpg')",
      },
    },
    minHeight: {
      full: "100svh",
    },
  },

  plugins: [],
};
