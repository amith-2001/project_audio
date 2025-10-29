import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Spectrogram from "wavesurfer.js/dist/plugins/spectrogram.esm.js";

export default function WaveformViewer({ audioUrl }) {
  const containerRef = useRef(null);
  const spectroRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [isSpectro, setIsSpectro] = useState(false);

  useEffect(() => {
    if (!audioUrl || !containerRef.current) return;

    // destroy previous instance if it exists
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }

    const ws = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#888",
      progressColor: "#60a5fa",
      cursorColor: "#93c5fd",
      height: 100,
      responsive: true,
      barWidth: 2,
      normalize: true,
      plugins: isSpectro
        ? [
            Spectrogram.create({
              container: spectroRef.current,
              labels: true,
              height: 150,
              fftSamples: 1024,
            }),
          ]
        : [],
    });

    ws.on("ready", () => setIsReady(true));
    ws.load(audioUrl);
    wavesurferRef.current = ws;

    return () => ws.destroy();
  }, [audioUrl, isSpectro]);

  return (
    <div className="w-full max-w-3xl flex flex-col items-center">
      <div ref={containerRef} className="w-full" />
      <div ref={spectroRef} className="w-full" />

      {isReady && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => wavesurferRef.current.playPause()}
            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-white text-sm"
          >
            ▶ / ⏸
          </button>

          <button
            onClick={() => setIsSpectro(!isSpectro)}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm"
          >
            {isSpectro ? "Hide Spectrogram" : "Show Spectrogram"}
          </button>
        </div>
      )}
    </div>
  );
}
