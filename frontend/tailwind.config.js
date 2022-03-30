module.exports = {
  mode: "jit",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto"],
      mono: ["Source Code Pro"],
    },
    extend: {
      colors: {
        tikblack: "#1B1B1E",
        tikgray: "#212730",
        tikorange: "#F77F1C",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
