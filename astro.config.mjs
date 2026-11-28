import {defineConfig} from "astro/config";
import starlight from "@astrojs/starlight";
import starlightOpenAPI, {openAPISidebarGroups} from "starlight-openapi";
import tailwindcss from "@tailwindcss/vite";
import {stringify} from "yaml";
import {bundle} from "@readme/openapi-parser";
import {mkdir, writeFile} from "node:fs/promises";
import {existsSync} from "node:fs";
import {resolve} from "node:path";
import {injectOpenAPIExamples} from "./src/utils/openapi-schema.mjs";
import {editorThemeCss} from "./src/utils/editor-theme.mjs";

async function processOpenAPISchema(schemaUrl) {
  const publicDir = resolve("./public");
  const localSchemaPath = resolve(publicDir, "openapi.yml");
  try {
    const schema = await bundle(schemaUrl);
    await injectOpenAPIExamples(schema);

    await mkdir(publicDir, {recursive: true});
    await writeFile(localSchemaPath, stringify(schema), "utf-8");
  } catch (err) {
    if (existsSync(localSchemaPath)) {
      return "./public/openapi.yml";
    }
    throw err;
  }

  return "./public/openapi.yml";
}

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
      editLink: {baseUrl: "https://github.com/PokeAPI/pokeapi.co/edit/master/"},
      components: {
        Hero: "./src/components/hero/Hero.astro",
        PageTitle: "./src/components/markdown/DocPageTitle.astro",
        Sidebar: "./src/components/header/PokeSidebar.astro",
        Footer: "./src/components/footer/PokePageFrame.astro",
        PageFrame: "./src/components/footer/PokePageFrame.astro",
        Header: "./src/components/header/PokeHeader.astro",
        SocialIcons: "./src/components/header/SocialIcons.astro",
        ThemeSelect: "./src/components/header/ThemeToggle.astro",
        MarkdownContent: "./src/components/markdown/PokeMarkdownContent.astro",
      },
      head: [
        {
          tag: "link",
          attrs: {
            rel: "preload",
            href: "/Inter.woff2",
            as: "font",
            type: "font/woff2",
            crossorigin: true,
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "preload",
            href: "/pokemon-solid-subset.woff2",
            as: "font",
            type: "font/woff2",
            crossorigin: true,
          },
        },
        {tag: "style", content: editorThemeCss},
      ],
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
            schema: await processOpenAPISchema("https://raw.githubusercontent.com/PokeAPI/pokeapi/master/openapi.yml"),
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
