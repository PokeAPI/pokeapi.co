import "@alenaksu/json-viewer";
import {EditorView, lineNumbers} from "@codemirror/view";
import {EditorState, Compartment} from "@codemirror/state";
import {json} from "@codemirror/lang-json";
import {foldGutter, syntaxHighlighting, bracketMatching, HighlightStyle} from "@codemirror/language";
import {tags as t} from "@lezer/highlight";

(function () {
  "use strict";

  const BASE_URL = "https://pokeapi.co/api/v2/";

  function isDarkTheme() {
    return document.documentElement.dataset.theme !== "light";
  }

  const themeCompartment = new Compartment();
  const highlightCompartment = new Compartment();

  const pokeTheme = EditorView.theme({
    "&": {
      color: "var(--sl-color-gray-1)",
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
      paddingRight: "2px",
      fontFamily: "var(--__sl-font-mono)",
      userSelect: "none",
    },
    ".cm-lineNumbers .cm-gutterElement": {
      padding: "0 8px 0 12px",
      minWidth: "32px",
      textAlign: "right",
      fontSize: "0.82rem",
    },
    ".cm-foldGutter .cm-gutterElement": {
      padding: "0 4px",
      cursor: "pointer",
      color: "var(--sl-color-gray-4)",
      transition: "color 0.15s ease",
      fontSize: "0.75rem",
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

  const pokeDarkHighlighting = HighlightStyle.define([
    {tag: t.propertyName, color: "#f59e0b"},
    {tag: t.string, color: "#86efac"},
    {tag: t.number, color: "#c084fc"},
    {tag: t.bool, color: "#60a5fa"},
    {tag: t.null, color: "#f87171"},
    {tag: t.punctuation, color: "var(--sl-color-gray-3)"},
    {tag: t.bracket, color: "var(--sl-color-gray-3)"},
  ]);

  const pokeLightHighlighting = HighlightStyle.define([
    {tag: t.propertyName, color: "#b45309"},
    {tag: t.string, color: "#15803d"},
    {tag: t.number, color: "#7c3aed"},
    {tag: t.bool, color: "#2563eb"},
    {tag: t.null, color: "#dc2626"},
    {tag: t.punctuation, color: "var(--sl-color-gray-3)"},
    {tag: t.bracket, color: "var(--sl-color-gray-3)"},
  ]);

  function getHighlightExtension() {
    return syntaxHighlighting(isDarkTheme() ? pokeDarkHighlighting : pokeLightHighlighting);
  }

  function initWidget(widget) {
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
    if (cmContainer) {
      cmEditor = new EditorView({
        state: EditorState.create({
          doc: currentJsonData ? JSON.stringify(currentJsonData, null, 2) : "{}",
          extensions: [
            lineNumbers(),
            foldGutter(),
            json(),
            bracketMatching(),
            highlightCompartment.of(getHighlightExtension()),
            pokeTheme,
            EditorState.readOnly.of(true),
            EditorView.editable.of(false),
          ],
        }),
        parent: cmContainer,
      });
    }

    if (jsonViewer && currentJsonData) {
      jsonViewer.data = currentJsonData;
    }

    function updateTheme() {
      if (cmEditor) {
        cmEditor.dispatch({
          effects: highlightCompartment.reconfigure(getHighlightExtension()),
        });
      }
    }

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {attributes: true, attributeFilter: ["data-theme"]});

    tabRaw?.addEventListener("click", () => {
      tabRaw.classList.add("active");
      tabRaw.setAttribute("aria-selected", "true");
      tabTree?.classList.remove("active");
      tabTree?.setAttribute("aria-selected", "false");
      if (panelRaw) panelRaw.style.display = "";
      if (panelTree) panelTree.style.display = "none";
    });

    tabTree?.addEventListener("click", () => {
      tabTree.classList.add("active");
      tabTree.setAttribute("aria-selected", "true");
      tabRaw?.classList.remove("active");
      tabRaw?.setAttribute("aria-selected", "false");
      if (panelTree) panelTree.style.display = "";
      if (panelRaw) panelRaw.style.display = "none";
    });

    function applyJsonData(parsed) {
      currentJsonData = parsed;
      if (cmEditor) {
        const text = JSON.stringify(parsed, null, 2);
        cmEditor.dispatch({
          changes: {from: 0, to: cmEditor.state.doc.length, insert: text},
        });
      }
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

      dropdownPanel.addEventListener("click", function (e) {
        const btn = e.target.closest(".dropdown-option");
        if (!btn) return;
        selectEndpoint(btn.dataset.value);
        closeDropdown();
      });

      dropdownPanel.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          closeDropdown();
          selectTrigger.focus();
        }
        if (e.key === "Enter") {
          const btn = e.target.closest(".dropdown-option");
          if (btn) {
            selectEndpoint(btn.dataset.value);
            closeDropdown();
          }
        }
      });

      document.addEventListener("click", function (e) {
        if (selectWrap && !selectWrap.contains(e.target)) closeDropdown();
      });

      window.addEventListener(
        "scroll",
        function () {
          if (selectWrap.classList.contains("open")) positionDropdown();
        },
        true
      );
      window.addEventListener("resize", function () {
        if (selectWrap.classList.contains("open")) positionDropdown();
      });
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
    const originalCopyHtml = copyBtn ? copyBtn.innerHTML : "";

    function sendRequest() {
      const url = getRequestUrl();
      if (directLink) {
        directLink.href = url;
        directLink.textContent = url;
      }

      if (sendBtn) {
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<span style="opacity:.6;font-size:1.1em">\u22EF</span>';
      }

      fetch(url)
        .then(function (res) {
          if (res.ok) {
            return res.json().then(function (data) {
              applyJsonData(data);
            });
          } else {
            applyJsonData({error: "HTTP " + res.status, url: url});
          }
        })
        .catch(function (err) {
          applyJsonData({error: String(err), url: url});
        })
        .finally(function () {
          if (sendBtn) {
            sendBtn.disabled = false;
            sendBtn.innerHTML = originalSendHtml;
          }
        });
    }

    function initCopy() {
      if (!copyBtn) return;
      copyBtn.addEventListener("click", function () {
        if (!currentJsonData) return;
        const text = JSON.stringify(currentJsonData, null, 2);
        navigator.clipboard
          .writeText(text)
          .then(function () {
            copyBtn.classList.add("copied");
            setTimeout(function () {
              copyBtn.classList.remove("copied");
              copyBtn.innerHTML = originalCopyHtml;
            }, 2000);
          })
          .catch(function (e) {
            console.warn("copy failed", e);
          });
      });
    }

    function initHints() {
      widget.querySelectorAll(".input-hints").forEach(function (link) {
        link.addEventListener("click", function (e) {
          e.preventDefault();
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
  }

  function main() {
    document.querySelectorAll(".api-explorer-widget").forEach(function (widget) {
      if (widget.dataset.explorerInitialized === "true") return;
      widget.dataset.explorerInitialized = "true";
      initWidget(widget);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", main);
  } else {
    main();
  }
  document.addEventListener("astro:after-swap", main);
})();
