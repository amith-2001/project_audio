import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import SoundFabric from "../components/SoundFabric";
import SineCanvas from "../components/SineCanvas";
import { Link } from "react-router-dom";

export default function AudioPlayground() {
  return (
    <main className="relative min-h-dvh w-screen overflow-hidden bg-[#0b0c10] text-white font-mono">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 opacity-50">
        <SoundFabric />
      </div>

   

      {/* Moving sinewave */}
      <SineCanvas />

      {/* Titles / Paths */}
      <section className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center pointer-events-none">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl font-bold text-[#1f6feb] mb-8 drop-shadow-[0_0_20px_rgba(31,111,235,0.4)]"
        >
          Audio Playground
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="text-[#ffcc70] text-xl sm:text-2xl max-w-2xl mb-12"

        >
          Embark on a sonic journey through the landscapes of sound.
        </motion.p>
      </section>

      {/* Floating Portals (Interactive Checkpoints) */}
      <div className="absolute inset-0 z-30 flex items-center justify-center translate-y-20">
  <div className="flex flex-row justify-around items-center w-full max-w-5xl pointer-events-auto">
    {[
      { name: "🌊 Wave Room", path: "/audioplayground/waveroom" },
      { name: "🎚 Frequency Cave", path: "/audioplayground/frequencycave" },
      { name: "🕒 Time Chamber", path: "/audioplayground/timechamber" },
    ].map((section, i) => (
      <motion.div
        key={section.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 + i * 0.2, duration: 0.8 }}
      >
        <Link
          to={section.path}
          className="group relative px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base border border-[#1f6feb]/40 rounded-lg hover:border-[#1f6feb] hover:bg-[#1f6feb]/10 transition-all duration-300"
        >
          <span className="text-[#1f6feb] group-hover:text-[#3b82f6] transition">
            {section.name}
          </span>
          <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-[#1f6feb]/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
        </Link>
      </motion.div>
    ))}
  </div>
</div>

      <footer className="absolute bottom-4 w-full text-center text-xs text-gray-500 z-40">
        © {new Date().getFullYear()} Audio Playground — An Immersive Learning Experience by Amith Ramaswamy
      </footer>
    </main>
  );
}
