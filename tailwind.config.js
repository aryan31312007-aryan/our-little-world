/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['"Dancing Script"', 'cursive'],
        greatvibes: ['"Great Vibes"', 'cursive'],
        playfair: ['"Playfair Display"', 'serif'],
        poppins: ['"Poppins"', 'sans-serif'],
        caveat: ['"Caveat"', 'cursive'],
        sacramento: ['"Sacramento"', 'cursive'],
      },
      colors: {
        romantic: {
          50: '#fff1f4',
          100: '#ffe4e9',
          200: '#fecdd6',
          300: '#fda4b5',
          400: '#fb718d',
          500: '#f43f68',
          600: '#e11d51',
          700: '#be1241',
          800: '#9f123c',
          900: '#881337',
        },
        night: {
          950: '#060714',
          900: '#0a0d24',
          850: '#0e1231',
          800: '#141a42',
          700: '#1e245a',
          600: '#2b2c6e',
        },
        paper: {
          cream: '#fdfbf7',
          aged: '#faf3e6',
          pink: '#ffeef2',
          blush: '#fff5f7',
        }
      },
      boxShadow: {
        'glow-pink': '0 0 25px rgba(244, 63, 104, 0.65), 0 0 50px rgba(244, 63, 104, 0.35)',
        'glow-pink-lg': '0 0 40px rgba(244, 63, 104, 0.8), 0 0 80px rgba(244, 63, 104, 0.45)',
        'glow-amber': '0 0 20px rgba(251, 191, 36, 0.7)',
        'paper': '0 15px 35px -5px rgba(180, 80, 100, 0.15), 0 5px 15px rgba(0, 0, 0, 0.08)',
        'polaroid': '0 20px 35px -5px rgba(160, 60, 90, 0.22), 0 8px 16px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'drift': 'drift 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        drift: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '100%': { transform: 'translateY(-100vh) rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
