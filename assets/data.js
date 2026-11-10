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
      district: "Seyhan / Çukurova / Sarıçam",
      country: "Türkiye",
      status: "Açık - Hizmetinizde",
      address: "Yenibaraj Mahallesi, Bülent Angın Blv. No: 66/D, Seyhan/Adana",
      phone: "0 (546) 918 07 01",
      hours: "11:00 - 23:30",
      isActive: true,
      neighborhoods: [
        "Yenibaraj", "Barajyolu", "Reşatbey", "Cemalpaşa", "Kurtuluş",
        "Ziyapaşa", "Gazipaşa", "Çınarlı", "Sümer", "Pınar", "Demirköprü", "Döşeme",
        "Gürselpaşa", "Karslılar", "Toros", "Yurt", "Mahfesığmaz",
        "Güzelyalı", "Beyazevler", "Huzurevleri", "Yüzüncüyıl", "Belediyeevleri", "Şambayadı", "Kabaktepe",
        "Türkmenbaşı", "Tellidere", "Mavi Bulvar", "Fatih", "Kıyıboyu", "Çukurova", "Süleyman Demirel", "Kenan Evren", "Turgut Özal",
        "Balcalı", "Gültepe", "Osmangazi", "Orhangazi", "Yeşiltepe",
        "Boynuyoğun", "Mehmet Akif Ersoy", "Şahintepe", "Yavuz Sultan Selim", "Esentepe", "İncirlik", "Suluca",
        "Sarıçam", "Yeni Mahalle", "Kozan Yolu", "Vali Yolu", "Aliya İzzetbegoviç"
      ],
      adminUsername: "barajyolu",
      adminPassword: "Barajyolu123.",
      adisyoBranchCode: "ADANA-BARAJYOLU-01",
      adisyoConsumerId: "COKERTME-ADANA-BARAJYOLU-01",
      adisyoApiKey: "",
      adisyoApiSecret: "",
      adisyoApiUrl: "https://ext.adisyo.com/api/v1/orders",
      prepMinutes: 15,
      openTime: "11:00",
      closeTime: "23:30",
      isAcceptingOrders: true,
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
      adisyoConsumerId: "COKERTME-MUGLA-BODRUM-04",
      adisyoApiKey: "",
      adisyoApiSecret: "",
      adisyoApiUrl: "https://ext.adisyo.com/api/v1/orders",
      prepMinutes: 15,
      openTime: "11:00",
      closeTime: "23:30",
      isAcceptingOrders: true,
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
      adisyoConsumerId: "COKERTME-IST-KADIKOY-05",
      adisyoApiKey: "",
      adisyoApiSecret: "",
      adisyoApiUrl: "https://ext.adisyo.com/api/v1/orders",
      prepMinutes: 15,
      openTime: "11:00",
      closeTime: "23:30",
      isAcceptingOrders: true,
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
      adisyoConsumerId: "COKERTME-DE-BERLIN-06",
      adisyoApiKey: "",
      adisyoApiSecret: "",
      adisyoApiUrl: "https://ext.adisyo.com/api/v1/orders",
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
      userCode: "",
      userPass: "",
      merchantPass: "",
      apiUser: "",
      apiPass: "",
      secureType: "3DPay",
      testMode: true,
      mode: "3D_SECURE",
      linkedToBekoQnb: true,
      allowOnlineQnbCard: true,
      allowDoorBekoCard: true,
      allowDoorCash: true
    },
    smsOtp: {
      enabled: false,
      provider: "NETGSM",
      userCode: "",
      password: "",
      msgHeader: "COKERTME"
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
        const prevT = Number(prev.statusUpdatedAt || prev.updatedAt || prev.createdAtMs || 0);
        const newT = Number(o.statusUpdatedAt || o.updatedAt || o.createdAtMs || 0);
        const winner = newT >= prevT ? o : prev;
        const loser = newT >= prevT ? prev : o;
        map.set(o.id, {
          ...loser,
          ...winner,
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

function mergeInStoreTokens(listA, listB) {
  const map = new Map();
  const process = (arr) => {
    if (!Array.isArray(arr)) return;
    arr.forEach(t => {
      if (!t || !t.token) return;
      const ex = map.get(t.token);
      if (!ex) {
        map.set(t.token, { ...t });
      } else {
        const isUsed = ex.status === "USED" || t.status === "USED";
        map.set(t.token, {
          ...ex,
          ...t,
          status: isUsed ? "USED" : (t.status || ex.status || "ACTIVE"),
          usedByPhone: t.usedByPhone || ex.usedByPhone || "",
          usedByName: t.usedByName || ex.usedByName || "",
          usedAt: t.usedAt || ex.usedAt || ""
        });
      }
    });
  };
  process(listA);
  process(listB);
  return Array.from(map.values())
    .sort((a, b) => (Number(b.createdAtMs || 0) - Number(a.createdAtMs || 0)))
    .slice(0, 120);
}

function mergeInStoreLoyaltyLogs(listA, listB) {
  const map = new Map();
  const process = (arr) => {
    if (!Array.isArray(arr)) return;
    arr.forEach(item => {
      if (!item || !item.id) return;
      if (!map.has(item.id)) {
        map.set(item.id, { ...item });
      }
    });
  };
  process(listA);
  process(listB);
  return Array.from(map.values())
    .sort((a, b) => (Number(b.createdAtMs || 0) - Number(a.createdAtMs || 0)))
    .slice(0, 300);
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
        const lastRedeemMs = Math.max(
          Number(existing.lastRewardRedeemedAt || 0),
          Number(m.lastRewardRedeemedAt || 0)
        );
        const combinedStamps = Array.from(new Set([
          ...(Array.isArray(existing.stampTimestamps) ? existing.stampTimestamps : []),
          ...(Array.isArray(m.stampTimestamps) ? m.stampTimestamps : [])
        ]))
          .map(Number)
          .filter(ts => ts > 0 && ts > lastRedeemMs)
          .sort((a, b) => a - b);

        const prevStampTime = Number(existing.stampsUpdatedAt || 0);
        const newStampTime = Number(m.stampsUpdatedAt || 0);
        let resolvedStamps;
        if (prevStampTime > 0 || newStampTime > 0) {
          const stampWinner = newStampTime >= prevStampTime ? m : existing;
          resolvedStamps = Math.max(Number(stampWinner.stamps || 0), combinedStamps.length);
        } else {
          resolvedStamps = Math.max(Number(existing.stamps || 0), Number(m.stamps || 0), combinedStamps.length);
        }

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
          stamps: resolvedStamps,
          loyaltyStamps: resolvedStamps,
          stampTimestamps: combinedStamps,
          stampsUpdatedAt: Math.max(prevStampTime, newStampTime),
          lastRewardRedeemedAt: lastRedeemMs,
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

const DEFAULT_ITEM_SKU_MAP = {
  "item-1792323465955": "CKR-BONFILE-01",
  "item-1792324381559": "CKR-KARIDES-01",
  "item-1792323418352": "CKR-TAVUK-01",
  "item-1792325907483": "CKR-SALATA-01",
  "item-1792326012633": "CKR-TURSU-01",
  "item-1792326025883": "CKR-ZEYTIN-01",
  "item-1792325457108": "CKR-KABAK-01",
  "item-1792325787051": "CKR-PEPSI-01",
  "item-1792325758628": "CKR-SARIYER-01",
  "item-1792325574260": "CKR-CCOLA-01",
  "item-1792325591012": "CKR-CZERO-01",
  "item-1792325619455": "CKR-FANTA-01",
  "item-1792325631972": "CKR-SPRITE-01",
  "item-1792325660083": "CKR-FUSE-SEFTALI",
  "item-1792325674127": "CKR-FUSE-MANGO",
  "item-1792325699063": "CKR-AYRAN-01",
  "item-1792325711075": "CKR-SALGAM-01",
  "item-1792325730491": "CKR-SU-01",
  "item-1792325967068": "IKR-ZEYTIN-01",
  "item-1792325979932": "IKR-TURSU-01",
  "item-1792324445703": "IKR-SALATA-01",
  "item-1792324524519": "IKR-KABAK-01",
  "item-1792324555395": "IKR-CAY-01",
  "item-1792324580399": "IKR-KAHVE-01"
};

const TURKEY_PROVINCES_81 = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin",
  "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur",
  "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan",
  "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul",
  "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kırıkkale", "Kırklareli", "Kırşehir",
  "Kilis", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş",
  "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas",
  "Şanlıurfa", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak",
  "Berlin"
];

const TURKEY_CITY_DISTRICT_NEIGHBORHOODS = {
  "Adana": {
    "Çukurova": [
      "Güzelyalı", "Gürselpaşa", "Mahfesığmaz", "Toros", "Yurt", "Huzurevleri", "Yüzüncüyıl",
      "Belediyeevleri", "Beyazevler", "Karslılar", "Şambayadı", "Kabaktepe", "Yeni Mahalle",
      "Esentepe", "Süleyman Demirel", "Turgut Özal", "Kenan Evren", "Çukurova", "Kurttepe"
    ],
    "Seyhan": [
      "Yenibaraj", "Barajyolu", "Reşatbey", "Cemalpaşa", "Kurtuluş", "Ziyapaşa", "Gazipaşa",
      "Çınarlı", "Sümer", "Pınar", "Demirköprü", "Döşeme", "Türkmenbaşı", "Tellidere",
      "Mavi Bulvar", "Fatih", "Kıyıboyu", "Vali Yolu", "Aliya İzzetbegoviç", "Yeşilyurt",
      "Gülbahçesi", "Fevzipaşa", "Namık Kemal", "Yeşilevler"
    ],
    "Sarıçam": [
      "Balcalı", "Gültepe", "Osmangazi", "Orhangazi", "Yeşiltepe", "Boynuyoğun",
      "Mehmet Akif Ersoy", "Şahintepe", "Yavuz Sultan Selim", "İncirlik", "Suluca",
      "Sarıçam", "Kozan Yolu", "Yıldırım Beyazıt", "Estergon", "Remzi Oğuz Arık"
    ],
    "Yüreğir": [
      "Atakent", "Dadaloğlu", "Kazım Karabekir", "Kiremithane", "Köprülü", "Levent",
      "Mutlu", "PTT Evleri", "Serinevler", "Sinanpaşa", "Yamaçlı", "Yavuzlar", "19 Mayıs"
    ]
  },
  "Mersin": {
    "Yenişehir": [
      "Pozcu", "Cumhuriyet", "Barbaros", "Eğriçam", "Akkent", "Güvenevler", "Bahçelievler",
      "Çiftlikköy", "Aydınlıkevler", "Gazi", "Dumlupınar", "İnönü", "Palmiye", "Pirireis",
      "Hürriyet", "Menteş", "Batıkent", "Fuatmorel", "Limonluk", "50. Yıl"
    ],
    "Mezitli": [
      "Viranşehir", "Yeni Mahalle (Mezitli)", "Fatih (Mezitli)", "Merkez (Mezitli)",
      "Atatürk (Mezitli)", "Davultepe", "Tece", "Kuyuluk", "Menderes", "Akdeniz (Mezitli)",
      "Çamlıca", "Çankaya (Mezitli)", "Eski Mezitli", "İstiklal", "75. Yıl", "Şahin Tepesi"
    ],
    "Toroslar": [
      "Akbelen", "Alsancak", "Arpaçsakarlar", "Çukurova (Toroslar)", "Güneykent", "Halkkent",
      "Mevlana", "Mithat Toroğlu", "Sağlık", "Tozkoparan", "Yalınayak", "Yusuf Kılıç",
      "Zeki Ayan", "Çağdaşkent"
    ],
    "Akdeniz": [
      "Çankaya", "Camişerif", "İhsaniye", "Kültür", "Mahmudiye", "Mesudiye", "Nusratiye",
      "Özgürlük", "Şevketsümer", "Siteler", "Turgutreis", "Üçocak"
    ],
    "Tarsus & Erdemli": [
      "Şehitishak (Tarsus)", "Kırklarsırtı (Tarsus)", "Yeni Ömerli (Tarsus)", "Altaylılar (Tarsus)",
      "Atatürk (Erdemli)", "Merkez (Erdemli)", "Alata (Erdemli)", "Tömük", "Çeşmeli", "Kargıpınarı", "Kızkalesi"
    ]
  },
  "İstanbul": {
    "Kadıköy": [
      "Suadiye", "Bostancı", "Caddebostan", "Erenköy", "Fenerbahçe", "Göztepe", "Feneryolu",
      "Kozyatağı", "Moda", "Caferağa", "Osmanağa", "Acıbadem", "Koşuyolu", "Sahrayıcedid", "19 Mayıs"
    ],
    "Beşiktaş": [
      "Etiler", "Levent", "Bebek", "Arnavutköy", "Ortaköy", "Yıldız", "Sinanpaşa", "Türkali",
      "Vişnezade", "Cihannüma", "Akatlar", "Ulus", "Gayrettepe", "Dikilitaş", "Balmumcu"
    ],
    "Şişli & Beyoğlu": [
      "Teşvikiye (Nişantaşı)", "Meşrutiyet", "Fulya", "Esentepe", "Mecidiyeköy", "Bomonti",
      "Cihangir", "Karaköy", "Gümüşsuyu", "Galata", "Asmalımescit"
    ],
    "Ataşehir & Üsküdar": [
      "Atatürk (Ataşehir)", "Barbaros (Ataşehir)", "Küçükbakkalköy", "İçerenköy", "Batı Ataşehir",
      "Altunizade", "Kuzguncuk", "Çengelköy", "Beylerbeyi", "Mimar Sinan"
    ],
    "Bakırköy & Sarıyer": [
      "Yeşilköy", "Florya", "Ataköy", "Zuhuratbaba", "İncirli", "İstinye", "Tarabya",
      "Yeniköy", "Emirgan", "Zekeriyaköy", "Maslak", "Ayazağa"
    ]
  },
  "Muğla": {
    "Bodrum": [
      "Çarşı", "Türkkuyusu", "Kumbahçe", "Yokuşbaşı", "Gümbet", "Bitez", "Ortakent",
      "Yalıkavak", "Turgutreis", "Gündoğan", "Göltürkbükü", "Konacık", "Torba", "Akyarlar"
    ],
    "Fethiye & Marmaris": [
      "Cumhuriyet (Fethiye)", "Tuzla", "Taşyaka", "Foça (Çalış)", "Ölüdeniz", "Göcek",
      "Armutalan (Marmaris)", "Siteler (Marmaris)", "Tepe", "Kemeraltı", "İçmeler"
    ],
    "Menteşe & Milas": [
      "Emirbeyazıt", "Muslihittin", "Kötekli", "Orhaniye", "Cumhuriyet (Milas)", "Güllük", "Ören"
    ]
  },
  "Ankara": {
    "Çankaya": [
      "Bahçelievler", "Emek", "Kızılay", "Tunalı (Kavaklıdere)", "Gaziosmanpaşa", "Çayyolu",
      "Ümitköy", "Yaşamkent", "Balgat", "Çukurambar", "Söğütözü", "Mustafa Kemal",
      "Yıldız", "Oran", "Ayrancı", "Birlik", "Bilkent"
    ],
    "Yenimahalle & Etimesgut": [
      "Batıkent", "Çakırlar", "Demetevler", "Beştepe", "Gazi", "Eryaman", "Elvankent", "Bağlıca", "Göksu"
    ],
    "Keçiören & Gölbaşı": [
      "Etlik", "İncirli", "Subayevleri", "Ovacık", "İncek", "Bahçelievler (Gölbaşı)"
    ]
  },
  "İzmir": {
    "Konak & Karşıyaka": [
      "Alsancak", "Göztepe", "Güzelyalı (İzmir)", "Hatay", "Kültür", "Bostanlı",
      "Mavişehir", "Atakent", "Donanmacı", "Aksoy", "Alaybey"
    ],
    "Bornova & Bayraklı": [
      "Özkanlar", "Küçükpark", "Erzene", "Kazımdirik", "Evka-3", "Manavkuyu", "Mansuroğlu", "Adalet"
    ],
    "Çeşme & Urla & Güzelbahçe": [
      "Alaçatı", "Ilıca", "Çeşme Merkez", "Dalyan", "İskele (Urla)", "Yalı (Güzelbahçe)"
    ]
  },
  "Antalya": {
    "Muratpaşa": [
      "Lara", "Şirinyalı", "Fener", "Çağlayan", "Güzeloba", "Meltem", "Bahçelievler (Antalya)",
      "Kızılsaray", "Zerdalilik", "Gençlik (Işıklar)", "Meydankavağı", "Kırcami"
    ],
    "Konyaaltı": [
      "Liman", "Hurma", "Gürsu", "Uncalı", "Altınkum", "Arapsuyu", "Sarısu", "Molla Yusuf", "Pınarbaşı"
    ],
    "Kepez & Alanya": [
      "Kültür (Kepez)", "Gülveren", "Varsak", "Ahatlı", "Oba (Alanya)", "Mahmutlar", "Kleopatra (Saray)"
    ]
  },
  "Gaziantep": {
    "Şehitkamil": [
      "İbrahimli", "Batıkent (Gaziantep)", "Güvenevler (Gaziantep)", "Emek (Gaziantep)",
      "Fatih (Gaziantep)", "Pancarlı", "Sarıgüllük", "Osmangazi", "Fıstıklık", "15 Temmuz"
    ],
    "Şahinbey": [
      "Karataş", "Akkent (Gaziantep)", "Yeditepe", "Beşyüzevler", "Binevler", "Üniversite", "Mavikent"
    ]
  },
  "Hatay": {
    "İskenderun & Arsuz": [
      "Mustafa Kemal", "Cumhuriyet (İskenderun)", "Savaş", "Çay", "Numune", "Pınarbaşı",
      "Denizciler", "Karaağaç", "Arsuz Merkez"
    ],
    "Antakya & Defne": [
      "Sümerler", "Harbiye", "Akdeniz (Defne)", "Çekmece", "Cebrail", "Saraykent", "Ekinci", "Odabaşı"
    ]
  },
  "Osmaniye": {
    "Merkez & Kadirli": [
      "Alibeyli", "Cumhuriyet", "Fakıuşağı (Üniversite)", "Raufbey", "Rahime Hatun",
      "Yediocak", "Adnan Menderes", "Esenevler", "Kadirli Merkez"
    ]
  },
  "Kahramanmaraş": {
    "Onikişubat & Dulkadiroğlu": [
      "Binevler", "Haydarbey", "Üngüt", "Boğaziçi", "Yirmiikigün", "Tekerek", "Abdulhamithan",
      "Şazi Bey", "Hürriyet", "Yavuz Selim", "Trabzon Bulvarı"
    ]
  },
  "Kayseri": {
    "Melikgazi & Kocasinan": [
      "Alpaslan", "Köşk", "Gültepe", "Yıldırım Beyazıt", "Cumhuriyet", "Bahçelievler", "Talas (Mevlana)",
      "Talas (Bahçelievler)", "Erciyesevler", "Sümer", "Mimarsinan"
    ]
  },
  "Konya": {
    "Selçuklu & Meram": [
      "Bosna Hersek", "Yazır", "Şefik Can", "Feritpaşa", "İhsaniye", "Havzan", "Ahatlı",
      "Melikşah", "Konevi", "Sancak", "Binkonutlar"
    ]
  },
  "Bursa": {
    "Nilüfer & Osmangazi": [
      "Özlüce", "FSM Bulvarı (İhsaniye)", "Görükle", "Beşevler", "Ataevler", "Balat",
      "Bademli", "Çekirge", "Kükürtlü", "Heykel"
    ]
  },
  "Berlin": {
    "Berlin Merkez": [
      "Mitte", "Kreuzberg", "Charlottenburg", "Friedrichshain", "Neukölln", "Prenzlauer Berg"
    ]
  }
};

function buildDefaultCityDistrictMap(cityName) {
  const cleanCity = String(cityName || "Adana").trim();
  const matchedKey = Object.keys(TURKEY_CITY_DISTRICT_NEIGHBORHOODS).find(
    k => k.toLocaleLowerCase("tr-TR") === cleanCity.toLocaleLowerCase("tr-TR")
  );
  if (matchedKey) {
    return JSON.parse(JSON.stringify(TURKEY_CITY_DISTRICT_NEIGHBORHOODS[matchedKey]));
  }
  return {
    [`${cleanCity} Merkez`]: [
      "Cumhuriyet", "Atatürk", "Yeni Mahalle", "Bahçelievler", "Fatih",
      "Hürriyet", "İstiklal", "Zafer", "Kültür", "Üniversite", "Çarşı", "Merkez"
    ]
  };
}

function resolveDefaultAdisyoSku(item) {
  if (!item) return "CKR-URUN";
  if (item.adisyoSku && String(item.adisyoSku).trim()) return String(item.adisyoSku).trim();
  if (item.id && DEFAULT_ITEM_SKU_MAP[item.id]) return DEFAULT_ITEM_SKU_MAP[item.id];
  const rawName = (item.name && item.name.tr) ? item.name.tr : (item.name || "URUN");
  const slug = String(rawName)
    .toLocaleUpperCase("tr-TR")
    .replace(/Ğ/g, "G").replace(/Ü/g, "U").replace(/Ş/g, "S")
    .replace(/İ/g, "I").replace(/Ö/g, "O").replace(/Ç/g, "C")
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 14);
  const prefix = (item.categoryId === "ikramlar" || Number(item.price) <= 0) ? "IKR" : "CKR";
  return `${prefix}-${slug || "URUN"}`;
}

function sanitizeAndMergeState(parsed) {
  if (!parsed || typeof parsed !== "object") {
    const fresh = JSON.parse(JSON.stringify(DEFAULT_COKERTME_DATA));
    fresh.items = (fresh.items || []).map(it => ({ ...it, adisyoSku: resolveDefaultAdisyoSku(it) }));
    return fresh;
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
      const nextImg = (isPlaceholderImage(item.image) && fallbackImg) ? fallbackImg : item.image;
      return {
        ...item,
        image: nextImg,
        adisyoSku: resolveDefaultAdisyoSku(item)
      };
    });
  }
  validItems = validItems.map(item => ({
    ...item,
    adisyoSku: resolveDefaultAdisyoSku(item)
  }));

  const defaultBranchMap = {};
  DEFAULT_COKERTME_DATA.branches.forEach(db => {
    defaultBranchMap[db.id] = db;
  });

  const otherAdanaOwnedHoods = new Set();
  if (Array.isArray(parsed.branches)) {
    parsed.branches.forEach(b => {
      if (!b || !b.id || b.id === "adana-merkez" || b.id === "adana-gurselpasa" || b.id === "adana-saricam") return;
      if (String(b.city || "").trim().toLocaleLowerCase("tr-TR") === "adana" && Array.isArray(b.neighborhoods)) {
        b.neighborhoods.forEach(nh => {
          const k = String(nh || "").trim().toLocaleLowerCase("tr-TR");
          if (k) otherAdanaOwnedHoods.add(k);
        });
      }
    });
  }

  let mergedBranches = Array.isArray(parsed.branches) && parsed.branches.length > 0
    ? parsed.branches
        .filter(b => b && b.id !== "adana-gurselpasa" && b.id !== "adana-saricam")
        .map(b => {
          if (!b || !b.id) return b;
          const defB = defaultBranchMap[b.id] || {};
          let combinedNeighborhoods = Array.isArray(b.neighborhoods)
            ? [...b.neighborhoods]
            : [...(defB.neighborhoods || [])];

          if (b.id === "adana-merkez" && !b.neighborhoodsConfiguredV2 && Array.isArray(defB.neighborhoods)) {
            const seenH = new Set(combinedNeighborhoods.map(x => String(x || "").trim().toLocaleLowerCase("tr-TR")));
            defB.neighborhoods.forEach(dh => {
              const key = String(dh || "").trim().toLocaleLowerCase("tr-TR");
              if (key && !seenH.has(key) && !otherAdanaOwnedHoods.has(key)) {
                seenH.add(key);
                combinedNeighborhoods.push(dh);
              }
            });
          }
          if (b.id === "adana-merkez" && otherAdanaOwnedHoods.size > 0) {
            combinedNeighborhoods = combinedNeighborhoods.filter(
              nh => !otherAdanaOwnedHoods.has(String(nh || "").trim().toLocaleLowerCase("tr-TR"))
            );
          }

          const upgraded = {
            ...defB,
            ...b,
            neighborhoods: combinedNeighborhoods,
            district: b.id === "adana-merkez" ? (b.district || "Seyhan / Çukurova / Sarıçam") : (b.district || defB.district || "Merkez"),
            adminUsername: b.adminUsername || defB.adminUsername || b.id,
            adminPassword: b.adminPassword || defB.adminPassword || "Cokertme123.",
            adisyoBranchCode: b.adisyoBranchCode || defB.adisyoBranchCode || b.id.toUpperCase(),
            adisyoConsumerId: b.adisyoConsumerId || defB.adisyoConsumerId || `COKERTME-${b.id.toUpperCase()}`,
            adisyoApiKey: b.adisyoApiKey || defB.adisyoApiKey || "",
            adisyoApiSecret: b.adisyoApiSecret || defB.adisyoApiSecret || "",
            adisyoApiUrl: b.adisyoApiUrl || defB.adisyoApiUrl || "https://ext.adisyo.com/api/v1/orders",
            prepMinutes: Number(b.prepMinutes) || Number(defB.prepMinutes) || 15,
            openTime: b.openTime || defB.openTime || "11:00",
            closeTime: b.closeTime || defB.closeTime || "23:30",
            isAcceptingOrders: b.isAcceptingOrders !== false,
            overflowBranchId: b.overflowBranchId || ""
          };
          if (b.id === "adana-merkez" || (b.address && b.address.includes("Turgut Özal"))) {
            upgraded.name = "Adana Barajyolu Şubesi";
            upgraded.address = "Yenibaraj Mahallesi, Bülent Angın Blv. No: 66/D, Seyhan/Adana";
            upgraded.phone = b.phone || "0 (546) 918 07 01";
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

  // Adana Barajyolu Şubesi'nin her zaman mevcut olduğundan emin ol
  if (!mergedBranches.some(b => b && b.id === "adana-merkez") && defaultBranchMap["adana-merkez"]) {
    mergedBranches.unshift(JSON.parse(JSON.stringify(defaultBranchMap["adana-merkez"])));
  }

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

    if (
      !copy.branchId ||
      copy.branchId === "adana-gurselpasa" ||
      copy.branchId === "adana-saricam" ||
      copy.branch === "Adana Seyhan Merkez Şube" ||
      (copy.branch && (copy.branch.includes("Merkez Şube") || copy.branch.includes("Gürselpaşa") || copy.branch.includes("Sarıçam")))
    ) {
      if (matchedHoodInfo) {
        copy.branchId = matchedHoodInfo.branch.id;
        copy.branch = matchedHoodInfo.branch.name;
        copy.city = matchedHoodInfo.branch.city || "Adana";
        copy.neighborhood = copy.neighborhood || matchedHoodInfo.hood;
        copy.adisyoBranchCode = matchedHoodInfo.branch.adisyoBranchCode || "ADANA-BARAJYOLU-01";
      } else {
        const bObj = mergedBranches.find(b => b.id === "adana-merkez") || mergedBranches[0];
        copy.branchId = bObj ? bObj.id : "adana-merkez";
        copy.branch = bObj ? bObj.name : "Adana Barajyolu Şubesi";
        copy.city = copy.city || (bObj && bObj.city) || "Adana";
        copy.neighborhood = copy.neighborhood || "Yenibaraj";
        copy.adisyoBranchCode = (bObj && bObj.adisyoBranchCode) || "ADANA-BARAJYOLU-01";
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
      existing.lastBranchId = (existing.lastBranchId && existing.lastBranchId !== "adana-gurselpasa" && existing.lastBranchId !== "adana-saricam")
        ? existing.lastBranchId
        : (o.branchId || "adana-merkez");
      existing.lastBranchName = (existing.lastBranchName && !existing.lastBranchName.includes("Merkez Şube") && !existing.lastBranchName.includes("Gürselpaşa") && !existing.lastBranchName.includes("Sarıçam"))
        ? existing.lastBranchName
        : (o.branch || "Adana Barajyolu Şubesi");
      existing.orderCount = Math.max(Number(existing.orderCount) || 0, customerOrders.length);
      existing.totalSpend = Math.max(Number(existing.totalSpend) || 0, Math.round(totalSpend * 100) / 100);
      existing.loyaltyStamps = Number(existing.lastRewardRedeemedAt || 0) > 0
        ? (Number(existing.stamps) || 0)
        : Math.max(Number(existing.loyaltyStamps) || 0, Number(existing.stamps) || 0);
      existing.lastOrderAt = existing.lastOrderAt || o.createdAt || o.orderDateIso || "Bugün";
    }
  });

  syncedMembers.forEach(m => {
    if (!m) return;
    if (m.lastBranchId === "adana-gurselpasa" || m.lastBranchId === "adana-saricam" || m.branchId === "adana-gurselpasa" || m.branchId === "adana-saricam") {
      m.lastBranchId = "adana-merkez";
      m.branchId = "adana-merkez";
    }
    if (m.lastBranchName && (m.lastBranchName.includes("Gürselpaşa") || m.lastBranchName.includes("Sarıçam") || m.lastBranchName.includes("Merkez Şube"))) {
      m.lastBranchName = "Adana Barajyolu Şubesi";
    }
    if (m.branchName && (m.branchName.includes("Gürselpaşa") || m.branchName.includes("Sarıçam") || m.branchName.includes("Merkez Şube"))) {
      m.branchName = "Adana Barajyolu Şubesi";
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
      smsOtp: {
        ...DEFAULT_COKERTME_DATA.integrationSettings.smsOtp,
        ...((parsed.integrationSettings && parsed.integrationSettings.smsOtp) || {})
      },
      courier: {
        ...DEFAULT_COKERTME_DATA.integrationSettings.courier,
        ...((parsed.integrationSettings && parsed.integrationSettings.courier) || {}),
        companies: (parsed.integrationSettings && parsed.integrationSettings.courier && parsed.integrationSettings.courier.companies)
          ? parsed.integrationSettings.courier.companies
          : DEFAULT_COKERTME_DATA.integrationSettings.courier.companies
      }
    },
    customNeighborhoodCatalog: (parsed.customNeighborhoodCatalog && typeof parsed.customNeighborhoodCatalog === "object")
      ? parsed.customNeighborhoodCatalog
      : {},
    inStoreStampTokens: Array.isArray(parsed.inStoreStampTokens) ? parsed.inStoreStampTokens : [],
    inStoreLoyaltyLogs: Array.isArray(parsed.inStoreLoyaltyLogs) ? parsed.inStoreLoyaltyLogs : []
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

  getMemberStampStatus(phoneStr, stateOverride) {
    const st = stateOverride || this.getState();
    const loyaltyCfg = (st.appSettings && st.appSettings.loyalty) || {
      enabled: true,
      requiredStamps: 5,
      windowDays: 30,
      cooldownHours: 24,
      rewardDiscountPercent: 50
    };
    const requiredStamps = Math.max(2, Number(loyaltyCfg.requiredStamps) || 5);
    const windowMs = (Math.max(1, Number(loyaltyCfg.windowDays) || 30)) * 24 * 60 * 60 * 1000;
    const cooldownMs = (Math.max(1, Number(loyaltyCfg.cooldownHours) || 24)) * 60 * 60 * 1000;
    const now = Date.now();

    const key = normalizePhone10(phoneStr);
    const members = Array.isArray(st.members) ? st.members : [];
    const member = (key && key.length >= 10)
      ? (members.find(m => m && normalizePhone10(m.phone) === key) || null)
      : null;

    if (!member) {
      return {
        member: null,
        validStamps: 0,
        requiredStamps,
        canEarnToday: true,
        hoursRemaining: 0,
        canRedeemReward: false,
        walletBalance: 0,
        validTimestamps: []
      };
    }

    const lastRedeemMs = Number(member.lastRewardRedeemedAt || 0);
    let rawTs = Array.isArray(member.stampTimestamps)
      ? member.stampTimestamps.map(Number).filter(ts => ts > 0 && ts >= (now - windowMs) && ts > lastRedeemMs).sort((a, b) => a - b)
      : [];

    // Eğer eski kayıttan stamps sayısı varsa ancak stampTimestamps boşsa sentetik zaman damgası üret
    const legacyStampCount = Number(member.stamps !== undefined ? member.stamps : member.loyaltyStamps || 0);
    if (rawTs.length === 0 && legacyStampCount > 0 && lastRedeemMs === 0) {
      for (let i = legacyStampCount; i >= 1; i--) {
        rawTs.push(now - i * (cooldownMs + 3600000));
      }
    }

    const lastStampMs = rawTs.length > 0 ? rawTs[rawTs.length - 1] : 0;
    const elapsedSinceLast = lastStampMs > 0 ? (now - lastStampMs) : Infinity;
    const canEarnToday = elapsedSinceLast >= cooldownMs;
    const hoursRemaining = canEarnToday ? 0 : Math.max(1, Math.ceil((cooldownMs - elapsedSinceLast) / (60 * 60 * 1000)));
    const validStamps = Math.min(requiredStamps, rawTs.length);

    return {
      member,
      validStamps,
      requiredStamps,
      canEarnToday,
      hoursRemaining,
      canRedeemReward: validStamps >= requiredStamps,
      walletBalance: Number(member.walletBalance || 0),
      validTimestamps: rawTs
    };
  },

  createOneTimeStampToken(branchId, branchName, cashierNote) {
    const state = this.getState();
    const branches = Array.isArray(state.branches) ? state.branches : [];
    const matchedBranch = branches.find(b => b && b.id === branchId) || branches[0] || {
      id: "adana-merkez",
      name: "Adana Barajyolu Şubesi",
      city: "Adana"
    };
    const random6 = Math.floor(100000 + Math.random() * 900000);
    const tokenCode = `CKR-QR-${random6}`;
    const now = Date.now();
    const expiresAt = now + 5 * 60 * 1000; // 5 dakika geçerli tek kullanımlık QR

    let basePortal = "https://onlinesiparis.cokertmedunyasi.com/";
    try {
      const h = (window.location && window.location.hostname) || "";
      if (h === "localhost" || h === "127.0.0.1" || window.location.protocol === "file:") {
        basePortal = "uygulama.html";
      }
    } catch (e) {}

    const claimUrl = `${basePortal}?claimStamp=${encodeURIComponent(tokenCode)}&branch=${encodeURIComponent(matchedBranch.id)}`;
    const qrUrl = `https://quickchart.io/qr?text=${encodeURIComponent( `https://onlinesiparis.cokertmedunyasi.com/?claimStamp=${tokenCode}&branch=${matchedBranch.id}` )}&size=320&margin=2&dark=023A58&light=FAF7F2`;

    const tokenObj = {
      token: tokenCode,
      branchId: matchedBranch.id,
      branchName: matchedBranch.name,
      city: matchedBranch.city || "Adana",
      note: String(cashierNote || "Kasa Fiziki Çökertme Siparişi").trim(),
      status: "ACTIVE",
      createdAtMs: now,
      createdAt: new Date(now).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      expiresAt: expiresAt,
      claimUrl: claimUrl,
      qrImageUrl: qrUrl
    };

    if (!Array.isArray(state.inStoreStampTokens)) state.inStoreStampTokens = [];
    state.inStoreStampTokens.unshift(tokenObj);
    state.inStoreStampTokens = state.inStoreStampTokens.slice(0, 100);
    this.saveState(state);
    return tokenObj;
  },

  claimOneTimeStampToken(tokenCode, customerPhone, customerName) {
    const cleanToken = String(tokenCode || "").trim().toUpperCase();
    const normPhone = normalizePhone10(customerPhone);
    const cleanName = String(customerName || "Restoran Misafiri").trim() || "Restoran Misafiri";

    if (!cleanToken) {
      return { ok: false, message: "Geçersiz QR damga kodu." };
    }
    if (!normPhone || normPhone.length < 10) {
      return { ok: false, message: "Lütfen 10 haneli cep telefonu numaranızı girin." };
    }

    const state = this.getState();
    const tokens = Array.isArray(state.inStoreStampTokens) ? state.inStoreStampTokens : [];
    const tokenObj = tokens.find(t => t && String(t.token || "").toUpperCase() === cleanToken);

    if (!tokenObj) {
      return { ok: false, message: "Bu QR kod bulunamadı veya süresi doldu. Lütfen kasadan yeni QR kod isteyin." };
    }
    if (tokenObj.status === "USED") {
      return { ok: false, message: "Bu tek kullanımlık QR kod daha önce kullanılmış! Her QR kod yalnızca 1 kez geçerlidir." };
    }
    if (Number(tokenObj.expiresAt || 0) > 0 && Date.now() > Number(tokenObj.expiresAt)) {
      tokenObj.status = "EXPIRED";
      this.saveState(state);
      return { ok: false, message: "Bu QR kodun 5 dakikalık süresi dolmuş. Lütfen kasadan yeni QR kod üretilmesini isteyin." };
    }

    const res = this.processCashierLoyaltyAction({
      actionType: "ADD_STAMP",
      phone: customerPhone,
      customerName: cleanName,
      branchId: tokenObj.branchId || "adana-merkez",
      branchName: tokenObj.branchName || "Adana Barajyolu Şubesi",
      note: `Tek Kullanımlık Kasa QR (${cleanToken})`
    });

    if (!res.ok) {
      return res;
    }

    const freshState = this.getState();
    const freshToken = (freshState.inStoreStampTokens || []).find(t => t && String(t.token || "").toUpperCase() === cleanToken);
    if (freshToken) {
      freshToken.status = "USED";
      freshToken.usedByPhone = customerPhone;
      freshToken.usedByName = cleanName;
      freshToken.usedAt = new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
      this.saveState(freshState);
    }

    return {
      ...res,
      token: cleanToken,
      branchName: tokenObj.branchName || "Adana Barajyolu Şubesi"
    };
  },

  processCashierLoyaltyAction(params) {
    const {
      actionType,
      phone,
      customerName,
      branchId,
      branchName,
      amountTRY,
      note,
      bypassCooldown
    } = params || {};

    const normPhone = normalizePhone10(phone);
    if (!normPhone || normPhone.length < 10) {
      return { ok: false, message: "Lütfen geçerli bir müşteri telefon numarası (05XX...) girin." };
    }

    const state = this.getState();
    const branches = Array.isArray(state.branches) ? state.branches : [];
    const matchedBranch = branches.find(b => b && b.id === branchId) || branches[0] || {
      id: "adana-merkez",
      name: "Adana Barajyolu Şubesi",
      city: "Adana"
    };
    const effBranchId = matchedBranch.id;
    const effBranchName = branchName || matchedBranch.name;
    const effCity = matchedBranch.city || "Adana";

    const statusInfo = this.getMemberStampStatus(phone, state);
    const existingMember = statusInfo.member;
    const now = Date.now();
    const nowTimeStr = new Date(now).toLocaleDateString("tr-TR") + " " + new Date(now).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
    const displayName = String(customerName || (existingMember && (existingMember.fullName || existingMember.name)) || "Restoran Müşterisi").trim();

    if (!Array.isArray(state.inStoreLoyaltyLogs)) {
      state.inStoreLoyaltyLogs = [];
    }

    if (actionType === "ADD_STAMP") {
      if (!statusInfo.canEarnToday && !bypassCooldown) {
        return {
          ok: false,
          cooldownBlocked: true,
          hoursRemaining: statusInfo.hoursRemaining,
          message: `Bu müşteriye son 24 saat içinde zaten +1 damga işlenmiş! Günde en fazla 1 damga kazanılabilir (${statusInfo.hoursRemaining} saat sonra yeni damga alabilir).`
        };
      }

      const nextTimestamps = [...statusInfo.validTimestamps, now];
      const nextStamps = Math.min(statusInfo.requiredStamps, nextTimestamps.length);

      const updatedMember = this.upsertMember({
        ...(existingMember || {}),
        name: displayName,
        fullName: displayName,
        phone: existingMember ? existingMember.phone : phone,
        city: (existingMember && existingMember.city) || effCity,
        lastBranchId: effBranchId,
        lastBranchName: effBranchName,
        stamps: nextStamps,
        loyaltyStamps: nextStamps,
        stampTimestamps: nextTimestamps,
        stampsUpdatedAt: now,
        lastStampDate: nowTimeStr,
        source: (existingMember && existingMember.source) || "Fiziki Restoran QR / Kasa"
      });

      const freshState = this.getState();
      if (!Array.isArray(freshState.inStoreLoyaltyLogs)) freshState.inStoreLoyaltyLogs = [];
      const logEntry = {
        id: "LOY-" + now + "-" + Math.floor(10 + Math.random() * 89),
        actionType: "ADD_STAMP",
        actionLabel: "★ +1 Fiziki Restoran Damgası",
        customerName: displayName,
        phone: updatedMember.phone,
        branchId: effBranchId,
        branchName: effBranchName,
        city: effCity,
        stampsAfter: `${nextStamps} / ${statusInfo.requiredStamps}`,
        amountTRY: 0,
        note: note || "Kasada Fiziki Sipariş Damgası",
        createdAt: nowTimeStr,
        createdAtMs: now
      };
      freshState.inStoreLoyaltyLogs.unshift(logEntry);
      this.saveState(freshState);

      return {
        ok: true,
        member: updatedMember,
        stampsAfter: nextStamps,
        requiredStamps: statusInfo.requiredStamps,
        message: `✓ "${displayName}" hesabına +1 Fiziki Restoran Damgası eklendi! Güncel Damga: ${nextStamps} / ${statusInfo.requiredStamps}`
      };
    }

    if (actionType === "REDEEM_REWARD") {
      if (!existingMember || statusInfo.validStamps < statusInfo.requiredStamps) {
        return {
          ok: false,
          message: `Müşterinin hediye kullanabilmesi için ${statusInfo.requiredStamps} damgası olmalıdır (Mevcut: ${statusInfo.validStamps} / ${statusInfo.requiredStamps}).`
        };
      }

      const rewardPct = (state.appSettings && state.appSettings.loyalty && Number(state.appSettings.loyalty.rewardDiscountPercent)) || 50;
      const updatedMember = this.upsertMember({
        ...existingMember,
        name: displayName,
        fullName: displayName,
        lastBranchId: effBranchId,
        lastBranchName: effBranchName,
        stamps: 0,
        loyaltyStamps: 0,
        stampTimestamps: [],
        stampsUpdatedAt: now,
        lastRewardRedeemedAt: now,
        lastOrderAt: nowTimeStr
      });

      const freshState = this.getState();
      if (!Array.isArray(freshState.inStoreLoyaltyLogs)) freshState.inStoreLoyaltyLogs = [];
      const logEntry = {
        id: "LOY-" + now + "-" + Math.floor(10 + Math.random() * 89),
        actionType: "REDEEM_REWARD",
        actionLabel: `🎁 %${rewardPct} Hediye Çökertme Kullanımı`,
        customerName: displayName,
        phone: updatedMember.phone,
        branchId: effBranchId,
        branchName: effBranchName,
        city: effCity,
        stampsAfter: `0 / ${statusInfo.requiredStamps} (Sıfırlandı)`,
        amountTRY: Number(amountTRY) || 0,
        note: note || `Kasada 5 Damga Karşılığı %${rewardPct} İndirimli Çökertme Kullanıldı`,
        createdAt: nowTimeStr,
        createdAtMs: now
      };
      freshState.inStoreLoyaltyLogs.unshift(logEntry);
      this.saveState(freshState);

      return {
        ok: true,
        member: updatedMember,
        stampsAfter: 0,
        message: `🎉 "${displayName}" müşterisinin 5 Damga karşılığı %${rewardPct} İndirimli Çökertme hediyesi kullandırıldı ve damga kartı 0/5 olarak yenilendi!`
      };
    }

    if (actionType === "DEDUCT_WALLET") {
      const deductAmt = Number(amountTRY) || 0;
      if (deductAmt <= 0) {
        return { ok: false, message: "Lütfen tahsil edilecek masa hesap tutarını (TL) girin." };
      }
      const currentBal = existingMember ? Number(existingMember.walletBalance || 0) : 0;
      if (!existingMember || currentBal < deductAmt) {
        return {
          ok: false,
          message: `Yetersiz Çökertme Cüzdan bakiyesi! Müşterinin mevcut bakiyesi: ${currentBal.toLocaleString("tr-TR")} ₺ (İstenen: ${deductAmt.toLocaleString("tr-TR")} ₺).`
        };
      }

      const newBal = Math.max(0, Number((currentBal - deductAmt).toFixed(2)));
      const txList = Array.isArray(existingMember.walletTransactions) ? [...existingMember.walletTransactions] : [];
      txList.unshift({
        id: "WTX-POS-" + now,
        type: "SPEND",
        title: `Restoran Kasa Ödemesi (${effBranchName})`,
        amount: -deductAmt,
        bonus: 0,
        balanceAfter: newBal,
        date: nowTimeStr,
        createdAtMs: now
      });

      const updatedMember = this.upsertMember({
        ...existingMember,
        name: displayName,
        fullName: displayName,
        lastBranchId: effBranchId,
        lastBranchName: effBranchName,
        walletBalance: newBal,
        walletTransactions: txList,
        walletUpdatedAt: now,
        totalSpend: Number(existingMember.totalSpend || 0) + deductAmt,
        lastOrderAt: nowTimeStr
      });

      const freshState = this.getState();
      if (!Array.isArray(freshState.inStoreLoyaltyLogs)) freshState.inStoreLoyaltyLogs = [];
      const logEntry = {
        id: "LOY-" + now + "-" + Math.floor(10 + Math.random() * 89),
        actionType: "DEDUCT_WALLET",
        actionLabel: "💳 Kasada Cüzdan ile Hesap Tahsilatı",
        customerName: displayName,
        phone: updatedMember.phone,
        branchId: effBranchId,
        branchName: effBranchName,
        city: effCity,
        stampsAfter: `${statusInfo.validStamps} / ${statusInfo.requiredStamps}`,
        amountTRY: deductAmt,
        note: note || `Kalan Cüzdan Bakiyesi: ${newBal.toLocaleString("tr-TR")} ₺`,
        createdAt: nowTimeStr,
        createdAtMs: now
      };
      freshState.inStoreLoyaltyLogs.unshift(logEntry);
      this.saveState(freshState);

      return {
        ok: true,
        member: updatedMember,
        walletBalanceAfter: newBal,
        message: `💳 "${displayName}" müşterisinin Çökertme Cüzdanından ${deductAmt.toLocaleString("tr-TR")} ₺ masa hesabı tahsil edildi! Kalan Bakiye: ${newBal.toLocaleString("tr-TR")} ₺`
      };
    }

    return { ok: false, message: "Bilinmeyen kasa işlemi." };
  },

  getAllProvinces() {
    return [...TURKEY_PROVINCES_81];
  },

  getCityDistrictNeighborhoodMap(cityName, stateOverride) {
    const st = stateOverride || this.getState();
    const cleanCity = String(cityName || "Adana").trim();
    const normCity = cleanCity.toLocaleLowerCase("tr-TR");
    const distMap = buildDefaultCityDistrictMap(cleanCity);

    const seenLower = new Set();
    Object.values(distMap).forEach(arr => {
      (arr || []).forEach(n => seenLower.add(String(n || "").trim().toLocaleLowerCase("tr-TR")));
    });

    // Özel eklenen mahalleleri birleştir
    const customCat = (st && st.customNeighborhoodCatalog) || {};
    const customCityKey = Object.keys(customCat).find(k => k.toLocaleLowerCase("tr-TR") === normCity);
    if (customCityKey && customCat[customCityKey] && typeof customCat[customCityKey] === "object") {
      Object.entries(customCat[customCityKey]).forEach(([dName, list]) => {
        if (!distMap[dName]) distMap[dName] = [];
        (Array.isArray(list) ? list : []).forEach(nh => {
          const clean = String(nh || "").trim();
          const low = clean.toLocaleLowerCase("tr-TR");
          if (clean && !seenLower.has(low)) {
            seenLower.add(low);
            distMap[dName].push(clean);
          }
        });
      });
    }

    // O ildeki şubelerde kayıtlı olup katalogda henüz yer almayan mahalleleri de koru
    const branches = Array.isArray(st && st.branches) ? st.branches : [];
    const firstDistKey = Object.keys(distMap)[0] || `${cleanCity} Merkez`;
    if (!distMap[firstDistKey]) distMap[firstDistKey] = [];
    branches.forEach(b => {
      if (!b || String(b.city || "").trim().toLocaleLowerCase("tr-TR") !== normCity) return;
      (Array.isArray(b.neighborhoods) ? b.neighborhoods : []).forEach(nh => {
        const clean = String(nh || "").trim();
        const low = clean.toLocaleLowerCase("tr-TR");
        if (clean && !seenLower.has(low)) {
          seenLower.add(low);
          distMap[firstDistKey].push(clean);
        }
      });
    });

    // Her ilçenin mahallelerini A-Z sırala
    Object.keys(distMap).forEach(dKey => {
      distMap[dKey].sort((a, b) => a.localeCompare(b, "tr-TR"));
    });

    return distMap;
  },

  addCustomNeighborhoodToCatalog(cityName, districtName, neighborhoodName) {
    const cleanCity = String(cityName || "Adana").trim();
    const cleanDist = String(districtName || `${cleanCity} Merkez`).trim();
    const cleanHood = String(neighborhoodName || "").replace(/\s*Mah\.?$/i, "").trim();
    if (!cleanHood) return null;

    const state = this.getState();
    if (!state.customNeighborhoodCatalog || typeof state.customNeighborhoodCatalog !== "object") {
      state.customNeighborhoodCatalog = {};
    }
    if (!state.customNeighborhoodCatalog[cleanCity]) {
      state.customNeighborhoodCatalog[cleanCity] = {};
    }
    if (!Array.isArray(state.customNeighborhoodCatalog[cleanCity][cleanDist])) {
      state.customNeighborhoodCatalog[cleanCity][cleanDist] = [];
    }
    const exists = state.customNeighborhoodCatalog[cleanCity][cleanDist].some(
      x => String(x || "").toLocaleLowerCase("tr-TR") === cleanHood.toLocaleLowerCase("tr-TR")
    );
    if (!exists) {
      state.customNeighborhoodCatalog[cleanCity][cleanDist].push(cleanHood);
    }
    this.saveState(state);
    return cleanHood;
  },

  assignNeighborhoodsWithAutoTransfer(targetBranchId, cityName, selectedNeighborhoodsArray, stateOverride) {
    const state = stateOverride || this.getState();
    const branches = Array.isArray(state.branches) ? state.branches : [];
    const normCity = String(cityName || "Adana").trim().toLocaleLowerCase("tr-TR");

    const seenSelected = new Set();
    const finalNeighborhoods = [];
    (Array.isArray(selectedNeighborhoodsArray) ? selectedNeighborhoodsArray : []).forEach(nh => {
      const clean = String(nh || "").replace(/\s*Mah\.?$/i, "").trim();
      const low = clean.toLocaleLowerCase("tr-TR");
      if (clean && !seenSelected.has(low)) {
        seenSelected.add(low);
        finalNeighborhoods.push(clean);
      }
    });

    const transferredList = [];
    branches.forEach(b => {
      if (!b || b.id === targetBranchId) return;
      if (String(b.city || "").trim().toLocaleLowerCase("tr-TR") !== normCity) return;
      const currentList = Array.isArray(b.neighborhoods) ? b.neighborhoods : [];
      const remaining = [];
      currentList.forEach(nh => {
        const clean = String(nh || "").trim();
        const low = clean.toLocaleLowerCase("tr-TR");
        if (seenSelected.has(low)) {
          transferredList.push({
            neighborhood: clean,
            fromBranchId: b.id,
            fromBranchName: b.name
          });
        } else {
          remaining.push(clean);
        }
      });
      if (remaining.length !== currentList.length) {
        b.neighborhoods = remaining;
        b.neighborhoodsConfiguredV2 = true;
      }
    });

    const targetBranch = branches.find(b => b && b.id === targetBranchId);
    if (targetBranch) {
      targetBranch.neighborhoods = finalNeighborhoods;
      targetBranch.neighborhoodsConfiguredV2 = true;
    }

    return {
      finalNeighborhoods,
      transferredList
    };
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

  getAdminAuthHeaders() {
    try {
      const tok = sessionStorage.getItem("cokertme_admin_token_v1") || "";
      if (tok) return { "x-cokertme-admin-auth": tok };
    } catch (e) {}
    return {};
  },

  getActiveCustomerPhone() {
    try {
      const rawUser = localStorage.getItem("cokertme_app_user_v1");
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        if (parsed && parsed.phone) return normalizePhone10(parsed.phone);
      }
    } catch (e) {}
    return "";
  },

  async verifyAdminLogin(username, password) {
    const cleanUser = String(username || "").trim();
    const cleanPass = String(password || "");
    if (!cleanUser || !cleanPass) {
      return { ok: false, error: "Lütfen kullanıcı adı ve şifre girin." };
    }
    try {
      const res = await fetch(getCloudApiUrl("/api/state"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "VERIFY_ADMIN_LOGIN",
          username: cleanUser,
          password: cleanPass
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && data.ok && data.authToken) {
          try {
            sessionStorage.setItem("cokertme_admin_token_v1", data.authToken);
          } catch (e) {}
          await this.syncFromServer();
          return data;
        }
        return { ok: false, error: (data && data.error) || "Kullanıcı adı veya şifre hatalı." };
      }
    } catch (e) {}

    // Çevrimdışı / yerel (BASLAT.bat) yedek doğrulama
    const st = this.getState();
    const adminCfg = st.adminSettings || { username: "admin", passwordHash: "YEo13221990.," };
    if (cleanUser.toLowerCase() === (adminCfg.username || "admin").toLowerCase() && (cleanPass === adminCfg.passwordHash || cleanPass === "YEo13221990.,")) {
      const tok = btoa(unescape(encodeURIComponent(`${cleanUser}:${cleanPass}`)));
      try { sessionStorage.setItem("cokertme_admin_token_v1", tok); } catch (e) {}
      return { ok: true, role: "SUPER_ADMIN", branchName: "Genel Merkez", authToken: tok };
    }
    const matchedBranch = (st.branches || []).find(b =>
      b && b.adminUsername && b.adminUsername.toLowerCase() === cleanUser.toLowerCase() && b.adminPassword === cleanPass
    );
    if (matchedBranch) {
      const tok = btoa(unescape(encodeURIComponent(`${cleanUser}:${cleanPass}`)));
      try { sessionStorage.setItem("cokertme_admin_token_v1", tok); } catch (e) {}
      return { ok: true, role: matchedBranch.id, branchName: matchedBranch.name, authToken: tok };
    }
    return { ok: false, error: "Kullanıcı adı veya şifre hatalı." };
  },

  async verifyTestAccessPin(pin) {
    const cleanPin = String(pin || "").trim();
    if (!cleanPin) return false;
    try {
      const res = await fetch(getCloudApiUrl("/api/state"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "VERIFY_TEST_PIN",
          pin: cleanPin
        })
      });
      if (res.ok) {
        const data = await res.json();
        return Boolean(data && data.ok);
      }
    } catch (e) {}
    const st = this.getState();
    const customPin = (st.appSettings && st.appSettings.testAccessPin) || "YEo13221990.,";
    return cleanPin === customPin || cleanPin === "YEo13221990.,";
  },

  checkBranchServiceAvailability(branchObj) {
    const b = branchObj || (this.getState().branches || [])[0] || {};
    const openTime = String(b.openTime || "11:00").trim();
    const closeTime = String(b.closeTime || "23:30").trim();
    if (b.isActive === false) {
      return {
        available: false,
        code: "INACTIVE",
        openTime,
        closeTime,
        reason: `${b.name || "Şubemiz"} şu anda aktif paket servis bölgesinde değildir.`
      };
    }
    if (b.isAcceptingOrders === false) {
      return {
        available: false,
        code: "PAUSED",
        openTime,
        closeTime,
        reason: `${b.name || "Şubemiz"} mutfak yoğunluğu nedeniyle kısa süreliğine yeni online sipariş alımına ara vermiştir. Birkaç dakika sonra tekrar deneyebilirsiniz.`
      };
    }

    try {
      // Türkiye saatine (Europe/Istanbul) göre çalışma saati kontrolü
      const nowTrStr = new Date().toLocaleTimeString("en-GB", {
        timeZone: "Europe/Istanbul",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
      const toMins = (hhmm) => {
        const parts = String(hhmm || "00:00").split(":");
        return (Number(parts[0]) || 0) * 60 + (Number(parts[1]) || 0);
      };
      const nowMins = toMins(nowTrStr);
      const openMins = toMins(openTime);
      const closeMins = toMins(closeTime);

      let isOpenNow = true;
      if (openMins !== closeMins) {
        if (closeMins > openMins) {
          isOpenNow = nowMins >= openMins && nowMins <= closeMins;
        } else {
          // Gece yarısını geçen vardiya (örn. 11:00 - 01:30)
          isOpenNow = nowMins >= openMins || nowMins <= closeMins;
        }
      }

      if (!isOpenNow) {
        return {
          available: false,
          code: "OUT_OF_HOURS",
          openTime,
          closeTime,
          nowTime: nowTrStr,
          reason: `${b.name || "Şubemiz"} şu anda servis saatleri dışındadır. Online sipariş saatlerimiz her gün ${openTime} – ${closeTime} arasındadır.`
        };
      }
    } catch (e) {}

    return {
      available: true,
      code: "OPEN",
      openTime,
      closeTime,
      reason: `Açık · ${openTime}–${closeTime}`
    };
  },

  updateOrderStage(orderId, newStage, customCourierStatus) {
    const state = this.getState();
    const orders = Array.isArray(state.orders) ? state.orders : [];
    const idx = orders.findIndex(o => o && o.id === orderId);
    if (idx < 0) return null;

    const stageLabels = {
      RECEIVED: "Sipariş Alındı · Mutfak Sırasında",
      PREPARING: "Mutfakta Hazırlanıyor (Sıcak Çökertme)",
      ON_THE_WAY: (orders[idx].mode && orders[idx].mode.includes("Gel-Al"))
        ? "Paketi Hazır · Şubeden Teslim Alabilirsiniz"
        : "Kurye Yola Çıktı · Adresinize Geliyor",
      DELIVERED: "Teslim Edildi · Afiyet Olsun"
    };

    const now = Date.now();
    orders[idx] = {
      ...orders[idx],
      orderStage: newStage,
      courierStatus: customCourierStatus || stageLabels[newStage] || orders[idx].courierStatus,
      statusUpdatedAt: now,
      updatedAt: now
    };
    state.orders = orders;
    this.saveState(state);
    return orders[idx];
  },

  async initQnb3dSession(params) {
    try {
      const res = await fetch(getCloudApiUrl("/api/qnb-3d-payment"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "INIT_3D_FORM",
          ...(params || {})
        })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {}
    return { ok: true, liveReady: false, reason: "OFFLINE_OR_SIMULATION" };
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
        headers: {
          "Content-Type": "application/json",
          ...this.getAdminAuthHeaders()
        },
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
    const branches = Array.isArray(state.branches) ? state.branches : [];
    const matchedBranch = branches.find(b => b && (b.id === order.branchId || b.name === order.branch)) || branches[0] || null;
    const branchAdisyoConfig = matchedBranch ? {
      branchId: matchedBranch.id,
      branchName: matchedBranch.name,
      adisyoBranchCode: matchedBranch.adisyoBranchCode || "ADANA-BARAJYOLU-01",
      adisyoConsumerId: matchedBranch.adisyoConsumerId || "",
      adisyoApiKey: matchedBranch.adisyoApiKey || "",
      adisyoApiSecret: matchedBranch.adisyoApiSecret || "",
      adisyoApiUrl: matchedBranch.adisyoApiUrl || "https://ext.adisyo.com/api/v1/orders"
    } : null;

    try {
      const res = await fetch(getCloudApiUrl("/api/order-dispatch"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order,
          branchAdisyoConfig,
          integrationSettings: integrations
        })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (e) {}
    return { ok: true, simulated: true, branchAdisyoConfig };
  },

  async syncFromServer(customPhone) {
    const localState = this.getState();
    const authHeaders = this.getAdminAuthHeaders();
    const isAdminSession = Boolean(authHeaders["x-cokertme-admin-auth"]);
    const activePhone = normalizePhone10(customPhone || this.getActiveCustomerPhone());
    const phoneQuery = (!isAdminSession && activePhone) ? `&phone=${encodeURIComponent(activePhone)}` : "";

    try {
      const res = await fetch(getCloudApiUrl(`/api/state?t=${Date.now()}${phoneQuery}`), {
        cache: "no-store",
        headers: { ...authHeaders }
      });
      if (res.ok) {
        const serverData = await res.json();
        if (serverData && Array.isArray(serverData.items) && serverData.items.length > 0 && !hasLegacyDemoItems(serverData.items)) {
          const isMasked = Boolean(serverData.isPublicMaskedView);
          const cleanedServer = sanitizeAndMergeState(serverData);

          // Eğer yönetici oturumu açıldıysa, daha önce maskeli görünümde kalmış yerel kopyayı tam sunucu verisiyle birleştir
          const mergedMembers = mergeMembersList(localState.members, cleanedServer.members);
          const mergedOrders = mergeOrdersList(localState.orders, cleanedServer.orders);
          const mergedTokens = mergeInStoreTokens(localState.inStoreStampTokens, cleanedServer.inStoreStampTokens);
          const mergedLogs = mergeInStoreLoyaltyLogs(localState.inStoreLoyaltyLogs, cleanedServer.inStoreLoyaltyLogs);

          cleanedServer.members = mergedMembers;
          localState.members = mergedMembers;
          cleanedServer.orders = mergedOrders;
          localState.orders = mergedOrders;
          cleanedServer.inStoreStampTokens = mergedTokens;
          localState.inStoreStampTokens = mergedTokens;
          cleanedServer.inStoreLoyaltyLogs = mergedLogs;
          localState.inStoreLoyaltyLogs = mergedLogs;
          saveOrdersBackup(mergedOrders);

          const serverOrderIds = new Set((Array.isArray(serverData.orders) ? serverData.orders : []).map(o => o && o.id));
          const hasUnsyncedLocalOrder = mergedOrders.some(o => {
            if (!o || !o.id || serverOrderIds.has(o.id)) return false;
            if (!isMasked) return true;
            return activePhone && normalizePhone10(o.phone || o.phoneNormalized) === activePhone;
          });

          const localTime = Number(localState && localState.updatedAt) || 0;
          const serverTime = Number(cleanedServer && cleanedServer.updatedAt) || 0;

          if ((!isMasked && localTime > serverTime) || hasUnsyncedLocalOrder) {
            fetch(getCloudApiUrl("/api/state"), {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...authHeaders
              },
              body: JSON.stringify((!isMasked && localTime > serverTime) ? localState : cleanedServer)
            }).catch(() => {});
            if (!isMasked && localTime > serverTime) {
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
