/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        chevronNudgeRight: {
          '0%, 100%': { transform: 'rotate(90deg) translateX(0)' },
          '50%': { transform: 'rotate(90deg) translateX(3px)' },
        },
        chevronNudgeLeft: {
          '0%, 100%': { transform: 'rotate(270deg) translateX(0)' },
          '50%': { transform: 'rotate(270deg) translateX(3px)' },
        },
        pulseScale: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
      },
      animation: {
        'chevron-right': 'chevronNudgeRight 1.2s ease-in-out infinite',
        'chevron-left': 'chevronNudgeLeft 1.2s ease-in-out infinite',
        'pulse-scale': 'pulseScale 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
