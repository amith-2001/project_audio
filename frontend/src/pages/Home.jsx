import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SoundFabric from "../components/SoundFabric";
import Equations from "../components/Equations";

export default function Home() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0b0c10] text-white font-mono">
      {/* Background particles (dimmed) */}
      <div className="absolute inset-0 z-10 opacity-50">
        <SoundFabric />
        <Equations />
      </div>



      {/* Main Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-7xl sm:text-6xl md:text-8xl font-bold tracking-tight text-[#1f6feb] drop-shadow-[0_0_20px_rgba(31,111,235,0.3)]"
        >
          Amith Ramaswamy
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-gray-400 text-sm sm:text-base max-w-lg"
        >
          AI Engineer · Audio Intelligence · Full-Stack Innovator
          <br />
          Exploring the intersection of signal, sound, and intelligence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/projects"
            className="border border-[#1f6feb] px-6 py-3 rounded-lg text-[#1f6feb] hover:bg-[#1f6feb]/10 transition-all duration-300"
          >
            🚀 Projects
          </Link>
          <Link
            to="/audioplayground"
            className="bg-[#1f6feb] text-white px-6 py-3 rounded-lg hover:bg-[#3b82f6] transition-all duration-300"
          >
            🎧 Audio Playground
          </Link>
          <Link
            to="/about"
            className="border border-gray-500 px-6 py-3 rounded-lg text-gray-400 hover:bg-gray-700/20 transition-all duration-300"
          >
            👨‍💻 About
          </Link>
          <Link
            to="/contact"
            className="border border-gray-500 px-6 py-3 rounded-lg text-gray-400 hover:bg-gray-700/20 transition-all duration-300"
          >
            ✉️ Contact
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 w-full text-center text-xs text-gray-500 z-30">
        © {new Date().getFullYear()} Amith Ramaswamy — Built with React · Tailwind · Three.js
      </div>
    </div>
  );
}
