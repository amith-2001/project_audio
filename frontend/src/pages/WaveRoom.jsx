import SineCanvas from "../components/SineCanvas";
import WaveMixer from "../components/WaveMixer";

export default function WaveRoom() {
  return (
    <main className="relative min-h-dvh w-screen overflow-hidden bg-[#0b0c10] text-white font-mono">


      <div className="absolute inset-0 z-10 pointer-events-none">
        <SineCanvas />
    </div>
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-200 mb-6 z-20">
        🌊 Wave Room
      </h1>
      <p className="text-gray-400 text-sm sm:text-base mb-10 z-20 text-center">
        Mix signals, visualize interference, and hear beats form in real time.
      </p>
      <WaveMixer />
    </main>
  );
}
