"""
Script untuk download dan setup audio native Hiragana.
Saat ini menggunakan synthetic audio untuk demo.
Untuk production, gunakan dataset audio native dari Google Text-to-Speech atau Noto Fonts.
"""

import numpy as np
import soundfile as sf
from pathlib import Path

def create_synthetic_audio(frequency=300, duration=1.0, sr=16000):
    """Membuat audio synthetic sederhana untuk demo"""
    t = np.linspace(0, duration, int(sr * duration))
    audio = 0.3 * np.sin(2 * np.pi * frequency * t)
    return audio, sr

def setup_audio_folder():
    """Setup folder audio native"""
    audio_dir = Path("assets/audio_native")
    audio_dir.mkdir(parents=True, exist_ok=True)
    
    hiragana_list = [
        ('あ', 300), ('い', 350), ('う', 320), ('え', 330), ('お', 340),
        ('か', 360), ('き', 370), ('く', 380), ('け', 390), ('こ', 400),
        ('さ', 410), ('し', 420), ('す', 430), ('せ', 440), ('そ', 450),
        ('た', 460), ('ち', 470), ('つ', 480), ('て', 490), ('と', 500),
    ]
    
    for hiragana, freq in hiragana_list:
        audio, sr = create_synthetic_audio(frequency=freq, duration=1.0)
        output_path = audio_dir / f"{hiragana}.wav"
        sf.write(output_path, audio, sr)
        print(f"✓ Created {output_path}")

if __name__ == "__main__":
    setup_audio_folder()
    print("\n✨ Audio setup selesai!")
