import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { mdsvex } from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".svx"],
  preprocess: [mdsvex(), vitePreprocess()],

  kit: {
    adapter: adapter(),
    alias: {
      $mocks: "src/mocks"
    }
  }
};

export default config;
