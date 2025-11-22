"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Mic, Volume2, SkipForward, RotateCcw } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { hiraganaData } from "@/data/hiragana-data"

export function HiraganaFlashcard() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [evaluationResult, setEvaluationResult] = useState<{
    score: number
    feedback: string
    category: string
  } | null>(null)
  const [scoreHistory, setScoreHistory] = useState<number[]>([])

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioContextRef = useRef<AudioContext | null>(null)

  const currentCard = hiraganaData[currentIndex]
  const progress = ((currentIndex + 1) / hiraganaData.length) * 100

  const playNativeAudio = () => {
    const utterance = new SpeechSynthesisUtterance(currentCard.romaji)
    utterance.lang = "ja-JP"
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        await evaluateAudio(audioBlob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("[v0] Error accessing microphone:", error)
      alert("Tidak dapat mengakses mikrofon. Pastikan izin mikrofon sudah diberikan.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const evaluateAudio = async (audioBlob: Blob) => {
    // Simulasi evaluasi audio dengan Web Audio API
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioContext()
      }

      const arrayBuffer = await audioBlob.arrayBuffer()
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer)

      // Analisis sederhana: durasi dan volume
      const duration = audioBuffer.duration
      const channelData = audioBuffer.getChannelData(0)
      let sum = 0
      for (let i = 0; i < channelData.length; i++) {
        sum += Math.abs(channelData[i])
      }
      const avgVolume = sum / channelData.length

      // Scoring heuristic berdasarkan durasi dan volume
      let score = 50
      if (duration > 0.3 && duration < 2) score += 20
      if (avgVolume > 0.01) score += 20
      score += Math.random() * 20 // Randomness untuk variasi

      score = Math.min(100, Math.max(0, Math.round(score)))

      let category = "Perlu Latihan"
      let feedback = "Coba perjelas pelafalan Anda."

      if (score >= 85) {
        category = "Sempurna"
        feedback = "Luar biasa! Pelafalan sangat baik!"
      } else if (score >= 70) {
        category = "Baik"
        feedback = "Bagus! Terus latihan untuk hasil lebih baik."
      }

      setEvaluationResult({ score, feedback, category })
      setScoreHistory((prev) => [...prev, score])
    } catch (error) {
      console.error("[v0] Error evaluating audio:", error)
      setEvaluationResult({
        score: 50,
        feedback: "Terjadi kesalahan saat evaluasi. Coba lagi.",
        category: "Error",
      })
    }
  }

  const nextCard = () => {
    if (currentIndex < hiraganaData.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setEvaluationResult(null)
    }
  }

  const resetProgress = () => {
    setCurrentIndex(0)
    setEvaluationResult(null)
    setScoreHistory([])
  }

  const averageScore =
    scoreHistory.length > 0 ? Math.round(scoreHistory.reduce((a, b) => a + b, 0) / scoreHistory.length) : 0

  return (
    <div className="grid lg:grid-cols-[1fr_300px] gap-6">
      {/* Main Flashcard */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Progress: {currentIndex + 1} / {hiraganaData.length}
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={resetProgress}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>

        <Progress value={progress} className="h-2" />

        <Card className="border-2 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
            <div className="flex justify-between items-center">
              <CardTitle>Kartu #{currentIndex + 1}</CardTitle>
              {averageScore > 0 && (
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                  Rata-rata: {averageScore}
                </Badge>
              )}
            </div>
            <CardDescription className="text-red-50">{currentCard.example}</CardDescription>
          </CardHeader>

          <CardContent className="pt-8 space-y-6">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-2xl p-12 text-center shadow-inner border">
              <span className="text-9xl font-bold text-foreground block mb-3">{currentCard.hiragana}</span>
              <span className="text-3xl text-muted-foreground font-medium">"{currentCard.romaji}"</span>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                variant="outline"
                onClick={playNativeAudio}
                className="border-red-200 hover:bg-red-50 text-red-600 bg-transparent"
              >
                <Volume2 className="mr-2 h-5 w-5" />
                Dengar Pelafalan
              </Button>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 border-t bg-muted/30 p-6">
            <div className="w-full text-center space-y-3">
              <p className="text-sm font-medium text-muted-foreground">Rekam pelafalan Anda:</p>
              <Button
                size="lg"
                className={`w-full shadow-md transition-all ${
                  isRecording ? "bg-red-600 hover:bg-red-700 animate-pulse" : "bg-red-500 hover:bg-red-600"
                }`}
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onTouchStart={startRecording}
                onTouchEnd={stopRecording}
              >
                <Mic className="mr-2 h-5 w-5" />
                {isRecording ? "Merekam..." : "Tahan untuk Rekam"}
              </Button>
            </div>

            {evaluationResult && (
              <Alert
                className={
                  evaluationResult.category === "Sempurna"
                    ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                    : evaluationResult.category === "Baik"
                      ? "bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800"
                      : "bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800"
                }
              >
                <AlertTitle
                  className={
                    evaluationResult.category === "Sempurna"
                      ? "text-green-800 dark:text-green-200"
                      : evaluationResult.category === "Baik"
                        ? "text-blue-800 dark:text-blue-200"
                        : "text-orange-800 dark:text-orange-200"
                  }
                >
                  {evaluationResult.category}: {evaluationResult.score}%
                </AlertTitle>
                <AlertDescription
                  className={
                    evaluationResult.category === "Sempurna"
                      ? "text-green-700 dark:text-green-300"
                      : evaluationResult.category === "Baik"
                        ? "text-blue-700 dark:text-blue-300"
                        : "text-orange-700 dark:text-orange-300"
                  }
                >
                  {evaluationResult.feedback}
                </AlertDescription>
              </Alert>
            )}

            <Button
              variant="default"
              size="lg"
              onClick={nextCard}
              disabled={currentIndex === hiraganaData.length - 1}
              className="w-full"
            >
              <SkipForward className="mr-2 h-4 w-4" />
              Kartu Berikutnya
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Riwayat Skor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {scoreHistory.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">Belum ada skor. Mulai merekam!</p>
            ) : (
              <div className="space-y-2">
                {scoreHistory.map((score, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                    <span className="text-sm">Kartu #{idx + 1}</span>
                    <Badge variant={score >= 85 ? "default" : score >= 70 ? "secondary" : "outline"}>{score}%</Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Statistik</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Latihan:</span>
              <span className="font-semibold">{scoreHistory.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Rata-rata Skor:</span>
              <span className="font-semibold">{averageScore}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Progress:</span>
              <span className="font-semibold">{Math.round(progress)}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-lg text-red-700 dark:text-red-300">Tips Belajar</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2 text-red-600 dark:text-red-400">
              <li>• Dengarkan pelafalan native dengan teliti</li>
              <li>• Rekam di tempat yang tenang</li>
              <li>• Ulangi jika skor di bawah 70%</li>
              <li>• Fokus pada intonasi yang benar</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
