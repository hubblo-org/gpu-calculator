import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit(), svelteTesting()],

  test: {
    include: ["src/**/*.{test,spec}.{js,ts}", "src/**/*.svelte.test.ts"],
    exclude: ["src/tests/e2e"],
    environment: "jsdom",
    setupFiles: ["./vitest-setup-client.ts"]
  }
});
