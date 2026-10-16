# Çökertme Dünyası (`cokertmedunyasi.com`) — Kurumsal Web & Dijital Ekosistem Tasarım Kuralları

Bu projede oluşturulan veya güncellenen **tüm web sayfaları, alt sayfalar, bileşenler ve modüller** koşulsuz olarak `cokertmedunyasi.com` ana sayfasının ([`index.html`](index.html)) ve À la Carte menü sayfasının ([`menu.html`](menu.html)) **PatioTime Demo 4 (Mediterranean / Seafood / Fine Dining)** tasarım mimarisine %100 sadık kalmalıdır.

---

## 1. Renk Paleti (CSS Değişkenleri Standardı)

Yeni bir sayfa veya bileşen oluşturulurken aşağıdaki CSS değişkenleri (`:root`) birebir kullanılmalıdır:

```css
:root {
  --pt-navy: #023A58;           /* Ana başlıklar, metinler ve derin Ege denizi vurgusu */
  --pt-navy-dark: #14314F;      /* Footer ve koyu arka plan bölümleri */
  --pt-olive: #3B5233;          /* Sticky header, zeytin yeşili rozet ve ikincil vurgular */
  --pt-olive-dark: #283822;     /* Koyu zeytin tonu */
  --pt-terracotta: #dd5903;     /* Birincil aksiyon butonları (CTA) ve fiyat/vurgu rengi */
  --pt-gold: #D49B35;           /* İnce çizgiler, yıldızlar, çerçeve ve lüks detaylar */
  --pt-gold-soft: #F3D999;      /* Koyu zemin üzerindeki altın sarısı metinler */
  --pt-cream: #FAF7F2;          /* Sıcak krem kart ve alternatif bölüm arka planı */
  --pt-white: #FFFFFF;          /* Ana sayfa zemin rengi */
  --pt-text: #033A58;           /* Gövde metin rengi */
  --pt-text-muted: rgba(3, 58, 88, 0.72);
  --pt-border: rgba(3, 58, 88, 0.14);
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Jost', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

---

## 2. Tipografi Kuralları

- **Başlık Fontu (`--font-serif`):** Google Fonts `'Cormorant Garamond'` (`400, 500, 600, 700` ve `italic`). Tüm `h1, h2, h3, h4`, ürün isimleri, KPI rakamları ve bölüm başlıklarında kullanılır.
- **Gövde & Kontroller (`--font-sans`):** Google Fonts `'Jost'` (`300, 400, 500, 600, 700`). Tüm açıklamalar, butonlar (`letter-spacing: 0.14em; text-transform: uppercase;`), üst bar linkleri ve etiketlerde kullanılır.
- **Bölüm Üst Başlığı (`.pt-subtitle`):** Sağında ve solunda `28px` altın sarısı (`--pt-gold`) ince çizgi bulunan, büyük harfli (`uppercase`), `0.2em` harf aralıklı zeytin yeşili (`--pt-olive`) alt başlık yapısı kullanılmalıdır.

---

## 3. Zorunlu Sayfa İskeleti (Header, Sidemenu, Hero, Dalgalı SVG ve Footer)

Yeni açılacak **her sayfada** şu 5 ana yapı standart olarak yer almalıdır:

1. **Sol Kayar Menü (`.pt-sidemenu` & `.pt-sidemenu-backdrop`):**
   - Sol üstteki hamburger butonuna tıklandığında soldan kayarak açılan (`#FAF7F2` krem zeminli, sağ kenarı `3px solid var(--pt-gold)`) navigasyon çekmecesi.
   - İçerisinde tüm ekosistem sayfalarına (`index.html`, `menu.html`, `uygulama.html`, `yonetim.html` ve yeni eklenecek sayfalara) bağlantılar bulunmalıdır.

