const requests = new Map();
const waiting = [];
let active = 0;

// Keep examples representative without embedding entire resource collections.
export function trimExample(value, key = "") {
  if (Array.isArray(value)) {
    const english = value.filter((entry) => entry?.language?.name === "en");
    return (english.length ? english : value).slice(0, 2).map((entry) => trimExample(entry));
  }
  if (value && typeof value === "object") {
    let entries = Object.entries(value);
    if (
      key === "other" ||
      key === "versions" ||
      key.startsWith("generation-") ||
      (key === "sprites" && entries.some(([name]) => name.startsWith("generation-")))
    ) {
      entries = entries.slice(0, 2);
    }
    return Object.fromEntries(entries.map(([name, entry]) => [name, trimExample(entry, name)]));
  }
  return value;
}

async function loadExample(url) {
  if (active >= 4) await new Promise((resolve) => waiting.push(resolve));
  else active++;
  try {
    const response = await fetch(url, {
      headers: {"User-Agent": "pokeapi.co documentation build"},
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`Cannot load API example ${url}: HTTP ${response.status}`);
    return trimExample(await response.json());
  } finally {
    const next = waiting.shift();
    if (next) next();
    else active--;
  }
}

export function getExampleResponse(url) {
  if (!requests.has(url)) {
    const request = loadExample(url).catch((error) => {
      requests.delete(url);
      throw error;
    });
    requests.set(url, request);
  }
  return requests.get(url);
}
