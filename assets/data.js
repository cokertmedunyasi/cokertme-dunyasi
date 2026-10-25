/**
 * ÇÖKERTME DÜNYASI - Merkezi Veri ve Durum Yönetimi
 * Hem bulut sunucu (/api/state) hem de tarayıcı (localStorage) ile çift yönlü senkronize çalışır.
 * Tüm telefonlarda, tarayıcılarda ve cihazlarda aynı güncel menüyü garanti eder.
 */

const LEGACY_DEMO_ITEM_IDS = new Set([
  "item-1", "item-2", "item-3", "item-4", "item-5",
  "item-6", "item-7", "item-8", "item-9", "item-10",
  "item-11", "item-12", "item-13", "item-14"
]);

const DEFAULT_COKERTME_DATA = {
  schemaVersion: 4,
  updatedAt: 1792953600000,
  brand: {
    name: "Çökertme Dünyası",
    slogan: "Muğla'nın Efsanesi, Adana'dan Dünyaya",
    headquarters: "Yenibaraj Mahallesi, Bülent Angın Blv. No: 66/D, Seyhan/Adana",
    phone: "0 (546) 918 07 01",
    whatsapp: "905469180701",
    instagram: "@cokertmedunyasi",
    appDiscountPercent: 10,
    loyaltyEarnPercent: 5,
    stampsForFreeMeal: 5
  },
  currencies: {
    TRY: { symbol: "₺", rate: 1, code: "TRY", label: "₺ TL" }
  },
  categories: [
    {
      id: "cokertmeler",
      icon: "",
      name: {
        tr: "İmza Çökertme Kebapları"
      }
    },
    {
      id: "baslangiclar",
      icon: "",
      name: {
        tr: "Ege & Akdeniz Başlangıçlar"
      }
    },
    {
      id: "salatalar",
      icon: "",
      name: {
        tr: "Ferah Salatalar & Mezeler"
      }
    },
    {
      id: "tatlilar",
      icon: "",
      name: {
        tr: "Geleneksel Tatlılar"
      }
    },
    {
      id: "icecekler",
      icon: "",
      name: {
        tr: "Ferahlatıcı İçecekler"
      }
    },
    {
      id: "ikramlar",
      icon: "",
      name: {
        tr: "Masa İkramlarımız"
      }
    }
  ],
  items: [
    {
      id: "item-1792324381559",
      categoryId: "cokertmeler",
      name: { tr: "KARİDES ÇÖKERTME" },
      desc: { tr: "Bodrum’un imza lezzetine ferah bir deniz esintisi: Altın sarısı çıtır kibrit patateslerin üzerinde ipeksi yoğurt" },
      price: 590,
      isComplimentary: false,
      sides: ["Ege Zeytini", "Acı Turşu", "Özel Soslu Salata", "Özel Tatlı", "Demleme Çay", "Türk Kahvesi"],
      calories: "680 kcal",
      prepTime: "12 dk",
      badges: ["Yeni Lezzet"],
      available: true,
      image: "assets/uploads/item-1792324381559.jpg?v=1"
    },
    {
      id: "item-1792323465955",
      categoryId: "cokertmeler",
      name: { tr: "BONFİLE ÇÖKERTME" },
      desc: { tr: "Döküm tavada mühürlenmiş lokum kıvamında marine dana bonfile şeritleri; altın sarısı çıtır kibrit patatesler, ipeksi yoğurt" },
      price: 790,
      isComplimentary: false,
      sides: ["Ege Zeytini", "Acı Turşu", "Özel Soslu Salata", "Özel Tatlı", "Demleme Çay", "Türk Kahvesi"],
      calories: "680 kcal",
      prepTime: "12 dk",
      badges: ["Yeni Lezzet"],
      available: true,
      image: "assets/uploads/item-1792323465955.jpg?v=1"
    },
    {
      id: "item-1792323418352",
      categoryId: "cokertmeler",
      name: { tr: "TAVUK ÇÖKERTME" },
      desc: { tr: "Özel baharatlar ve marinasyonlu lokum gibi yumuşatılmış jülyen tavuk dilimleri; altın sarısı çıtır kibrit patatesler, ipeksi yoğurt" },
      price: 435,
      isComplimentary: false,
      sides: ["Ege Zeytini", "Acı Turşu", "Özel Soslu Salata", "Özel Tatlı", "Demleme Çay", "Türk Kahvesi"],
      calories: "680 kcal",
      prepTime: "12 dk",
      badges: ["Yeni Lezzet"],
      available: true,
      image: "assets/uploads/item-1792323418352.jpg?v=1"
    },
    {
      id: "item-1792325907483",
      categoryId: "salatalar",
      name: { tr: "Göbek Marul Özel Salata" },
      desc: { tr: "Göbek Marul Özel Salata" },
      price: 50,
      isComplimentary: false,
      sides: [],
      calories: "240 kcal",
      prepTime: "6 dk",
      badges: ["Yeni Lezzet"],
      available: true,
      image: "assets/uploads/item-1792325907483.jpg?v=1"
    },
    {
      id: "item-1792326012633",
      categoryId: "salatalar",
      name: { tr: "Acı Turşu" },
      desc: { tr: "Acı Turşu" },
      price: 20,
      isComplimentary: false,
      sides: [],
      calories: "80 kcal",
      prepTime: "5 dk",
      badges: ["Yeni Lezzet"],
      available: true,
      image: "assets/uploads/item-1792326012633.jpg?v=1"
    },
    {
      id: "item-1792326025883",
      categoryId: "salatalar",
      name: { tr: "Ege Zeytini" },
      desc: { tr: "Ege Zeytini" },
      price: 20,
      isComplimentary: false,
      sides: [],
      calories: "120 kcal",
      prepTime: "5 dk",
      badges: ["Yeni Lezzet"],
      available: true,
      image: "assets/uploads/item-1792326025883.jpg?v=1"
    },
    {
      id: "item-1792325457108",
      categoryId: "tatlilar",
      name: { tr: "Özel Yöresel Kabak Tatlısı" },
      desc: { tr: "Kabak tatlısı üzerinde tahin ve ceviz" },
      price: 110,
      isComplimentary: false,
      sides: [],
      calories: "380 kcal",
      prepTime: "5 dk",
      badges: ["Yeni Lezzet"],
      available: true,
      image: "assets/uploads/item-1792325457108.jpg?v=1"
    },
    {
      id: "item-1792325787051",
      categoryId: "icecekler",
      name: { tr: "Pepsı" },
      desc: { tr: "Kutu içecek" },
      price: 100,
      isComplimentary: false,
      sides: [],
      calories: "140 kcal",
      prepTime: "2 dk",
      badges: ["Yeni Lezzet"],
      available: true,
      image: "assets/uploads/item-1792325787051.jpg?v=1"
    },
    {
      id: "item-1792325758628",
      categoryId: "icecekler",
      name: { tr: "Sarıyer Cola" },
      desc: { tr: "Kutu içecek" },
      price: 100,
      isComplimentary: false,
      sides: [],
      calories: "140 kcal",
      prepTime: "2 dk",
      badges: ["Yeni Lezzet"],
      available: true,
      image: "assets/uploads/item-1792325758628.jpg?v=1"
    },
    {
      id: "item-1792325574260",
      categoryId: "icecekler",
      name: { tr: "Coca Cola Normal" },
      desc: { tr: "Kutu İçecek" },
      price: 100,
      isComplimentary: false,
      sides: [],
      calories: "140 kcal",
      prepTime: "2 dk",
      badges: ["Yeni Lezzet"],
      available: true,
      image: "assets/uploads/item-1792325574260.jpg?v=1"
    },
    {
      id: "item-1792325591012",
      categoryId: "icecekler",
      name: { tr: "Coca Cola Zero" },
      desc: { tr: "Kutu İçecek" },
      price: 100,
      isComplimentary: false,
      sides: [],
      calories: "0 kcal",
      prepTime: "2 dk",
      badges: ["Yeni Lezzet"],
      available: true,
      image: "assets/uploads/item-1792325591012.jpg?v=1"
    },
    {
      id: "item-1792325619455",
      categoryId: "icecekler",
      name: { tr: "Fanta" },
      desc: { tr: "Kutu İçecek" },
      price: 100,
      isComplimentary: false,
      sides: [],
      calories: "140 kcal",
      prepTime: "2 dk",
      badges: ["Yeni Lezzet"],
      available: true,
      image: "assets/uploads/item-1792325619455.jpg?v=1"
    },
    {
      id: "item-1792325631972",
      categoryId: "icecekler",
      name: { tr: "Sprite" },
      desc: { tr: "Kutu İçecek" },
      price: 100,
      isComplimentary: false,
      sides: [],
      calories: "130 kcal",
      prepTime: "2 dk",
      badges: ["Yeni Lezzet"],
      available: true,
      image: "assets/uploads/item-1792325631972.jpg?v=1"
    },
    {
      id: "item-1792325660083",
      categoryId: "icecekler",
      name: { tr: "Fuse Tea Şeftali" },
      desc: { tr: "Kutu İçecek" },
      price: 100,
      isComplimentary: false,
      sides: [],
      calories: "90 kcal",
      prepTime: "2 dk",
      badges: ["Yeni Lezzet"],
      available: true,
      image: "assets/uploads/item-1792325660083.jpg?v=1"
    },
    {
      id: "item-1792325674127",
      categoryId: "icecekler",
      name: { tr: "Fuse Tea Mango" },
      desc: { tr: "Kutu İçecek" },
      price: 100,
      isComplimentary: false,
      sides: [],
      calories: "90 kcal",
      prepTime: "2 dk",
      badges: ["Yeni Lezzet"],
      available: true,
      image: "assets/uploads/item-1792325674127.jpg?v=1"
    },
    {
      id: "item-1792325699063",
      categoryId: "icecekler",
      name: { tr: "Ayran" },
      desc: { tr: "Ayran İçecek" },
      price: 50,
      isComplimentary: false,
      sides: [],
      calories: "85 kcal",
      prepTime: "2 dk",
      badges: ["Yeni Lezzet"],
      available: true,
      image: "assets/uploads/item-1792325699063.jpg?v=1"
    },
    {
      id: "item-1792325711075",
      categoryId: "icecekler",
      name: { tr: "Şalgam" },
      desc: { tr: "Şalgam İçecek" },
      price: 50,
      isComplimentary: false,
      sides: [],
      calories: "45 kcal",
      prepTime: "2 dk",
      badges: ["Yeni Lezzet"],
      available: true,
      image: "assets/uploads/item-1792325711075.jpg?v=1"
    },
    {
      id: "item-1792325730491",
      categoryId: "icecekler",
      name: { tr: "Su" },
      desc: { tr: "33 ml su" },
      price: 30,
      isComplimentary: false,
      sides: [],
      calories: "0 kcal",
      prepTime: "1 dk",
      badges: ["Yeni Lezzet"],
      available: true,
      image: "assets/uploads/item-1792325730491.jpg?v=1"
    },
    {
      id: "item-1792325967068",
      categoryId: "ikramlar",
      name: { tr: "Ege Zeytini" },
      desc: { tr: "Doğal lezzetli ege zeytini" },
      price: 0,
      isComplimentary: true,
      sides: [],
      calories: "İkram",
      prepTime: "Hemen",
      badges: ["MASA İKRAMIMIZ"],
      available: true,
      image: "assets/uploads/item-1792325967068.jpg?v=1"
    },
    {
      id: "item-1792325979932",
      categoryId: "ikramlar",
      name: { tr: "Acı Turşu" },
      desc: { tr: "Acı Turşu" },
      price: 0,
      isComplimentary: true,
      sides: [],
      calories: "İkram",
      prepTime: "Hemen",
      badges: ["MASA İKRAMIMIZ"],
      available: true,
      image: "assets/uploads/item-1792325979932.jpg?v=1"
    },
    {
      id: "item-1792324445703",
      categoryId: "ikramlar",
      name: { tr: "Özel Soslu Salata İkramı" },
      desc: { tr: "Göbek Marul ve pancar ile özel soslu salata" },
      price: 0,
      isComplimentary: true,
      sides: [],
      calories: "İkram",
      prepTime: "Hemen",
      badges: ["MASA İKRAMIMIZ"],
      available: true,
      image: "assets/uploads/item-1792324445703.jpg?v=1"
    },
    {
      id: "item-1792324524519",
      categoryId: "ikramlar",
      name: { tr: "Günün Geleneksel Özel Kabak Tatlı İkramı" },
      desc: { tr: "Özel Kabak Tatlısı ve Üzerinde Tayin ve Ceviz" },
      price: 0,
      isComplimentary: true,
      sides: [],
      calories: "İkram",
      prepTime: "Hemen",
      badges: ["MASA İKRAMIMIZ"],
      available: true,
      image: "assets/uploads/item-1792324524519.jpg?v=1"
    },
    {
      id: "item-1792324555395",
      categoryId: "ikramlar",
      name: { tr: "Çay İkramı" },
      desc: { tr: "Çay İkramlarımız" },
      price: 0,
      isComplimentary: true,
      sides: [],
      calories: "İkram",
      prepTime: "Hemen",
      badges: ["MASA İKRAMIMIZ"],
      available: true,
      image: "assets/uploads/item-1792324555395.jpg?v=1"
    },
    {
      id: "item-1792324580399",
      categoryId: "ikramlar",
      name: { tr: "Türk Kahvesi İkramı" },
      desc: { tr: "Türk kahvesi ikramı" },
      price: 0,
      isComplimentary: true,
      sides: [],
      calories: "İkram",
      prepTime: "Hemen",
      badges: ["MASA İKRAMIMIZ"],
      available: true,
      image: "assets/uploads/item-1792324580399.jpg?v=1"
    }
  ],
  branches: [
    {
      id: "adana-merkez",
      name: "Adana Seyhan Merkez Şube (Amiral Mağaza)",
      city: "Adana",
      country: "Türkiye",
      status: "Açık - Hizmetinizde",
      address: "Yenibaraj Mahallesi, Bülent Angın Blv. No: 66/D, Seyhan/Adana",
      phone: "0 (546) 918 07 01",
      hours: "11:00 - 23:30",
      isActive: true
    },
    {
      id: "mugla-bodrum",
      name: "Muğla Bodrum Marina Konsept Şube",
      city: "Muğla",
      country: "Türkiye",
      status: "Hazırlık Aşamasında",
      address: "Neyzen Tevfik Cad. Bodrum / Muğla",
      hours: "Yakında",
      isActive: false
    },
    {
      id: "istanbul-kadikoy",
      name: "İstanbul Bağdat Caddesi Şubesi",
      city: "İstanbul",
      country: "Türkiye",
      status: "Franchise Görüşmesinde",
      address: "Kadıköy / İstanbul",
      hours: "Yakında",
      isActive: false
    },
    {
      id: "berlin-mitte",
      name: "Berlin Mitte - Europe Flagship",
      city: "Berlin",
      country: "Almanya (Yurt Dışı)",
      status: "Global Bayilik Adayı",
      address: "Mitte / Berlin, Germany",
      hours: "2027 Hedefi",
      isActive: false
    }
  ],
  orders: [
    {
      id: "CKR-1042",
      customerName: "Emre K.",
      phone: "0532 *** ** 48",
      mode: "Eve Paket Servis",
      branch: "Adana Çukurova Merkez Şube",
      items: ["1x KARİDES ÇÖKERTME", "1x Ayran"],
      subtotal: 640,
      discount: 64,
      total: 576,
      pointsEarned: 1,
      status: "Hazırlanıyor",
      createdAt: "10 dk önce"
    }
  ],
  franchiseApplications: [
    {
      id: "FR-01",
      fullName: "Murat Yılmaz",
      phone: "+49 176 000000",
      location: "Frankfurt / Almanya",
      budget: "150.000 € - 250.000 €",
      note: "Frankfurt merkezde 220m2 köşe dükkanımız mevcut, Çökertme Dünyası Avrupa bayiliği için görüşmek istiyoruz.",
      createdAt: "Bugün"
    }
  ],
  loyaltyUser: {
    name: "Misafir Gurme",
    phone: "0532 000 01 01",
    memberCode: "CKR-ADANA-01",
    points: 145.0,
    stamps: 3,
    tier: "Gümüş Gurme"
  },
  appSettings: {
    discountPercent: 10,
    bannerHeadline: "LEZZET ÜSTÜNE LEZZET KAT",
    bannerSub: "Tüm Çökertme Kebaplarının Yanında 6 Masa İkramı Bedava!",
    ikramList: ["Ege Zeytini", "Acı Turşu", "Özel Soslu Salata", "Özel Tatlı", "Demleme Çay", "Türk Kahvesi"],
    loyalty: {
      enabled: true,
      requiredStamps: 5,
      windowDays: 30,
      cooldownHours: 24,
      rewardDiscountPercent: 50
    }
  },
  siteImages: {
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
    qrDivider2: "assets/uploads/item-1792325457108.jpg?v=1"
  },
  members: [],
  adminSettings: {
    username: "admin",
    passwordHash: "YEo13221990.,"
  },
  integrationSettings: {
    respos: {
      enabled: true,
      apiUrl: "https://api.respos.com.tr/v1/online-orders",
      apiKey: "",
      branchCode: "ADANA-MERKEZ-01",
      autoKitchenPrint: true,
      bekoPosSync: true,
      bekoTerminalModel: "Beko X30TR / 300TR (TokenX GMP3)"
    },
    qnbPos: {
      enabled: true,
      merchantId: "",
      terminalId: "",
      apiUser: "",
      apiPass: "",
      mode: "3D_SECURE",
      linkedToBekoQnb: true,
      allowOnlineQnbCard: true,
      allowDoorBekoCard: true,
      allowDoorCash: true
    },
    courier: {
      autoDispatchImmediate: true,
      defaultPrepMinutes: 15,
      activeCourierId: "courier-1",
      companies: [
        {
          id: "courier-1",
          name: "Ana Anlaşmalı Kurye Firması (API)",
          apiUrl: "https://api.kuryefirmasi.com/v1/orders/create",
          apiKey: "",
          prepMinutesOverride: 15,
          isActive: true
        },
        {
          id: "courier-2",
          name: "Vigo / Paket Taxi Kurye Entegrasyonu",
          apiUrl: "https://api.vigokurye.com/v1/dispatch",
          apiKey: "",
          prepMinutesOverride: 15,
          isActive: false
        },
        {
          id: "courier-3",
          name: "Yedek Bölge Kurye / Restoran Özel Kurye",
          apiUrl: "https://api.bolgekurye.com/v1/webhook",
          apiKey: "",
          prepMinutesOverride: 12,
          isActive: false
        }
      ]
    }
  }
};

