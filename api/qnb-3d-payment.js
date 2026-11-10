/**
 * Çökertme Dünyası — Doğrudan QNB Finansbank Sanal POS (PayFor 3D Secure) Entegrasyon Motoru
 *
 * QNB Finansbank PayFor Standartları:
 * - Kurum Kodu (MbrId): "5" (QNB Finansbank)
 * - Para Birimi (Currency): "949" (TRY - Türk Lirası)
 * - İşlem Tipi (TxnType): "Auth" (Satış / Provizyon)
 * - Güvenlik Tipi (SecureType): "3DHost" (Ortak Ödeme Sayfası) veya "3DPay"
 * - Hash Algoritması: Base64( SHA1( MbrId + OrderId + PurchAmount + OkUrl + FailUrl + TxnType + InstallmentCount + Rnd + MerchantPass ) )
 *
 * Güvenlik:
 * MerchantPass (3D StoreKey) ve UserPass yalnızca Vercel Environment Variables
 * (QNB_MERCHANT_ID, QNB_USER_CODE, QNB_USER_PASS, QNB_MERCHANT_PASS) veya sunucu
 * tarafı yapılandırmasından okunur; tarayıcıya ASLA açık gönderilmez.
 */

const crypto = require("crypto");

const QNB_LIVE_3D_HOST_URL = "https://vpos.qnbfinansbank.com/Gateway/3DHost.aspx";
const QNB_LIVE_3D_PAY_URL = "https://vpos.qnbfinansbank.com/Gateway/Default.aspx";
const QNB_TEST_3D_HOST_URL = "https://vpostest.qnbfinansbank.com/Gateway/3DHost.aspx";
const QNB_TEST_3D_PAY_URL = "https://vpostest.qnbfinansbank.com/Gateway/Default.aspx";

function computeQnbPayForRequestHash({ mbrId, orderId, purchAmount, okUrl, failUrl, txnType, installmentCount, rnd, merchantPass }) {
  const plain = `${mbrId}${orderId}${purchAmount}${okUrl}${failUrl}${txnType}${installmentCount}${rnd}${merchantPass}`;
  return crypto.createHash("sha1").update(plain, "utf8").digest("base64");
}

