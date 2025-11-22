# Panduan Convert JapaCard ke APK (Android)

Karena JapaCard berbasis Streamlit (Python), cara terbaik menjadikannya aplikasi mobile adalah dengan membungkusnya menggunakan React Native (Expo).

## Langkah 1: Deploy Streamlit App
Sebelum membuat APK, aplikasi Python Anda harus online terlebih dahulu.
1. Push kode `app.py`, `requirements.txt`, dll ke GitHub.
2. Buka [share.streamlit.io](https://share.streamlit.io).
3. Hubungkan repo GitHub Anda dan deploy.
4. **Copy URL aplikasi** (contoh: `https://japacard.streamlit.app`).

## Langkah 2: Setup Mobile Project
1. Edit file `mobile/App.tsx` di folder project ini.
2. Ganti variabel `STREAMLIT_URL` dengan URL aplikasi Anda dari Langkah 1.

## Langkah 3: Build APK menggunakan EAS (Expo Application Services)
Anda memerlukan Node.js dan akun Expo.

1. **Install dependencies:**
   \`\`\`bash
   cd mobile
   npm install
   npm install -g eas-cli
   \`\`\`

2. **Login ke Expo:**
   \`\`\`bash
   eas login
   \`\`\`

3. **Konfigurasi Build:**
   \`\`\`bash
   eas build:configure
   \`\`\`
   (Pilih `Android`)

4. **Generate APK:**
   \`\`\`bash
   eas build -p android --profile preview
   \`\`\`
   
5. **Download:**
   Setelah proses selesai, EAS akan memberikan link download file `.apk` yang bisa langsung diinstall di HP Android.

## Catatan Penting
- **Izin Mikrofon**: Script `App.tsx` sudah dikonfigurasi untuk meminta izin mikrofon agar fitur rekam suara Streamlit berjalan lancar di dalam aplikasi.
- **Koneksi Internet**: Karena ini adalah wrapper web, pengguna **wajib online** saat menggunakan aplikasi.