const STORAGE_KEY = "cokertme_dunyasi_state_v4";
const OLD_STORAGE_KEYS = ["cokertme_dunyasi_state_v1", "cokertme_dunyasi_state_v2", "cokertme_dunyasi_state_v3"];

const DEFAULT_ITEM_IMAGE_MAP = {};
DEFAULT_COKERTME_DATA.items.forEach(item => {
  DEFAULT_ITEM_IMAGE_MAP[item.id] = item.image;
});

function getCloudApiUrl(path = "/api/state") {
  try {
    const proto = window.location.protocol;
    if (proto === "file:" || proto === "capacitor:" || proto === "ionic:") {
      return "https://www.cokertmedunyasi.com" + path;
    }
  } catch (e) {}
  return path;
}

function hasLegacyDemoItems(items) {
  if (!Array.isArray(items) || items.length === 0) return true;
  return items.some(i => i && LEGACY_DEMO_ITEM_IDS.has(i.id));
}

function isPlaceholderImage(imgStr) {
  if (!imgStr || typeof imgStr !== "string") return true;
  return imgStr.includes("photo-1544025162-d76694265947");
}

function normalizePhone10(phoneStr) {
  if (!phoneStr) return "";
  const digits = String(phoneStr).replace(/\D/g, "");
  if (digits.length >= 10) {
    return digits.slice(-10);
  }
  return digits;
}

