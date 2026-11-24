import {getExampleResponse} from "./api-examples.mjs";

// Supply complete response examples before Starlight tries to synthesize partial ones.
export async function injectOpenAPIExamples(schema, loadExample = getExampleResponse) {
  await Promise.all(
    Object.entries(schema.paths ?? {}).map(async ([path, item]) => {
      const media = item.get?.responses?.["200"]?.content?.["application/json"];
      if (!media || media.example !== undefined || media.examples !== undefined) return;

      const hasParameters = /\{[^}]+\}/.test(path);
      const exampleUrl = new URL(path.replace(/\{[^}]+\}/g, "1"), "https://pokeapi.co");
      if (!hasParameters && path !== "/api/v2/meta/") exampleUrl.searchParams.set("limit", "2");
      media.example = await loadExample(exampleUrl.href);
    })
  );
}
