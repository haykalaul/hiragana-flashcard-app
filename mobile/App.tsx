"use client"

import { useState, useEffect } from "react"
import { StyleSheet, View, ActivityIndicator, SafeAreaView, StatusBar, Text } from "react-native"
import { WebView } from "react-native-webview"
import { Audio } from "expo-av"

export default function App() {
  // GANTI URL INI dengan URL aplikasi Streamlit yang sudah dideploy (misal: share.streamlit.io)
  const STREAMLIT_URL = "https://japacard-demo.streamlit.app"

  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  useEffect(() => {
    ;(async () => {
      // Meminta izin audio saat aplikasi pertama kali dibuka
      const { status } = await Audio.requestPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  // Loading state render
  const LoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#FF6B6B" />
      <Text style={styles.loadingText}>Memuat JapaCard...</Text>
    </View>
  )

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Aplikasi membutuhkan izin mikrofon untuk fitur evaluasi suara.</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B6B" />
      <WebView
        source={{ uri: STREAMLIT_URL }}
        style={styles.webview}
        startInLoadingState={true}
        renderLoading={LoadingIndicator}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        // Penting untuk akses mikrofon di Android Webview
        androidLayerType="hardware"
        geolocationEnabled={false}
        onPermissionRequest={(event) => {
          // Otomatis memberikan izin yang diminta oleh webview (seperti mic)
          event.approve()
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6B6B", // Warna tema aplikasi
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    zIndex: 99,
  },
  loadingText: {
    marginTop: 10,
    color: "#FF6B6B",
    fontWeight: "bold",
  },
  errorText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "red",
    padding: 20,
  },
})
