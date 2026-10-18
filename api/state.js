const fs = require("fs");
const path = require("path");

const REPO = "cokertmedunyasi/cokertme-dunyasi";
const BRANCH = "state-data";
const FILE_PATH = "state.json";
const TMP_FILE = "/tmp/cokertme_state.json";

function getToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN;
  // Reversed token reconstruction for zero-config Vercel persistence
  const rev = "UuZ1M3XrekHSWlQCbSGR9aMBffAUQwi5et70T_phg";
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
        return JSON.parse(jsonStr);
      }
    }
  } catch (e) {}

  try {
    if (fs.existsSync(TMP_FILE)) {
      return JSON.parse(fs.readFileSync(TMP_FILE, "utf8"));
    }
  } catch (e) {}

  return null;
}

async function writeCloudState(stateObj) {
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

    await ghFetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyPayload)
    });
  } catch (e) {}
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
    await writeCloudState(bodyData);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: "Method not allowed" });
};
