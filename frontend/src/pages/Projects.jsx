import { motion } from "framer-motion";

const projects = [
  {
    title: "Audio Playground",
    desc: "An interactive web environment that visualizes Fourier transforms, STFT, and real-time signal analysis. Built using React, Three.js, and Tone.js.",
    tech: ["React", "Three.js", "Tone.js", "Tailwind"],
    link: "/audioplayground",
  },
  {
    title: "LTU Fine-Tuning",
    desc: "Fine-tuned Listen-Think-Understand (LTU) model for temporal ship-noise classification using DeepShip and WHOI datasets with LoRA.",
    tech: ["PyTorch", "Hugging Face", "LoRA", "W&B"],
    link: "https://github.com/amith-2001/LTU-finetune",
  },
  {
    title: "Smart Cane for the Visually Impaired",
    desc: "Embedded AI system integrating ultrasonic sensors and voice feedback for obstacle detection and navigation assistance.",
    tech: ["Raspberry Pi", "Python", "OpenCV", "Flask"],
    link: "https://github.com/amith-2001/smart-cane",
  },
  {
    title: "MarketFit Analyzer",
    desc: "AI tool that performs Reddit-based product-market-fit analysis using NLP pipelines and sentiment scoring.",
    tech: ["Python", "NLTK", "React", "FastAPI"],
    link: "https://github.com/amith-2001/MarketFit-Analyzer",
  },
];

export default function Projects() {
  return (
    <div className="relative min-h-screen bg-[#0b0c10] text-gray-300 font-mono px-6 py-20 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-[#1f6feb] mb-12">Projects</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.link}
            target={p.link.startsWith("/") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group relative border border-[#1f6feb]/30 rounded-xl p-6 hover:border-[#1f6feb] hover:bg-[#1f6feb]/5 transition-all duration-300 cursor-pointer shadow-[0_0_10px_rgba(31,111,235,0.1)]"
          >
            <h2 className="text-xl font-semibold text-[#1f6feb] mb-2 group-hover:text-[#3b82f6] transition-colors">
              {p.title}
            </h2>
            <p className="text-sm text-gray-400 mb-3">{p.desc}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {p.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-1 border border-gray-600 rounded-md text-gray-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>

      <footer className="absolute bottom-4 text-xs text-gray-500">
        © {new Date().getFullYear()} Amith Ramaswamy — Built with React · Tailwind · Framer Motion
      </footer>
    </div>
  );
}
