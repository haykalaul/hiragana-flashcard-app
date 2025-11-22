# Panduan Setup Android Emulator (Android Studio)

Dokumen ini menjelaskan langkah-langkah menginstal dan mengatur Android Emulator untuk menjalankan aplikasi Expo/React Native di komputer (Windows/Mac).

## 1. Install Android Studio

Emulator Android adalah bagian dari **Android Studio**.

1. Download Android Studio dari [situs resmi](https://developer.android.com/studio).
2. Jalankan installer.
3. Saat instalasi, pastikan opsi **"Android Virtual Device"** dicentang.
4. Pilih instalasi **"Standard"** saat setup wizard berjalan pertama kali.

## 2. Install SDK Tools

Setelah Android Studio terbuka:

1. Klik tombol **More Actions** (titik tiga) > **SDK Manager**.
2. Masuk ke tab **SDK Tools**.
3. Pastikan item berikut dicentang:
   - **Android SDK Build-Tools**
   - **Android Emulator**
   - **Android SDK Platform-Tools**
   - **Intel x86 Emulator Accelerator (HAXM installer)** (Jika menggunakan prosesor Intel)
4. Klik **Apply** dan tunggu proses download selesai.

## 3. Konfigurasi Environment Variable (PENTING)

Agar Expo bisa mengenali emulator, Anda harus mengatur "Environment Variables".

### Untuk Windows:
1. Buka Search Bar Windows, ketik **"Edit the system environment variables"**, tekan Enter.
2. Klik tombol **Environment Variables**.
3. Di bagian **User variables**, klik **New**:
   - Variable name: `ANDROID_HOME`
   - Variable value: `%LOCALAPPDATA%\Android\Sdk` (Biasanya di `C:\Users\NamaUser\AppData\Local\Android\Sdk`)
4. Cari variable bernama **Path**, klik **Edit**, lalu **New**. Tambahkan lokasi ini:
   - `%LOCALAPPDATA%\Android\Sdk\platform-tools`
5. Klik OK di semua window.

### Untuk macOS (Zsh):
Tambahkan baris ini ke file `~/.zshrc` atau `~/.bash_profile`:

\`\`\`bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
\`\`\`

## 4. Buat Virtual Device (Emulator)

1. Buka Android Studio.
2. Klik **More Actions** > **Virtual Device Manager**.
3. Klik **Create device**.
4. Pilih Hardware: Pilih **Pixel 6** atau **Pixel 7** (pastikan ada icon Play Store). Klik Next.
5. Pilih System Image: Pilih versi Android terbaru (misalnya **Tiramisu** atau **UpsideDownCake**).
   - Klik tombol **Download** di sebelahnya jika belum terdownload.
6. Klik Next, lalu **Finish**.

## 5. Menjalankan Aplikasi

1. Di Android Studio > Virtual Device Manager, klik tombol **Play** (segitiga hijau) pada emulator yang baru dibuat. Tunggu sampai HP menyala.
2. Buka terminal di folder project `mobile/` Anda:
   \`\`\`bash
   cd mobile
   npx expo start
   \`\`\`
3. Setelah server jalan, tekan tombol **`a`** di keyboard.
4. Expo akan otomatis menginstal aplikasi "Expo Go" di emulator dan membuka proyek Anda.

## Troubleshooting

- **Error "adb not found"**: Artinya langkah no. 3 (Environment Variable) belum benar. Coba restart laptop setelah setting variable.
- **Emulator lambat**: Pastikan fitur "Hyper-V" atau "Virtualization" (VT-x/AMD-V) sudah aktif di BIOS laptop Anda.
