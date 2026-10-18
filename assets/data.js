/**
 * ÇÖKERTME DÜNYASI - Merkezi Veri ve Durum Yönetimi (Multi-Tenant & Çoklu Dil/Para Birimi)
 * Hem yerel sunucu (API) hem de tarayıcı (localStorage) ile çift yönlü senkronize çalışır.
 */

const DEFAULT_COKERTME_DATA = {
  brand: {
    name: "Çökertme Dünyası",
    slogan: "Muğla'nın Efsanesi, Adana'dan Dünyaya",
    headquarters: "Çukurova / Adana, Türkiye",
    phone: "+90 (322) 455 01 48",
    whatsapp: "905320000148",
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
      icon: "🥘",
      name: {
        tr: "İmza Çökertme Kebapları",
        en: "Signature Çökertme Kebabs",
        de: "Signature Çökertme Kebabs",
        ar: "كباب تشوكيرتمي المميز"
      }
    },
    {
      id: "baslangiclar",
      icon: "🫒",
      name: {
        tr: "Ege & Akdeniz Başlangıçlar",
        en: "Aegean & Med Starters",
        de: "Ägäische Vorspeisen",
        ar: "مقبلات بحر إيجة والمتوسط"
      }
    },
    {
      id: "salatalar",
      icon: "🥗",
      name: {
        tr: "Ferah Salatalar & Mezeler",
        en: "Fresh Salads & Mezes",
        de: "Frische Salate & Meze",
        ar: "سلطات ومقبلات طازجة"
      }
    },
    {
      id: "tatlilar",
      icon: "🍯",
      name: {
        tr: "Geleneksel Tatlılar",
        en: "Traditional Desserts",
        de: "Traditionelle Desserts",
        ar: "حلويات تقليدية"
      }
    },
    {
      id: "icecekler",
      icon: "🍋",
      name: {
        tr: "Ferahlatıcı İçecekler"
      }
    },
    {
      id: "ikramlar",
      icon: "🎁",
      name: {
        tr: "Masa İkramlarımız"
      }
    }
  ],
  items: [
    {
      id: "item-1",
      categoryId: "cokertmeler",
      name: {
        tr: "Bodrum Klasik Dana Bonfile Çökertme",
        en: "Bodrum Classic Beef Tenderloin Çökertme",
        de: "Bodrum Klassik Rinderfilet Çökertme",
        ar: "تشوكيرتمي لحم بقري كلاسيك على طريقة بودروم"
      },
      desc: {
        tr: "Altında altın sarısı çıtır kibrit patates, süzme yoğurt, kekik ve zeytinyağı ile marine edilmiş jülyen dana bonfile, üzerinde halis tereyağlı köz domates sosu.",
        en: "Crispy matchstick potatoes topped with strained garlic yogurt, olive-oil marinated beef tenderloin strips, and sizzling butter tomato sauce.",
        de: "Knusprige Streichholz-Kartoffeln mit Joghurt, mariniertem Rinderfilet und heißer Tomaten-Butter-Sauce.",
        ar: "بطاطس مقرمشة مع لبن زبادي، شرائح لحم بقري متبلة بزيت الزيتون وصلصة الطماطم بالزبدة."
      },
      price: 440,
      calories: "720 kcal",
      prepTime: "14 dk",
      badges: ["Şefin İmza Tabağı", "En Çok Satan"],
      available: true,
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "item-2",
      categoryId: "cokertmeler",
      name: {
        tr: "Adana Ateşi Acılı Bonfile Çökertme",
        en: "Adana Fire Spicy Tenderloin Çökertme",
        de: "Adana Feuer Pikantes Rinderfilet Çökertme",
        ar: "تشوكيرتمي أضنة الحار بلحم الفيليه"
      },
      desc: {
        tr: "Muğla ile Adana'nın muhteşem buluşması! Çıtır kibrit patates ve sarımsaklı süzme yoğurt üzerinde közlenmiş kapya biberli, hafif acılı zırh soslu dana bonfile.",
        en: "Where Muğla meets Adana! Crispy matchstick potatoes and yogurt topped with spicy roasted red pepper & tenderloin.",
        de: "Wo Muğla auf Adana trifft! Knusprige Kartoffeln und Joghurt mit pikantem Rinderfilet und gerösteter Paprika.",
        ar: "لقاء موغلا وأضنة! بطاطس مقرمشة ولبن مع لحم بقري متبل بالفلفل الأحمر المشوي الحار."
      },
      price: 460,
      calories: "750 kcal",
      prepTime: "15 dk",
      badges: ["Adana Özel", "Hafif Acılı 🌶️"],
      available: true,
      image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "item-3",
      categoryId: "cokertmeler",
      name: {
        tr: "Ege Zeytinyağlı & Dağ Kekikli Tavuk Çökertme",
        en: "Aegean Olive Oil & Thyme Chicken Çökertme",
        de: "Ägäis Olivenöl & Thymian Hähnchen Çökertme",
        ar: "تشوكيرتمي الدجاج بزيت الزيتون والزعتر البري"
      },
      desc: {
        tr: "Soğuk sıkım Milas zeytinyağı ve dağ kekiği ile dinlendirilmiş ızgara tavuk bonfile dilimleri, çıtır kibrit patates, süzme yoğurt ve fesleğenli domates sos.",
        en: "Grilled chicken tenderloin marinated in cold-pressed Milas olive oil and mountain thyme over crispy potatoes and yogurt.",
        de: "Gegrilltes Hähnchenfilet in kaltgepresstem Olivenöl und Bergthymian auf knusprigen Kartoffeln und Joghurt.",
        ar: "شرائح دجاج مشوية متبلة بزيت زيتون ميلاس والزعتر الجبلي فوق البطاطس المقرمشة واللبن."
      },
      price: 330,
      calories: "590 kcal",
      prepTime: "12 dk",
      badges: ["Ferah & Hafif", "Popüler"],
      available: true,
      image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "item-4",
      categoryId: "cokertmeler",
      name: {
        tr: "Gurme Kasap Köfteli Çökertme",
        en: "Gourmet Butcher Meatball Çökertme",
        de: "Gourmet Köfte Çökertme",
        ar: "تشوكيرتمي كفتة الجزار الفاخرة"
      },
      desc: {
        tr: "Odun ateşinde ızgara edilmiş özel baharatlı dana-kuzu kasap köfteleri, altında altın sarısı çıtır patates yatağı, süzme yoğurt ve köpüklü tereyağı.",
        en: "Charcoal-grilled artisan butcher meatballs served over golden crispy matchstick potatoes, strained yogurt, and browned butter.",
        de: "Holzkohlegegrillte Köfte auf goldenen knusprigen Kartoffeln, Joghurt und gebräunter Butter.",
        ar: "كفتة مشوية على الفحم تقدم فوق البطاطس المقرمشة الذهبية واللبن والزبدة."
      },
      price: 380,
      calories: "680 kcal",
      prepTime: "14 dk",
      badges: ["Çocukların Favorisi"],
      available: true,
      image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "item-5",
      categoryId: "cokertmeler",
      name: {
        tr: "Çökertme Dünyası Duble Karışık Sultan Tabağı",
        en: "Çökertme World Double Mixed Royal Platter",
        de: "Çökertme Welt Doppel-Mix Platte",
        ar: "طبق عالم تشوكيرتمي الملكي المشكل دبل"
      },
      desc: {
        tr: "Hem jülyen dana bonfile, hem ızgara kasap köfte, hem de kekikli tavuk dilimleri! Bol çıtır patates, manda süzme yoğurdu, köz biber ve domates ile.",
        en: "The ultimate feast combining beef tenderloin, butcher meatballs, and thyme chicken over extra crispy potatoes and buffalo yogurt.",
        de: "Rinderfilet, Köfte und Thymian-Hähnchen kombiniert auf extra knusprigen Kartoffeln und Joghurt.",
        ar: "مزيج رائع من لحم الفيليه والكفتة والدجاج بالزعتر فوق البطاطس المقرمشة واللبن."
      },
      price: 560,
      calories: "940 kcal",
      prepTime: "16 dk",
      badges: ["Duble Porsiyon", "Gurme Seçim"],
      available: true,
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "item-6",
      categoryId: "baslangiclar",
      name: {
        tr: "Bodrum Usulü Zeytinyağlı Kabak Çiçeği Dolması",
        en: "Bodrum Style Stuffed Zucchini Blossoms",
        de: "Gefüllte Zucchiniblüten nach Bodrum-Art",
        ar: "محشي زهور الكوسا بزيت الزيتون على طريقة بودروم"
      },
      desc: {
        tr: "Sabah erken toplanmış taze kabak çiçekleri içerisinde dereotlu, naneli, kuş üzümlü pirinç harcı ve sızma zeytinyağı.",
        en: "Morning-picked zucchini blossoms stuffed with herbed rice, currants, dill, and extra virgin olive oil.",
        de: "Frische Zucchiniblüten gefüllt mit Kräuterreis und kaltgepresstem Olivenöl.",
        ar: "زهور الكوسا الطازجة المحشوة بالأرز والأعشاب وزيت الزيتون البكر."
      },
      price: 165,
      calories: "240 kcal",
      prepTime: "5 dk",
      badges: ["Ege Klasik", "Vejetaryen"],
      available: true,
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "item-7",
      categoryId: "baslangiclar",
      name: {
        tr: "Adana Usulü Çıtır İçli Köfte (Adet)",
        en: "Adana Style Crispy Kibbeh (Per Piece)",
        de: "Knusprige İçli Köfte nach Adana-Art",
        ar: "كبة مقلية مقرمشة على طريقة أضنة (للقطعة)"
      },
      desc: {
        tr: "İncecik bulgur dışı, bol cevizli ve zırh kıymalı iç harcıyla sıcak servis edilen geleneksel lezzet.",
        en: "Thin bulgur shell filled with minced meat, walnuts, and warm spices.",
        de: "Dünne Bulgurhülle gefüllt mit Hackfleisch, Walnüssen und Gewürzen.",
        ar: "كبة برغل رقيقة محشوة باللحم المفروم والجوز والتوابل."
      },
      price: 85,
      calories: "210 kcal",
      prepTime: "6 dk",
      badges: ["Sıcak Başlangıç"],
      available: true,
      image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "item-8",
      categoryId: "baslangiclar",
      name: {
        tr: "Baharatlı Çıtır Kibrit Patates Sepeti",
        en: "Spiced Crispy Matchstick Potato Basket",
        de: "Knuspriger Streichholz-Kartoffelkorb",
        ar: "سلة البطاطس المقرمشة المتبلة"
      },
      desc: {
        tr: "Çökertme kebabımızın meşhur altın sarısı kibrit patatesleri; kekikli süzme yoğurt dip sos ile.",
        en: "Our famous golden crispy matchstick potatoes served with a side of thyme strained yogurt dip.",
        de: "Unsere berühmten goldenen Streichholz-Kartoffeln mit Thymian-Joghurt-Dip.",
        ar: "بطاطس تشوكيرتمي الذهبية الشهيرة تقدم مع صلصة اللبن بالزعتر."
      },
      price: 130,
      calories: "360 kcal",
      prepTime: "8 dk",
      badges: ["Paylaşımlık"],
      available: true,
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "item-9",
      categoryId: "salatalar",
      name: {
        tr: "Bergama Tulumlu & Kırma Zeytinli Akdeniz Salatası",
        en: "Mediterranean Salad with Bergama Tulum Cheese & Olives",
        de: "Mediterraner Salat mit Tulum-Käse & Oliven",
        ar: "سلطة البحر المتوسط مع جبنة تولوم والزيتون الأخضر"
      },
      desc: {
        tr: "Yedikule marulu, roka, yeşil kırma zeytin, Bergama tulum peyniri, çeri domates ve nar ekşili sızma zeytinyağı sosu.",
        en: "Artisan greens, crushed green olives, aged Bergama tulum cheese, cherry tomatoes, and pomegranate olive oil dressing.",
        de: "Frischer Salat mit grünen Oliven, Tulum-Käse, Kirschtomaten und Granatapfel-Olivenöl-Dressing.",
        ar: "خضروات طازجة مع الزيتون الأخضر وجبنة تولوم وصلصة دبس الرمان وزيت الزيتون."
      },
      price: 175,
      calories: "280 kcal",
      prepTime: "6 dk",
      badges: ["Ferah Seçim"],
      available: true,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "item-10",
      categoryId: "salatalar",
      name: {
        tr: "Bol Cevizli Gavurdağı Salatası",
        en: "Walnut Gavurdagi Salad",
        de: "Gavurdağı-Salat mit Walnüssen",
        ar: "سلطة غافورداغ بالجوز ودبس الرمان"
      },
      desc: {
        tr: "İnce kıyım domates, salatalık, kırmızı soğan, bol kelebek ceviz ve hakiki sumaklı nar ekşisi sosu.",
        en: "Finely diced tomatoes, cucumber, red onion, generous walnuts, sumac, and artisan pomegranate molasses.",
        de: "Fein gewürfelte Tomaten, Gurken, Walnüsse, Sumach und Granatapfelsirup.",
        ar: "طماطم مفرومة ناعماً مع الجوز والسماق ودبس الرمان الأصلي."
      },
      price: 160,
      calories: "260 kcal",
      prepTime: "6 dk",
      badges: ["Klasik"],
      available: true,
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "item-11",
      categoryId: "tatlilar",
      name: {
        tr: "Tahinli & Cevizli Çıtır Kabak Tatlısı",
        en: "Crispy Pumpkin Dessert with Tahini & Walnuts",
        de: "Kürbis-Dessert mit Tahini & Walnüssen",
        ar: "حلوى اليقطين بالطحينة والجوز"
      },
      desc: {
        tr: "Kireçte bekletilmiş çıtır bal kabağı, üzerinde çifte kavrulmuş Bozkır tahini ve bol ceviz.",
        en: "Traditional candied crispy pumpkin topped with double-roasted tahini and crushed walnuts.",
        de: "Traditioneller knuspriger Kürbis mit doppelt geröstetem Tahini und Walnüssen.",
        ar: "حلوى اليقطين المقرمشة مع الطحينة المحمصة والجوز."
      },
      price: 165,
      calories: "380 kcal",
      prepTime: "5 dk",
      badges: ["Şefin Tavsiyesi"],
      available: true,
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "item-12",
      categoryId: "tatlilar",
      name: {
        tr: "Dondurmalı Sıcak İrmik Helvası",
        en: "Warm Semolina Halva with Maraş Ice Cream",
        de: "Warmes Grieß-Halva mit Eis",
        ar: "حلاوة السميد الدافئة مع الآيس كريم"
      },
      desc: {
        tr: "Tereyağı ve çam fıstığı ile kavrulmuş sıcak irmik helvası, ortasında hakiki keçi sütlü dondurma.",
        en: "Warm semolina halva roasted with pine nuts and butter, filled with traditional goat's milk ice cream.",
        de: "Warmes Grieß-Halva mit Pinienkernen, gefüllt mit traditionellem Eis.",
        ar: "حلاوة السميد الدافئة بالصنوبر والزبدة محشوة بالآيس كريم التقليدي."
      },
      price: 175,
      calories: "420 kcal",
      prepTime: "7 dk",
      badges: ["En Çok Satan Tatlı"],
      available: true,
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "item-13",
      categoryId: "icecekler",
      name: {
        tr: "Bakır Maşrapada Bol Köpüklü Yayık Ayranı",
        en: "Foamy Churned Buttermilk (Ayran) in Copper Mug",
        de: "Schaumiger Yayık Ayran im Kupferbecher",
        ar: "عيران رغوي تقليدي في كوب نحاسي"
      },
      desc: {
        tr: "Doğal süzme yoğurttan günlük çırpılmış, taze nane yaprağı dokunuşlu buz gibi yayık ayranı.",
        en: "Daily churned artisan yogurt drink served ice-cold in a traditional copper mug with fresh mint.",
        de: "Täglich frisch geschlagener Joghurt-Drink, eiskalt im Kupferbecher serviert.",
        ar: "لبن عيران طازج مخفوق يومياً يقدم بارداً في كوب نحاسي تقليدي."
      },
      price: 65,
      calories: "95 kcal",
      prepTime: "2 dk",
      badges: ["Tam Uyum"],
      available: true,
      image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "item-14",
      categoryId: "icecekler",
      name: {
        tr: "Bodrum Mandalina Gazozu / Ev Yapımı Naneli Limonata",
        en: "Bodrum Tangerine Soda / Homemade Mint Lemonade",
        de: "Bodrum Mandarinen-Limonade / Hausgemachte Minz-Limonade",
        ar: "صودا يوسفي بودروم / ليموناضة بالنعناع منزلية الصنع"
      },
      desc: {
        tr: "Ege'nin kokulu Bodrum mandalinası veya taze sıkım Çukurova limonlarından naneli ferahlatıcı lezzet.",
        en: "Aromatic Bodrum tangerine soda or freshly squeezed Çukurova lemonade with garden mint.",
        de: "Aromatische Bodrum-Mandarinenlimonade oder frisch gepresste Zitronenlimonade mit Minze.",
        ar: "مشروب يوسفي بودروم المنعش أو عصير الليمون الطازج بالنعناع."
      },
      price: 80,
      calories: "110 kcal",
      prepTime: "2 dk",
      badges: ["Ege Esintisi"],
      available: true,
      image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80"
    }
  ],
  branches: [
    {
      id: "adana-merkez",
      name: "Adana Çukurova Merkez Şube (Amiral Mağaza)",
      city: "Adana",
      country: "Türkiye",
      status: "Açık - Hizmetinizde",
      address: "Turgut Özal Bulvarı, Çukurova / Adana",
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
      items: ["1x Bodrum Klasik Dana Bonfile Çökertme", "1x Bakır Maşrapada Yayık Ayranı"],
      subtotal: 505,
      discount: 50.5,
      total: 454.5,
      pointsEarned: 22.7,
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
    stamps: 3, // 5 olunca 1 Çökertme Hediye!
    tier: "Gümüş Gurme"
  }
};

