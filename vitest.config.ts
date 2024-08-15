import viteConfig from './vite.config';
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      reporters: ['verbose'],
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.ts', // Jest 스타일의 setup 파일
      coverage: {
        reporter: ['text', 'text-summary'],
        enabled: true,
        provider: 'v8',
        extension: ['.js', '.jsx', '.ts', '.tsx'],
        include: ['src/utils/**', 'src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
        exclude: [...configDefaults.exclude, 'src/utils/ignore/**', 'src/utils/**.d.ts'],
        thresholds: {
          // Thresholds for all files
          statements: 50,
          branches: 50,
          functions: 50,
          lines: 50,
          // Thresholds for utilities
          '**/src/utils/**/*.{ts,tsx}': {
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80,
          },
        },
      },
      include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
      exclude: [...configDefaults.exclude],
    },
  }),
);
