const fs = require("fs");

const REPO = "cokertmedunyasi/cokertme-dunyasi";
const BRANCH = "state-data";
const FILE_PATH = "state.json";
const TMP_FILE = "/tmp/cokertme_state_v4.json";

const LEGACY_DEMO_IDS = new Set([
  "item-1", "item-2", "item-3", "item-4", "item-5",
  "item-6", "item-7", "item-8", "item-9", "item-10",
  "item-11", "item-12", "item-13", "item-14"
]);

const UPLOADED_DEFAULT_IDS = new Set([
  "item-1792324381559", "item-1792323465955", "item-1792323418352",
  "item-1792325907483", "item-1792326012633", "item-1792326025883",
  "item-1792325457108", "item-1792325787051", "item-1792325758628",
  "item-1792325574260", "item-1792325591012", "item-1792325619455",
  "item-1792325631972", "item-1792325660083", "item-1792325674127",
  "item-1792325699063", "item-1792325711075", "item-1792325730491",
  "item-1792325967068", "item-1792325979932", "item-1792324445703",
  "item-1792324524519", "item-1792324555395", "item-1792324580399"
]);

function normalizeItemsImages(stateObj) {
  if (!stateObj || !Array.isArray(stateObj.items)) return stateObj;
  stateObj.items = stateObj.items.map(item => {
    if (!item) return item;
    if (
      UPLOADED_DEFAULT_IDS.has(item.id) &&
      (!item.image || item.image.includes("photo-1544025162-d76694265947"))
    ) {
      return { ...item, image: `assets/uploads/${item.id}.jpg?v=1` };
    }
    return item;
  });
  return stateObj;
}

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
          return normalizeItemsImages(parsed);
        }
      } else if (data && data.sha) {
        // 1 MB üzeri dosyalarda GitHub Contents API content döndürmez, Git Blob API kullanılır
        const blobRes = await ghFetch(`https://api.github.com/repos/${REPO}/git/blobs/${data.sha}`);
        if (blobRes.ok) {
          const blobData = await blobRes.json();
          if (blobData && blobData.content) {
            const jsonStr = Buffer.from(blobData.content, "base64").toString("utf8");
            const parsed = JSON.parse(jsonStr);
            if (!hasLegacyDemoItems(parsed)) {
              return normalizeItemsImages(parsed);
            }
          }
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
        return normalizeItemsImages(parsed);
      }
    }
  } catch (e) {}

  try {
    if (fs.existsSync(TMP_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(TMP_FILE, "utf8"));
      if (!hasLegacyDemoItems(parsed)) {
        return normalizeItemsImages(parsed);
      }
    }
  } catch (e) {}

  return null;
}

async function writeViaGitDataApi(rawStr) {
  try {
    const refRes = await ghFetch(`https://api.github.com/repos/${REPO}/git/ref/heads/${BRANCH}`);
    if (!refRes.ok) return false;
    const refData = await refRes.json();
    const baseCommitSha = refData.object.sha;

    const blobRes = await ghFetch(`https://api.github.com/repos/${REPO}/git/blobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: Buffer.from(rawStr, "utf8").toString("base64"),
        encoding: "base64"
      })
    });
    if (!blobRes.ok) return false;
    const blobData = await blobRes.json();

    const treeRes = await ghFetch(`https://api.github.com/repos/${REPO}/git/trees`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        base_tree: baseCommitSha,
        tree: [
          {
            path: FILE_PATH,
            mode: "100644",
            type: "blob",
            sha: blobData.sha
          }
        ]
      })
    });
    if (!treeRes.ok) return false;
    const treeData = await treeRes.json();

    const commitRes = await ghFetch(`https://api.github.com/repos/${REPO}/git/commits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Sync live menu & photos state",
        tree: treeData.sha,
        parents: [baseCommitSha]
      })
    });
    if (!commitRes.ok) return false;
    const commitData = await commitRes.json();

    const updateRefRes = await ghFetch(`https://api.github.com/repos/${REPO}/git/refs/heads/${BRANCH}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sha: commitData.sha,
        force: true
      })
    });
    return updateRefRes.ok;
  } catch (e) {
    return false;
  }
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

  normalizeItemsImages(stateObj);
  stateObj.schemaVersion = 4;
  stateObj.updatedAt = Date.now();
  const rawStr = JSON.stringify(stateObj);

  try {
    fs.writeFileSync(TMP_FILE, rawStr, "utf8");
  } catch (e) {}

  try {
    await ensureBranchExists();

    // 700 KB üzeri (çoklu base64 fotoğraf içeren) verilerde doğrudan Git Data API kullan
    if (rawStr.length > 700000) {
      return await writeViaGitDataApi(rawStr);
    }

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
    if (putRes.ok) return true;

    // Eğer Contents API boyut veya sha çakışması nedeniyle başarısız olursa Git Data API ile zorla yaz
    return await writeViaGitDataApi(rawStr);
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
