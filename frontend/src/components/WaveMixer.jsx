import { useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import WaveVisualizer from "./WaveVisualizer";

export default function WaveMixer() {
  const [oscillators, setOscillators] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [analyser, setAnalyser] = useState(null);
  const gainRef = useRef(null);
  const oscRefs = useRef([]); // store actual Tone.Oscillator objects

  // add new oscillator
  const addOscillator = () => {
    setOscillators((prev) => [
      ...prev,
      { id: Date.now(), waveType: "sine", freq: 440, amp: 0.3 },
    ]);
  };

  // remove one
  const removeOscillator = (id) => {
    // stop and disconnect the actual Tone oscillator if active
    const oscObj = oscRefs.current.find((o) => o.id === id);
    if (oscObj && oscObj.osc) oscObj.osc.stop();

    oscRefs.current = oscRefs.current.filter((o) => o.id !== id);
    setOscillators((prev) => prev.filter((o) => o.id !== id));
  };

  const startMix = async () => {
    await Tone.start(); // ensure audio context is resumed

    // cleanup old oscillators if restarting
    oscRefs.current.forEach((o) => o.osc.stop());
    oscRefs.current = [];

    const gain = new Tone.Gain(0.8).toDestination();
    const analyserNode = new Tone.Analyser("waveform", 1024);

    gain.connect(analyserNode);

    oscillators.forEach((osc) => {
      const toneOsc = new Tone.Oscillator(osc.freq, osc.waveType).start();
      const ampNode = new Tone.Gain(osc.amp);
      toneOsc.connect(ampNode);
      ampNode.connect(gain);
      oscRefs.current.push({ id: osc.id, osc: toneOsc, ampNode });
    });

    gainRef.current = gain;
    setAnalyser(analyserNode);
    setIsPlaying(true);
  };

  const stopMix = () => {
    oscRefs.current.forEach((o) => o.osc.stop());
    oscRefs.current = [];
    if (gainRef.current) gainRef.current.dispose();
    setAnalyser(null);
    setIsPlaying(false);
  };

  // update frequency / amplitude live while playing
  useEffect(() => {
    if (!isPlaying) return;

    oscRefs.current.forEach((ref) => {
      const state = oscillators.find((o) => o.id === ref.id);
      if (state) {
        ref.osc.frequency.value = state.freq;
        ref.ampNode.gain.value = state.amp;
        ref.osc.type = state.waveType;
      }
    });
  }, [oscillators, isPlaying]);

  return (
    <div className="flex flex-col items-center gap-6 z-20">
      <h2 className="text-xl text-gray-200 mb-4">🎚 Signal Mixer</h2>

      {/* each oscillator control row */}
      <div className="flex flex-col gap-4 w-full max-w-2xl">
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
                Freq: {osc.freq}Hz
              </label>
              <input
                type="range"
                min="50"
                max="1000"
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

      {/* control buttons */}
      <div className="flex gap-4 mt-6">
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

      {/* waveform visualizer */}
      <div className="mt-8">
        <WaveVisualizer analyser={analyser} />
      </div>
    </div>
  );
}

