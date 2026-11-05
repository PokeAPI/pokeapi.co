(function () {
  "use strict";

  var content = document.querySelector(".sl-markdown-content");
  if (!content || !content.querySelector(".sl-openapi-section, sl-openapi-snippet-picker, .sl-openapi-keys")) return;

  var findWithin = function (root, selector) {
    var matches = Array.from(root.querySelectorAll(selector));
    if (root.matches(selector)) matches.unshift(root);
    return matches;
  };

  var themeOpenAPIBadges = function (root) {
    var types = findWithin(root, ".sl-openapi-type");
    var validTypes = ["integer", "string", "boolean", "object", "array"];

    types.forEach(function (el) {
      if (el.dataset.themed) return;
      el.dataset.themed = "true";
      var txt = el.textContent.trim().toLowerCase();
      var nullable = false;

      if (txt === "array<object>") {
        txt = "array";
      }

      if (txt.includes("null")) {
        txt = txt.split("|")[0].trim();
        nullable = true;
      }

      if (validTypes.includes(txt)) {
        el.innerHTML =
          '\n          <span class="type-badge type-badge--' +
          txt +
          '">\n            <span class="type-badge-icon type-badge-icon--' +
          txt +
          '"></span>\n            <span>' +
          txt +
          (nullable ? "?" : "") +
          "</span>\n          </span>\n        ";
        el.style.color = "inherit";
        el.style.fontWeight = "inherit";
        el.style.marginInlineEnd = "0";
      }
    });

    findWithin(root, "sl-openapi-snippet-picker").forEach(function (picker) {
      if (picker.dataset.customized) return;

      var select = picker.querySelector("select");
      if (!select) return;
      picker.dataset.customized = "true";

      var label = picker.querySelector("label");
      if (label) {
        label.style.display = "none";
      }

      var wrapper = document.createElement("div");
      wrapper.className = "custom-select-dropdown";

      var button = document.createElement("button");
      button.className = "custom-select-trigger";
      button.type = "button";

      var getSelectedText = function () {
        var activeOpt = select.options[select.selectedIndex];
        return activeOpt ? activeOpt.text : "Select Language";
      };

      button.innerHTML =
        '\n        <span class="trigger-label">' +
        getSelectedText() +
        '</span>\n        <svg class="trigger-caret" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>\n      ';

      var menu = document.createElement("div");
      menu.className = "custom-select-menu";

      var groups = select.querySelectorAll("optgroup");
      if (groups.length > 0) {
        groups.forEach(function (group) {
          var section = document.createElement("div");
          section.className = "custom-select-group";
          section.setAttribute("role", "group");
          section.setAttribute("aria-label", group.label);
          var groupTitle = document.createElement("div");
          groupTitle.className = "custom-select-group-title";
          groupTitle.textContent = group.label;
          section.appendChild(groupTitle);

          group.querySelectorAll("option").forEach(function (opt) {
            var item = document.createElement("button");
            item.className = "custom-select-item";
            item.type = "button";
            item.dataset.value = opt.value;
            item.textContent = opt.text;

            if (opt.selected) {
              item.classList.add("is-active");
            }

            item.addEventListener("click", function (e) {
              e.stopPropagation();
              select.value = opt.value;
              select.dispatchEvent(new Event("change", {bubbles: true}));

              wrapper.querySelectorAll(".custom-select-item").forEach(function (i) {
                i.classList.remove("is-active");
              });
              item.classList.add("is-active");
              button.querySelector(".trigger-label").textContent = opt.text;

              menu.classList.remove("is-open");
            });

            section.appendChild(item);
          });
          menu.appendChild(section);
        });
      } else {
        select.querySelectorAll("option").forEach(function (opt) {
          var item = document.createElement("button");
          item.className = "custom-select-item";
          item.type = "button";
          item.dataset.value = opt.value;
          item.textContent = opt.text;

          if (opt.selected) {
            item.classList.add("is-active");
          }

          item.addEventListener("click", function (e) {
            e.stopPropagation();
            select.value = opt.value;
            select.dispatchEvent(new Event("change", {bubbles: true}));

            wrapper.querySelectorAll(".custom-select-item").forEach(function (i) {
              i.classList.remove("is-active");
            });
            item.classList.add("is-active");
            button.querySelector(".trigger-label").textContent = opt.text;

            menu.classList.remove("is-open");
          });

          menu.appendChild(item);
        });
      }

      button.addEventListener("click", function (e) {
        e.stopPropagation();
        var isOpen = menu.classList.contains("is-open");
        document.querySelectorAll(".custom-select-menu").forEach(function (m) {
          m.classList.remove("is-open");
        });
        if (!isOpen) {
          menu.classList.add("is-open");
        }
      });

      document.addEventListener("click", function () {
        menu.classList.remove("is-open");
      });

      wrapper.appendChild(button);
      wrapper.appendChild(menu);
      picker.appendChild(wrapper);
    });

    findWithin(root, ".sl-openapi-keys").forEach(function (keysContainer) {
      if (keysContainer.closest(".sl-openapi-key-description")) return;
      if (keysContainer.querySelector(".sl-openapi-key-header")) return;

      var section = keysContainer.closest(".sl-openapi-section");
      var heading = section?.querySelector(":scope > .sl-heading-wrapper > .sl-openapi-heading");
      var isParameters = /^(Path|Query|Header|Cookie) Parameters$/.test(heading?.textContent.trim() || "");
      if (isParameters) keysContainer.classList.add("sl-openapi-parameter-keys");

      var header = document.createElement("div");
      header.className = "sl-openapi-key-header";
      header.innerHTML = isParameters
        ? '\n        <div class="sl-openapi-key-header-name">Field / Parameter</div>\n        <div class="sl-openapi-key-header-description"><span class="mobile-type-label">Type & </span>Description</div>\n        <div class="sl-openapi-key-header-type">Type</div>\n      '
        : '\n        <div class="sl-openapi-key-header-name">Field / Parameter</div>\n        <div class="sl-openapi-key-header-description">Type & Description</div>\n      ';
      keysContainer.prepend(header);
    });
  };

  themeOpenAPIBadges(content);
  var observer = new MutationObserver(function (records) {
    records.forEach(function (record) {
      record.addedNodes.forEach(function (node) {
        if (node instanceof Element) themeOpenAPIBadges(node);
      });
    });
  });
  observer.observe(content, {
    childList: true,
    subtree: true,
  });
})();
