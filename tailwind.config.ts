import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {},
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "forest",
      "cupcake",
      {
        dotaTheme: {
          primary: "#c4c2fc",

          secondary: "#8fba23",

          accent: "#a9fcb5",

          neutral: "#262c31",

          "base-100": "#333538",

          info: "#9face0",

          success: "#28e6a4",

          warning: "#daa110",

          error: "#f8162d",
        },
      },
    ],
  },
};
export default config;
