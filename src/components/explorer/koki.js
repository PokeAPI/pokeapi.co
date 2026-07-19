function kokiInit(jsonString, container, kokiTitle, openDetails) {
  if (kokiTitle === undefined) kokiTitle = "";
  if (openDetails === undefined) openDetails = true;

  var parsedData;
  try {
    parsedData = JSON.parse(jsonString);
  } catch (e) {
    container.innerHTML = '<p style="color:#f87171;padding:16px 20px">Invalid JSON</p>';
    return;
  }

  container.classList.add("arbol-root");
  container.innerHTML = "";

  if (kokiTitle) {
    var header = document.createElement("div");
    header.className = "koki-tree-header";
    header.style.cssText =
      "padding:10px 14px;font-size:0.85rem;font-weight:600;opacity:.7;border-bottom:1px solid var(--sl-color-gray-5,#353841)";
    header.textContent = kokiTitle;
    container.appendChild(header);
  }

  var ul = document.createElement("ul");
  ul.appendChild(kokiArbol(parsedData, "", false, openDetails, 0));
  container.appendChild(ul);
}

function kokiArbol(data, keyName, parentArr, openDetails, level) {
  if (keyName === undefined) keyName = "";
  if (parentArr === undefined) parentArr = false;
  if (openDetails === undefined) openDetails = true;
  if (level === undefined) level = 0;

  var fragment = document.createDocumentFragment();
  var li = document.createElement("li");
  fragment.appendChild(li);

  if (typeof data === "object" && data !== null) {
    var isArray = Array.isArray(data);
    var type = isArray ? "array" : "object";
    var length = isArray ? data.length : Object.keys(data).length;
    var entries = isArray ? data.entries() : Object.entries(data);

    var nodeOpen = (level === 0 && openDetails) || (openDetails && level < 2 && length < 17);

    li.className = "arbol-type-" + type;

    var sizeHtml =
      length === 0
        ? '<small style="opacity:.5">empty</small>'
        : "<small>" + length + " " + (isArray ? "items" : "keys") + "</small>";

    var labelHtml = level === 0 || parentArr ? "" : "<var>" + escNode(keyName) + "</var> ";

    var summaryHtml = labelHtml + "(" + type + ") " + sizeHtml;

    if (length >= 1) {
      var details = document.createElement("details");
      details.className = "arrobj";
      details.open = nodeOpen;

      var summary = document.createElement("summary");
      summary.innerHTML = summaryHtml;
      details.appendChild(summary);

      var ul = document.createElement("ul");
      var entry;
      for (entry of entries) {
        var key = entry[0];
        var value = entry[1];
        if (typeof value === "object" && value !== null) {
          ul.appendChild(kokiArbol(value, key, isArray, openDetails, level + 1));
        } else {
          var liEntry = document.createElement("li");
          var fmt = kokiGetType(value);
          liEntry.className = "arbol-type-" + fmt;
          liEntry.innerHTML =
            (isArray ? "" : "<var>" + escNode(key) + "</var> ") +
            '<code class="arbol-value ' +
            fmt +
            '">' +
            escNode(String(value)) +
            "</code>" +
            ' <small style="opacity:.4">(' +
            fmt +
            ")</small>";
          ul.appendChild(liEntry);
        }
      }
      details.appendChild(ul);
      li.appendChild(details);
    } else {
      li.innerHTML = summaryHtml;
    }
  } else {
    li.innerHTML = JSON.stringify(data);
  }

  return fragment;
}

function escNode(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function kokiGetType(value) {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  return typeof value;
}

window.kokiInit = kokiInit;
