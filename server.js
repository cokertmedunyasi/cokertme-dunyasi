const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const DATA_DIR = path.join(ROOT_DIR, "data");
const STATE_FILE = path.join(DATA_DIR, "state.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // API: Merkezi Durum Okuma & Kaydetme
  if (pathname === "/api/state") {
    if (req.method === "GET") {
      if (fs.existsSync(STATE_FILE)) {
        const content = fs.readFileSync(STATE_FILE, "utf8");
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        return res.end(content);
      } else {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        return res.end(JSON.stringify({}));
      }
    }

    if (req.method === "POST") {
      let body = "";
      req.on("data", chunk => { body += chunk; });
      req.on("end", () => {
        try {
          fs.writeFileSync(STATE_FILE, body, "utf8");
          res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
          res.end(JSON.stringify({ ok: true }));
        } catch (err) {
          res.writeHead(500, { "Content-Type": "application/json; charset=utf-8" });
          res.end(JSON.stringify({ ok: false, error: err.message }));
        }
      });
      return;
    }
  }

  // Statik Dosya Sunumu
  if (pathname === "/") pathname = "/index.html";
  if (pathname === "/menu") pathname = "/menu.html";
  if (pathname === "/uygulama") pathname = "/uygulama.html";
  if (pathname === "/yonetim") pathname = "/yonetim.html";

  const filePath = path.join(ROOT_DIR, pathname);
  if (!filePath.startsWith(ROOT_DIR)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(`<h2>Sayfa bulunamadı</h2><p><a href="/index.html">Ana Sayfaya Dön</a></p>`);
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
    res.end(data);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  const localIp = getLocalIp();
  console.log("==============================================================");
  console.log(" 🫒 ÇÖKERTME DÜNYASI DİJİTAL EKOSİSTEM SUNUCUSU AKTİF!");
  console.log("==============================================================");
  console.log(` 🌐 Kurumsal Web & Bayilik : http://localhost:${PORT}/index.html`);
  console.log(` 📱 Masadaki QR Menü       : http://localhost:${PORT}/menu.html`);
  console.log(` 🛍️ Mobil Uygulama (%10)   : http://localhost:${PORT}/uygulama.html`);
  console.log(` ⚙️ Yönetim & QR Baskı     : http://localhost:${PORT}/yonetim.html`);
  console.log(` 📲 Cep Telefonundan Test  : http://${localIp}:${PORT}/menu.html`);
  console.log("==============================================================");
});