2. **Üst Header (`.pt-header` — Overlap & Sticky):**
   - Sayfa en üstteyken şeffaf (`transparent`), aşağı kaydırıldığında (`.scrolled` sınıfı ile) `rgba(59, 82, 51, 0.97)` zeytin yeşili ve altın alt çizgili yapışkan (sticky) bar.
   - **Mobil Kuralı (`@media (max-width: 980px)` ve `480px`):** Mobilde üst bar **kesinlikle alt satıra kaymamalıdır (`white-space: nowrap`)**.
     - Sol tarafta `.pt-menu-label` (`MENÜ` yazısı) mobilde `display: none` ile gizlenmeli, yalnızca 3 çizgili hamburger ikonu görünmelidir.
     - Ortadaki `ÇÖKERTME DÜNYASI` başlığı ve alt başlığı tek satırda (`white-space: nowrap`) kalmalıdır.
     - Sağdaki aksiyon butonu (`.pt-btn-outline`) mobilde tek kelimelik/kısa versiyona (`.pt-btn-extra { display: none; }`) düşerek tek satırda kalmalıdır.

3. **Sayfa Hero Alanı + 3 Katmanlı Dalgalı SVG Alt Geçişi (`.pt-page-hero` + `.pt-wave-bottom`):**
   - Her sayfanın üst kısmında yüksek çözünürlüklü, koyu Ege/Akdeniz gradyan filtreli bir Hero alanı ve hemen altında bir sonraki bölümün zemin rengine (`#FFFFFF` veya `#FAF7F2`) yumuşak geçiş yapan **3 katmanlı dalgalı SVG (`opacity=".25"`, `opacity=".5"`, `1.0`)** yer almalıdır.

4. **İçerik Bölümleri & Menü Listeleme (`food-menu-style-3`):**
   - Yemek ve fiyat listelemelerinde kesik çizgili (`border-bottom: 1px dashed rgba(3, 58, 88, 0.25)`) **PatioTime Demo 4 À La Carte (`food-menu-style-3`)** 2 sütunlu hizalama kullanılmalıdır.
   - Kartlarda aşırı yuvarlatılmış köşeler yerine keskin veya çok hafif pahlı, üst kenarında `linear-gradient(90deg, var(--pt-olive), var(--pt-gold), var(--pt-navy))` şerit bulunan `.pt-luxury-card` yapısı tercih edilmelidir.

5. **3 Katmanlı Dalgalı SVG Footer (`.pt-footer` + `.pt-footer-wave-top`):**
   - Tüm sayfaların en altı `#14314F` (derin Ege laciverti) renginde olmalı ve üst kısmında `.pt-footer-wave-top` ile **3 katmanlı dalgalı SVG geçişi** bulunmalıdır (düz kesim footer kesinlikle kullanılmamalıdır).

---

## 4. İş Modeli ve Fonksiyonel Kurallar

- **Masadaki QR Menü (`menu.html` / `/menu`):** Sadece görüntüleme (**View-Only**) modundadır. Masadan sepete ekleme veya sipariş verme butonu **bulunmamalıdır**. 4 dil (`TR`, `EN`, `DE`, `AR`) ve 3 para birimi (`₺`, `€`, `$`) desteklenir.
- **Mobil Uygulama (`uygulama.html` / `/uygulama`):** Sadece **Eve Paket Servis** ve **Gel-Al (Şubeden Teslim)** siparişleri içindir. Otomatik **%10 Mobil Uygulama İndirimi**, **%5 Çökertme Puan** ve **5 Al 1 Hediye** damga kartı sistemi içerir.
- **Merkez Yönetim (`yonetim.html` / `/yonetim`):** `CokertmeStore` (`assets/data.js`) üzerinden yapılan fiyat ve stok değişiklikleri QR kodları değiştirmeye gerek kalmadan anında tüm sayfalara yansır.
- **Canlı Yayın (GitHub & Vercel):** Yapılan tüm sayfa tasarımları ve güncellemeler `https://github.com/cokertmedunyasi/cokertme-dunyasi` deposuna push edilerek `https://cokertmedunyasi.com` üzerinde canlıya alınmalıdır.
