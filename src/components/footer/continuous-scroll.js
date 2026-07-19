(function () {
  const pageCache = new Map();
  let isTransitioning = false;
  let scrollCooldown = false;
  let lastPathname = window.location.pathname;

  const currentPath = window.location.pathname;
  const currentMain = document.querySelector("main");
  const currentToc = document.querySelector("starlight-toc");
  if (currentMain) {
    pageCache.set(currentPath, {
      htmlText: document.documentElement.outerHTML,
      mainElement: currentMain.cloneNode(true),
      tocElement: currentToc ? currentToc.cloneNode(true) : null,
      title: document.title,
    });
  }

  async function prefetch(url) {
    if (pageCache.has(url)) return;
    try {
      const response = await fetch(url);
      if (!response.ok) return;
      const htmlText = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, "text/html");
      const mainElement = doc.querySelector("main");
      const tocElement = doc.querySelector("starlight-toc");
      const title = doc.title;

      if (mainElement) {
        const stylesheets = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'))
          .map((el) => el.getAttribute("href"))
          .filter(Boolean);
        const inlineStyles = Array.from(doc.querySelectorAll("head style"))
          .map((el) => el.textContent)
          .filter(Boolean);
        pageCache.set(url, {
          htmlText,
          mainElement,
          tocElement,
          title,
          stylesheets,
          inlineStyles,
        });
      }
    } catch (e) {
      console.warn("Failed to pre-fetch page:", url, e);
    }
  }

  function syncStyles(pageData) {
    if (!pageData) return;

    if (pageData.stylesheets) {
      const currentStylesheets = new Set(
        Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
          .map((el) => el.getAttribute("href"))
          .filter(Boolean)
      );

      pageData.stylesheets.forEach((href) => {
        if (!currentStylesheets.has(href)) {
          const newLink = document.createElement("link");
          newLink.rel = "stylesheet";
          newLink.href = href;
          document.head.appendChild(newLink);
        }
      });
    }

    if (pageData.inlineStyles) {
      const currentInlineStyles = new Set(
        Array.from(document.querySelectorAll("head style")).map((el) => el.textContent)
      );

      pageData.inlineStyles.forEach((content) => {
        if (!currentInlineStyles.has(content)) {
          const newStyle = document.createElement("style");
          newStyle.textContent = content;
          document.head.appendChild(newStyle);
        }
      });
    }
  }

  async function transitionToPage(url, pushState = true) {
    if (isTransitioning) return;
    isTransitioning = true;

    let pageData = pageCache.get(url);
    if (!pageData) {
      await prefetch(url);
      pageData = pageCache.get(url);
    }

    if (!pageData || !pageData.mainElement) {
      window.location.href = url;
      return;
    }

    const currentMainEl = document.querySelector("main");
    if (!currentMainEl) {
      window.location.href = url;
      return;
    }

    currentMainEl.classList.add("page-transition-fade");
    await new Promise((resolve) => setTimeout(resolve, 200));

    syncStyles(pageData);

    currentMainEl.innerHTML = pageData.mainElement.innerHTML;
    for (const attr of pageData.mainElement.attributes) {
      currentMainEl.setAttribute(attr.name, attr.value);
    }

    window.scrollTo({top: 0, behavior: "instant"});
    document.title = pageData.title;

    if (pushState) {
      history.pushState(null, "", url);
      lastPathname = window.location.pathname;
    }

    syncSidebar(url);
    syncToc(url);
    reinitializeScripts(currentMainEl);

    document.dispatchEvent(new Event("astro:after-swap"));

    currentMainEl.classList.remove("page-transition-fade");
    isTransitioning = false;

    scrollCooldown = true;
    setTimeout(() => {
      scrollCooldown = false;
    }, 1200);

    prefetchNextPrev();
  }

  function syncSidebar(url) {
    document.querySelectorAll('.sidebar-content a[aria-current="page"]').forEach((el) => {
      el.removeAttribute("aria-current");
    });
    const newActive = document.querySelector(`.sidebar-content a[href="${url}"], .sidebar-content a[href="${url}/"]`);
    if (newActive) {
      newActive.setAttribute("aria-current", "page");
      newActive.scrollIntoView({block: "nearest", behavior: "smooth"});
    }
  }

  function syncToc(url) {
    const pageData = pageCache.get(url);
    if (pageData && pageData.tocElement) {
      const currentTocEl = document.querySelector("starlight-toc");
      if (currentTocEl) {
        currentTocEl.replaceWith(pageData.tocElement.cloneNode(true));
      }
    }
  }

  function reinitializeScripts(container) {
    container.querySelectorAll("script").forEach((oldScript) => {
      const newScript = document.createElement("script");
      for (const attr of oldScript.attributes) {
        newScript.setAttribute(attr.name, attr.value);
      }
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

  function prefetchNextPrev() {
    const nextLink = document.querySelector('main .pagination-links a[rel="next"]');
    const prevLink = document.querySelector('main .pagination-links a[rel="prev"]');
    if (nextLink) prefetch(nextLink.getAttribute("href"));
    if (prevLink) prefetch(prevLink.getAttribute("href"));
  }

  function handleScroll() {
    if (isTransitioning || scrollCooldown) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const isScrollable = scrollHeight > clientHeight + 150;
    if (!isScrollable) return;

    const reachedBottom = scrollTop + clientHeight >= scrollHeight - 8;
    if (reachedBottom) {
      const nextLink = document.querySelector('main .pagination-links a[rel="next"]');
      if (nextLink) {
        const nextUrl = nextLink.getAttribute("href");
        transitionToPage(nextUrl);
      }
    }
  }

  let scrollTimeout;
  window.addEventListener(
    "scroll",
    () => {
      if (scrollTimeout) return;
      scrollTimeout = setTimeout(() => {
        scrollTimeout = null;
        handleScroll();
      }, 100);
    },
    {passive: true}
  );

  window.addEventListener("popstate", () => {
    const newPathname = window.location.pathname;
    if (newPathname === lastPathname) {
      return;
    }
    lastPathname = newPathname;
    transitionToPage(newPathname, false);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", prefetchNextPrev);
  } else {
    prefetchNextPrev();
  }
})();
