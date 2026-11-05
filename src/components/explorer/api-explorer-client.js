import "@alenaksu/json-viewer";
import {getRandomHeroPokemon} from "../../utils/random-hero-pokemon.js";
import {EditorView, lineNumbers} from "@codemirror/view";
import {EditorState} from "@codemirror/state";
import {json} from "@codemirror/lang-json";
import {foldGutter, syntaxHighlighting, bracketMatching, HighlightStyle} from "@codemirror/language";
import {tags as t} from "@lezer/highlight";
import {editorHighlightColors as colors} from "../../utils/editor-theme.mjs";

(function () {
  "use strict";

  const BASE_URL = "https://pokeapi.co/api/v2/";

  const pokeTheme = EditorView.theme({
    "&": {
      color: "var(--poke-code-foreground)",
      backgroundColor: "transparent",
      fontFamily: "var(--__sl-font-mono)",
      fontSize: "0.82rem",
      lineHeight: "1.65",
      height: "100%",
    },
    ".cm-scroller": {
      overflow: "auto",
      fontFamily: "var(--__sl-font-mono)",
      height: "100%",
    },
    ".cm-content": {
      padding: "12px 16px",
      caretColor: "var(--sl-color-accent)",
    },
    ".cm-gutters": {
      backgroundColor: "var(--sl-color-gray-6)",
      color: "var(--sl-color-gray-4)",
      borderRight: "1.5px solid var(--sl-color-gray-5)",
      paddingRight: "4px",
      fontFamily: "var(--__sl-font-mono)",
      userSelect: "none",
    },
    ".cm-lineNumbers .cm-gutterElement": {
      padding: "0 6px 0 12px",
      minWidth: "28px",
      textAlign: "right",
      fontSize: "0.82rem",
    },
    ".cm-foldGutter .cm-gutterElement": {
      position: "relative",
      padding: "0 6px",
      cursor: "pointer",
      color: "var(--sl-color-gray-4)",
      transition: "color 0.15s ease",
      fontSize: "0.75rem",
    },
    ".cm-foldGutter .explorer-fold-marker": {
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "12px",
      height: "12px",
      transform: "translate(-50%, -50%)",
    },
    ".cm-foldGutter .cm-gutterElement:hover": {
      color: "var(--sl-color-white)",
    },
    ".cm-foldPlaceholder": {
      backgroundColor: "var(--sl-color-gray-5)",
      border: "none",
      color: "var(--sl-color-gray-2)",
      padding: "0 6px",
      borderRadius: "3px",
      margin: "0 2px",
      fontWeight: "500",
      fontSize: "0.75rem",
    },
    ".cm-activeLine": {
      backgroundColor: "rgba(255, 255, 255, 0.02)",
    },
    ".cm-selectionBackground, ::selection": {
      backgroundColor: "rgba(59, 130, 246, 0.3) !important",
    },
  });

  const pokeHighlighting = HighlightStyle.define([
    {tag: t.propertyName, color: colors.property},
    {tag: t.string, color: colors.string},
    {tag: t.number, color: colors.number},
    {tag: t.bool, color: colors.boolean},
    {tag: t.null, color: colors.null},
    {tag: t.punctuation, color: colors.muted},
    {tag: t.bracket, color: colors.muted},
  ]);

  function initWidget(widget) {
    if (widget.dataset.explorerInitialized === "true") return;
    widget.dataset.explorerInitialized = "true";
    const selectWrap = widget.querySelector(".explorer-select-wrap");
    const selectTrigger = widget.querySelector(".explorer-select-trigger");
    const selectLabel = widget.querySelector(".explorer-select-label");
    const dropdownPanel = widget.querySelector(".explorer-dropdown-panel");
    const paramInput = widget.querySelector(".explorer-param-input");
    const sendBtn = widget.querySelector(".explorer-send-btn");
    const directLink = widget.querySelector(".explorer-direct-link");
    const copyBtn = widget.querySelector(".explorer-copy-btn");
    const tabRaw = widget.querySelector(".tab-raw");
    const tabTree = widget.querySelector(".tab-tree");
    const panelRaw = widget.querySelector(".panel-raw");
    const panelTree = widget.querySelector(".panel-tree");
    const cmContainer = widget.querySelector(".explorer-codemirror-container");
    const jsonViewer = widget.querySelector(".explorer-json-viewer");

    let currentJsonData = null;
    let selectedEndpoint = widget.dataset.endpoint || "pokemon";

    const initialJsonEl = widget.nextElementSibling;
    if (initialJsonEl && initialJsonEl.classList.contains("explorer-initial-json")) {
      try {
        currentJsonData = JSON.parse(initialJsonEl.textContent);
      } catch (e) {
        console.warn("initial json parse error", e);
      }
    }

    let cmEditor = null;
    let rawVisible = !("IntersectionObserver" in window);
    let responseChanged = true;
    function renderRawResponse() {
      if (!cmContainer || !rawVisible) return;
      if (cmEditor) {
        if (responseChanged) {
          cmEditor.dispatch({
            changes: {from: 0, to: cmEditor.state.doc.length, insert: JSON.stringify(currentJsonData ?? {}, null, 2)},
          });
        }
        responseChanged = false;
        return;
      }
      cmEditor = new EditorView({
        state: EditorState.create({
          doc: currentJsonData ? JSON.stringify(currentJsonData, null, 2) : "{}",
          extensions: [
            lineNumbers(),
            foldGutter({
              markerDOM(open) {
                const marker = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                marker.classList.add("explorer-fold-marker");
                marker.setAttribute("viewBox", "0 0 12 12");
                marker.setAttribute("aria-label", open ? "Fold line" : "Unfold line");
                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                path.setAttribute("d", open ? "M3 4.5 6 7.5 9 4.5" : "M4.5 3 7.5 6 4.5 9");
                path.setAttribute("fill", "none");
                path.setAttribute("stroke", "currentColor");
                path.setAttribute("stroke-width", "1.25");
                marker.append(path);
                return marker;
              },
            }),
            json(),
            bracketMatching(),
            syntaxHighlighting(pokeHighlighting),
            pokeTheme,
            EditorState.readOnly.of(true),
            EditorView.editable.of(false),
          ],
        }),
        parent: cmContainer,
      });
      responseChanged = false;
    }

    if (cmContainer && "IntersectionObserver" in window) {
      const rawObserver = new IntersectionObserver(([entry]) => {
        rawVisible = entry.isIntersecting;
        if (rawVisible) renderRawResponse();
      });
      rawObserver.observe(cmContainer);
    } else {
      renderRawResponse();
    }

    if (jsonViewer && currentJsonData) {
      jsonViewer.data = currentJsonData;
    }

    const tabs = [
      [tabRaw, panelRaw],
      [tabTree, panelTree],
    ];
    tabs.forEach(([tab]) => {
      tab?.addEventListener("click", () => {
        tabs.forEach(([button, panel]) => {
          const active = button === tab;
          button?.classList.toggle("active", active);
          button?.setAttribute("aria-selected", String(active));
          if (panel) panel.style.display = active ? "" : "none";
        });
      });
    });

    function applyJsonData(parsed) {
      currentJsonData = parsed;
      responseChanged = true;
      renderRawResponse();
      if (jsonViewer) {
        jsonViewer.data = parsed;
      }
    }

    function initDropdown() {
      if (!selectWrap || !selectTrigger || !dropdownPanel) return;

      selectTrigger.addEventListener("click", function (e) {
        e.stopPropagation();
        const nowOpen = selectWrap.classList.toggle("open");
        selectTrigger.setAttribute("aria-expanded", String(nowOpen));
        if (nowOpen) {
          positionDropdown();
          const sel = dropdownPanel.querySelector(".dropdown-option.selected");
          if (sel) sel.focus();
        }
      });

      function selectOption(e) {
        const btn = e.target.closest(".dropdown-option");
        if (!btn) return;
        selectEndpoint(btn.dataset.value);
        closeDropdown();
      }

      dropdownPanel.addEventListener("click", selectOption);

      dropdownPanel.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          closeDropdown();
          selectTrigger.focus();
        }
        if (e.key === "Enter") selectOption(e);
      });

      document.addEventListener("click", function (e) {
        if (selectWrap && !selectWrap.contains(e.target)) closeDropdown();
      });

      function repositionDropdown() {
        if (selectWrap.classList.contains("open")) positionDropdown();
      }
      window.addEventListener("scroll", repositionDropdown, true);
      window.addEventListener("resize", repositionDropdown);
    }

    function positionDropdown() {
      if (!selectTrigger || !dropdownPanel) return;
      const rect = selectTrigger.getBoundingClientRect();
      dropdownPanel.style.top = rect.bottom + 6 + "px";
      dropdownPanel.style.left = rect.left + "px";
      dropdownPanel.style.minWidth = Math.max(rect.width, 240) + "px";
    }

    function closeDropdown() {
      if (!selectWrap) return;
      selectWrap.classList.remove("open");
      selectTrigger.setAttribute("aria-expanded", "false");
    }

    function selectEndpoint(value) {
      selectedEndpoint = value;
      if (selectLabel) selectLabel.textContent = value;
      dropdownPanel?.querySelectorAll(".dropdown-option").forEach(function (btn) {
        const sel = btn.dataset.value === value;
        btn.classList.toggle("selected", sel);
        btn.setAttribute("aria-selected", String(sel));
      });
    }

    function getRequestUrl() {
      const param = paramInput?.value.trim().replace(/&amp;/g, "&") || "";
      if (param.startsWith("?")) return BASE_URL + selectedEndpoint + param;
      if (param) return BASE_URL + selectedEndpoint + "/" + param;
      return BASE_URL + selectedEndpoint + "/";
    }

    const originalSendHtml = sendBtn ? sendBtn.innerHTML : "";
    let requestPending = false;

    async function sendRequest() {
      if (requestPending) return;
      requestPending = true;
      const url = getRequestUrl();
      if (directLink) {
        directLink.href = url;
        directLink.textContent = url;
      }

      if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<span style="opacity:.6;font-size:1.1em">\u22EF</span>';
      }

      try {
        const res = await fetch(url);
        applyJsonData(res.ok ? await res.json() : {error: "HTTP " + res.status, url});
      } catch (err) {
        applyJsonData({error: String(err), url});
      } finally {
        requestPending = false;
        if (sendBtn) {
          sendBtn.disabled = false;
          sendBtn.innerHTML = originalSendHtml;
        }
      }
    }

    function initCopy() {
      if (!copyBtn) return;
      const control = copyBtn.closest(".explorer-copy-control");
      const status = control?.querySelector(".explorer-copy-status");
      let resetTimer;
      copyBtn.addEventListener("click", async function () {
        if (!currentJsonData) return;
        const text = JSON.stringify(currentJsonData, null, 2);
        clearTimeout(resetTimer);
        try {
          await navigator.clipboard.writeText(text);
          copyBtn.classList.add("copied");
          if (status) status.textContent = "Copied!";
        } catch (e) {
          copyBtn.classList.remove("copied");
          if (status) status.textContent = "Could not copy";
          console.warn("copy failed", e);
        }
        control?.classList.add("copy-feedback");
        resetTimer = setTimeout(() => {
          copyBtn.classList.remove("copied");
          control?.classList.remove("copy-feedback");
          if (status) status.textContent = "Copy JSON";
        }, 2000);
      });
    }

    function initHints() {
      widget.querySelectorAll(".input-hints").forEach(function (link) {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          if (requestPending) return;
          if (link.dataset.endpoint) selectEndpoint(link.dataset.endpoint);
          if (link.dataset.param !== undefined && paramInput) paramInput.value = link.dataset.param;
          sendRequest();
        });
      });
    }

    initDropdown();
    initCopy();
    initHints();

    paramInput?.addEventListener("keypress", function (e) {
      if (e.key === "Enter") sendRequest();
    });
    sendBtn?.addEventListener("click", sendRequest);

    if (widget.dataset.randomPokemonMax) {
      const result = getRandomHeroPokemon(Number(widget.dataset.randomPokemonMax));
      if (!result) return;
      const id = String(result.id);
      selectEndpoint("pokemon");
      if (paramInput) paramInput.value = id;
      widget.dataset.param = id;
      sendRequest();
    }
  }

  const visibilityObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach(({target, isIntersecting}) => {
              if (!isIntersecting) return;
              visibilityObserver.unobserve(target);
              initWidget(target);
            });
          },
          {rootMargin: "400px"}
        )
      : null;

  function main() {
    document.querySelectorAll(".api-explorer-widget").forEach(function (widget) {
      if (widget.dataset.explorerInitialized === "true") return;
      if (visibilityObserver && !widget.dataset.randomPokemonMax) {
        const initialize = () => {
          visibilityObserver.unobserve(widget);
          initWidget(widget);
        };
        widget.addEventListener("click", initialize, {capture: true, once: true});
        widget.addEventListener("keydown", initialize, {capture: true, once: true});
        visibilityObserver.observe(widget);
      } else initWidget(widget);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    main();
  }
})();
