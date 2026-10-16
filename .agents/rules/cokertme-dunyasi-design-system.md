---
trigger: always_on
description: Çökertme Dünyası (cokertmedunyasi.com) PatioTime Demo 4 kurumsal web ve dijital ekosistem tasarım kuralları. Yeni sayfa açılırken veya mevcut sayfalar düzenlenirken bu tasarıma %100 sadık kalınmalıdır.
---

# Çökertme Dünyası (`cokertmedunyasi.com`) — Zorunlu Tasarım ve Mimari Kuralları

Kullanıcı yeni bir sayfa açmak istediğinde veya mevcut sayfalarda değişiklik talep ettiğinde `index.html` ve `menu.html` sayfalarındaki **PatioTime Demo 4** tasarım dili birebir uygulanmalıdır:

1. **Renkler & Fontlar:**
   - Başlıklar: `'Cormorant Garamond', Georgia, serif`
   - Gövde ve Butonlar: `'Jost', sans-serif`
   - Ana Renkler: Derin Deniz Mavisi (`#023A58` / Footer `#14314F`), Zeytin Yeşili (`#3B5233`), Terracotta Turuncu (`#dd5903`), Altın Sarısı (`#D49B35` / `#F3D999`), Sıcak Krem (`#FAF7F2`).

2. **Üst Header & Mobil Tek Satır Standardı (`.pt-header`):**
   - Sayfa başında şeffaf, kaydırınca `#3B5233` zeytin yeşili olan 3 sütunlu header.
   - Mobilde (`max-width: 980px` ve `480px`) sol taraftaki `MENÜ` yazısı (`.pt-menu-label`) gizlenir, ortadaki `ÇÖKERTME DÜNYASI` logosu ve alt başlığı `white-space: nowrap` ile tek satırda tutulur, sağdaki buton `.pt-btn-extra` gizlenerek tek satırda kalır. Asla çok satırlı sıkışık header kullanılmaz.

3. **3 Katmanlı Dalgalı SVG Geçişleri (`.pt-wave-bottom` & `.pt-footer-wave-top`):**
   - Hero bölümünün altında ve `#14314F` renkli Footer'ın üst kısmında mutlaka PatioTime Demo 4'ün 3 katmanlı dalgalı SVG geçişi kullanılmalıdır; düz kesim alt kısım kullanılmamalıdır.

4. **Sol Kayar Menü (`.pt-sidemenu`):**
   - Tüm sayfalarda sol üst hamburger menüden açılan krem zeminli, altın kenarlıklı kayar navigasyon menüsü yer almalı ve yeni eklenen her sayfa bu menüye bağlanmalıdır.
