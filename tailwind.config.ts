import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
    './src/fonts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/types/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontSize: {
      display: ['4.375rem', { fontWeight: '700' }],
      title: ['2.25rem', { fontWeight: '500' }],
      body: ['1.125rem', { fontWeight: '500' }],
      subtitle: ['1.5rem', { fontWeight: '500' }],
    },
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      fontFamily: {
        pretendard: ['var(--pretendard)', 'sans-serif'],
        gmarket: ['var(--font-gmarket)', 'sans-serif'],
      },

      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',

        black: {
          DEFAULT: '#000',
        },
        white: {
          DEFAULT: '#fff',
        },
      },
    },
  },
  plugins: [],
};

export default config;
