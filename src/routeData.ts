import {defineRouteMiddleware} from "@astrojs/starlight/route-data";
import {readFileSync, existsSync} from "node:fs";
import {resolve} from "node:path";
import {parse} from "yaml";
import resourceLists from "./data/operations/resource-lists.json";
import berries from "./data/operations/berries.json";
import contests from "./data/operations/contests.json";
import encounters from "./data/operations/encounters.json";
import evolution from "./data/operations/evolution.json";
import games from "./data/operations/games.json";
import items from "./data/operations/items.json";
import locations from "./data/operations/locations.json";
import machines from "./data/operations/machines.json";
import moves from "./data/operations/moves.json";
import pokemon from "./data/operations/pokemon.json";
import utility from "./data/operations/utility.json";

const tocMapping: Record<string, any[]> = {
  "resource-listspagination-group": resourceLists,
  "berries-group": berries,
  "contests-group": contests,
  "encounters-group": encounters,
  "evolution-group": evolution,
  "games-group": games,
  "items-group": items,
  "locations-group": locations,
  "machines-group": machines,
  "moves-group": moves,
  "pokemon-group": pokemon,
  "utility-group": utility,
};

const PageCategory = {
  OPENAPI: "openapi",
  GUIDES: "guides",
  API_V2: "api-v2",
  DOCUMENTATION: "documentation",
} as const;

type PageCategoryType = typeof PageCategory[keyof typeof PageCategory];

const CATEGORY_KEYWORDS: Record<PageCategoryType, string[]> = {
  [PageCategory.OPENAPI]: ["openapi", "swagger", "schema", "endpoints", "developer", "reference"],
  [PageCategory.GUIDES]: ["guide", "tutorial", "how-to", "integration", "examples"],
  [PageCategory.API_V2]: ["explorer", "console", "RESTful", "resource", "endpoints"],
  [PageCategory.DOCUMENTATION]: ["documentation", "RESTful", "web service"],
};

