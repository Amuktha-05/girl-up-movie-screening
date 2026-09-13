/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Purple-forward dark palette — reads as PURPLE & PLUM, not charcoal
        midnight: {
          50: '#ede8f2',
          100: '#d4c9e2',
          200: '#b5a2cc',
          300: '#957cb5',
          400: '#785a9e',
          500: '#5f4386',
          600: '#4a3470',
          700: '#3a2758',
          800: '#2b1b38', // rich plum card background
          850: '#22152e', // deep plum
          900: '#1b1226', // dark purple
          950: '#150f1f', // deep dark purple-black
        },
        // Mature, visible lavender — the true accent
        lavender: {
          100: '#f4f0f9',
          200: '#e8dff2',
          300: '#D8C9E5', // light lavender (user-specified)
          400: '#B9A4CE', // soft lavender (user-specified)
          500: '#9B82B5', // muted lavender — primary accent (user-specified)
          600: '#7e649b',
          700: '#634e7a',
          800: '#4a3a5a',
          900: '#32283f',
        },
        blush: {
          100: '#f7eff4',
          200: '#eddbea',
          300: '#dcc4d8',
          400: '#c3a0bb',
          500: '#a67a9a',
          600: '#8a5f7f',
          700: '#6e4865',
          800: '#52364b',
          900: '#382534',
        },
        cream: {
          50: '#f7f1e8',
          100: '#f0e8d8',
          200: '#e5d5b8',
          300: '#d4be94',
          400: '#bfa06e',
          500: '#a0804c',
          600: '#7e6238',
          700: '#5e4929',
          800: '#41321c',
          900: '#281f10',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite',
        'twinkle': 'twinkle 5s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '0.65', transform: 'scale(1.1)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        // Deep purple cinema gradient spanning the page
        'cinema-gradient': 'linear-gradient(180deg, #171023 0%, #201330 15%, #2c1a40 35%, #211333 55%, #311b47 75%, #150f1f 100%)',
        'cinema-radial': 'radial-gradient(ellipse at center, #351d4d 0%, #201330 50%, #150f1f 100%)',
      },
    },
  },
  plugins: [],
};
