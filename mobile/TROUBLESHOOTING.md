# Troubleshooting Error: "Failed to download remote update"

Jika Anda mengalami error `java.io.IOException: Failed to download remote update` saat menggunakan Expo Go, ikuti langkah-langkah ini:

## 1. Pastikan Jaringan Sama (Paling Penting)
HP Android dan Laptop/PC Anda **WAJIB** terhubung ke jaringan Wi-Fi yang sama.
- Jika menggunakan data seluler di HP, matikan dan gunakan Wi-Fi.
- Jika Wi-Fi kantor/publik memblokir koneksi antar perangkat, coba gunakan **Mobile Hotspot** (Tethering) dari HP ke Laptop.

## 2. Clear Cache Expo
Coba jalankan perintah ini di terminal folder `mobile/`:
\`\`\`bash
npx expo start --clear
\`\`\`

## 3. Ganti Tipe Koneksi ke "Tunnel"
Jika jaringan Wi-Fi memblokir koneksi LAN, gunakan mode Tunnel (sedikit lebih lambat tapi menembus firewall):
\`\`\`bash
npx expo start --tunnel
\`\`\`

## 4. Hapus Data Aplikasi Expo Go
Kadang cache di aplikasi Expo Go di Android rusak.
1. Buka **Settings** di HP Android.
2. Pilih **Apps** > **Expo Go**.
3. Pilih **Storage** > **Clear Data** & **Clear Cache**.
4. Scan ulang QR code.

## 5. Periksa Firewall Laptop
Pastikan Firewall Windows/MacOS tidak memblokir Node.js. Matikan firewall sementara untuk mengetes.
