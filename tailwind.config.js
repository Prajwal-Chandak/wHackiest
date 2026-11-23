/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        saathi: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        navy: {
          800: '#111827',
          850: '#0f172a',
          900: '#0b0f19',
          950: '#05070d',
        },
        portal: {
          blue: '#1e40af',
          header: '#1e293b',
          surface: '#f8fafc',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '14px',
        '2xl': '18px',
        '3xl': '22px',
      },
      boxShadow: {
        'soft': '0 2px 10px -2px rgba(0, 0, 0, 0.04), 0 10px 24px -4px rgba(0, 0, 0, 0.06)',
        'float': '0 20px 40px -12px rgba(15, 23, 42, 0.12), 0 1px 3px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 25px -5px rgba(124, 58, 237, 0.3)',
        'glow-sm': '0 0 15px -3px rgba(124, 58, 237, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'highlight': 'highlightField 1.8s ease-out forwards',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9', filter: 'drop-shadow(0 0 12px rgba(139, 92, 246, 0.5))' },
          '50%': { transform: 'scale(1.04)', opacity: '1', filter: 'drop-shadow(0 0 22px rgba(139, 92, 246, 0.8))' },
        },
        highlightField: {
          '0%': { backgroundColor: 'rgba(237, 233, 254, 0.9)', borderColor: '#8b5cf6', boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.3)' },
          '70%': { backgroundColor: 'rgba(237, 233, 254, 0.4)', borderColor: '#a78bfa', boxShadow: '0 0 0 2px rgba(139, 92, 246, 0.15)' },
          '100%': { backgroundColor: 'transparent', borderColor: '', boxShadow: 'none' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
