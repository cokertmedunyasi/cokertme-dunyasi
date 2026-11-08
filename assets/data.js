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
      name: "Adana Barajyolu Şubesi",
      city: "Adana",
      district: "Seyhan",
      country: "Türkiye",
      status: "Açık - Hizmetinizde",
      address: "Yenibaraj Mahallesi, Bülent Angın Blv. No: 66/D, Seyhan/Adana",
      phone: "0 (546) 918 07 01",
      hours: "11:00 - 23:30",
      isActive: true,
      neighborhoods: [
        "Yenibaraj", "Barajyolu", "Reşatbey", "Cemalpaşa", "Kurtuluş",
        "Ziyapaşa", "Gazipaşa", "Çınarlı", "Sümer", "Pınar", "Demirköprü", "Döşeme"
      ],
      adminUsername: "barajyolu",
      adminPassword: "Barajyolu123.",
      adisyoBranchCode: "ADANA-BARAJYOLU-01",
      adisyoApiKey: "",
      prepMinutes: 15,
      overflowBranchId: ""
    },
    {
      id: "adana-gurselpasa",
      name: "Adana Gürselpaşa Şubesi",
      city: "Adana",
      district: "Çukurova",
      country: "Türkiye",
      status: "Açık - Hizmetinizde",
      address: "Gürselpaşa Mahallesi, Aliya İzzetbegoviç Blv., Çukurova/Adana",
      phone: "0 (546) 918 07 02",
      hours: "11:00 - 23:30",
      isActive: true,
      neighborhoods: [
        "Gürselpaşa", "Karslılar", "Toros", "Yurt", "Mahfesığmaz",
        "Güzelyalı", "Beyazevler", "Huzurevleri", "Yüzüncüyıl", "Belediyeevleri", "Şambayadı", "Kabaktepe"
      ],
      adminUsername: "gurselpasa",
      adminPassword: "Gurselpasa123.",
      adisyoBranchCode: "ADANA-GURSELPASA-02",
      adisyoApiKey: "",
      prepMinutes: 15,
      overflowBranchId: ""
    },
    {
      id: "adana-saricam",
      name: "Adana Sarıçam Şubesi",
      city: "Adana",
      district: "Sarıçam",
      country: "Türkiye",
      status: "Açık - Hizmetinizde",
      address: "Gültepe Mahallesi, Erguvan Cad., Sarıçam/Adana",
      phone: "0 (546) 918 07 03",
      hours: "11:00 - 23:30",
      isActive: true,
      neighborhoods: [
        "Balcalı", "Gültepe", "Osmangazi", "Orhangazi", "Yeşiltepe",
        "Boynuyoğun", "Mehmet Akif Ersoy", "Şahintepe", "Yavuz Sultan Selim", "Esentepe", "İncirlik", "Suluca"
      ],
      adminUsername: "saricam",
      adminPassword: "Saricam123.",
      adisyoBranchCode: "ADANA-SARICAM-03",
      adisyoApiKey: "",
      prepMinutes: 15,
      overflowBranchId: ""
    },
    {
      id: "mugla-bodrum",
      name: "Muğla Bodrum Marina Konsept Şube",
      city: "Muğla",
      district: "Bodrum",
      country: "Türkiye",
      status: "Hazırlık Aşamasında",
      address: "Neyzen Tevfik Cad. Bodrum / Muğla",
      phone: "0 (546) 918 07 04",
      hours: "Yakında",
      isActive: false,
      neighborhoods: ["Çarşı", "Türkkuyusu", "Kumbahçe", "Yokuşbaşı", "Gümbet", "Bitez", "Ortakent", "Yalıkavak"],
      adminUsername: "bodrum",
      adminPassword: "Bodrum123.",
      adisyoBranchCode: "MUGLA-BODRUM-04",
      adisyoApiKey: "",
      prepMinutes: 15,
      overflowBranchId: ""
    },
    {
      id: "istanbul-kadikoy",
      name: "İstanbul Bağdat Caddesi Şubesi",
      city: "İstanbul",
      district: "Kadıköy",
      country: "Türkiye",
      status: "Franchise Görüşmesinde",
      address: "Bağdat Caddesi, Suadiye / Kadıköy / İstanbul",
      phone: "0 (546) 918 07 05",
      hours: "Yakında",
      isActive: false,
      neighborhoods: ["Suadiye", "Bostancı", "Caddebostan", "Erenköy", "Fenerbahçe", "Göztepe", "Feneryolu", "Kozyatağı", "Moda"],
      adminUsername: "kadikoy",
      adminPassword: "Kadikoy123.",
      adisyoBranchCode: "IST-KADIKOY-05",
      adisyoApiKey: "",
      prepMinutes: 15,
      overflowBranchId: ""
    },
    {
      id: "berlin-mitte",
      name: "Berlin Mitte - Europe Flagship",
      city: "Berlin",
      district: "Mitte",
      country: "Almanya (Yurt Dışı)",
      status: "Global Bayilik Adayı",
      address: "Mitte / Berlin, Germany",
      phone: "+49 30 000 00 00",
      hours: "2027 Hedefi",
      isActive: false,
      neighborhoods: ["Mitte", "Kreuzberg", "Charlottenburg"],
      adminUsername: "berlin",
      adminPassword: "Berlin123.",
      adisyoBranchCode: "DE-BERLIN-06",
      adisyoApiKey: "",
      prepMinutes: 15,
      overflowBranchId: ""
    }
  ],
  locationRequests: [],
  orders: [],
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
    maintenanceLockEnabled: true,
    testAccessPin: "YEo13221990.,",
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
    },
    wallet: {
      enabled: true,
      walletSchemaV2: true,
      tier1Amount: 2000,
      tier1BonusPct: 5,
      tier2Amount: 3000,
      tier2BonusPct: 7,
      tier3Amount: 5000,
      tier3BonusPct: 10
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
    adisyo: {
      enabled: true,
      apiUrl: "https://ext.adisyo.com/api/v1/orders",
      apiKey: "",
      apiSecret: "",
      consumerId: "COKERTME-ADANA-01",
      branchId: "ADANA-SEYHAN-MERKEZ",
      autoAditionKitchenPrint: true,
      stockRecipeDeduction: true,
      accountingEInvoiceSync: true,
      marketplaceUnifiedSync: true,
      courierDispatchSync: true,
      financeCashRegisterSync: true,
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

const ORDERS_BACKUP_KEY = "cokertme_orders_backup_v1";

function loadOrdersBackup() {
  try {
    const raw = localStorage.getItem(ORDERS_BACKUP_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter(o => o && o.id && o.id !== "CKR-1042") : [];
  } catch (e) {
    return [];
  }
}

function saveOrdersBackup(ordersArr) {
  try {
    if (!Array.isArray(ordersArr)) return;
    const clean = ordersArr.filter(o => o && o.id && o.id !== "CKR-1042");
    localStorage.setItem(ORDERS_BACKUP_KEY, JSON.stringify(clean));
  } catch (e) {}
}

function mergeOrdersList(listA, listB) {
  const map = new Map();
  const processOrders = (arr) => {
    if (!Array.isArray(arr)) return;
    arr.forEach(o => {
      if (!o || !o.id || o.id === "CKR-1042") return;
      const prev = map.get(o.id);
      const normPhone = normalizePhone10(o.phone || o.phoneNormalized);
      if (!prev) {
        map.set(o.id, { ...o, phoneNormalized: normPhone });
      } else {
        map.set(o.id, {
          ...prev,
          ...o,
          phoneNormalized: normPhone || prev.phoneNormalized || ""
        });
      }
    });
  };
  processOrders(listA);
  processOrders(listB);
  const merged = Array.from(map.values());
  merged.sort((a, b) => (Number(b.createdAtMs || 0) - Number(a.createdAtMs || 0)));
  return merged;
}

function mergeWalletTxList(txA, txB) {
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
        map.set(key, {
          ...m,
          phoneNormalized: key,
          walletBalance: Number(m.walletBalance || 0),
          walletBonusEarned: Number(m.walletBonusEarned || 0),
          walletTransactions: Array.isArray(m.walletTransactions) ? m.walletTransactions : []
        });
      } else {
        const exTime = Number(existing.updatedAt || existing.createdAt || 0);
        const newTime = Number(m.updatedAt || m.createdAt || 0);
        const winner = newTime >= exTime ? m : existing;
        const loser = newTime >= exTime ? existing : m;
        const combinedStamps = Array.from(new Set([
          ...(Array.isArray(existing.stampTimestamps) ? existing.stampTimestamps : []),
          ...(Array.isArray(m.stampTimestamps) ? m.stampTimestamps : [])
        ])).map(Number).filter(Boolean).sort((a, b) => a - b);

        const mergedTx = mergeWalletTxList(existing.walletTransactions, m.walletTransactions);
        const prevWalTime = Number(existing.walletUpdatedAt || existing.updatedAt || 0);
        const newWalTime = Number(m.walletUpdatedAt || m.updatedAt || 0);
        let finalBalance = newWalTime >= prevWalTime
          ? Number(m.walletBalance !== undefined ? m.walletBalance : existing.walletBalance || 0)
          : Number(existing.walletBalance !== undefined ? existing.walletBalance : m.walletBalance || 0);
        if (mergedTx.length > 0 && mergedTx[0].balanceAfter !== undefined) {
          finalBalance = Number(mergedTx[0].balanceAfter);
        }
        const totalBonus = Math.max(Number(existing.walletBonusEarned || 0), Number(m.walletBonusEarned || 0));

        map.set(key, {
          ...loser,
          ...winner,
          phoneNormalized: key,
          stamps: Math.max(Number(existing.stamps || 0), Number(m.stamps || 0), combinedStamps.length),
          stampTimestamps: combinedStamps,
          points: Math.max(Number(existing.points || 0), Number(m.points || 0)),
          walletBalance: Number(finalBalance.toFixed(2)),
          walletBonusEarned: Number(totalBonus.toFixed(2)),
          walletTransactions: mergedTx,
          walletUpdatedAt: Math.max(prevWalTime, newWalTime),
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

  const defaultBranchMap = {};
  DEFAULT_COKERTME_DATA.branches.forEach(db => {
    defaultBranchMap[db.id] = db;
  });

  let mergedBranches = Array.isArray(parsed.branches) && parsed.branches.length > 0
    ? parsed.branches.map(b => {
        if (!b || !b.id) return b;
        const defB = defaultBranchMap[b.id] || {};
        const upgraded = {
          ...defB,
          ...b,
          neighborhoods: Array.isArray(b.neighborhoods) && b.neighborhoods.length > 0
            ? b.neighborhoods
            : (defB.neighborhoods || []),
          district: b.district || defB.district || "Merkez",
          adminUsername: b.adminUsername || defB.adminUsername || b.id,
          adminPassword: b.adminPassword || defB.adminPassword || "Cokertme123.",
          adisyoBranchCode: b.adisyoBranchCode || defB.adisyoBranchCode || b.id.toUpperCase(),
          adisyoApiKey: b.adisyoApiKey || defB.adisyoApiKey || "",
          prepMinutes: Number(b.prepMinutes) || Number(defB.prepMinutes) || 15,
          overflowBranchId: b.overflowBranchId || ""
        };
        if (b.id === "adana-merkez" || (b.address && b.address.includes("Turgut Özal"))) {
          upgraded.name = "Adana Barajyolu Şubesi";
          upgraded.address = "Yenibaraj Mahallesi, Bülent Angın Blv. No: 66/D, Seyhan/Adana";
          upgraded.phone = b.phone || "0 (546) 918 07 01";
        }
        if (b.id === "adana-gurselpasa" && upgraded.name && upgraded.name.includes("(Çukurova)")) {
          upgraded.name = "Adana Gürselpaşa Şubesi";
        }
        if (upgraded.name && (upgraded.name.includes("Merkez Şube") || upgraded.name.includes("Amiral Mağaza"))) {
          upgraded.name = upgraded.name
            .replace(/\s*\(Amiral Mağaza\)/gi, "")
            .replace(/Merkez\s+Şube/gi, "Şubesi")
            .trim();
        }
        return upgraded;
      })
    : [...DEFAULT_COKERTME_DATA.branches];

  // Ensure the 3 Adana branches (Barajyolu, Gürselpaşa, Sarıçam) exist so multi-branch neighborhood routing works out of the box
  ["adana-merkez", "adana-gurselpasa", "adana-saricam"].forEach(reqId => {
    if (!mergedBranches.some(b => b && b.id === reqId) && defaultBranchMap[reqId]) {
      mergedBranches.splice(1, 0, JSON.parse(JSON.stringify(defaultBranchMap[reqId])));
    }
  });

  const backupOrders = loadOrdersBackup();
  const rawMergedOrders = mergeOrdersList(backupOrders, parsed.orders);

  // Mevcut ve geçmiş siparişlerin şube, mahalle ve tarih alanlarını otomatik zenginleştir
  const allNeighborhoodMap = [];
  mergedBranches.forEach(b => {
    if (!b || !b.isActive) return;
    (Array.isArray(b.neighborhoods) ? b.neighborhoods : []).forEach(n => {
      allNeighborhoodMap.push({
        hood: String(n).trim(),
        hoodLower: String(n).trim().toLocaleLowerCase("tr-TR"),
        branch: b
      });
    });
  });

  const mergedOrders = rawMergedOrders.map(o => {
    const copy = { ...o };
    const addrHay = `${copy.neighborhood || ""} ${copy.address || ""} ${copy.mode || ""}`.toLocaleLowerCase("tr-TR");
    let matchedHoodInfo = allNeighborhoodMap.find(x => x.hoodLower && addrHay.includes(x.hoodLower));

    if (!copy.branchId || copy.branch === "Adana Seyhan Merkez Şube" || (copy.branch && copy.branch.includes("Merkez Şube"))) {
      if (matchedHoodInfo) {
        copy.branchId = matchedHoodInfo.branch.id;
        copy.branch = matchedHoodInfo.branch.name;
        copy.city = matchedHoodInfo.branch.city || "Adana";
        copy.neighborhood = copy.neighborhood || matchedHoodInfo.hood;
        copy.adisyoBranchCode = copy.adisyoBranchCode || matchedHoodInfo.branch.adisyoBranchCode;
      } else {
        const bObj = mergedBranches.find(b => b.id === copy.branchId) || mergedBranches[0];
        copy.branchId = bObj ? bObj.id : "adana-merkez";
        copy.branch = bObj ? bObj.name : "Adana Barajyolu Şubesi";
        copy.city = copy.city || (bObj && bObj.city) || "Adana";
        copy.neighborhood = copy.neighborhood || "Yenibaraj";
        copy.adisyoBranchCode = copy.adisyoBranchCode || (bObj && bObj.adisyoBranchCode) || "ADANA-BARAJYOLU-01";
      }
    } else if (!copy.neighborhood && matchedHoodInfo) {
      copy.neighborhood = matchedHoodInfo.hood;
    }

    if (!copy.createdAtMs) {
      copy.createdAtMs = Number(copy.timestamp) || Date.now();
    }
    if (!copy.orderDateIso) {
      try {
        const d = new Date(Number(copy.createdAtMs) || Date.now());
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        copy.orderDateIso = `${yyyy}-${mm}-${dd}`;
      } catch (e) {
        copy.orderDateIso = new Date().toISOString().slice(0, 10);
      }
    }
    return copy;
  });

  // Sipariş veren tüm müşterilerin CRM (members) listesinde de eksiksiz yer almasını sağla
  let syncedMembers = mergeMembersList(DEFAULT_COKERTME_DATA.members, parsed.members);
  const memberByPhone = new Map();
  syncedMembers.forEach(m => {
    const k = normalizePhone10(m.phone);
    if (k) memberByPhone.set(k, m);
  });

  mergedOrders.forEach(o => {
    const k = normalizePhone10(o.phone);
    if (!k || k.length < 10) return;
    const existing = memberByPhone.get(k);
    if (!existing) {
      const customerOrders = mergedOrders.filter(x => normalizePhone10(x.phone) === k);
      const totalSpend = customerOrders.reduce((s, x) => s + (Number(x.total) || 0), 0);
      const newMem = {
        id: "MEM-" + k.slice(-6),
        fullName: o.customerName || "Müşteri",
        name: o.customerName || "Müşteri",
        phone: o.phone,
        phoneNormalized: k,
        city: o.city || "Adana",
        district: o.district || "Seyhan",
        neighborhood: o.neighborhood || "Yenibaraj",
        address: o.address || o.mode || "",
        lastBranchId: o.branchId || "adana-merkez",
        lastBranchName: o.branch || "Adana Barajyolu Şubesi",
        orderCount: customerOrders.length,
        totalSpend: Math.round(totalSpend * 100) / 100,
        loyaltyStamps: Math.min(5, customerOrders.length),
        stamps: Math.min(5, customerOrders.length),
        walletBalance: 0,
        lastOrderAt: o.createdAt || o.orderDateIso || "Bugün",
        source: "Online Sipariş",
        createdAt: o.createdAt || "Bugün",
        updatedAt: Number(o.createdAtMs) || Date.now()
      };
      memberByPhone.set(k, newMem);
      syncedMembers.push(newMem);
    } else {
      const customerOrders = mergedOrders.filter(x => normalizePhone10(x.phone) === k);
      const totalSpend = customerOrders.reduce((s, x) => s + (Number(x.total) || 0), 0);
      existing.fullName = existing.fullName || existing.name || o.customerName || "Müşteri";
      existing.city = existing.city || o.city || "Adana";
      existing.neighborhood = existing.neighborhood || o.neighborhood || "Yenibaraj";
      existing.address = existing.address || o.address || "";
      existing.lastBranchId = existing.lastBranchId || o.branchId || "adana-merkez";
      existing.lastBranchName = (existing.lastBranchName && !existing.lastBranchName.includes("Merkez Şube"))
        ? existing.lastBranchName
        : (o.branch || "Adana Barajyolu Şubesi");
      existing.orderCount = Math.max(Number(existing.orderCount) || 0, customerOrders.length);
      existing.totalSpend = Math.max(Number(existing.totalSpend) || 0, Math.round(totalSpend * 100) / 100);
      existing.loyaltyStamps = Math.max(Number(existing.loyaltyStamps) || 0, Number(existing.stamps) || 0);
      existing.lastOrderAt = existing.lastOrderAt || o.createdAt || o.orderDateIso || "Bugün";
    }
  });

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
    locationRequests: Array.isArray(parsed.locationRequests) ? parsed.locationRequests : [],
    items: validItems,
    orders: mergedOrders,
    members: syncedMembers,
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
      },
      wallet: (() => {
        const rawW = (parsed.appSettings && parsed.appSettings.wallet) || {};
        if (!rawW.walletSchemaV2 && (Number(rawW.tier1Amount) === 1500 || Number(rawW.tier1BonusPct) === 3)) {
          return { ...DEFAULT_COKERTME_DATA.appSettings.wallet };
        }
        return {
          ...DEFAULT_COKERTME_DATA.appSettings.wallet,
          ...rawW,
          walletSchemaV2: true
        };
      })()
    },
    siteImages: {
      ...DEFAULT_COKERTME_DATA.siteImages,
      ...(parsed.siteImages || {})
    },
    integrationSettings: {
      adisyo: {
        ...DEFAULT_COKERTME_DATA.integrationSettings.adisyo,
        ...((parsed.integrationSettings && parsed.integrationSettings.adisyo) || {})
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

  resolveBranchByLocation(cityStr, districtStr, neighborhoodStr, stateOverride) {
    const st = stateOverride || this.getState();
    const branches = Array.isArray(st.branches) ? st.branches : [];
    const norm = (s) => String(s || "").trim().toLocaleLowerCase("tr-TR");
    const targetCity = norm(cityStr);
    const targetDist = norm(districtStr);
    const targetNeigh = norm(neighborhoodStr);

    const applyOverflowIfSet = (branchObj) => {
      if (!branchObj) return null;
      if (branchObj.overflowBranchId) {
        const overflowTarget = branches.find(b => b && b.id === branchObj.overflowBranchId && b.isActive !== false);
        if (overflowTarget) {
          return { ...overflowTarget, redirectedFromBranch: branchObj.name };
        }
      }
      return branchObj;
    };

    // 1. Önce aynı ilde ve mahallesi eşleşen aktif şubeyi bul
    if (targetNeigh) {
      const exactNeighBranch = branches.find(b => {
        if (!b || b.isActive === false) return false;
        if (targetCity && norm(b.city) !== targetCity) return false;
        const nList = Array.isArray(b.neighborhoods) ? b.neighborhoods : [];
        return nList.some(n => norm(n) === targetNeigh);
      }) || branches.find(b => {
        if (!b || b.isActive === false) return false;
        if (targetCity && norm(b.city) !== targetCity) return false;
        const nList = Array.isArray(b.neighborhoods) ? b.neighborhoods : [];
        return nList.some(n => targetNeigh.includes(norm(n)) || norm(n).includes(targetNeigh));
      });
      if (exactNeighBranch) return applyOverflowIfSet(exactNeighBranch);
    }

    // 2. İl + İlçe eşleşen aktif şube
    if (targetDist) {
      const distBranch = branches.find(b => b && b.isActive !== false && (!targetCity || norm(b.city) === targetCity) && norm(b.district) === targetDist);
      if (distBranch) return applyOverflowIfSet(distBranch);
    }

    // 3. Aynı ildeki ilk aktif şube
    if (targetCity) {
      const cityBranch = branches.find(b => b && b.isActive !== false && norm(b.city) === targetCity);
      if (cityBranch) return applyOverflowIfSet(cityBranch);
    }

    return null;
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
      saveOrdersBackup(cleaned.orders);
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
          const mergedOrders = mergeOrdersList(localState.orders, cleanedServer.orders);

          cleanedServer.members = mergedMembers;
          localState.members = mergedMembers;
          cleanedServer.orders = mergedOrders;
          localState.orders = mergedOrders;
          saveOrdersBackup(mergedOrders);

          const localTime = Number(localState && localState.updatedAt) || 0;
          const serverTime = Number(cleanedServer && cleanedServer.updatedAt) || 0;

          // Eğer tarayıcıdaki veri sunucudan daha yeniyse veya sunucuda olmayan yeni sipariş varsa sunucuyu güncelle
          if (localTime > serverTime || mergedOrders.length > (Array.isArray(serverData.orders) ? serverData.orders.length : 0)) {
            fetch(getCloudApiUrl("/api/state"), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(localTime > serverTime ? localState : cleanedServer)
            }).catch(() => {});
            if (localTime > serverTime) {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(localState));
              return localState;
            }
          }

          localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanedServer));
          return cleanedServer;
        }
      }
    } catch (e) {}
    return localState;
  },

  resetToDefaults() {
    try { localStorage.removeItem(ORDERS_BACKUP_KEY); } catch (e) {}
    const fresh = JSON.parse(JSON.stringify(DEFAULT_COKERTME_DATA));
    fresh.forceResetOrders = true;
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

// Online Sipariş Alt Domain (https://onlinesiparis.cokertmedunyasi.com/) Yönlendirici
window.openOnlineOrderPortal = function(ev, authMode) {
  if (ev && typeof ev.preventDefault === "function") {
    ev.preventDefault();
  }
  const query = authMode ? `?auth=${encodeURIComponent(authMode)}` : "";
  const host = (window.location && window.location.hostname) || "";
  if (host === "localhost" || host === "127.0.0.1" || window.location.protocol === "file:") {
    window.location.href = `uygulama.html${query}`;
    return false;
  }
  window.location.href = `https://onlinesiparis.cokertmedunyasi.com/${query}`;
  return false;
};
