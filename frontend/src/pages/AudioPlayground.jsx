import { motion } from "framer-motion";
import SoundFabric from "../components/SoundFabric";
import Equations from "../components/Equations";
import Navbar from "../components/Navbar";

export default function AudioPlayground() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0b0c10] text-white font-mono">
  
      {/* Background Particle Fabric */}
      <div className="absolute inset-0 z-10 opacity-70">
        <SoundFabric />
      </div>

      {/* Floating Equations Layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <Equations />
      </div>

      {/* Foreground Content */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl sm:text-7xl font-bold tracking-wide text-[#1f6feb] drop-shadow-[0_0_20px_rgba(31,111,235,0.3)]"
        >
          Audio Playground
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-gray-400 max-w-2xl text-sm sm:text-base"
        >
          Explore how sound becomes math, and math becomes meaning.
          <br />
          Fourier transforms, spectral analysis, and intelligent wave motion — all visualized interactively.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-10"
        >
          <button className="border border-[#1f6feb] px-6 py-3 rounded-lg hover:bg-[#1f6feb]/10 text-[#1f6feb] transition-all duration-300">
            Enter Wave Room →
          </button>
        </motion.div>
      </div>
    </div>
  );
}
