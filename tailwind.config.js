/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        primary: "#5ebbc0",
      },
      padding: {
        0.5: "padding-top: '0.5px'; padding-bottom: '0.5px'",
        0.75: "padding-top: '0.75'; padding-bottom: '0.75px'",
      },
      gridTemplateColumns: {
        dashboard: "1fr 3fr 1fr",
      },
      backgroundImage: {
        pageBackground: "url('/backgrounds/group.png')",
      },
      backgroundColor: {
        primary: "#5ebbc0",
        primaryLinear: "bg-gradient-to-r from-[#5ebbc0] to-[#4b9599]",
      },
    },
  },
  plugins: [],
};
