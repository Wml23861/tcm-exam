/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        tcm: {
          bg: '#FDF8EE',
          surface: '#FAF3E3',
          elevated: '#FFF9F0',
          primary: '#C0392B',
          'primary-d': '#8B2500',
          'primary-l': '#E4826E',
          gold: '#B8860B',
          'gold-l': '#E8C980',
          jade: '#2E5E4E',
          'jade-l': '#6DBF9E',
          text: '#2C1810',
          'text-s': '#6B5B4F',
          'text-disabled': '#B5A89A',
          border: '#D4C5B9',
          'border-l': '#E8DED0',
          success: '#2E5E4E',
          warning: '#D4A030',
          error: '#C0392B',
          info: '#4A7C96',
        },
      },
      fontFamily: {
        tcm: ['PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Noto Sans SC', 'sans-serif'],
        'tcm-decorative': ['Ma Shan Zheng', 'STKaiti', 'KaiTi', 'serif'],
      },
      borderRadius: {
        tcm: '8px',
      },
      boxShadow: {
        'tcm-sm': '0 1px 3px rgba(44, 24, 16, 0.08)',
        tcm: '0 4px 12px rgba(44, 24, 16, 0.10)',
        'tcm-lg': '0 8px 24px rgba(44, 24, 16, 0.12)',
      },
      animation: {
        'ink-spread': 'ink-spread 0.3s ease-out',
        'card-flip': 'card-flip 0.5s ease-in-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'ink-spread': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'card-flip': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
