import {getCollection} from "astro:content";
import {OGImageRoute} from "astro-og-canvas";
import {readFileSync} from "node:fs";
import {resolve} from "node:path";
import {parse} from "yaml";

const docsEntries = await getCollection("docs");
const pages: Record<string, {data: {title: string; description?: string}}> = Object.fromEntries(
  docsEntries.map(({data, id}) => [id, {data}])
);

try {
  const schemaPath = resolve("./public/openapi.yml");
  const schemaFile = readFileSync(schemaPath, "utf-8");
  const schema = parse(schemaFile);

  if (schema) {
    const tags = new Set<string>();

    const tagDescriptions: Record<string, string> = {};
    if (schema.tags && Array.isArray(schema.tags)) {
      for (const tagObj of schema.tags) {
        if (tagObj && tagObj.name && tagObj.description) {
          let tagDesc = tagObj.description;
          if (tagObj.externalDocs && tagObj.externalDocs.description) {
            tagDesc += " " + tagObj.externalDocs.description;
          }
          tagDescriptions[tagObj.name.toLowerCase()] = tagDesc;
        }
      }
    }

    pages["v2/openapi"] = {
      data: {
        title: "OpenAPI Specifications",
        description: schema.info?.description || "Full developer API schemas and interactive endpoint specifications for PokéAPI.",
      },
    };

    if (schema.paths) {
      for (const [pathKey, pathItem] of Object.entries(schema.paths)) {
        if (pathItem && typeof pathItem === "object") {
          for (const [method, operation] of Object.entries(pathItem)) {
            if (operation && typeof operation === "object" && "operationId" in operation) {
              const op = operation as any;
              const operationId = op.operationId;

              const cleanTitle = (op.summary || operationId).replace(/_/g, " ").replace(/\//g, " ");

              pages[`v2/openapi/operations/${operationId}`] = {
                data: {
                  title: cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1),
                  description: op.description || `API reference documentation for the ${operationId} endpoint.`,
                },
              };

              if (op.tags && Array.isArray(op.tags)) {
                for (const tag of op.tags) {
                  tags.add(tag);
                }
              }
            }
          }
        }
      }
    }

    for (const tag of tags) {
      const cleanTag = tag.toLowerCase();
      pages[`v2/openapi/operations/tags/${cleanTag}`] = {
        data: {
          title: `${tag.charAt(0).toUpperCase() + tag.slice(1)} Endpoints`,
          description: tagDescriptions[cleanTag] || `API reference lists for all endpoints tagged under ${tag}.`,
        },
      };
    }
  }
} catch (e) {
  console.warn(
    "[OG Image Generator] openapi.yml not found or failed to parse. Skipping OpenAPI routes in social card generation."
  );
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^\s()]+(?:\([^\s)]+\))?[^\s()]*\)/g, "$1") // Strip links (handles nested parens)
    .replace(/[\*_]{1,3}/g, "") // Strip bold/italic markup
    .replace(/`([^`]+)`/g, "$1") // Strip inline code blocks
    .replace(/<[^>]*>/g, ""); // Strip raw HTML tags
}

function truncateText(text: string, maxLength: number = 110): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

export const {getStaticPaths, GET} = await OGImageRoute({
  pages,
  getImageOptions: (_id, page) => {
    let bgPath = "./src/assets/og/og_bg_default.png";
    if (_id.startsWith("v2/openapi")) {
      bgPath = "./src/assets/og/og_bg_openapi.png";
    } else if (_id.startsWith("how-tos")) {
      bgPath = "./src/assets/og/og_bg_guides.png";
    } else if (_id.startsWith("v2")) {
      bgPath = "./src/assets/og/og_bg_v2api.png";
    }

    return {
      title: stripMarkdown(page.data.title),
      description: truncateText(stripMarkdown(page.data.description || "The RESTful Pokémon API.")),
      site: "PokéAPI",
      bgImage: {
        path: bgPath,
        fit: "cover",
      },
      logo: {
        path: "./src/assets/pokeapi_256.png",
        size: [250],
      },
      font: {
        title: {
          size: 64,
          weight: "Bold",
          color: [255, 255, 255],
        },
        description: {
          size: 32,
          color: [148, 163, 184],
        },
      },
    };
  },
});
