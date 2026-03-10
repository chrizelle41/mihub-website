/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "star-drift": "star-drift 25s ease-in-out infinite",
        "star-drift-slow": "star-drift 40s ease-in-out infinite",
        "streak-flow": "streak-flow 6s ease-in-out infinite",
      },
      keyframes: {
        "star-drift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(4%, 2%)" },
          "50%": { transform: "translate(-2%, 4%)" },
          "75%": { transform: "translate(2%, -2%)" },
        },
        "streak-flow": {
          "0%, 100%": { opacity: "0.06", filter: "brightness(1)" },
          "50%": { opacity: "0.12", filter: "brightness(1.15)" },
        },
      },
    },
  },
  plugins: [],
};
