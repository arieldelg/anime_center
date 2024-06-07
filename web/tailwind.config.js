/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0px 0px 15px 10px rgba(0, 0, 0, 0.3)",
        "top-anime": "0px 0px 15px 20px rgba(0, 0, 0, 0.6)",
      },
      gradientColorStops: {
        33: "50%",
      },
      colors: {
        "color-anime": "#242424",
      },
    },
  },
  plugins: [],
};
