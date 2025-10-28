import { motion } from "framer-motion";

const projects = [
  {
    title: "Audio Playground",
    desc: "Interactive environment visualizing Fourier transforms and STFT in real time.",
    tech: ["React", "Three.js", "Tone.js", "Tailwind"],
    link: "/audioplayground",
  },
  {
    title: "LTU Fine-Tuning",
    desc: "Fine-tuned LTU for ship-noise classification using DeepShip and WHOI datasets.",
    tech: ["PyTorch", "LoRA", "Hugging Face", "W&B"],
    link: "https://github.com/amith-2001/LTU-finetune",
  },
  {
    title: "Smart Cane",
    desc: "Embedded AI navigation system for visually impaired users.",
    tech: ["Raspberry Pi", "OpenCV", "Flask"],
    link: "https://github.com/amith-2001/smart-cane",
  },
  {
    title: "MarketFit Analyzer",
    desc: "NLP-powered Reddit analyzer for startup product-market fit.",
    tech: ["Python", "FastAPI", "React"],
    link: "https://github.com/amith-2001/MarketFit-Analyzer",
  },
];

export default function Projects() {
  return (
    <main className="min-h-dvh w-screen bg-[#0b0c10] text-gray-300 font-mono flex flex-col items-center justify-start pt-24 pb-16 px-4 sm:px-8 md:px-16 overflow-x-hidden">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1f6feb] mb-10 text-center"
      >
        Projects
      </motion.h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-7xl px-2">
        {projects.map((p, i) => (
          <motion.a
            key={p.title}
            href={p.link}
            target={p.link.startsWith("/") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="group border border-[#1f6feb]/30 rounded-xl p-6 hover:border-[#1f6feb] hover:bg-[#1f6feb]/5 transition-all duration-300 shadow-[0_0_10px_rgba(31,111,235,0.1)] w-full"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-[#1f6feb] mb-2 group-hover:text-[#3b82f6] transition-colors">
              {p.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mb-3 leading-relaxed">
              {p.desc}
            </p>
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
      </section>

      <footer className="mt-12 text-xs sm:text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} Amith Ramaswamy — Portfolio
      </footer>
    </main>
  );
}
