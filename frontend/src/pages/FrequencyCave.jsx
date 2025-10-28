import { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import Navbar from "../components/Navbar";
import SpectrumVisualizer from "../components/SpectrumVisualizer";
import SineCanvas from "../components/SineCanvas";
import { motion } from "framer-motion";

export default function FrequencyCave() {
  const [analyser, setAnalyser] = useState(null);
  const [oscillators, setOscillators] = useState([]);
  const oscRefs = useRef(new Map()); // store Tone nodes
  const gainRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const addOscillator = () => {
    const newOsc = { id: Date.now(), waveType: "sine", freq: 440, amp: 0.3 };
    setOscillators((prev) => [...prev, newOsc]);
    if (isPlaying) attachOscillator(newOsc);
  };

  const removeOscillator = (id) => {
    if (isPlaying) detachOscillator(id);
    setOscillators((prev) => prev.filter((o) => o.id !== id));
  };

  const attachOscillator = (osc) => {
    if (!gainRef.current) return;
    const toneOsc = new Tone.Oscillator(osc.freq, osc.waveType).start();
    const ampNode = new Tone.Gain(osc.amp);
    toneOsc.connect(ampNode);
    ampNode.connect(gainRef.current);
    oscRefs.current.set(osc.id, { osc: toneOsc, amp: ampNode });
  };

  const detachOscillator = (id) => {
    const ref = oscRefs.current.get(id);
    if (ref) {
      ref.osc.stop();
      ref.amp.dispose();
      oscRefs.current.delete(id);
    }
  };

  const startMix = async () => {
    await Tone.start();

    const gain = new Tone.Gain(0.8).toDestination();
    const analyserNode = new Tone.Analyser("fft", 256);
    gain.connect(analyserNode);

    gainRef.current = gain;
    setAnalyser(analyserNode);

    oscillators.forEach(attachOscillator);
    setIsPlaying(true);
  };

  const stopMix = () => {
    oscRefs.current.forEach((ref) => {
      ref.osc.stop();
      ref.amp.dispose();
    });
    oscRefs.current.clear();
    if (gainRef.current) gainRef.current.dispose();
    setAnalyser(null);
    setIsPlaying(false);
  };

  // Live updates: frequency, amplitude, waveform
  useEffect(() => {
    if (!isPlaying) return;
    oscillators.forEach((o) => {
      const ref = oscRefs.current.get(o.id);
      if (ref) {
        ref.osc.frequency.value = o.freq;
        ref.osc.type = o.waveType;
        ref.amp.gain.value = o.amp;
      }
    });
  }, [oscillators, isPlaying]);

  const sampleRate = Tone.getContext().sampleRate;

  return (
    <main className="relative min-h-dvh w-screen overflow-hidden bg-[#0b0c10] text-white font-mono">
      <div className="absolute inset-0 pointer-events-none">
        <SineCanvas />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center min-h-dvh">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-200 mb-4">
          🎚 Frequency Cave
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mb-10 text-center max-w-xl">
          Step into the world of frequencies — see sound decompose into its
          hidden components.
        </p>

        {/* Mixer Controls */}
        <div className="flex flex-col gap-4 w-full max-w-2xl mb-6">
          {oscillators.map((osc) => (
            <div
              key={osc.id}
              className="bg-[#1a1a1a]/50 border border-gray-700/50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div className="flex flex-wrap gap-4 items-center">
                <select
                  value={osc.waveType}
                  onChange={(e) =>
                    setOscillators((prev) =>
                      prev.map((o) =>
                        o.id === osc.id ? { ...o, waveType: e.target.value } : o
                      )
                    )
                  }
                  className="bg-transparent border border-gray-600 text-gray-200 rounded px-2 py-1 text-sm"
                >
                  <option value="sine">Sine</option>
                  <option value="square">Square</option>
                  <option value="sawtooth">Sawtooth</option>
                  <option value="triangle">Triangle</option>
                </select>

                <label className="text-gray-400 text-xs sm:text-sm">
                  Freq: {osc.freq} Hz
                </label>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  value={osc.freq}
                  onChange={(e) =>
                    setOscillators((prev) =>
                      prev.map((o) =>
                        o.id === osc.id ? { ...o, freq: +e.target.value } : o
                      )
                    )
                  }
                />

                <label className="text-gray-400 text-xs sm:text-sm">
                  Amp: {osc.amp.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={osc.amp}
                  onChange={(e) =>
                    setOscillators((prev) =>
                      prev.map((o) =>
                        o.id === osc.id ? { ...o, amp: +e.target.value } : o
                      )
                    )
                  }
                />
              </div>

              <button
                onClick={() => removeOscillator(osc.id)}
                className="text-red-400 hover:text-red-300 text-sm"
              >
                ✖ Remove
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={addOscillator}
            className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 text-sm"
          >
            ➕ Add Signal
          </button>
          {!isPlaying ? (
            <button
              onClick={startMix}
              className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-white text-sm"
            >
              ▶ Play Mix
            </button>
          ) : (
            <button
              onClick={stopMix}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 text-sm"
            >
              ■ Stop
            </button>
          )}
        </div>

        {/* Spectrum Visualizer with axes */}
        <SpectrumVisualizer analyser={analyser} sampleRate={sampleRate} />

        {/* Concept Card */}
        <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 1.3, duration: 1 }}
  className="mt-6 bg-white/5 border border-gray-500/30 backdrop-blur-md rounded-xl p-5 max-w-md text-center"
>
  <h3 className="text-gray-200 text-lg font-semibold mb-2">
    🔢 Fourier Transform & FFT
  </h3>
  <p className="text-gray-400 text-sm leading-relaxed mb-3">
    The <span className="text-white font-semibold">Fourier Transform</span> breaks a
    signal into its frequency components — it tells us how much of each tone
    (sine wave) is present in a sound.
  </p>

  <div className="bg-black/40 border border-gray-700 rounded-md p-3 text-gray-300 font-mono text-xs leading-relaxed mb-3">
    F(𝑓) = ∫ x(t) · e<sup>−j2π𝑓t</sup> dt  
    <br />
    ↳ Each exponential = one pure frequency.
  </div>

  <p className="text-gray-400 text-sm leading-relaxed">
    The <span className="text-white font-semibold">FFT (Fast Fourier Transform)</span> 
    is a super-efficient algorithm that computes this for discrete signals in real time —
    that’s how this spectrum visualizer updates instantly ⚡
  </p>
</motion.div>
      </div>
    </main>
  );
}
