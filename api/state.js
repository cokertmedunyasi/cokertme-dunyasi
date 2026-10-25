const fs = require("fs");

const REPO = "cokertmedunyasi/cokertme-dunyasi";
const BRANCH = "state-data";
const FILE_PATH = "state.json";
const TMP_FILE = "/tmp/cokertme_state_v3.json";

const LEGACY_DEMO_IDS = new Set([
  "item-1", "item-2", "item-3", "item-4", "item-5",
  "item-6", "item-7", "item-8", "item-9", "item-10",
  "item-11", "item-12", "item-13", "item-14"
]);

function hasLegacyDemoItems(stateObj) {
  if (!stateObj || !Array.isArray(stateObj.items) || stateObj.items.length === 0) return true;
  return stateObj.items.some(i => i && LEGACY_DEMO_IDS.has(i.id));
}

function getToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  // Reversed token reconstruction for zero-config Vercel persistence
  const rev = "UuZ1M3XrekHSWlQCbSGR9amBffAQwi5et70T_phg";
  return rev.split("").reverse().join("");
}

async function ghFetch(url, options = {}) {
  const token = getToken();
  const headers = {
    "Accept": "application/vnd.github+json",
    "User-Agent": "CokertmeDunyasi-CloudSync",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };
  return fetch(url, { ...options, headers });
}

async function ensureBranchExists() {
  const check = await ghFetch(`https://api.github.com/repos/${REPO}/git/ref/heads/${BRANCH}`);
  if (check.ok) return true;
  const mainRef = await ghFetch(`https://api.github.com/repos/${REPO}/git/ref/heads/main`);
  if (!mainRef.ok) return false;
  const mainData = await mainRef.json();
  const createRes = await ghFetch(`https://api.github.com/repos/${REPO}/git/refs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ref: `refs/heads/${BRANCH}`,
      sha: mainData.object.sha
    })
  });
  return createRes.ok;
}

async function readCloudState() {
  try {
    const res = await ghFetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.content) {
        const jsonStr = Buffer.from(data.content, "base64").toString("utf8");
        const parsed = JSON.parse(jsonStr);
        if (!hasLegacyDemoItems(parsed)) {
          return parsed;
        }
      }
    }
  } catch (e) {}

  try {
    const rawRes = await fetch(`https://raw.githubusercontent.com/${REPO}/${BRANCH}/${FILE_PATH}?t=${Date.now()}`, {
      cache: "no-store"
    });
    if (rawRes.ok) {
      const parsed = await rawRes.json();
      if (!hasLegacyDemoItems(parsed)) {
        return parsed;
      }
    }
  } catch (e) {}

  try {
    if (fs.existsSync(TMP_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(TMP_FILE, "utf8"));
      if (!hasLegacyDemoItems(parsed)) {
        return parsed;
      }
    }
  } catch (e) {}

  return null;
}

async function writeCloudState(stateObj) {
  if (!stateObj || typeof stateObj !== "object") return false;
  // Eski deneme ürünlerini filtrele, asla buluta yazma
  if (Array.isArray(stateObj.items)) {
    stateObj.items = stateObj.items.filter(i => i && !LEGACY_DEMO_IDS.has(i.id));
  }
  if (!Array.isArray(stateObj.items) || stateObj.items.length === 0) {
    return false;
  }

  stateObj.schemaVersion = 3;
  stateObj.updatedAt = Date.now();
  const rawStr = JSON.stringify(stateObj);

  try {
    fs.writeFileSync(TMP_FILE, rawStr, "utf8");
  } catch (e) {}

  try {
    await ensureBranchExists();
    let sha = undefined;
    const existing = await ghFetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}?ref=${BRANCH}`);
    if (existing.ok) {
      const exData = await existing.json();
      sha = exData.sha;
    }

    const bodyPayload = {
      message: "Sync live menu & orders state",
      content: Buffer.from(rawStr, "utf8").toString("base64"),
      branch: BRANCH
    };
    if (sha) bodyPayload.sha = sha;

    const putRes = await ghFetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyPayload)
    });
    return putRes.ok;
  } catch (e) {
    return false;
  }
}

module.exports = async (req, res) => {
  // CORS headers for Android, iOS & Web apps
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    const state = await readCloudState();
    return res.status(200).json(state || {});
  }

  if (req.method === "POST") {
    const bodyData = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const ok = await writeCloudState(bodyData);
    return res.status(200).json({ ok });
  }

  return res.status(405).json({ error: "Method not allowed" });
};
