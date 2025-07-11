// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */

export default {
  kit: {
    adapter: adapter(),
    paths: {
      base: '/Benford', // IMPORTANT: Replace with the repo name
    }
  }
};