function mergeMembersList(listA, listB) {
  const map = new Map();
  const processList = (arr) => {
    if (!Array.isArray(arr)) return;
    arr.forEach(m => {
      if (!m || !m.phone) return;
      const key = normalizePhone10(m.phone);
      if (!key || key.length < 10) return;
      const existing = map.get(key);
      if (!existing) {
        map.set(key, { ...m, phoneNormalized: key });
      } else {
        const exTime = Number(existing.updatedAt || existing.createdAt || 0);
        const newTime = Number(m.updatedAt || m.createdAt || 0);
        const winner = newTime >= exTime ? m : existing;
        const loser = newTime >= exTime ? existing : m;
        map.set(key, {
          ...loser,
          ...winner,
          phoneNormalized: key,
          stamps: Math.max(Number(existing.stamps || 0), Number(m.stamps || 0)),
          points: Math.max(Number(existing.points || 0), Number(m.points || 0)),
          password: winner.password || loser.password || "",
          savedAddress: winner.savedAddress || loser.savedAddress || null
        });
      }
    });
  };
  processList(listA);
  processList(listB);
  return Array.from(map.values());
}

function sanitizeAndMergeState(parsed) {
  if (!parsed || typeof parsed !== "object") {
    return JSON.parse(JSON.stringify(DEFAULT_COKERTME_DATA));
  }

  // Eğer eski deneme ürünleri (item-1 .. item-14) kalmışsa onları tamamen temizle
  let validItems = Array.isArray(parsed.items)
    ? parsed.items.filter(i => i && !LEGACY_DEMO_ITEM_IDS.has(i.id))
    : [];

  if (validItems.length < 3) {
    validItems = JSON.parse(JSON.stringify(DEFAULT_COKERTME_DATA.items));
  } else {
    // Varsayılan Unsplash yer tutucu görsellerini gerçek yüklenen ürün fotoğraflarına yükselt
    validItems = validItems.map(item => {
      const fallbackImg = DEFAULT_ITEM_IMAGE_MAP[item.id];
      if (isPlaceholderImage(item.image) && fallbackImg) {
        return { ...item, image: fallbackImg };
      }
      return item;
    });
  }

  const mergedBranches = Array.isArray(parsed.branches) && parsed.branches.length > 0
    ? parsed.branches.map(b => {
        if (b && (b.id === "adana-merkez" || (b.address && b.address.includes("Turgut Özal")))) {
          return {
            ...b,
            name: "Adana Seyhan Merkez Şube (Amiral Mağaza)",
            address: "Yenibaraj Mahallesi, Bülent Angın Blv. No: 66/D, Seyhan/Adana",
            phone: "0 (546) 918 07 01"
          };
        }
        return b;
      })
    : DEFAULT_COKERTME_DATA.branches;

  const merged = {
    ...DEFAULT_COKERTME_DATA,
    ...parsed,
    schemaVersion: 4,
    brand: {
      ...DEFAULT_COKERTME_DATA.brand,
      ...(parsed.brand || {}),
      headquarters: "Yenibaraj Mahallesi, Bülent Angın Blv. No: 66/D, Seyhan/Adana",
      phone: "0 (546) 918 07 01",
      whatsapp: "905469180701"
    },
    branches: mergedBranches,
    items: validItems,
    members: mergeMembersList(DEFAULT_COKERTME_DATA.members, parsed.members),
    adminSettings: {
      ...DEFAULT_COKERTME_DATA.adminSettings,
      ...(parsed.adminSettings || {})
    },
    appSettings: {
      ...DEFAULT_COKERTME_DATA.appSettings,
      ...(parsed.appSettings || {}),
      loyalty: {
        ...DEFAULT_COKERTME_DATA.appSettings.loyalty,
        ...((parsed.appSettings && parsed.appSettings.loyalty) || {})
      }
    },
    siteImages: {
      ...DEFAULT_COKERTME_DATA.siteImages,
      ...(parsed.siteImages || {})
    },
    integrationSettings: {
      respos: {
        ...DEFAULT_COKERTME_DATA.integrationSettings.respos,
        ...((parsed.integrationSettings && parsed.integrationSettings.respos) || {})
      },
      qnbPos: {
        ...DEFAULT_COKERTME_DATA.integrationSettings.qnbPos,
        ...((parsed.integrationSettings && parsed.integrationSettings.qnbPos) || {})
      },
      courier: {
        ...DEFAULT_COKERTME_DATA.integrationSettings.courier,
        ...((parsed.integrationSettings && parsed.integrationSettings.courier) || {}),
        companies: (parsed.integrationSettings && parsed.integrationSettings.courier && parsed.integrationSettings.courier.companies)
          ? parsed.integrationSettings.courier.companies
          : DEFAULT_COKERTME_DATA.integrationSettings.courier.companies
      }
    }
  };

  if (merged.categories && !merged.categories.some(c => c.id === "ikramlar")) {
    merged.categories.push({
      id: "ikramlar",
      icon: "",
      name: { tr: "Masa İkramlarımız" }
    });
  }
  return merged;
}

