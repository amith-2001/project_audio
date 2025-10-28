import SineCanvas from "../components/SineCanvas";
import WaveMixer from "../components/WaveMixer";
import { motion } from "framer-motion";

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


      {/* Educational floating cards */}
<div className="absolute bottom-10 left-10 flex flex-col gap-6 z-30 pointer-events-none">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 1 }}
    className="bg-white/5 border border-gray-500/30 backdrop-blur-md rounded-xl p-4 max-w-xs shadow-lg"
  >
    <h3 className="text-gray-200 text-lg font-semibold mb-1">
      🎚 Amplitude
    </h3>
    <p className="text-gray-400 text-sm leading-relaxed">
      Amplitude decides how <span className="text-white font-semibold">loud</span> a sound feels.  
      <br /> Bigger waves = higher energy = louder sound.
    </p>
    <div className="mt-3 h-10 w-full relative bg-gray-700/30 rounded overflow-hidden">
      <motion.div
        animate={{ scaleY: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
        className="absolute bottom-0 w-full bg-gray-200/70 origin-bottom"
      />
    </div>
  </motion.div>
</div>

<div className="absolute bottom-10 right-10 flex flex-col gap-6 z-30 pointer-events-none">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.4, duration: 1 }}
    className="bg-white/5 border border-gray-500/30 backdrop-blur-md rounded-xl p-4 max-w-xs shadow-lg"
  >
    <h3 className="text-gray-200 text-lg font-semibold mb-1">
      🌊 Frequency
    </h3>
    <p className="text-gray-400 text-sm leading-relaxed">
      Frequency decides the <span className="text-white font-semibold">pitch</span> of a sound.  
      <br /> Faster waves = higher notes 🎵, slower waves = deeper tones 🎶.
    </p>
    <div className="mt-3 h-10 w-full relative bg-gray-700/30 rounded overflow-hidden">
      <motion.div
        animate={{ scaleY: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
        className="absolute bottom-0 w-full bg-gray-200/70 origin-bottom"
      />
    </div>
  </motion.div>
</div>


    </main>
  );
}
