/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: {
          DEFAULT: '#DCEB78',
          hover: '#CDDC66',
          light: '#E6F292',
          dark: '#B8C754',
        },
        dark: {
          DEFAULT: '#171717',
          pure: '#0F0F0F',
          muted: '#262626',
          border: '#333333',
        },
        cream: {
          DEFAULT: '#F2F0E8',
          pure: '#FAF9F5',
          muted: '#E5E3D8',
          border: '#D8D5C8',
        },
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.03em',
      },
    },
  },
  plugins: [],
}