const CokertmeStore = {
  normalizePhone(phoneStr) {
    return normalizePhone10(phoneStr);
  },

  findMemberByPhone(phoneStr) {
    const key = normalizePhone10(phoneStr);
    if (!key || key.length < 10) return null;
    const state = this.getState();
    const members = Array.isArray(state.members) ? state.members : [];
    return members.find(m => m && normalizePhone10(m.phone) === key) || null;
  },

  upsertMember(memberObj) {
    if (!memberObj || !memberObj.phone) return null;
    const key = normalizePhone10(memberObj.phone);
    if (!key || key.length < 10) return null;
    const state = this.getState();
    const members = Array.isArray(state.members) ? [...state.members] : [];
    const idx = members.findIndex(m => m && normalizePhone10(m.phone) === key);
    let updatedMember;
    if (idx >= 0) {
      const existing = members[idx];
      updatedMember = {
        ...existing,
        ...memberObj,
        phoneNormalized: key,
        stamps: memberObj.stamps !== undefined ? Number(memberObj.stamps) : Number(existing.stamps || 0),
        points: memberObj.points !== undefined ? Number(memberObj.points) : Number(existing.points || 0),
        password: memberObj.password || existing.password || "",
        savedAddress: memberObj.savedAddress || existing.savedAddress || null,
        updatedAt: Date.now()
      };
      members[idx] = updatedMember;
    } else {
      updatedMember = {
        id: memberObj.id || ("mem-" + Date.now()),
        name: memberObj.name || "Misafir Müşteri",
        phone: memberObj.phone,
        phoneNormalized: key,
        password: memberObj.password || "",
        stamps: Number(memberObj.stamps || 0),
        points: Number(memberObj.points || 0),
        lastStampDate: memberObj.lastStampDate || null,
        savedAddress: memberObj.savedAddress || null,
        createdAt: Date.now(),
        updatedAt: Date.now()
      };
      members.push(updatedMember);
    }
    state.members = members;
    this.saveState(state);
    return updatedMember;
  },

  getState() {
    try {
      let raw = localStorage.getItem(STORAGE_KEY);
      // Eğer v4 yoksa ancak v3 varsa, v3'teki güncel veriyi v4'e taşı ve temizle
      if (!raw) {
        const v3Raw = localStorage.getItem("cokertme_dunyasi_state_v3");
        if (v3Raw) {
          raw = v3Raw;
        }
      }

      // Eski anahtarları temizle
      OLD_STORAGE_KEYS.forEach(k => {
        try { localStorage.removeItem(k); } catch (e) {}
      });

      if (!raw) {
        const initial = JSON.parse(JSON.stringify(DEFAULT_COKERTME_DATA));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
        return initial;
      }
      const parsed = JSON.parse(raw);
      const merged = sanitizeAndMergeState(parsed);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return merged;
    } catch (e) {
      return JSON.parse(JSON.stringify(DEFAULT_COKERTME_DATA));
    }
  },

  saveState(newState) {
    try {
      newState.schemaVersion = 4;
      newState.updatedAt = Date.now();
      const cleaned = sanitizeAndMergeState(newState);
      const payload = JSON.stringify(cleaned);
      localStorage.setItem(STORAGE_KEY, payload);
      // NOT: keepalive:true 64KB sınırına takıldığı için kullanılmaz!
      return fetch(getCloudApiUrl("/api/state"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload
      }).catch(() => {});
    } catch (e) {
      console.error("Kaydetme hatası:", e);
      return Promise.resolve();
    }
  },

  async dispatchOrder(order) {
    const state = this.getState();
    const integrations = state.integrationSettings || DEFAULT_COKERTME_DATA.integrationSettings;
    try {
      const res = await fetch(getCloudApiUrl("/api/order-dispatch"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order,
          integrationSettings: integrations
        })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {}
    return { ok: true, simulated: true };
  },

  async syncFromServer() {
    const localState = this.getState();
    try {
      const res = await fetch(getCloudApiUrl(`/api/state?t=${Date.now()}`), { cache: "no-store" });
      if (res.ok) {
        const serverData = await res.json();
        if (serverData && Array.isArray(serverData.items) && serverData.items.length > 0 && !hasLegacyDemoItems(serverData.items)) {
          const cleanedServer = sanitizeAndMergeState(serverData);
          const mergedMembers = mergeMembersList(localState.members, cleanedServer.members);
          cleanedServer.members = mergedMembers;
          localState.members = mergedMembers;

          const localTime = Number(localState && localState.updatedAt) || 0;
          const serverTime = Number(cleanedServer && cleanedServer.updatedAt) || 0;

          // Eğer tarayıcıdaki veri sunucudan daha yeniyse (ör. yönetici az önce kaydettiyse), sunucuyu güncelle
          if (localTime > serverTime) {
            fetch(getCloudApiUrl("/api/state"), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(localState)
            }).catch(() => {});
            localStorage.setItem(STORAGE_KEY, JSON.stringify(localState));
            return localState;
          }

          localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedServer));
          return cleanedServer;
        }
      }
    } catch (e) {}
    return localState;
  },

  resetToDefaults() {
    const fresh = JSON.parse(JSON.stringify(DEFAULT_COKERTME_DATA));
    fresh.updatedAt = Date.now();
    this.saveState(fresh);
    return fresh;
  },

  formatPrice(amountTRY) {
    if (amountTRY === undefined || amountTRY === null || Number(amountTRY) <= 0) {
      return "İKRAM";
    }
    return `${Math.round(amountTRY)} ₺`;
  }
};

