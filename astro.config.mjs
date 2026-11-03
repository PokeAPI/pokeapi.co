import {defineConfig} from "astro/config";
import starlight from "@astrojs/starlight";
import starlightOpenAPI, {openAPISidebarGroups} from "starlight-openapi";
import tailwindcss from "@tailwindcss/vite";
import {stringify} from "yaml";
import {bundle} from "@readme/openapi-parser";
import {mkdir, writeFile} from "node:fs/promises";
import {resolve} from "node:path";

async function processOpenAPISchema(schemaUrl) {
  const schema = await bundle(schemaUrl);

  for (const operations of Object.values(schema.paths ?? {})) {
    for (const operation of Object.values(operations)) {
      if (operation && typeof operation === "object") {
        delete operation.security;
      }
    }
  }

  const publicDir = resolve("./public");
  await mkdir(publicDir, {recursive: true});
  await writeFile(resolve(publicDir, "openapi.yml"), stringify(schema), "utf-8");

  return "./public/openapi.yml";
}

const LOGO_URL = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";

async function fetchRemoteAssets() {
  const publicDir = resolve("./public");
  await mkdir(publicDir, {recursive: true});

  const logoRes = await fetch(LOGO_URL);
  if (logoRes.ok) {
    await writeFile(resolve(publicDir, "pokeapi_256.png"), Buffer.from(await logoRes.arrayBuffer()));
  }
}

await fetchRemoteAssets();

console.log("SITE_URL:", process.env.SITE_URL);
console.log("BASE_URL:", process.env.BASE_URL);

export default defineConfig({
  site: process.env.SITE_URL || "https://pokeapi.co",
  base: process.env.BASE_URL || "/",
  trailingSlash: "always",
  integrations: [
    starlight({
      title: "PokéAPI",
      favicon: "/favicon.svg",
      tableOfContents: {
        maxHeadingLevel: 4,
      },
      routeMiddleware: "./src/routeData.ts",
      lastUpdated: true,
      editLink: {baseUrl: "https://github.com/FallenDeity/pokeapi.co/edit/feat/astro-starlight/"},
      components: {
        PageTitle: "./src/components/markdown/DocPageTitle.astro",
        Sidebar: "./src/components/header/PokeSidebar.astro",
        Footer: "./src/components/footer/PokePageFrame.astro",
        PageFrame: "./src/components/footer/PokePageFrame.astro",
        Header: "./src/components/header/PokeHeader.astro",
        SocialIcons: "./src/components/header/SocialIcons.astro",
        ThemeSelect: "./src/components/header/ThemeToggle.astro",
        MarkdownContent: "./src/components/markdown/PokeMarkdownContent.astro",
      },
      head: [{tag: "link", attrs: {rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"}}],
      customCss: ["./src/styles/global.css"],
      logo: {
        src: "./public/pokeapi_256.png",
        replacesTitle: true,
      },
      social: [
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.gg/BpjJcKK4TC",
        },
        {
          icon: "github",
          label: "Github",
          href: "https://github.com/pokeapi/pokeapi",
        },
      ],
      plugins: [
        starlightOpenAPI([
          {
            base: `/v2/openapi`,
            label: "OpenAPI",
            schema: await processOpenAPISchema(
              "https://raw.githubusercontent.com/FallenDeity/pokeapi/refs/heads/metadata-api-schema/openapi.yml"
            ),
            sidebar: {
              tags: {
                sort: "alphabetical",
              },
            },
            snippets: {
              operation: {
                clients: {
                  go: ["nethttp"],
                  java: ["okhttp", "nethttp"],
                  javascript: ["fetch", "axios"],
                  rust: ["reqwest"],
                  shell: ["curl", "wget"],
                },
                default: {
                  target: "javascript",
                  client: "fetch",
                },
              },
            },
          },
        ]),
      ],
      sidebar: [
        {
          label: "About",
          link: "about",
        },
        {
          label: "API",
          items: [
            {
              label: "V2",
              link: "v2",
            },
            ...openAPISidebarGroups,
          ],
        },
        {
          label: "GraphQL",
          link: "graphql",
          badge: {text: "v1beta", variant: "default", class: "api-version-badge"},
        },
        {
          label: "How-To Guides",
          collapsed: true,
          items: [{autogenerate: {directory: "how-tos"}}],
        },
      ],
    }),
  ],
  vite: {plugins: [tailwindcss()]},
});
