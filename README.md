# Kelime Bilmece 🎯

Kelime Bilmece, kullanıcıların bilgisayarın rastgele seçtiği kelimeleri tahmin etmeye çalıştığı eğlenceli bir web tabanlı kelime oyunudur. Oyun, Türkçe kelimeler ve TDK sözlük entegrasyonu ile zenginleştirilmiş bir deneyim sunar.

## 🎮 Oyun Özellikleri

- Rastgele kelime seçimi
- TDK sözlük entegrasyonu ile kelimelerin anlamlarını görüntüleme
- Harf alma özelliği
- Anlık geri bildirim sistemi
- Mobil uyumlu tasarım

## 🛠️ Kullanılan Teknolojiler

- **HTML5**: Oyunun temel yapısı için
- **CSS3**: Modern ve responsive tasarım için
  - Flexbox layout sistemi
  - CSS Grid
  - Modern CSS özellikleri (CSS Variables, Nested Rules)
- **JavaScript (Vanilla)**: Oyun mantığı ve interaktif özellikler için
  - Async/Await
  - Fetch API
  - DOM Manipülasyonu
- **TDK API**: Kelimelerin sözlük anlamlarını almak için

## 📁 Proje Yapısı

```
KelimeBilmece/
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── index.js
│   └── json/
│       └── words.json
└── index.html
```

## 🎯 Oyun Mantığı

1. Oyun başladığında, `words.json` dosyasından rastgele bir kelime seçilir
2. Seçilen kelimenin TDK'daki anlamı API üzerinden alınır ve gösterilir
3. Oyuncu kelimenin harflerini tahmin eder
4. "Harf Al" butonu ile rastgele bir harf açılabilir
5. "Tahmin Et" butonu ile girilen kelime kontrol edilir
6. Doğru tahmin durumunda oyun kazanılır, yanlış tahmin durumunda tekrar deneme hakkı verilir

## 🎨 Tasarım Özellikleri

- Modern ve minimalist arayüz
- Responsive tasarım (mobil uyumlu)
- Kullanıcı dostu arayüz
- Görsel geri bildirim sistemi
- Özel font kullanımı (Google Fonts)

## 🚀 Özellikler

- **Kelime Havuzu**: Geniş Türkçe kelime veritabanı
- **TDK Entegrasyonu**: Kelimelerin gerçek sözlük anlamlarını görüntüleme
- **Harf Yardımı**: Oyunu kolaylaştırmak için harf alma özelliği
- **Anlık Geri Bildirim**: Doğru/yanlış tahminler için görsel geri bildirim
- **Yeniden Oynama**: Oyun bitiminde yeni kelime ile devam etme seçeneği

## 🔧 Kurulum

1. Projeyi klonlayın:

```bash
git clone https://github.com/MrDemirtas/KelimeBilmece.git
```

2. Proje dizinine gidin:

```bash
cd KelimeBilmece
```

3. `index.html` dosyasını bir web tarayıcısında açın

## 🎮 Nasıl Oynanır?

1. Oyun başladığında, bilgisayar rastgele bir kelime seçer
2. Kelimenin TDK'daki anlamı ipucu olarak gösterilir
3. Kelimeyi tahmin etmek için harfleri girin
4. Zorlanırsanız "Harf Al" butonunu kullanarak yardım alabilirsiniz
5. Tahmininizi "Tahmin Et" butonu ile kontrol edin
6. Doğru bilirseniz tebrikler! Yanlış bilirseniz tekrar deneyebilirsiniz
