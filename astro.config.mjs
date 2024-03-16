import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: '',
      logo: {
        src: './src/assets/pokeapi_256.png',
      },
      social: {
        github: 'https://github.com/pokeapi/pokeapi',
      },
      sidebar: [
        {
          label: 'API V2',
          autogenerate: { directory: 'v2' },
        },
        { label: 'About', link: 'about' },
      ],
    }),
  ],
});
