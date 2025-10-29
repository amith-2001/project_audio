# 🎧 AudioPlayground  
> *"Where Sound Meets Intelligence — Learn, Listen, and Visualize the Language of Audio."*

---

## 🧭 Project Motto
**AudioPlayground** is an interactive sound laboratory that transforms complex concepts like **Fourier Transforms**, **STFT**, **Mel Spectrograms**, and **AI-based feature extraction** into an engaging, visual, and gamified experience.

Built as both a **portfolio centerpiece** and an **educational playground**, it helps you *see, hear, and understand* how audio transforms from raw waves to AI-ready features.

---

## 🧠 Motivation
Most people can *hear* sound, but can’t *see* it.  
AudioPlayground bridges that gap — blending **math, signal processing, and AI** into an intuitive exploration of how sound becomes data, and data becomes intelligence.

This project evolved from my research work in **temporal ship-noise classification using the LTU model** and my fascination with audio AI engineering.

---

## 🧩 Project Structure

| Section | Description |
|----------|--------------|
| 🏠 **Home Page** | Dynamic 3D particle background, floating Fourier equations, portfolio hub for the AudioPlayground world. |
| 🌊 **Wave Room** | Play with sine, square, and saw waves. Learn amplitude and frequency visually using Tone.js oscillators. |
| 🎚 **Frequency Cave** | Mix multiple waveforms, see their Fourier composition live. Features an interactive spectrum analyzer and Fourier formula explainer. |
| ⚒ **Feature Forge** | Upload audio → Extract DSP features (RMS, ZCR, Spectral Centroid, Rolloff, MFCC). Each feature includes tooltips and real-world AI significance. |
| ⏱ **Time Chamber** | Upload sound → See its **STFT** or **Mel Spectrogram** using a Flask + Librosa backend and React + Plotly frontend. Includes WaveSurfer playback, red time cursor, zoom/reset, and parameter sliders. |

---

## 🧮 Core Concepts Visualized
| Concept | Visualized As | Technology |
|----------|----------------|-------------|
| **Fourier Transform** | Frequency Cave (frequency bins + time snapshots) | Tone.js + Canvas |
| **STFT (Short-Time Fourier Transform)** | Heatmap over time/frequency | Librosa + Plotly.js |
| **Mel Spectrogram** | Perceptual compressed frequency view | Librosa (mel scale) |
| **MFCCs** | 13-Coefficient heatmap visualization | Feature Forge |
| **RMS / ZCR / Centroid / Rolloff** | Numeric + intuitive tooltip visualization | Librosa feature extraction |

---

## ⚙️ Tech Stack

### **Frontend**
- ⚛️ React (Vite)
- 💨 TailwindCSS
- 📊 Plotly.js
- 🎧 WaveSurfer.js
- ✨ Framer-Motion animations

### **Backend**
- 🐍 Flask
- 📚 Librosa
- 🔢 NumPy

---
## 🏗️ System Architecture

```text
React (Vite + Tailwind + Plotly + WaveSurfer)
            ↓  (audio file, n_fft, hop_length, mode)
        Flask API (CORS enabled)
            ↓
      Librosa + NumPy
       ↳ STFT / Mel Spectrogram / MFCC
            ↓
      JSON Spectrogram Data
            ↓
 React Visualization (Plotly Heatmap + Playback Cursor)
