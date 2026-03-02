import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Consolas', 'Monaco', "'Courier New'", 'monospace'],
      },
      colors: {
        toyota: {
          green: '#00a651',
        },
        crisis: {
          red: '#dc2626',
          amber: '#d97706',
          green: '#00a651',
          bg: '#f4f4f4',
          panel: '#ffffff',
          border: '#e0e0e0',
          text: '#111111',
          muted: '#666666',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [typography],
}
export default config
