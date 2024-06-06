/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        secondary: 'var(--color-secondary)',
        'secondary-dark': 'var(--color-secondary-dark)',
        success: 'var(--color-success)',
        'success-dark': 'var(--color-success-dark)',
        error: 'var(--color-error)',
        'error-dark': 'var(--color-error-dark)',
        warning: 'var(--color-warning)',
        'warning-dark': 'var(--color-warning-dark)',
        info: 'var(--color-info)',
        'info-dark': 'var(--color-info-dark)',
        surface: 'var(--color-surface)',
        'surface-dark': 'var(--color-surface-dark)',
        'on-primary': 'var(--color-on-primary)',
        'on-primary-dark': 'var(--color-on-primary-dark)',
        'on-secondary': 'var(--color-on-secondary)',
        'on-secondary-dark': 'var(--color-on-secondary-dark)',
        'on-success': 'var(--color-on-success)',
        'on-success-dark': 'var(--color-on-success-dark)',
        'on-error': 'var(--color-on-error)',
        'on-error-dark': 'var(--color-on-error-dark)',
        'on-warning': 'var(--color-on-warning)',
        'on-warning-dark': 'var(--color-on-warning-dark)',
        'on-info': 'var(--color-on-info)',
        'on-info-dark': 'var(--color-on-info-dark)',
        'on-surface': 'var(--color-on-surface)',
        'on-surface-dark': 'var(--color-on-surface-dark)'
      }
    }
  },
  plugins: []
}
