import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

export default {
  kit: {
    adapter: adapter(),
    paths: {
      base: dev ? '' : '/Benford'  // This MUST match your repo name
    },
    prerender: {
      entries: ['*']
    }
  }
};