function getServerQnbConfig(serverState) {
  const adminQnb = (serverState && serverState.integrationSettings && serverState.integrationSettings.qnbPos) || {};
  const merchantId = process.env.QNB_MERCHANT_ID || adminQnb.merchantId || "";
  const userCode = process.env.QNB_USER_CODE || adminQnb.userCode || adminQnb.apiUser || "";
  const userPass = process.env.QNB_USER_PASS || adminQnb.userPass || adminQnb.apiPass || "";
  const merchantPass = process.env.QNB_MERCHANT_PASS || adminQnb.merchantPass || "";
  const isTestMode = process.env.QNB_TEST_MODE
    ? process.env.QNB_TEST_MODE === "true"
    : (adminQnb.testMode !== false);
  const secureType = adminQnb.secureType || "3DPay";
  const liveEnabled = Boolean(merchantId && merchantPass && adminQnb.enabled !== false);

  return {
    merchantId: String(merchantId).trim(),
    userCode: String(userCode).trim(),
    userPass: String(userPass).trim(),
    merchantPass: String(merchantPass).trim(),
    isTestMode,
    secureType,
    liveEnabled
  };
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch (e) {
        // Bankadan gelen application/x-www-form-urlencoded yanıtı ayrıştır
        const params = new URLSearchParams(body);
        body = Object.fromEntries(params.entries());
      }
    }

    // 1. QNB FİNANSBANK 3D CALLBACK DÖNÜŞÜ (Banka POST dönüşü)
    if (body && (body.ProcReturnCode !== undefined || body["3DStatus"] !== undefined)) {
      const status3D = String(body["3DStatus"] || "");
      const procCode = String(body.ProcReturnCode || "");
      const orderId = String(body.OrderId || "");
      const authCode = String(body.AuthCode || "");
      const errMsg = String(body.ErrMsg || "Banka 3D doğrulaması tamamlanamadı.");

      const proto = req.headers["x-forwarded-proto"] || "https";
      const host = req.headers.host || "onlinesiparis.cokertmedunyasi.com";
      const baseOrigin = `${proto}://${host}`;
      let cbPurpose = "ORDER";
      try {
        const uObj = new URL(req.url, "http://localhost");
        cbPurpose = uObj.searchParams.get("purpose") || "ORDER";
      } catch (e) {}

      if (status3D === "1" && procCode === "00") {
        const redirectSuccess = `${baseOrigin}/uygulama?qnb3d=success&purpose=${encodeURIComponent(cbPurpose)}&orderId=${encodeURIComponent(orderId)}&authCode=${encodeURIComponent(authCode)}`;
        res.writeHead(302, { Location: redirectSuccess });
        return res.end();
      } else {
        const redirectFail = `${baseOrigin}/uygulama?qnb3d=fail&purpose=${encodeURIComponent(cbPurpose)}&orderId=${encodeURIComponent(orderId)}&reason=${encodeURIComponent(errMsg)}`;
        res.writeHead(302, { Location: redirectFail });
        return res.end();
      }
    }

    // 2. UYGULAMADAN 3D SECURE OTURUM BAŞLATMA İSTEĞİ (INIT_3D)
    const {
      orderId,
      amount,
      purpose = "ORDER" // "ORDER" veya "WALLET_TOPUP"
    } = body || {};

    const numericAmount = Number(amount);
    if (!orderId || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ ok: false, error: "Geçersiz sipariş numarası veya tutar." });
    }

    // Sunucu durumundan QNB ayarlarını güvenli oku
    let serverState = null;
    try {
      const stateModule = require("./state");
      if (stateModule && typeof stateModule._readCloudStateInternal === "function") {
        serverState = await stateModule._readCloudStateInternal();
      }
    } catch (e) {}

    const qnb = getServerQnbConfig(serverState);

    if (!qnb.liveEnabled) {
      return res.status(200).json({
        ok: true,
        liveReady: false,
        mode: "SANDBOX_SIMULATION",
        message: "QNB Finansbank Sanal POS henüz Test/Simülasyon modundadır. Yönetim Paneli > Entegrasyonlar bölümünden Üye İşyeri No (MerchantId) ve 3D İşyeri Anahtarı (MerchantPass) girildiğinde gerçek banka tahsilatına geçer."
      });
    }

    const mbrId = "5"; // QNB Finansbank Kurum Kodu
    const txnType = "Auth";
    const installmentCount = "0";
    const currency = "949"; // TRY
    const purchAmount = numericAmount.toFixed(2);
    const rnd = `${Date.now()}${Math.floor(1000 + Math.random() * 9000)}`;

    const proto = req.headers["x-forwarded-proto"] || "https";
    const host = req.headers.host || "onlinesiparis.cokertmedunyasi.com";
    const callbackUrl = `${proto}://${host}/api/qnb-3d-payment?purpose=${encodeURIComponent(purpose)}`;

    const hash = computeQnbPayForRequestHash({
      mbrId,
      orderId: String(orderId),
      purchAmount,
      okUrl: callbackUrl,
      failUrl: callbackUrl,
      txnType,
      installmentCount,
      rnd,
      merchantPass: qnb.merchantPass
    });

    const gatewayUrl = qnb.secureType === "3DHost"
      ? (qnb.isTestMode ? QNB_TEST_3D_HOST_URL : QNB_LIVE_3D_HOST_URL)
      : (qnb.isTestMode ? QNB_TEST_3D_PAY_URL : QNB_LIVE_3D_PAY_URL);

    return res.status(200).json({
      ok: true,
      liveReady: true,
      mode: qnb.isTestMode ? "QNB_PAYFOR_TEST_GATEWAY" : "QNB_PAYFOR_LIVE_GATEWAY",
      secureType: qnb.secureType,
      gatewayUrl,
      formFields: {
        MbrId: mbrId,
        MerchantID: qnb.merchantId,
        UserCode: qnb.userCode,
        UserPass: qnb.userPass,
        OrderId: String(orderId),
        SecureType: qnb.secureType,
        TxnType: txnType,
        PurchAmount: purchAmount,
        Currency: currency,
        InstallmentCount: installmentCount,
        OkUrl: callbackUrl,
        FailUrl: callbackUrl,
        Rnd: rnd,
        Lang: "TR",
        Hash: hash
      }
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err.message || "QNB 3D başlatma hatası"
    });
  }
};
