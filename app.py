import streamlit as st
import pandas as pd
import numpy as np
import librosa
import soundfile as sf
from scipy.spatial.distance import cosine
from pydub import AudioSegment
import os
import tempfile
from pathlib import Path
import warnings
warnings.filterwarnings('ignore')

# Set page config
st.set_page_config(
    page_title="JapaCard - Learn Hiragana",
    page_icon="🇯🇵",
    layout="centered",
    initial_sidebar_state="collapsed"
)

# Custom CSS untuk styling
st.markdown("""
<style>
    body {
        background: linear-gradient(135deg, #FFF9E6 0%, #FFE5CC 100%);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    .main {
        background: white;
        border-radius: 20px;
        padding: 2rem;
        max-width: 600px;
        margin: 2rem auto;
        box-shadow: 0 10px 40px rgba(0,0,0,0.1);
    }
    
    .card-container {
        background: linear-gradient(135deg, #FFD700 0%, #FFC107 100%);
        border-radius: 15px;
        padding: 2rem;
        text-align: center;
        margin: 1.5rem 0;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .hiragana-display {
        font-size: 4rem;
        font-weight: bold;
        color: #333;
        margin: 1rem 0;
        font-family: 'Arial Unicode MS', Arial, sans-serif;
    }
    
    .romaji-display {
        font-size: 1.5rem;
        color: #555;
        margin: 0.5rem 0;
        font-style: italic;
    }
    
    .example-display {
        font-size: 1.2rem;
        color: #666;
        margin: 1rem 0;
    }
    
    .result-box {
        border-radius: 10px;
        padding: 1.5rem;
        margin: 1rem 0;
        text-align: center;
    }
    
    .result-excellent {
        background: linear-gradient(135deg, #90EE90 0%, #32CD32 100%);
        color: white;
        border: 2px solid #228B22;
    }
    
    .result-good {
        background: linear-gradient(135deg, #87CEEB 0%, #4169E1 100%);
        color: white;
        border: 2px solid #00008B;
    }
    
    .result-poor {
        background: linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%);
        color: white;
        border: 2px solid #C71585;
    }
    
    .button-group {
        display: flex;
        gap: 1rem;
        margin: 1.5rem 0;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    h1 {
        color: #FF6B35;
        text-align: center;
        margin-bottom: 2rem;
    }
    
    .progress-info {
        text-align: center;
        color: #666;
        margin: 1rem 0;
        font-weight: bold;
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if 'current_index' not in st.session_state:
    st.session_state.current_index = 0
if 'score_history' not in st.session_state:
    st.session_state.score_history = []

# Load data
@st.cache_data
def load_hiragana_data():
    data = {
        'hiragana': ['あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ'],
        'romaji': ['a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko'],
        'example': ['朝 (asa - morning)', '犬 (inu - dog)', '馬 (uma - horse)', 
                    '絵 (e - picture)', '音 (oto - sound)', '火 (ka - fire)',
                    '木 (ki - tree)', '空 (ku - sky)', '毛 (ke - hair)', '子 (ko - child)'],
        'example_word': ['あさ', 'いぬ', 'うま', 'え', 'おと', 'か', 'き', 'く', 'け', 'こ']
    }
    return pd.DataFrame(data)

df = load_hiragana_data()

def extract_audio_features(audio_data, sr=16000):
    """Extract audio features menggunakan MFCC dan Spectral Centroid"""
    try:
        if isinstance(audio_data, np.ndarray):
            y = audio_data
        else:
            y, sr = librosa.load(audio_data, sr=sr)
        
        # Extract MFCC
        mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
        mfcc_mean = np.mean(mfcc, axis=1)
        
        # Extract Spectral Centroid
        spectral_centroid = librosa.feature.spectral_centroid(y=y, sr=sr)
        spectral_centroid_mean = np.mean(spectral_centroid)
        
        # Extract Zero Crossing Rate
        zcr = librosa.feature.zero_crossing_rate(y)
        zcr_mean = np.mean(zcr)
        
        # Combine features
        features = np.concatenate([mfcc_mean, [spectral_centroid_mean, zcr_mean]])
        return features / (np.linalg.norm(features) + 1e-8)
    except Exception as e:
        st.error(f"Error extracting features: {e}")
        return None

def calculate_similarity(native_features, user_features):
    """Hitung cosine similarity antara dua audio"""
    if native_features is None or user_features is None:
        return 0.0
    
    similarity = 1 - cosine(native_features, user_features)
    return max(0, min(1, similarity))

def classify_score(similarity):
    """Klasifikasi skor similarity"""
    if similarity >= 0.8:
        return "Sempurna!", "excellent", "✨ Pelafalanmu sangat bagus!"
    elif similarity >= 0.6:
        return "Baik", "good", "👍 Cukup baik, sedikit perlu latihan lagi"
    else:
        return "Perlu Latihan", "poor", "💪 Coba lagi dan dengarkan lebih hati-hati"

def generate_native_audio(text, filename):
    """Generate audio native dari teks (placeholder menggunakan silence)"""
    sr = 16000
    duration = 1.0
    # Membuat audio synthetic sederhana untuk demo
    t = np.linspace(0, duration, int(sr * duration))
    # Menggunakan beberapa frekuensi dasar
    audio = 0.3 * (np.sin(2 * np.pi * 300 * t) + np.sin(2 * np.pi * 400 * t))
    return audio

# Main UI
st.markdown("<h1>🇯🇵 JapaCard</h1>", unsafe_allow_html=True)
st.markdown("<p style='text-align: center; color: #666; font-size: 1.1rem;'>Belajar Hiragana dengan Cek Pelafalan</p>", unsafe_allow_html=True)

current_row = df.iloc[st.session_state.current_index]

# Progress
st.markdown(f"""
<div class='progress-info'>
Flashcard {st.session_state.current_index + 1} dari {len(df)}
</div>
""", unsafe_allow_html=True)

# Display Flashcard
st.markdown(f"""
<div class='card-container'>
    <div class='hiragana-display'>{current_row['hiragana']}</div>
    <div class='romaji-display'>{current_row['romaji']}</div>
    <div class='example-display'>例: {current_row['example']}</div>
</div>
""", unsafe_allow_html=True)

# Audio Controls
col1, col2 = st.columns(2)

with col1:
    if st.button("🔊 Dengar Suara Native", use_container_width=True, key="play_native"):
        native_audio = generate_native_audio(current_row['romaji'], current_row['hiragana'])
        st.audio(native_audio, sample_rate=16000, format="audio/wav")

with col2:
    if st.button("🎤 Rekam Suara Saya", use_container_width=True, key="record_audio"):
        st.session_state.recording = True

# Recording interface
if st.session_state.get('recording', False):
    st.info("🎙️ Silakan ucapkan huruf ini dengan jelas...")
    
    audio_bytes = st.audio_input("Rekam suaramu di sini")
    
    if audio_bytes:
        # Process recorded audio
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp_file:
            tmp_file.write(audio_bytes)
            tmp_path = tmp_file.name
        
        try:
            # Generate native audio
            native_audio = generate_native_audio(current_row['romaji'], current_row['hiragana'])
            
            # Extract features
            native_features = extract_audio_features(native_audio, sr=16000)
            user_features = extract_audio_features(tmp_path, sr=16000)
            
            # Calculate similarity
            similarity = calculate_similarity(native_features, user_features)
            category, style, message = classify_score(similarity)
            
            # Display result
            st.markdown(f"""
<div class='result-box result-{style}'>
    <h3 style='margin: 0; font-size: 1.8rem;'>{category}</h3>
    <p style='margin: 0.5rem 0; font-size: 1.4rem; font-weight: bold;'>Skor: {similarity:.2f}</p>
    <p style='margin: 0; font-size: 1.1rem;'>{message}</p>
</div>
            """, unsafe_allow_html=True)
            
            # Store score
            st.session_state.score_history.append({
                'hiragana': current_row['hiragana'],
                'romaji': current_row['romaji'],
                'score': similarity,
                'category': category
            })
            
        except Exception as e:
            st.error(f"Gagal memproses audio: {e}")
        finally:
            os.unlink(tmp_path)
            st.session_state.recording = False

# Navigation buttons
st.markdown("<hr>", unsafe_allow_html=True)

col1, col2, col3 = st.columns(3)

with col1:
    if st.button("⬅️ Sebelumnya", use_container_width=True):
        st.session_state.current_index = max(0, st.session_state.current_index - 1)
        st.session_state.recording = False
        st.rerun()

with col2:
    progress = (st.session_state.current_index + 1) / len(df) * 100
    st.metric("Progress", f"{int(progress)}%")

with col3:
    if st.button("Selanjutnya ➡️", use_container_width=True):
        st.session_state.current_index = min(len(df) - 1, st.session_state.current_index + 1)
        st.session_state.recording = False
        st.rerun()

# Score history in sidebar
with st.sidebar:
    st.markdown("### 📊 Riwayat Skor")
    if st.session_state.score_history:
        history_df = pd.DataFrame(st.session_state.score_history)
        st.dataframe(history_df, use_container_width=True)
        
        avg_score = history_df['score'].mean()
        st.metric("Rata-rata Skor", f"{avg_score:.2f}")
        
        if st.button("🔄 Reset Riwayat"):
            st.session_state.score_history = []
            st.rerun()
    else:
        st.info("Belum ada riwayat skor. Mulai rekam suaramu!")

# Footer
st.markdown("""
---
<p style='text-align: center; color: #999; font-size: 0.9rem;'>
JapaCard v1.0 | Aplikasi Pembelajaran Hiragana dengan AI Audio Recognition
</p>
""", unsafe_allow_html=True)
