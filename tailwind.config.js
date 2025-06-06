/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        warm: "#f9f5ee",       // світла тема
        darkbg: "#121212",     // темна тема
        textwarm: "#fbead2",    // теплий текст
        pastelPurple: "#b983ff" 
      },
      fontFamily: {
        handwritten: ['"Dancing Script"', 'cursive'], // каліграфічний шрифт
      },
      animation: {
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
        typing: "typing 2.5s steps(14) forwards",
        blink: "blink 1s step-end infinite"
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "scale(0.95) translateY(20px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" }
        },
        blink: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "#fbead2" } // теплий курсор
        }
      }
    },
  },
  plugins: [],
}
