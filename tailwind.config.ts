import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js"

  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white-1': '#F8FFFF',
      'blue-1': '#1471A5',
      'blue-2': '#0C6AC2',
      'white': '#FFFFFF',
      'black': '#000000',
      'low1': '#DBEBEF',
      'cream': '#FBFBFB',
      'gray1': '#A3A8BB',
      'blue1': '#1B2F72',
      'blue2': '#1B2F72',
      'red': '#FF0000',


    },
    extend: {
      fontFamily: {
        deacon1: ['AIONType-regular', 'sans-serif'],
        deacon2: ['AIONType-regular-italic', 'sans-serif'],
        deacon3: ['AIONType-light', 'sans-serif'],
        deacon4: ['AIONType-light-italic', 'sans-serif'],
        deacon5: ['AIONType-bold', 'sans-serif'],
        deacon6: ['AIONType-bold-italic', 'sans-serif'],
        deacon7: ['Prompt-BlackItalic', 'sans-serif'],
        deacon8: ['Prompt-Bold', 'sans-serif'],
        deacon9: ['Prompt-BoldItalic', 'sans-serif'],
        deacon10: ['Prompt-ExtraBold', 'sans-serif'],
        deacon11: ['Prompt-ExtraBoldItalic', 'sans-serif'],
        deacon12: ['Prompt-Italic', 'sans-serif'],
        deacon13: ['Prompt-Regular', 'sans-serif'],
        deacon14: ['Prompt-SemiBold', 'sans-serif'],

      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      opacity: {
        '15': '0.15',
        '35': '0.35',
        '60': '0.60',
        '65': '0.65',
        '70': '0.70',
        '75': '0.75',
      },
      backgroundOpacity: {
        '15': '0.15',
        '35': '0.35',
        '60': '0.60',
        '65': '0.65',
        '70': '0.70',
        '75': '0.75',
      },
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs"), require('tailwind-float-label')],
};
export default config;
