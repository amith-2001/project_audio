import { useState } from "react";
import SineCanvas from "../components/SineCanvas";
import WaveformViewer from "../components/WaveformViewer";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"
import MfccHeatmap from "../components/MfccHeatmap";


export default function FeatureForge() {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [features, setFeatures] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMfcc, setShowMfcc] = useState(false);


  const handleUpload = async (e) => {
    const f = e.target.files[0];
    setFile(f);
    setFileUrl(URL.createObjectURL(f)); // ✅ to preview audio

    const formData = new FormData();
    formData.append("audio", f);

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setFeatures(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-dvh w-screen overflow-hidden bg-[#0b0c10] text-white font-mono">
      <div className="absolute inset-0 pointer-events-none">
        <SineCanvas />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-dvh px-6">
        <h1 className="text-5xl font-bold text-gray-100 mb-6">🧠 Feature Forge</h1>
        <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="mb-10 bg-white/5 border border-gray-600/30 backdrop-blur-md rounded-xl p-6 max-w-2xl text-center shadow-lg"
>
  <h2 className="text-gray-100 text-2xl font-semibold mb-3">
    🧠 Welcome to Feature Forge
  </h2>
  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
    Every sound you hear hides a universe of mathematical patterns — 
    energy, frequency, rhythm, and color.  
    <br className="hidden sm:block" />
    <br />
    Now, let us
    explore those patterns the same way AI models do.  
    Upload an audio file, watch its waveform come alive, 
    and uncover the building blocks that make machines
    <span className="text-purple-300 font-semibold"> understand sound.</span>
    Hover over the 
     <span className="text-purple-300 font-semibold"> extracted features </span>
     to learn more.
    
  </p>
</motion.div>


        <input
          type="file"
          accept="audio/*"
          onChange={handleUpload}
          className="mb-4 text-gray-300"
        />
{/* Show waveform or MFCC based on toggle */}
{fileUrl && !showMfcc && <WaveformViewer audioUrl={fileUrl} />}
{features && showMfcc && <MfccHeatmap mfcc={features.mfcc_full} />}

{features && (
  <div className="flex gap-4 mt-4">
    <button
      onClick={() => setShowMfcc(!showMfcc)}
      className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-sm"
    >
      {showMfcc ? "🎧 Show Waveform" : "🎹 Show MFCC Heatmap"}
    </button>
  </div>
)}


        {loading && <p className="mt-4 text-sm text-gray-400">Analyzing...</p>}

{features && (
  <div className="mt-8 bg-white/5 border border-gray-600/50 backdrop-blur-md rounded-xl p-6 w-full max-w-3xl">
    <h2 className="text-xl font-semibold mb-3 text-gray-100">
      Extracted Features
    </h2>

    <ul className="text-sm text-gray-300 space-y-2">
      <li>
        <span
          data-tooltip-id="rms-tip"
          data-tooltip-content="RMS (Root Mean Square) measures overall loudness — like the average energy in a sound wave. It helps AI models understand how powerful or soft a sound is."
          className="cursor-help text-white font-semibold"
        >
          RMS Energy:
        </span>{" "}
        {features.rms.toFixed(4)}
      </li>

      <li>
        <span
          data-tooltip-id="zcr-tip"
          data-tooltip-content="Zero Crossing Rate counts how often the signal crosses zero amplitude. It helps distinguish smooth tones (low ZCR) from noisy or percussive sounds (high ZCR)."
          className="cursor-help text-white font-semibold"
        >
          Zero Crossing Rate (ZCR):
        </span>{" "}
        {features.zcr.toFixed(4)}
      </li>

      <li>
        <span
          data-tooltip-id="centroid-tip"
          data-tooltip-content="Spectral Centroid shows the 'center of mass' of frequencies. High centroid = bright sounds like cymbals, low centroid = dark sounds like bass. AI models use it to learn timbre."
          className="cursor-help text-white font-semibold"
        >
          Spectral Centroid:
        </span>{" "}
        {features.centroid.toFixed(2)} Hz
      </li>

      <li>
        <span
          data-tooltip-id="rolloff-tip"
          data-tooltip-content="Spectral Rolloff marks the frequency below which 85% of the energy lies. It helps AI models estimate brightness and detect speech vs. music textures."
          className="cursor-help text-white font-semibold"
        >
          Spectral Rolloff:
        </span>{" "}
        {features.rolloff.toFixed(2)} Hz
      </li>

      <li>
        <span
          data-tooltip-id="mfcc-tip"
          data-tooltip-content="MFCCs (Mel-Frequency Cepstral Coefficients) compress how humans perceive pitch and timbre. They’re a key input for speech and sound recognition AI models."
          className="cursor-help text-white font-semibold"
        >
          MFCCs:
        </span>{" "}
        {features.mfcc_mean.slice(0, 5).map(v => v.toFixed(2)).join(", ")} ...

      </li>
    </ul>

    {/* Attach all tooltips (they auto-bind to data-tooltip-id) */}
    <Tooltip id="rms-tip" place="right" style={{ maxWidth: "250px" }} />
    <Tooltip id="zcr-tip" place="right" style={{ maxWidth: "250px" }} />
    <Tooltip id="centroid-tip" place="right" style={{ maxWidth: "250px" }} />
    <Tooltip id="rolloff-tip" place="right" style={{ maxWidth: "250px" }} />
    <Tooltip id="mfcc-tip" place="right" style={{ maxWidth: "250px" }} />
  </div>
)}
      </div>
    </main>
  );
}
