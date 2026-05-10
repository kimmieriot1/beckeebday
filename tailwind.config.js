/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-deep': '#050510',
        'bg-mid': '#0a0a1f',
        'bg-card': '#12101a',
        'silver-glow': '#c9c9d4',
        'silver-mist': '#8a8aa0',
        'gold-warm': '#d4af37',
        'gold-bright': '#f4d35e',
        'gold-deep': '#a8801f',
        'red-magdalene': '#8b1e3f',
        'text-cream': '#f5f1e8',
        'text-muted': '#a89e8a',
        smoke: 'rgba(245, 241, 232, 0.05)'
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Garamond', 'serif'],
        roman: ['Cinzel', 'Trajan Pro', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        period: ['"EB Garamond"', 'Garamond', 'serif']
      },
      letterSpacing: {
        widest: '0.3em',
        sacred: '0.45em'
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '0.6', filter: 'blur(0.5px)' },
          '50%': { opacity: '1', filter: 'blur(0px)' }
        },
        'gold-shimmer': {
          '0%, 100%': { textShadow: '0 0 12px rgba(244, 211, 94, 0.3)' },
          '50%': { textShadow: '0 0 24px rgba(244, 211, 94, 0.6)' }
        },
        'gentle-bob': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' }
        }
      },
      animation: {
        'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
        'gold-shimmer': 'gold-shimmer 5s ease-in-out infinite',
        'gentle-bob': 'gentle-bob 4s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
