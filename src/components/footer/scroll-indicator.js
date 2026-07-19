(() => {
  const updateScrollIndicator = () => {
    const nextLink = document.querySelector('main .pagination-links a[rel="next"]');
    const indicator = document.getElementById("scroll-next-indicator");
    if (!indicator) return;

    if (nextLink) {
      const titleSpan = nextLink.querySelector(".link-title");
      const nextTitle = titleSpan ? titleSpan.textContent.trim() : nextLink.textContent.trim().replace(/^Next\s*/i, "");
      const textEl = indicator.querySelector(".scroll-indicator-text");
      if (textEl) {
        textEl.innerHTML = `Keep scrolling to read <strong>${nextTitle}</strong>`;
      }
      indicator.style.display = "flex";
    } else {
      indicator.style.display = "none";
    }
  };

  updateScrollIndicator();
  document.addEventListener("astro:after-swap", updateScrollIndicator);
})();
