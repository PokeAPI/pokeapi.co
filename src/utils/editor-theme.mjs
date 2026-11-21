// One palette for Expressive Code, CodeMirror, and the JSON tree viewer.
export const editorPalettes = {
  dark: {
    background: "#151b26",
    foreground: "#e5eaf3",
    muted: "#a3afc2",
    border: "#354257",
    property: "#f7d154",
    string: "#93d9a3",
    number: "#d6adf5",
    boolean: "#8ac8ff",
    null: "#ff9a9e",
  },
  light: {
    background: "#f8fafc",
    foreground: "#243247",
    muted: "#59677c",
    border: "#d8e0eb",
    property: "#a15c00",
    string: "#007544",
    number: "#9333d4",
    boolean: "#145fe0",
    null: "#d02040",
  },
};

export const editorThemeCss = Object.entries(editorPalettes)
  .map(
    ([mode, palette]) =>
      `${mode === "dark" ? ":root" : ':root[data-theme="light"]'}{${Object.entries(palette)
        .map(([key, value]) => `--poke-code-${key}:${value};`)
        .join("")}}`
  )
  .join("\n");

export const editorHighlightColors = Object.fromEntries(
  ["property", "string", "number", "boolean", "null", "muted"].map((key) => [key, `var(--poke-code-${key})`])
);

// Extend the full Starlight themes; only JSON syntax uses the shared palette.
export function applyEditorTheme(theme) {
  const palette = editorPalettes[theme.type];
  if (!palette) return theme;
  theme.settings.push(
    {scope: ["source.json punctuation"], settings: {foreground: palette.muted}},
    {scope: ["source.json string.quoted.double.json"], settings: {foreground: palette.string}},
    {scope: ["source.json constant.numeric.json"], settings: {foreground: palette.number}},
    {scope: ["source.json constant.language.json"], settings: {foreground: palette.boolean}},
    {
      scope: ["support.type.property-name.json", "string.json support.type.property-name"],
      settings: {foreground: palette.property},
    },
    {scope: ["source.json constant.language.null"], settings: {foreground: palette.null}}
  );
  return theme;
}

// Shiki's JSON grammar gives booleans and null the same scope.
export const jsonNullTransformer = {
  name: "pokemon-json-null",
  tokens(lines) {
    if (this.options.lang !== "json") return;
    for (const token of lines.flat()) {
      if (token.content !== "null") continue;
      const palette = Object.values(editorPalettes).find(
        (palette) => palette.boolean.toLowerCase() === token.color?.toLowerCase()
      );
      if (palette) token.color = palette.null;
    }
  },
};
