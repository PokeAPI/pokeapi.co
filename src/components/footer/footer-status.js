(async () => {
  const API = "https://zlfyqp3hlvly.statuspage.io/api/v2/summary.json";
  const PROBE = "https://pokeapi.co/api/v2/";

  const shieldColor = (s) => {
    if (!s) return "lightgrey";
    if (s === "operational") return "brightgreen";
    if (s.includes("degraded") || s.includes("partial")) return "yellow";
    if (s.includes("major") || s.includes("outage")) return "critical";
    return "lightgrey";
  };

  const globalDotClass = (i) => {
    if (i === "none") return "dot-operational";
    if (i === "minor" || i === "major") return "dot-degraded";
    if (i === "critical") return "dot-outage";
    return "";
  };

  const latencyColor = (ms) => {
    if (ms < 80) return "brightgreen";
    if (ms < 200) return "green";
    if (ms < 500) return "yellow";
    return "red";
  };

  const measureLatency = async () => {
    try {
      await fetch(PROBE, {cache: "no-store", mode: "cors"});
      const t0 = performance.now();
      await fetch(PROBE, {cache: "no-store", mode: "cors"});
      return Math.round(performance.now() - t0);
    } catch (_) {
      return null;
    }
  };

  const renderLatency = async () => {
    const latencyImg = document.getElementById("footer-latency-img");
    if (!latencyImg) return;
    const ms = await measureLatency();
    if (ms === null) {
      latencyImg.src = "https://img.shields.io/badge/response%20time-unavailable-lightgrey?style=flat";
    } else {
      const color = latencyColor(ms);
      latencyImg.src = `https://img.shields.io/badge/response%20time-${ms}%20ms-${color}?style=flat`;
      const shieldLink = document.getElementById("footer-latency-shield");
      if (shieldLink) {
        shieldLink.title = `Live round-trip to pokeapi.co from your browser: ${ms} ms`;
      }
    }
  };

  const fetchStatus = async () => {
    const shieldsRow = document.getElementById("footer-shields-row");
    const globalDot = document.getElementById("footer-global-dot");
    if (!shieldsRow) return;

    try {
      const res = await fetch(API, {cache: "no-store"});
      if (!res.ok) throw new Error("fetch failed");
      const data = await res.json();

      if (globalDot && data.status) {
        const cls = globalDotClass(data.status.indicator);
        if (cls) {
          globalDot.classList.remove("dot-operational", "dot-degraded", "dot-outage");
          globalDot.classList.add(cls);
        }
      }

      const masterImg = shieldsRow.querySelector(".master-shield .shield-img");
      if (masterImg && data.status) {
        const color = shieldColor(data.status.indicator === "none" ? "operational" : data.status.indicator);
        masterImg.src = `https://img.shields.io/badge/dynamic/json?style=flat&color=${color}&label=status&query=%24.status.description&url=https%3A%2F%2Fzlfyqp3hlvly.statuspage.io%2Fapi%2Fv2%2Fsummary.json`;
      }
    } catch (_) {}
  };

  const initFooterStatus = async () => {
    await Promise.all([fetchStatus(), renderLatency()]);
  };

  await initFooterStatus();
  document.addEventListener("astro:after-swap", initFooterStatus);
})();