const STORAGE_KEY = "cokertme_dunyasi_state_v1";

const CokertmeStore = {
  getState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COKERTME_DATA));
        return JSON.parse(JSON.stringify(DEFAULT_COKERTME_DATA));
      }
      const parsed = JSON.parse(raw);
      const merged = { ...DEFAULT_COKERTME_DATA, ...parsed };
      if (merged.categories && !merged.categories.some(c => c.id === "ikramlar")) {
        merged.categories.push({
          id: "ikramlar",
          icon: "🎁",
          name: { tr: "Masa İkramlarımız" }
        });
      }
      return merged;
    } catch (e) {
      return JSON.parse(JSON.stringify(DEFAULT_COKERTME_DATA));
    }
  },

  saveState(newState) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      // Eğer yerel Node.js sunucusu çalışıyorsa oraya da kaydet
      fetch("/api/state", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newState)
      }).catch(() => {});
    } catch (e) {
      console.error("Kaydetme hatası:", e);
    }
  },

  async syncFromServer() {
    try {
      const res = await fetch("/api/state", { cache: "no-store" });
      if (res.ok) {
        const serverData = await res.json();
        if (serverData && serverData.items) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(serverData));
          return serverData;
        }
      }
    } catch (e) {
      // Sunucu kapalıysa doğrudan localStorage ile çalışmaya devam eder
    }
    return this.getState();
  },

  resetToDefaults() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COKERTME_DATA));
    this.saveState(DEFAULT_COKERTME_DATA);
    return DEFAULT_COKERTME_DATA;
  },

  formatPrice(amountTRY) {
    if (amountTRY === undefined || amountTRY === null || Number(amountTRY) <= 0) {
      return "İKRAM";
    }
    return `${Math.round(amountTRY)} ₺`;
  }
};

window.CokertmeStore = CokertmeStore;
