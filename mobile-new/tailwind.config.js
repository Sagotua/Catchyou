/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        warm: '#f9f5ee',
        darkbg: '#121212',
        textwarm: '#fbead2',
        pastelPurple: '#b983ff',
      },
    },
  },
  plugins: [],
  presets: [require('nativewind/tailwind')],
};
