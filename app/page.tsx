import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Mic, Volume2, Play, Smartphone, Terminal, Download } from "lucide-react"
import { HiraganaFlashcard } from "@/components/hiragana-flashcard"

export default function JapaCardPreview() {
  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent mb-2">
          JapaCard
        </h1>
        <p className="text-lg text-muted-foreground">Belajar Hiragana dengan Evaluasi Pelafalan AI</p>
      </header>

      <HiraganaFlashcard />

      <Tabs defaultValue="preview" className="w-full mt-12">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="preview">App Simulation</TabsTrigger>
          <TabsTrigger value="streamlit">Run Streamlit (PC)</TabsTrigger>
          <TabsTrigger value="mobile">Build APK (Android)</TabsTrigger>
        </TabsList>

        {/* TAB 1: VISUAL SIMULATION */}
        <TabsContent value="preview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold mb-4">Simulasi Tampilan App</h2>
              <Card className="w-full max-w-md mx-auto border-2 border-red-100 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-t-lg">
                  <div className="flex justify-between items-center">
                    <CardTitle>Latihan #1</CardTitle>
                    <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                      Score: 85
                    </Badge>
                  </div>
                  <CardDescription className="text-red-100">Pelafalan Karakter Dasar</CardDescription>
                </CardHeader>
                <CardContent className="pt-8 text-center space-y-6">
                  <div className="bg-white rounded-xl p-8 shadow-inner border border-gray-100">
                    <span className="text-8xl font-bold text-gray-800 block mb-2">あ</span>
                    <span className="text-2xl text-gray-500 font-medium">"a"</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-500">Contoh Kata:</p>
                    <div className="flex items-center justify-center gap-2 text-lg font-medium">
                      <Volume2 className="w-5 h-5 text-red-500 cursor-pointer" />
                      <span>Arigatou (Terima kasih)</span>
                    </div>
                  </div>

                  <div className="flex justify-center gap-4 pt-4">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-red-200 hover:bg-red-50 text-red-600 bg-transparent"
                    >
                      <Volume2 className="mr-2 h-4 w-4" /> Dengar Native
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 border-t bg-gray-50 rounded-b-lg p-6">
                  <div className="w-full text-center space-y-2">
                    <p className="text-sm font-medium text-gray-600">Giliran Anda:</p>
                    <Button
                      size="lg"
                      className="w-full bg-red-500 hover:bg-red-600 shadow-md transition-all active:scale-95"
                    >
                      <Mic className="mr-2 h-5 w-5" /> Tahan untuk Rekam
                    </Button>
                  </div>

                  <Alert className="bg-green-50 border-green-200">
                    <AlertTitle className="text-green-800 font-semibold">Hasil Evaluasi: Baik! (82%)</AlertTitle>
                    <AlertDescription className="text-green-700 text-xs">
                      Intonasi sudah bagus, coba lebih perjelas vokal akhir.
                    </AlertDescription>
                  </Alert>
                </CardFooter>
              </Card>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-950 text-slate-50 p-6 rounded-lg font-mono text-sm">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2 mb-4 text-slate-400">
                  <Terminal className="w-4 h-4" />
                  <span>Logic Processing (app.py)</span>
                </div>
                <div className="space-y-2 opacity-90">
                  <p>
                    <span className="text-purple-400">def</span> <span className="text-blue-400">evaluate_audio</span>
                    (user_audio, ref_audio):
                  </p>
                  <p className="pl-4 text-gray-500"># 1. Extract Features with Librosa</p>
                  <p className="pl-4">user_mfcc = librosa.feature.mfcc(y=user_audio)</p>
                  <p className="pl-4">ref_mfcc = librosa.feature.mfcc(y=ref_audio)</p>
                  <p className="pl-4">&nbsp;</p>
                  <p className="pl-4 text-gray-500"># 2. Calculate Similarity</p>
                  <p className="pl-4">score = cosine_similarity(user_mfcc, ref_mfcc)</p>
                  <p className="pl-4">&nbsp;</p>
                  <p className="pl-4">
                    <span className="text-purple-400">return</span> score
                  </p>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Fitur Mobile (React Native)</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50">
                    <Smartphone className="w-8 h-8 text-blue-500 mb-2" />
                    <span className="text-sm font-medium">Native Wrapper</span>
                  </div>
                  <div className="flex flex-col items-center p-4 border rounded-lg hover:bg-gray-50">
                    <Mic className="w-8 h-8 text-red-500 mb-2" />
                    <span className="text-sm font-medium">Mic Permissions</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* TAB 2: RUN STREAMLIT */}
        <TabsContent value="streamlit">
          <Card>
            <CardHeader>
              <CardTitle>Cara Menjalankan Aplikasi (Mode Developer)</CardTitle>
              <CardDescription>Jalankan versi web lokal di komputer Anda menggunakan Python</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Download className="w-4 h-4" /> Langkah 1: Install Dependencies
                </h3>
                <div className="bg-slate-100 p-4 rounded-md font-mono text-sm text-slate-800">
                  pip install -r requirements.txt
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Play className="w-4 h-4" /> Langkah 2: Jalankan Streamlit
                </h3>
                <div className="bg-slate-100 p-4 rounded-md font-mono text-sm text-slate-800">streamlit run app.py</div>
              </div>

              <Alert>
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>
                  Pastikan Anda memiliki Python 3.8+ terinstall. Aplikasi akan terbuka otomatis di browser default Anda
                  (biasanya http://localhost:8501).
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: BUILD APK */}
        <TabsContent value="mobile">
          <Card>
            <CardHeader>
              <CardTitle>Panduan Build APK Android</CardTitle>
              <CardDescription>
                Mengubah aplikasi Streamlit menjadi file .apk menggunakan React Native & Expo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3 mb-4">
                <div className="p-4 border rounded bg-blue-50 border-blue-100">
                  <div className="font-bold text-blue-700 mb-1">1. Deploy Web</div>
                  <div className="text-sm text-blue-600">Upload kode Python ke GitHub & deploy di Streamlit Share.</div>
                </div>
                <div className="p-4 border rounded bg-purple-50 border-purple-100">
                  <div className="font-bold text-purple-700 mb-1">2. Setup Expo</div>
                  <div className="text-sm text-purple-600">Edit mobile/App.tsx dan masukkan URL website Anda.</div>
                </div>
                <div className="p-4 border rounded bg-green-50 border-green-100">
                  <div className="font-bold text-green-700 mb-1">3. Build Cloud</div>
                  <div className="text-sm text-green-600">Jalankan command EAS Build untuk mendapatkan APK.</div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">Command Build (di folder /mobile)</h3>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-md font-mono text-sm overflow-x-auto">
                  <p className="text-gray-400"># 1. Install Mobile Dependencies</p>
                  <p>npm install</p>
                  <br />
                  <p className="text-gray-400"># 2. Login ke Expo (Buat akun jika belum punya)</p>
                  <p>npx eas-cli login</p>
                  <br />
                  <p className="text-gray-400"># 3. Build APK Android</p>
                  <p>npx eas-cli build -p android --profile preview</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
