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
          bg: 'var(--tcm-bg-base)',
          surface: 'var(--tcm-bg-surface)',
          elevated: 'var(--tcm-bg-elevated)',
          primary: 'var(--tcm-primary-500)',
          'primary-d': 'var(--tcm-primary-700)',
          'primary-l': 'var(--tcm-primary-300)',
          gold: 'var(--tcm-gold-text)',
          'gold-l': 'var(--tcm-gold-border)',
          jade: 'var(--tcm-success-text)',
          'jade-l': 'var(--tcm-success-border)',
          text: 'var(--tcm-text-primary)',
          'text-s': 'var(--tcm-text-secondary)',
          'text-disabled': 'var(--tcm-text-disabled)',
          border: 'var(--tcm-border-default)',
          'border-l': 'var(--tcm-border-light)',
          success: 'var(--tcm-success-text)',
          warning: 'var(--tcm-warning-text)',
          error: 'var(--tcm-error-text)',
          info: 'var(--tcm-info-text)',
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
        'tcm-sm': 'var(--tcm-shadow-sm)',
        tcm: 'var(--tcm-shadow-md)',
        'tcm-lg': 'var(--tcm-shadow-lg)',
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
