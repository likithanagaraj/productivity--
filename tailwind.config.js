/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      fontFamily: {
        geistBold: ["Geist-Bold", "sans-serif"],
        geistMedium: ["Geist-Medium", "sans-serif"],
        geistRegular: ["Geist-Regular", "sans-serif"],
        GeistSemiBold: ["Geist-SemiBold", "sans-serif"],
      },
      backgroundColor:{
        PRIMARY_BG:"#1b1b1b",
        LIGHT_BG : '#313131',
        CTA:'#B5CFF8',
        BG:"#FFFFFF"
      },
      textColor:{
        PRIMARY_TEXT : '#FFFFFF',
        TextCTA:'#B5CFF8', 
        PRIMARY_BG:"#1b1b1b",
        LIGHT_BG : '#313131',
      }
    },
  },

  plugins: [],
};