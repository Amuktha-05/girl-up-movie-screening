/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // CHAMAK CHALLO — Vibrant Night-Festival Dark Blue / Indigo Palette
        indigoNight: {
          950: '#0C041B',
          900: '#120727', // Base dark blue background
          850: '#160830',
          800: '#1B0C3C', // Card fill
          750: '#200E46', // Hover card fill
          700: '#251052', // Gradient stop
        },
        darkviolet: {
          950: '#0E041A',
          900: '#160727',
          850: '#1D0A33',
          800: '#250D3E',
          700: '#341457',
        },
        royal: {
          400: '#A16CD4',
          500: '#8A54BD',
          600: '#7949A5',
          700: '#64388B',
        },
        fiery: {
          400: '#FF6B3D',
          500: '#F04C1E', // Fiery orange-red centre lighting
          600: '#D93815',
        },
        brightgold: {
          300: '#FFF0A3',
          400: '#FFE169',
          500: '#F3CA66', // Refined bright gold
          600: '#E5B842',
          700: '#C79624',
        },
        marigold: {
          300: '#FFE082',
          400: '#FFD54F',
          500: '#FFB300', // Marigold yellow
          600: '#FF8F00',
        },
        orangeaccent: {
          400: '#FF8A3D',
          500: '#FF6F1E',
          600: '#E6560B',
        },
        darkbrown: '#2E1502',
        ivory: {
          DEFAULT: '#FFF8EF',
          muted: 'rgba(255, 248, 239, 0.78)',
          subtle: 'rgba(255, 248, 239, 0.55)',
        },
        // Indian Flag inspired accents
        saffron: '#FF6F1E',
        tricolorWhite: '#FFFFFF',
        tricolorGreen: '#1A7A4C',

        // Admin dashboard — same night-blue foundation
        midnight: {
          950: '#0C041B',
          900: '#120727',
          800: '#1B0C3C',
        },
        lavender: {
          300: '#E4C8FF',
          400: '#C084FC',
          500: '#A16CD4',
          600: '#7949A5',
          700: '#5C3D86',
          800: '#341457',
          900: '#1D0A33',
        },
        cream: {
          50: '#FFF8EF',
          200: '#FFF1DE',
          300: '#E8D9C8',
        },
        // Legacy palette support
        wine: {
          500: '#702C45',
          600: '#5c2439',
          700: '#481c2d',
          800: '#341421',
        },
        gold: {
          400: '#E5C68D',
          500: '#F3CA66',
          600: '#C39850',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 90s linear infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'pulse-warm': 'pulseWarm 5s ease-in-out infinite',
      },
      keyframes: {
        pulseWarm: {
          '0%, 100%': { opacity: '0.18', transform: 'scale(1)' },
          '50%': { opacity: '0.32', transform: 'scale(1.06)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
