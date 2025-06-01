import { defineConfig } from 'unocss';
import presetMini from '@unocss/preset-mini';

export default defineConfig({
  presets: [presetMini()],
  theme: {
    fontSize: {
      display: '4.375rem', // 70px
      title: '2.25rem', // 36px
      body: '1.125rem', // 18px
      subtitle: '1.5rem', // 24px
    },
    fontWeight: {
      display: '700',
      title: '500',
      body: '500',
      subtitle: '500',
    },
    colors: {
      background: 'var(--color-background)',
      foreground: 'var(--color-foreground)',
      black: '#000',
      white: '#fff',
    },
    fontFamily: {
      pretendard: 'var(--pretendard), sans-serif',
      gmarket: 'var(--font-gmarket), sans-serif',
    },
    spacing: {
      container: '2rem', // Tailwind container padding
    },
  },
});
