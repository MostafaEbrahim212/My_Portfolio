export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#fdfbf7",
        pencil: "#2d2d2d",
        muted: "#e5e0d8",
        marker: "#ff4d4d",
        pen: "#2d5da1",
      },
      fontFamily: {
        kalam: ['Kalam', 'cursive'],
        patrick: ['"Patrick Hand"', 'cursive'],
      },
      borderRadius: {
        wobbly: '255px 15px 225px 15px / 15px 225px 15px 255px',
        wobblyMd: '25px 5px 25px 5px / 5px 25px 5px 25px',
      },
      boxShadow: {
        hard: '4px 4px 0px 0px #2d2d2d',
        'hard-hover': '2px 2px 0px 0px #2d2d2d',
        'hard-lg': '8px 8px 0px 0px #2d2d2d',
        'hard-subtle': '3px 3px 0px 0px rgba(45, 45, 45, 0.1)',
      }
    },
  },
  plugins: [],
}
