import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi'

export default defineConfig({
  site: 'https://indyandie.github.io/',
  base: '/pokeapi.co',
  integrations: [
    starlight({
      title: '',
      logo: {
        src: './src/assets/pokeapi_256.png',
      },
      social: {
        github: 'https://github.com/pokeapi/pokeapi',
      },
      plugins: [
        // Generate the OpenAPI documentation pages.
        starlightOpenAPI([
          {
            base: 'v2/openapi',
            label: 'OpenAPI',
            schema: './openapi.yml',
          },
        ]),
      ],
      sidebar: [
        {
          label: 'API',
          items: [
            {
              label: 'V2',
              link: 'v2',
            },
            ...openAPISidebarGroups,
          ]
        },
        {
          label: 'About',
          link: 'about'
        },
        {
          label: 'GraphQL',
          link: 'graphql',
          badge: 'v1beta',
        },
      ],
    }),
  ],
});
