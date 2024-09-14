/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "inspiration": ['Inspiration', 'cursive']
      },
      animation: {
        'open-mobile-navbar': 'open-navbar-slide 0.7s  ',
        'close-mobile-navbar': 'close-navbar-slide 0.7s  ',
        "open-card": "open-card 0.7s",
        "close-card": "close-card 0.7s"
      },
      keyframes: {
        'mobile-navbar': {
          '0%': { width: "0%", height: "0%" },
          '100%': { width: "100%", height: "100%" },
        },
        "open-navbar-slide": {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        "close-navbar-slide": {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        "open-card": {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
        "close-card": {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
    },
    // colors: {
    //   white: '#ffffff',
    //   dark: "#1C1B22",
    //   gray:"#94A3B8",
    //   lightgray:"#e5e7ef",
    //   lightmenu:"#eeeeee",
    //   // #121212
    //   light:"#f1f1f1",
    //   // fbfbfb
    //   red:"#FF0000",
    // },
  },
  plugins: [],
};
