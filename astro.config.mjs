import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: '',
      logo: {
        src: './src/assets/pokeapi_256.png',
      },
    }),
  ],
});
