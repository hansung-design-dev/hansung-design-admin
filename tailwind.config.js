import lineClamp from '@tailwindcss/line-clamp';

const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '0-75-500': '0.75rem',
      },
      fontWeight: {
        500: '500',
      },
    },
  },
  plugins: [lineClamp],
};

export default config;
