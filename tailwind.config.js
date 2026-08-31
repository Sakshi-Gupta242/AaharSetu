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
        command: {
          bg: '#090d16',
          panel: '#0f172a',
          surface: '#172033',
          border: '#1e293b',
          borderHighlight: '#334155',
          accent: '#06b6d4',
          accentGlow: 'rgba(6, 182, 212, 0.15)',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Roboto Mono', 'ui-monospace', 'monospace'],
      }
    },
  },
  plugins: [],
}
