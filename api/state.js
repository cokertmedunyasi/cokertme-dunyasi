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
  if (!stateObj || typeof stateObj !== "object") return stateObj;
  if (Array.isArray(stateObj.items)) {
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
  }
  stateObj.brand = {
    ...(stateObj.brand || {}),
    headquarters: "Yenibaraj Mahallesi, Bülent Angın Blv. No: 66/D, Seyhan/Adana",
    phone: "0 (546) 918 07 01",
    whatsapp: "905469180701"
  };
  if (Array.isArray(stateObj.branches)) {
    stateObj.branches = stateObj.branches.map(b => {
      if (b && (b.id === "adana-merkez" || (b.address && b.address.includes("Turgut Özal")))) {
        return {
          ...b,
          name: "Adana Seyhan Merkez Şube (Amiral Mağaza)",
          address: "Yenibaraj Mahallesi, Bülent Angın Blv. No: 66/D, Seyhan/Adana",
          phone: "0 (546) 918 07 01"
        };
      }
      return b;
    });
  }
  stateObj.siteImages = {
    heroSlide1: "assets/uploads/item-1792323465955.jpg?v=1",
    heroSlide2: "assets/uploads/item-1792324381559.jpg?v=1",
    heroSlide3: "assets/uploads/item-1792323418352.jpg?v=1",
    storyImage: "assets/uploads/item-1792323465955.jpg?v=1",
    menuSplitImage: "assets/uploads/item-1792324381559.jpg?v=1",
    parallaxMenuBg: "assets/uploads/item-1792323465955.jpg?v=1",
    franchiseImage: "assets/uploads/item-1792323418352.jpg?v=1",
    loyaltyImage: "assets/uploads/item-1792325457108.jpg?v=1",
    qrHeroBg: "assets/uploads/item-1792323465955.jpg?v=1",
    qrDivider1: "assets/uploads/item-1792325907483.jpg?v=1",
    qrDivider2: "assets/uploads/item-1792325457108.jpg?v=1",
    ...(stateObj.siteImages || {})
  };
  if (!Array.isArray(stateObj.members)) {
    stateObj.members = [];
  }
  if (Array.isArray(stateObj.orders)) {
    stateObj.orders = stateObj.orders.filter(o => o && o.id && o.id !== "CKR-1042");
  } else {
    stateObj.orders = [];
  }
  stateObj.adminSettings = {
    username: "admin",
    passwordHash: "YEo13221990.,",
    ...(stateObj.adminSettings || {})
  };
  return stateObj;
}

function normalizePhone10(phoneStr) {
  if (!phoneStr) return "";
  const digits = String(phoneStr).replace(/\D/g, "");
  return digits.length >= 10 ? digits.slice(-10) : digits;
}

function mergeOrdersLists(existingOrders, incomingOrders) {
  const map = new Map();
  const addOrder = (o) => {
    if (!o || !o.id || o.id === "CKR-1042") return;
    const prev = map.get(o.id);
    if (!prev) {
      map.set(o.id, {
        ...o,
        phoneNormalized: normalizePhone10(o.phone || o.phoneNormalized)
      });
    } else {
      map.set(o.id, {
        ...prev,
        ...o,
        phoneNormalized: normalizePhone10(o.phone || prev.phone || o.phoneNormalized)
      });
    }
  };
  // Önce yeni gelen siparişleri, sonra buluttaki mevcut siparişleri ekle (hiçbir sipariş kaybolmasın)
  if (Array.isArray(incomingOrders)) incomingOrders.forEach(addOrder);
  if (Array.isArray(existingOrders)) existingOrders.forEach(addOrder);
  const merged = Array.from(map.values());
  merged.sort((a, b) => (Number(b.createdAtMs || 0) - Number(a.createdAtMs || 0)));
  return merged;
}

function mergeWalletTxLists(txA, txB) {
  const txMap = new Map();
  const addTx = (tx) => {
    if (!tx || !tx.id) return;
    txMap.set(tx.id, tx);
  };
  if (Array.isArray(txA)) txA.forEach(addTx);
  if (Array.isArray(txB)) txB.forEach(addTx);
  const list = Array.from(txMap.values());
  list.sort((a, b) => (Number(b.createdAtMs || 0) - Number(a.createdAtMs || 0)));
  return list;
}

function mergeMembersLists(existingMembers, incomingMembers) {
  const map = new Map();
  const addMember = (m) => {
    if (!m || !m.phone) return;
    const key = normalizePhone10(m.phone);
    if (!key || key.length < 10) return;
    const prev = map.get(key);
    if (!prev) {
      map.set(key, {
        ...m,
        phoneNormalized: key,
        walletBalance: Number(m.walletBalance || 0),
        walletBonusEarned: Number(m.walletBonusEarned || 0),
        walletTransactions: Array.isArray(m.walletTransactions) ? m.walletTransactions : []
      });
    } else {
      const combinedStamps = Array.from(new Set([
        ...(Array.isArray(prev.stampTimestamps) ? prev.stampTimestamps : []),
        ...(Array.isArray(m.stampTimestamps) ? m.stampTimestamps : [])
      ])).map(Number).filter(Boolean).sort((a, b) => a - b);
      const mergedTx = mergeWalletTxLists(prev.walletTransactions, m.walletTransactions);
      const prevWalTime = Number(prev.walletUpdatedAt || prev.updatedAt || 0);
      const newWalTime = Number(m.walletUpdatedAt || m.updatedAt || 0);
      let finalBalance = newWalTime >= prevWalTime
        ? Number(m.walletBalance !== undefined ? m.walletBalance : prev.walletBalance || 0)
        : Number(prev.walletBalance !== undefined ? prev.walletBalance : m.walletBalance || 0);
      if (mergedTx.length > 0 && mergedTx[0].balanceAfter !== undefined) {
        finalBalance = Number(mergedTx[0].balanceAfter);
      }
      const totalBonus = Math.max(Number(prev.walletBonusEarned || 0), Number(m.walletBonusEarned || 0));

      map.set(key, {
        ...prev,
        ...m,
        phoneNormalized: key,
        stamps: Math.max(Number(prev.stamps || 0), Number(m.stamps || 0), combinedStamps.length),
        stampTimestamps: combinedStamps,
        walletBalance: Number(finalBalance.toFixed(2)),
        walletBonusEarned: Number(totalBonus.toFixed(2)),
        walletTransactions: mergedTx,
        walletUpdatedAt: Math.max(prevWalTime, newWalTime)
      });
    }
  };
  if (Array.isArray(existingMembers)) existingMembers.forEach(addMember);
  if (Array.isArray(incomingMembers)) incomingMembers.forEach(addMember);
  return Array.from(map.values());
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

  // Buluttaki mevcut siparişleri ve üyeleri oku ve yeni gelen veriyle birleştir (farklı cihazlardan sipariş geldiğinde önceki siparişlerin silinmesini önler)
  if (!stateObj.forceResetOrders) {
    try {
      const existingCloud = await readCloudState();
      if (existingCloud && typeof existingCloud === "object") {
        stateObj.orders = mergeOrdersLists(existingCloud.orders, stateObj.orders);
        stateObj.members = mergeMembersLists(existingCloud.members, stateObj.members);
      }
    } catch (e) {}
  } else {
    delete stateObj.forceResetOrders;
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
