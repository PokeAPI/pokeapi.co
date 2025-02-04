import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi'
import tailwindcss from '@tailwindcss/vite'

// const base_url = process.env.BASE_URL || ''

export default defineConfig({
  site: 'https://pokeapi.co',
  base: '/pokeapi.co',
  integrations: [
    starlight({
      title: 'PokéAPI',
      customCss: [
        './src/styles/global.css',
      ],
      logo: {
        src: './src/assets/pokeapi_256.png',
        replacesTitle: true,
      },
      social: {
        github: 'https://github.com/pokeapi/pokeapi',
        slack: 'https://pokeapi.slack.com/',
      },
      plugins: [
        // Generate the OpenAPI documentation pages.
        starlightOpenAPI([
          {
            // base: `${base_url}/v2/openapi`,
            base: `/v2/openapi`,
            label: 'OpenAPI',
            schema: 'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/openapi.yml',
          },
        ]),
      ],
      sidebar: [
        {
          label: 'About',
          link: 'about',
        },
        {
          label: 'API',
          items: [
            {
              label: 'V2',
              link: 'v2',
            },
            ...openAPISidebarGroups,
          ],
        },
        {
          label: 'GraphQL',
          link: 'graphql',
          badge: 'v1beta',
        },
      ],
    }),
  ],
  vite: { plugins: [tailwindcss()] },
})
