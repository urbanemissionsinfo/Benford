import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      // optionally add fallback: 'index.html' if using SPA-style routing
      // fallback: 'index.html'
    }),
    paths: {
      base: '/Benford', // important for GitHub Pages
    },
    prerender: {
      entries: ['*'], // this is the default, but you can be explicit
    }
  }
};