window.CokertmeStore = CokertmeStore;

// Online Sipariş Alt Domain (https://onlinesiparis.cokertmedunyasi.com/) Akıllı Yönlendirici
window.openOnlineOrderPortal = function(ev, authMode) {
  if (ev && typeof ev.preventDefault === "function") {
    ev.preventDefault();
  }
  const query = authMode ? `?auth=${encodeURIComponent(authMode)}` : "";
  const targetSubdomainUrl = `https://onlinesiparis.cokertmedunyasi.com/${query}`;
  const fallbackLocalUrl = `/onlinesiparis${query}`;

  // Eğer zaten localhost veya file:// üzerinde test ediliyorsa yerel /uygulama.html'e yönlendir
  const host = (window.location && window.location.hostname) || "";
  if (host === "localhost" || host === "127.0.0.1" || window.location.protocol === "file:") {
    window.location.href = `uygulama.html${query}`;
    return false;
  }

  // Alt domain DNS'i aktif mi hızlıca kontrol et (750ms zaman aşımı), aktifse alt domaine, DNS henüz yayılmadıysa /onlinesiparis'e yönlendir
  let navigated = false;
  const go = (url) => {
    if (navigated) return;
    navigated = true;
    window.location.href = url;
  };
  const timer = setTimeout(() => go(fallbackLocalUrl), 750);
  fetch("https://onlinesiparis.cokertmedunyasi.com/api/state", { method: "HEAD", mode: "no-cors", cache: "no-store" })
    .then(() => {
      clearTimeout(timer);
      go(targetSubdomainUrl);
    })
    .catch(() => {
      clearTimeout(timer);
      go(fallbackLocalUrl);
    });
  return false;
};
