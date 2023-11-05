/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    minHeight: {
      full: "100svh",
    },
    backgroundImage: {
      image: "url('/bg.jpg')",
    },
  },

  plugins: [],
};
