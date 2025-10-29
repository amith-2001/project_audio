import { useState, useRef } from "react";
import Plot from "react-plotly.js";
import WaveSurfer from "wavesurfer.js";
import SineCanvas from "../components/SineCanvas";
export default function TimeChamber() {
  const [file, setFile] = useState(null);
  const [spectrogram, setSpectrogram] = useState(null);
  const [freqs, setFreqs] = useState([]);
  const [times, setTimes] = useState([]);
  const [nFft, setNFft] = useState(1024);
  const [hop, setHop] = useState(256);
  const [mode, setMode] = useState("stft");
  const [loading, setLoading] = useState(false);
  const [plotKey, setPlotKey] = useState(0); // for resetting zoom

  const waveRef = useRef(null);
  const waveformContainer = useRef(null);
  const [playTime, setPlayTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  // Handle audio upload
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);

    if (waveRef.current) waveRef.current.destroy();

    const ws = WaveSurfer.create({
      container: waveformContainer.current,
      waveColor: "#777",
      progressColor: "#38bdf8",
      height: 100,
    });

    ws.loadBlob(f);
    ws.on("audioprocess", () => setPlayTime(ws.getCurrentTime()));
    ws.on("seek", () => setPlayTime(ws.getCurrentTime()));
    ws.on("finish", () => setIsPlaying(false));
    waveRef.current = ws;
  };

  // Backend call
  const analyzeSTFT = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("audio", file);
    formData.append("n_fft", nFft);
    formData.append("hop_length", hop);
    formData.append("mode", mode);

    try {
      const res = await fetch(`${API_URL}/stft`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setSpectrogram(data.S_db);
      setFreqs(data.freqs);
      setTimes(data.times);
    } catch (err) {
      console.error("Error fetching STFT:", err);
    } finally {
      setLoading(false);
    }
  };

  // Play/Pause audio
  const togglePlay = () => {
    if (waveRef.current) {
      waveRef.current.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  // Reset zoom on Plotly chart
  const resetZoom = () => {
    setPlotKey((prev) => prev + 1);
  };

  const plotData =
    spectrogram &&
    [
      {
        z: spectrogram,
        x: times,
        y: freqs,
        type: "heatmap",
        colorscale: "YlGnBu",
        zsmooth: "best",
        colorbar: {
          title: "dB",
          titlefont: { color: "white" },
          tickfont: { color: "white" },
        },
      },
      {
        x: [playTime, playTime],
        y: [Math.min(...freqs), Math.max(...freqs)],
        mode: "lines",
        line: { color: "red", width: 2 },
        name: "Cursor",
      },
    ];

  const layout = {
    title: {
      text: mode === "mel" ? "🎵 Mel Spectrogram" : "⏱ STFT Spectrogram",
      font: { color: "white" },
    },
    xaxis: {
      title: "Time (s)",
      color: "white",
    },
    yaxis: {
      title: mode === "mel" ? "Mel bands" : "Frequency (Hz)",
      color: "white",
    },
    plot_bgcolor: "#0b0c10",
    paper_bgcolor: "#0b0c10",
    margin: { t: 60, r: 20, b: 60, l: 60 },
  };

  return (
    <main className="relative min-h-dvh w-screen overflow-hidden bg-[#0b0c10] text-white font-mono flex flex-col items-center justify-start pt-10">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6">⏱ Time Chamber</h1>
      <p className="text-gray-400 text-sm max-w-2xl text-center mb-8">
        Upload an audio file and explore its time–frequency energy using real
        STFT and Mel spectrograms.
      </p>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center">
        <input type="file" accept="audio/*" onChange={handleFileChange} />

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="bg-gray-800 border border-gray-600 text-white rounded px-2 py-1 text-sm"
        >
          <option value="stft">STFT</option>
          <option value="mel">Mel</option>
        </select>

        <input
          type="number"
          value={nFft}
          onChange={(e) => setNFft(e.target.value)}
          className="w-24 px-2 py-1 bg-gray-800 border border-gray-600 text-white rounded text-sm"
          placeholder="n_fft"
        />

        <input
          type="number"
          value={hop}
          onChange={(e) => setHop(e.target.value)}
          className="w-24 px-2 py-1 bg-gray-800 border border-gray-600 text-white rounded text-sm"
          placeholder="hop_length"
        />

        <button
          onClick={analyzeSTFT}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 text-white text-sm"
        >
          {loading ? "Processing..." : "Analyze"}
        </button>

        <button
          onClick={togglePlay}
          disabled={!file}
          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-sm"
        >
          {isPlaying ? "⏸ Pause" : "▶ Play Audio"}
        </button>

        <button
          onClick={resetZoom}
          className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-sm"
        >
          🔄 Reset Zoom
        </button>
      </div>

      <div ref={waveformContainer} className="w-full max-w-2xl mb-6"></div>

      {spectrogram && (
        <Plot
          key={plotKey}
          data={plotData}
          layout={layout}
          config={{ responsive: true }}
          style={{ width: "90vw", height: "65vh" }}
        />
      )}

      {/* Data Explanation Card */}
<div className="mt-10 bg-white/5 border border-gray-500/30 backdrop-blur-md rounded-xl p-6 max-w-3xl text-center leading-relaxed">
  <h3 className="text-gray-200 text-xl font-semibold mb-3">
    🎛 Understanding the Parameters
  </h3>
  <p className="text-gray-400 text-sm mb-4">
    <b>n_fft</b> = The number of samples per analysis window.  
    Common values: <b>512</b>, <b>1024</b>, <b>2048</b>, <b>4096</b>.  
    <br />
    ➤ Larger <b>n_fft</b> gives better frequency detail (more bins), but blurs
    time resolution.  
    <br />
    ➤ Smaller <b>n_fft</b> gives finer time precision, but poorer frequency
    separation.
  </p>

  <p className="text-gray-400 text-sm mb-4">
    <b>hop_length</b> = How far the analysis window moves each step (in samples).  
    Common values: <b>128</b>, <b>256</b>, <b>512</b>.  
    <br />
    ➤ Smaller <b>hop_length</b> = smoother spectrogram (more overlap).  
    <br />
    ➤ Larger <b>hop_length</b> = faster computation, but choppier visualization.
  </p>

  <hr className="border-gray-600 my-4" />

  <h3 className="text-gray-200 text-xl font-semibold mb-3">
    🎵 STFT vs Mel Spectrogram
  </h3>
  <p className="text-gray-400 text-sm mb-4">
    The <b>STFT</b> (Short-Time Fourier Transform) shows the true physical
    frequencies (in Hz) of your signal.  
    It’s perfect for scientific or engineering tasks where frequency accuracy
    matters — like radar, machinery vibration, or medical signals.
  </p>

  <p className="text-gray-400 text-sm mb-4">
    The <b>Mel Spectrogram</b> compresses those frequencies into a perceptual
    “<b>Mel scale</b>” — how humans actually hear sound (more detail at low
    frequencies, less at high).  
    <br />
    This is the foundation of most <b>AI audio models</b>:
    <br />→ Speech recognition (ASR)  
    → Emotion or gender detection  
    → Music genre classification  
    → Bird or whale call detection  
    → Your own <b>LTU fine-tuning</b> for ship-noise classification 🚢🎶
  </p>

  <hr className="border-gray-600 my-4" />

  <h3 className="text-gray-200 text-xl font-semibold mb-3">
    🧠 Why It Matters in AI
  </h3>
  <p className="text-gray-400 text-sm">
    Models like <b>CNNs</b> and <b>Transformers</b> can’t directly process raw
    waveforms efficiently — they learn better from structured 2D data.  
    Spectrograms turn sound into an “image” where:
    <br />
    ➤ <b>X-axis</b> = Time  
    ➤ <b>Y-axis</b> = Frequency (or Mel bands)  
    ➤ <b>Color</b> = Energy (dB)
    <br />
    These 2D patterns let AI models "see" sound, making deep learning possible
    for everything from speech to music to marine acoustics.
  </p>
</div>

    </main>
  );
}