function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^\s()]+(?:\([^\s)]+\))?[^\s()]*\)/g, "$1") // Strip links (handles nested parens)
    .replace(/[\*_]{1,3}/g, "") // Strip bold/italic markup
    .replace(/`([^`]+)`/g, "$1") // Strip inline code blocks
    .replace(/<[^>]*>/g, "") // Strip raw HTML tags
    .replace(/\s*\r?\n\s*/g, " ") // Clean newlines to spaces
    .trim();
}

const openapiDescriptions: Record<string, string> = {};
const openapiTagDescriptions: Record<string, string> = {};
let openapiInfoDescription = "";

try {
  const schemaPath = resolve("./public/openapi.yml");
  if (existsSync(schemaPath)) {
    const schemaFile = readFileSync(schemaPath, "utf-8");
    const schema = parse(schemaFile);
    if (schema) {
      if (schema.info && schema.info.description) {
        openapiInfoDescription = stripMarkdown(schema.info.description);
      }
      
      if (schema.tags && Array.isArray(schema.tags)) {
        for (const tagObj of schema.tags) {
          if (tagObj && typeof tagObj === "object" && "name" in tagObj && "description" in tagObj) {
            let tagDesc = tagObj.description || "";
            if (tagObj.externalDocs && typeof tagObj.externalDocs === "object" && tagObj.externalDocs.description) {
              tagDesc += " " + tagObj.externalDocs.description;
            }
            openapiTagDescriptions[tagObj.name.toLowerCase()] = stripMarkdown(tagDesc);
          }
        }
      }

      if (schema.paths) {
        for (const [pathKey, pathItem] of Object.entries(schema.paths)) {
          if (pathItem && typeof pathItem === "object" && pathItem !== null) {
            for (const [method, operation] of Object.entries(pathItem)) {
              if (operation && typeof operation === "object" && operation !== null && "operationId" in operation) {
                const op = operation as any;
                const descriptionText = op.description || op.summary || "";
                if (descriptionText) {
                  openapiDescriptions[op.operationId] = stripMarkdown(descriptionText);
                }
              }
            }
          }
        }
      }
    }
  }
} catch (e) {
  console.warn("[routeData.ts] Failed to parse openapi.yml:", e);
}

export const onRequest = defineRouteMiddleware((context) => {
  const { starlightRoute } = context.locals;
  
  const base = new URL(import.meta.env.BASE_URL, context.site);
  const ogImageUrl = new URL(`og/${starlightRoute.id || "index"}.png`, base);

  const routeId = starlightRoute.id || "";
  let calculatedCategory: PageCategoryType = PageCategory.DOCUMENTATION;
  if (routeId.startsWith("v2/openapi")) {
    calculatedCategory = PageCategory.OPENAPI;
  } else if (routeId.startsWith("how-tos")) {
    calculatedCategory = PageCategory.GUIDES;
  } else if (routeId.startsWith("v2")) {
    calculatedCategory = PageCategory.API_V2;
  }

  const entryData = (starlightRoute.entry as any)?.data || {};
  const category = entryData.category || calculatedCategory;

  let description = entryData.description;
  if (!description) {
    if (routeId.startsWith("v2/openapi")) {
      let schemaDesc = "";
      if (routeId === "v2/openapi" || routeId === "v2/openapi/") {
        schemaDesc = openapiInfoDescription || "Full developer API schemas and interactive endpoint specifications for PokéAPI.";
      } else if (routeId.startsWith("v2/openapi/operations/tags/")) {
        const tagName = routeId.replace("v2/openapi/operations/tags/", "").replace(/\/$/, "").toLowerCase();
        schemaDesc = openapiTagDescriptions[tagName] || `API reference lists for all endpoints tagged under ${tagName}.`;
      } else if (routeId.startsWith("v2/openapi/operations/")) {
        const operationId = routeId.replace("v2/openapi/operations/", "").replace(/\/$/, "");
        schemaDesc = openapiDescriptions[operationId] || "";
      }
      
      const endpointName = starlightRoute.title || "this resource";
      description = schemaDesc || `Interactive API documentation for PokéAPI's ${endpointName} endpoint. View specifications, request schemas, parameters, and code samples.`;
    } else if (routeId.startsWith("how-tos")) {
      description = `Learn how to integrate and use PokéAPI with different libraries, frameworks, and patterns.`;
    } else {
      description = `The RESTful Pokémon API.`;
    }
    
    if (starlightRoute.entry?.data) {
      starlightRoute.entry.data.description = description;
    }
  }

  const baseKeywords = ["pokeapi", "pokemon", "api"];
  const categorySpecific = CATEGORY_KEYWORDS[calculatedCategory];
  
  let customKeywords: string[] = [];
  if (entryData.keywords) {
    customKeywords = Array.isArray(entryData.keywords)
      ? entryData.keywords
      : entryData.keywords.split(",").map((k: string) => k.trim());
  }

  const mergedKeywords = Array.from(new Set([...baseKeywords, ...categorySpecific, ...customKeywords]));
  const keywordsStr = mergedKeywords.join(", ");

  starlightRoute.head.push(
    {
      tag: "meta",
      attrs: {property: "og:image", content: ogImageUrl.href},
    },
    {
      tag: "meta",
      attrs: {name: "twitter:image", content: ogImageUrl.href},
    },
    {
      tag: "meta",
      attrs: {name: "twitter:card", content: "summary_large_image"},
    },
    {
      tag: "meta",
      attrs: {name: "theme-color", content: "#ef4444", media: "(prefers-color-scheme: light)"},
    },
    {
      tag: "meta",
      attrs: {name: "theme-color", content: "#2563eb", media: "(prefers-color-scheme: dark)"},
    },
    {
      tag: "meta",
      attrs: {name: "category", content: category},
    },
    {
      tag: "meta",
      attrs: {name: "keywords", content: keywordsStr},
    },
    {
      tag: "meta",
      attrs: {name: "robots", content: "index, follow"},
    },
  );

  const hasDescTag = starlightRoute.head.some((tag: any) => tag.attrs?.name === "description");
  if (!hasDescTag && description) {
    starlightRoute.head.push({
      tag: "meta",
      attrs: {name: "description", content: description},
    });
  }

  if (starlightRoute.id === "v2/index" || starlightRoute.id === "v2") {
    if (starlightRoute.toc && starlightRoute.toc.items) {
      starlightRoute.toc.items = starlightRoute.toc.items.map((item) => {
        const endpoints = tocMapping[item.slug];
 
        if (endpoints) {
          const children = endpoints.map((endpoint) => ({
            depth: 3,
            slug: endpoint.name,
            text: endpoint.name,
            children: [],
          }));

          return {
            ...item,
            children: [...item.children, ...children],
          };
        }

        return item;
      });
    }
  }
});
