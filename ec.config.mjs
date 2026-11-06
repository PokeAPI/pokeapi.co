import {pluginLineNumbers} from "@expressive-code/plugin-line-numbers";
import {applyEditorTheme, jsonNullTransformer} from "./src/utils/editor-theme.mjs";

/** @type {import('@astrojs/starlight/expressive-code').StarlightExpressiveCodeOptions} */
export default {
  customizeTheme: applyEditorTheme,
  minSyntaxHighlightingColorContrast: 4.5,
  shiki: {transformers: [jsonNullTransformer]},
  plugins: [
    pluginLineNumbers(),
    {
      name: "force-terminal-frames",
      hooks: {
        preprocessMetadata: ({codeBlock}) => {
          if (codeBlock.language === "json") {
            codeBlock.props.frame = "terminal";
          }
        },
      },
    },
  ],
  defaultProps: {
    showLineNumbers: true,
  },
  styleOverrides: {
    borderRadius: "0.625rem",
    frames: {
      tooltipSuccessBackground: "var(--sl-color-gray-6)",
      tooltipSuccessForeground: "var(--sl-color-gray-2)",
      copyIcon:
        'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNvcHktaWNvbiBsdWNpZGUtY29weSI+PHJlY3Qgd2lkdGg9IjE0IiBoZWlnaHQ9IjE0IiB4PSI4IiB5PSI4IiByeD0iMiIgcnk9IjIiLz48cGF0aCBkPSJNNCAxNmMtMS4xIDAtMi0uOS0yLTJWNGMwLTEuMS45LTIgMi0yaDEwYzEuMSAwIDIgLjkgMiAyIi8+PC9zdmc+")',
    },
  },
};
