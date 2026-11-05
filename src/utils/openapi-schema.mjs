// Normalize legacy OpenAPI 3.0 nullability for our OpenAPI 3.1 document.
export function normalizeOpenAPINullability(document) {
  const seen = new WeakSet();

  function visitSchema(schema) {
    if (!schema || typeof schema !== "object" || seen.has(schema)) return;
    seen.add(schema);

    if (schema.nullable === true && schema.type) {
      const types = Array.isArray(schema.type) ? schema.type : [schema.type];
      schema.type = [...new Set([...types, "null"])];
      delete schema.nullable;
    }

    for (const key of ["properties", "patternProperties", "$defs", "dependentSchemas"]) {
      Object.values(schema[key] ?? {}).forEach(visitSchema);
    }
    for (const key of [
      "items",
      "additionalProperties",
      "unevaluatedProperties",
      "contains",
      "not",
      "if",
      "then",
      "else",
    ]) {
      visitSchema(schema[key]);
    }
    for (const key of ["allOf", "anyOf", "oneOf", "prefixItems"]) {
      (schema[key] ?? []).forEach(visitSchema);
    }
  }

  function visitDocument(value) {
    if (!value || typeof value !== "object") return;
    for (const [key, child] of Object.entries(value)) {
      if (key === "schema") visitSchema(child);
      else if (key === "schemas") Object.values(child ?? {}).forEach(visitSchema);
      else if (!["example", "examples", "default", "enum", "const"].includes(key)) visitDocument(child);
    }
  }

  visitDocument(document);
}
import {getExampleResponse} from "./api-examples.mjs";

// Supply complete response examples before Starlight tries to synthesize partial ones.
export async function injectOpenAPIExamples(schema, loadExample = getExampleResponse) {
  await Promise.all(
    Object.entries(schema.paths ?? {}).map(async ([path, item]) => {
      for (const parameter of [...(item.parameters ?? []), ...(item.get?.parameters ?? [])]) {
        if (parameter.in === "path") {
          parameter.example = parameter.schema?.type === "string" ? "1" : 1;
        }
      }

      const media = item.get?.responses?.["200"]?.content?.["application/json"];
      if (!media || media.example !== undefined || media.examples !== undefined) return;

      const hasParameters = /\{[^}]+\}/.test(path);
      const exampleUrl = new URL(path.replace(/\{[^}]+\}/g, "1"), "https://pokeapi.co");
      if (!hasParameters && path !== "/api/v2/meta/") exampleUrl.searchParams.set("limit", "2");
      media.example = await loadExample(exampleUrl.href);
    })
  );
}
