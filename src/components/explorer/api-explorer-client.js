(function () {
  "use strict";

  var BASE_URL = "https://pokeapi.co/api/v2/";

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function escStringVal(str) {
    return esc(str)
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t");
  }

  function renderRawCollapsible(data, level, commaHtml, key, state) {
    if (level === undefined) level = 0;
    if (commaHtml === undefined) commaHtml = "";
    if (state === undefined) state = {line: 0};
    var indent = "    ".repeat(level);
    var nextIndent = "    ".repeat(level + 1);

    if (data === null) {
      return '<span class="json-null">null</span>' + commaHtml;
    }
    if (typeof data === "boolean") {
      return '<span class="json-bool">' + data + "</span>" + commaHtml;
    }
    if (typeof data === "number") {
      return '<span class="json-number">' + data + "</span>" + commaHtml;
    }
    if (typeof data === "string") {
      return '<span class="json-string">"' + escStringVal(data) + '"</span>' + commaHtml;
    }

    if (typeof data === "object") {
      var isArray = Array.isArray(data);
      var keys = Object.keys(data);
      if (keys.length === 0) {
        var emptyStr = isArray ? "[]" : "{}";
        state.line++;
        var prefix = "";
        if (key) {
          prefix = '<span class="json-key">"' + escStringVal(key) + '"</span><span class="json-punct">:</span> ';
        }
        return (
          '<div class="raw-line" data-line="' +
          state.line +
          '">' +
          indent +
          prefix +
          '<span class="json-punct">' +
          emptyStr +
          "</span>" +
          commaHtml +
          "</div>"
        );
      }

      var openChar = isArray ? "[" : "{";
      var closeChar = isArray ? "]" : "}";

      var html = "";
      state.line++;
      html += '<details class="raw-fold" style="--indent-level: ' + level + ';" open>';

      var prefix = indent;
      if (key) {
        prefix += '<span class="json-key">"' + escStringVal(key) + '"</span><span class="json-punct">:</span> ';
      }

      var placeholder = isArray ? "\u2026]" : "\u2026}";
      html +=
        '<summary class="raw-fold-summary" data-line="' +
        state.line +
        '">' +
        prefix +
        '<span class="json-punct">' +
        openChar +
        "</span>" +
        '<span class="raw-fold-placeholder">' +
        placeholder +
        commaHtml +
        "</span>" +
        "</summary>";

      html += '<div class="raw-fold-content">';

      for (var i = 0; i < keys.length; i++) {
        var childKey = keys[i];
        var val = data[childKey];
        var isLast = i === keys.length - 1;
        var childComma = isLast ? "" : '<span class="json-punct">,</span>';

        if (typeof val === "object" && val !== null) {
          html += renderRawCollapsible(val, level + 1, childComma, isArray ? null : childKey, state);
        } else {
          state.line++;
          html += '<div class="raw-line" data-line="' + state.line + '">';
          html += nextIndent;
          if (!isArray) {
            html += '<span class="json-key">"' + escStringVal(childKey) + '"</span><span class="json-punct">:</span> ';
          }
          html += renderRawCollapsible(val, level + 1, childComma, undefined, state);
          html += "</div>";
        }
      }

      html += "</div>";
      state.line++;
      html +=
        '<div class="raw-line-end" data-line="' +
        state.line +
        '">' +
        indent +
        '<span class="json-punct">' +
        closeChar +
        "</span>" +
        commaHtml +
        "</div>";
      html += "</details>";
      return html;
    }
  }

  function isElementHidden(el, root) {
    var parent = el.parentElement;
    while (parent && parent !== root) {
      if (parent.tagName.toLowerCase() === "details" && !parent.open) {
        if (el.tagName.toLowerCase() === "summary" && el.parentElement === parent) {
        } else {
          return true;
        }
      }
      parent = parent.parentElement;
    }
    return false;
  }

  function initWidget(widget) {
    var selectWrap = widget.querySelector(".explorer-select-wrap");
    var selectTrigger = widget.querySelector(".explorer-select-trigger");
    var selectLabel = widget.querySelector(".explorer-select-label");
    var dropdownPanel = widget.querySelector(".explorer-dropdown-panel");
    var paramInput = widget.querySelector(".explorer-param-input");
    var sendBtn = widget.querySelector(".explorer-send-btn");
    var directLink = widget.querySelector(".explorer-direct-link");
    var tabRaw = widget.querySelector(".tab-raw");
    var tabTree = widget.querySelector(".tab-tree");
    var panelRaw = widget.querySelector(".panel-raw");
    var panelTree = widget.querySelector(".panel-tree");
    var copyBtn = widget.querySelector(".koki-copy-btn");
    var rawGutter = widget.querySelector(".koki-raw-gutter");
    var rawContent = widget.querySelector(".koki-raw-content");
    var treeGutter = widget.querySelector(".koki-tree-gutter");
    var treeInner = widget.querySelector(".koki-tree-inner");

    var currentJsonStr = null;
    var selectedEndpoint = widget.dataset.endpoint;

    function initDropdown() {
      if (!selectWrap || !selectTrigger || !dropdownPanel) return;

      selectTrigger.addEventListener("click", function (e) {
        e.stopPropagation();
        var nowOpen = selectWrap.classList.toggle("open");
        selectTrigger.setAttribute("aria-expanded", String(nowOpen));
        if (nowOpen) {
          positionDropdown();
          var sel = dropdownPanel.querySelector(".dropdown-option.selected");
          if (sel) sel.focus();
        }
      });

      dropdownPanel.addEventListener("click", function (e) {
        var btn = e.target.closest(".dropdown-option");
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
          var btn = e.target.closest(".dropdown-option");
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
      var rect = selectTrigger.getBoundingClientRect();
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
      dropdownPanel.querySelectorAll(".dropdown-option").forEach(function (btn) {
        var sel = btn.dataset.value === value;
        btn.classList.toggle("selected", sel);
        btn.setAttribute("aria-selected", String(sel));
      });
    }

    function getRequestUrl() {
      var param = paramInput.value.trim().replace(/&amp;/g, "&");
      if (param.startsWith("?")) return BASE_URL + selectedEndpoint + param;
      if (param) return BASE_URL + selectedEndpoint + "/" + param;
      return BASE_URL + selectedEndpoint + "/";
    }

    function renderRaw(jsonStr) {
      try {
        var parsed = JSON.parse(jsonStr);
        var state = {line: 0};
        rawContent.innerHTML = renderRawCollapsible(parsed, 0, "", null, state);
      } catch (e) {
        rawContent.innerHTML = esc(jsonStr);
      }
      updateRawGutter();
    }

    function updateRawGutter() {
      if (!rawGutter || !rawContent) return;
      var html = [];
      var elements = rawContent.querySelectorAll("[data-line]");
      if (elements.length === 0) {
        var text = rawContent.textContent || "";
        var lines = text.split("\n").length;
        for (var i = 0; i < lines; i++) {
          html.push('<span class="koki-line-number">' + (i + 1) + "</span>");
        }
      } else {
        for (var i = 0; i < elements.length; i++) {
          var el = elements[i];
          if (!isElementHidden(el, rawContent)) {
            var lineNum = el.getAttribute("data-line");
            html.push('<span class="koki-line-number">' + lineNum + "</span>");
          }
        }
      }
      if (html.length === 0) {
        html.push('<span class="koki-line-number">1</span>');
      }
      rawGutter.innerHTML = html.join("");
    }

    function renderTree(jsonStr) {
      if (typeof window.kokiInit !== "function") return;
      window.kokiInit(jsonStr, treeInner, "", true);
      assignTreeLineNumbers();
      updateTreeGutter();
    }

    function assignTreeLineNumbers() {
      if (!treeInner) return;
      var lineNum = 1;
      var elements = treeInner.querySelectorAll("summary, li");
      for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        var isSummary = el.tagName.toLowerCase() === "summary";
        var isLeafLi = el.tagName.toLowerCase() === "li" && !el.querySelector("details");
        if (isSummary || isLeafLi) {
          el.setAttribute("data-line", lineNum++);
        }
      }
    }

    function updateTreeGutter() {
      if (!treeGutter || !treeInner) return;
      var html = [];
      var elements = treeInner.querySelectorAll("summary, li");
      for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        var isSummary = el.tagName.toLowerCase() === "summary";
        var isLeafLi = el.tagName.toLowerCase() === "li" && !el.querySelector("details");
        if (isSummary || isLeafLi) {
          if (!isElementHidden(el, treeInner)) {
            var lineNum = el.getAttribute("data-line");
            if (lineNum) {
              html.push('<span class="koki-line-number">' + lineNum + "</span>");
            }
          }
        }
      }
      if (html.length === 0) {
        html.push('<span class="koki-line-number">1</span>');
      }
      treeGutter.innerHTML = html.join("");
    }

    function showTab(view) {
      var isRaw = view === "raw";
      tabRaw.classList.toggle("active", isRaw);
      tabTree.classList.toggle("active", !isRaw);
      tabRaw.setAttribute("aria-selected", String(isRaw));
      tabTree.setAttribute("aria-selected", String(!isRaw));
      panelRaw.style.display = isRaw ? "" : "none";
      panelTree.style.display = isRaw ? "none" : "";
      if (isRaw) {
        updateRawGutter();
      } else {
        updateTreeGutter();
      }
    }

    function applyJsonData(parsed) {
      currentJsonStr = JSON.stringify(parsed, null, 2);
      renderRaw(currentJsonStr);
      renderTree(currentJsonStr);
    }

    function sendRequest() {
      var url = getRequestUrl();
      directLink.href = url;
      directLink.textContent = url;

      sendBtn.disabled = true;
      sendBtn.innerHTML = '<span style="opacity:.6;font-size:1.1em">\u22EF</span>';

      rawContent.innerHTML =
        '<span style="color:var(--sl-color-gray-3);padding:32px;display:block;text-align:center">Loading\u2026</span>';
      rawGutter.innerHTML = "";
      treeInner.innerHTML = '<div class="koki-state-msg">Loading\u2026</div>';

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
          sendBtn.disabled = false;
          sendBtn.innerHTML =
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>Send';
        });
    }

    function initCopy() {
      if (!copyBtn) return;
      copyBtn.addEventListener("click", function () {
        if (!currentJsonStr) return;
        navigator.clipboard
          .writeText(currentJsonStr)
          .then(function () {
            copyBtn.classList.add("copied");
            copyBtn.innerHTML =
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
            setTimeout(function () {
              copyBtn.classList.remove("copied");
              copyBtn.innerHTML =
                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>';
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
          if (link.dataset.param !== undefined) paramInput.value = link.dataset.param;
          sendRequest();
        });
      });
    }

    initDropdown();
    initCopy();
    initHints();

    tabRaw.addEventListener("click", function () {
      showTab("raw");
    });
    tabTree.addEventListener("click", function () {
      showTab("tree");
    });
    paramInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") sendRequest();
    });
    sendBtn.addEventListener("click", sendRequest);

    var initialJsonEl = widget.nextElementSibling;
    if (initialJsonEl && initialJsonEl.classList.contains("koki-initial-json")) {
      try {
        applyJsonData(JSON.parse(initialJsonEl.textContent));
      } catch (e) {
        console.warn("initial json parse error", e);
      }
    }

    widget.addEventListener(
      "toggle",
      function (e) {
        if (rawContent && rawContent.contains(e.target)) {
          setTimeout(updateRawGutter, 15);
        }
        if (treeInner && treeInner.contains(e.target)) {
          setTimeout(updateTreeGutter, 15);
        }
      },
      true
    );
  }

  function main() {
    document.querySelectorAll(".koki-api-explorer-widget").forEach(function (widget) {
      if (widget.dataset.kokiInitialized === "true") return;
      widget.dataset.kokiInitialized = "true";
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
