import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://pokeapi.co',
  base: '',
  integrations: [
    starlight({
      title: 'PokéAPI',
      components: {
        Footer: './src/components/PokeFooter.astro',
        Header: './src/components/PokeHeader.astro',
      },
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
        starlightOpenAPI([
          {
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
