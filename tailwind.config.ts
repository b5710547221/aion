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
      'white' : '#FFFFFF',
      'black' : '#000000',
      'low1' : '#DBEBEF',
      'cream': '#FBFBFB',
      'gray1' : '#A3A8BB',
      'blue1' :'##1B2F72',
      'blue2' : '#1B2F72',
      'red' : '#FF0000',
      
      
    },
    extend: {
      fontFamily: {
        boldFont: ["BoldFont", "AIONType-bold"],
       
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs"),require('tailwind-float-label')],
};
export default config;
