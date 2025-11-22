# Aplikasi Mobile JapCard

## Ikhtisar

JapCard adalah aplikasi mobile yang dibangun sebagai pembungkus (wrapper) dari aplikasi flashcard berbasis Streamlit yang dirancang untuk membantu pengguna belajar karakter Hiragana Jepang. Aplikasi mobile ini dikembangkan menggunakan React Native dengan Expo dan menggunakan WebView untuk menampilkan aplikasi Streamlit, memberikan pengalaman mobile yang mulus dengan fitur tambahan seperti evaluasi suara melalui akses mikrofon.

## Fitur Utama (MVP)

- Pembungkus mobile untuk aplikasi flashcard JapCard berbasis Streamlit.
- Fitur evaluasi suara menggunakan input mikrofon.
- Indikator pemuatan untuk meningkatkan pengalaman pengguna saat memulai aplikasi.
- Penanganan kesalahan untuk penolakan izin mikrofon.
- Dukungan lintas platform untuk iOS dan Android melalui Expo.
- Siap untuk dibangun dan didistribusikan sebagai APK untuk perangkat Android menggunakan Expo Application Services (EAS).

## Persyaratan Non-Fungsional

- Membutuhkan koneksi internet yang stabil untuk berinteraksi dengan backend Streamlit (aplikasi berbasis web).
- Izin mikrofon wajib untuk fitur evaluasi suara.
- Warna tema aplikasi menggunakan warna merah (#FF6B6B).
- Pembuatan APK dilakukan melalui Expo EAS.
- Aplikasi Streamlit harus sudah dideploy secara online sebelum mengonfigurasi aplikasi mobile.

## Instruksi Setup dan Deploy

### 1. Deploy Aplikasi Streamlit

Aplikasi inti JapCard adalah aplikasi Streamlit berbasis Python.

1. Push file aplikasi Streamlit (`app.py`, `requirements.txt`, dll) ke repositori GitHub.
2. Buka [share.streamlit.io](https://share.streamlit.io).
3. Hubungkan repositori GitHub Anda dan deploy aplikasi.
4. Salin URL aplikasi Streamlit yang sudah dideploy (contoh: `https://japacard.streamlit.app`).

### 2. Setup Pembungkus Mobile

1. Masuk ke folder `mobile` pada proyek ini.
2. Edit file `mobile/App.tsx`.
3. Ganti nilai konstanta `STREAMLIT_URL` dengan URL aplikasi Streamlit Anda dari langkah 1.

### 3. Menjalankan Aplikasi Mobile Secara Lokal

Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/).

```bash
cd mobile
npm install
npm start
```

Anda dapat menjalankan aplikasi pada emulator/simulator Android atau iOS, atau perangkat fisik menggunakan Expo Go.

### 4. Membuat APK (Android) dengan Expo EAS

Ikuti langkah berikut untuk membangun APK untuk perangkat Android:

1. Instal dependencies dan EAS CLI:

```bash
cd mobile
npm install
npm install -g eas-cli
```

2. Login ke Expo:

```bash
eas login
```

3. Konfigurasikan build untuk Android:

```bash
eas build:configure
```

Pilih `Android` saat konfigurasi.

4. Bangun APK:

```bash
eas build -p android --profile preview
```

5. Setelah proses selesai, Anda akan mendapatkan tautan unduh file `.apk` yang dapat langsung diinstall di perangkat Android.

### Catatan Penting

- Aplikasi meminta izin mikrofon untuk mengaktifkan fitur evaluasi suara pada aplikasi Streamlit.
- Karena aplikasi ini berbasis WebView, pengguna harus terhubung ke internet agar aplikasi berjalan.
- Warna tema aplikasi menggunakan warna merah (#FF6B6B) secara konsisten di seluruh elemen UI.

## Struktur Folder Proyek

```
.
├── app/                      # File sumber aplikasi web
├── components/               # Komponen UI untuk aplikasi web
├── data/                     # Sumber data Hiragana
├── lib/                      # Fungsi utilitas
├── mobile/                   # Pembungkus aplikasi mobile React Native Expo
│   ├── App.tsx               # Entry point aplikasi React Native
│   ├── app.json              # Konfigurasi aplikasi Expo
│   └── package.json          # Dependencies dan skrip aplikasi mobile
├── public/                   # Aset statis seperti ikon dan gambar
├── scripts/                  # Skrip utilitas (misal setup audio)
├── styles/                   # File CSS/styling
├── README.md                 # File readme proyek
├── HOW_TO_BUILD_APK.md       # Instruksi build APK aplikasi
├── package.json              # Dependencies proyek (web app)
├── requirements.txt          # Dependencies Python untuk aplikasi Streamlit
└── next.config.mjs           # Konfigurasi Next.js (untuk web)
```

## Dokumentasi

- Aplikasi Streamlit berisi fungsi inti dan logika untuk flashcard, kuis interaktif, dan evaluasi suara.
- Aplikasi mobile (`mobile` folder) menangani manajemen izin, status pemuatan, dan menyematkan aplikasi Streamlit melalui WebView.
- Lihat `HOW_TO_BUILD_APK.md` untuk instruksi detail konversi aplikasi ke APK mobile.
- Komponen frontend dan utilitas diorganisasi dalam folder `components` dan `lib`.
- Styling dikelola melalui file CSS di folder `styles/`.

## Kontribusi

Lihat [CONTRIBUTING.md](CONTRIBUTING.md) untuk panduan kontribusi ke proyek ini.

---

Terima kasih telah menggunakan JapCard! Kami berharap aplikasi ini membantu perjalanan Anda dalam menguasai Hiragana Jepang.
