export default function About() {
  return (
    <main className="min-h-dvh w-screen bg-[#0b0c10] text-gray-300 font-mono flex flex-col items-center justify-center px-6 sm:px-12 md:px-20 py-24">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1f6feb] mb-8 text-center">
        About Me
      </h1>

      <p className="max-w-3xl text-xs sm:text-sm md:text-base text-center text-gray-400 leading-relaxed mb-10">
        I’m <span className="text-[#1f6feb]">Amith Ramaswamy</span>, an AI Engineer & Data Scientist
        exploring the intersection of sound, intelligence, and embedded systems.
        I design data-driven and signal-aware architectures that make machines understand the world like humans do.
      </p>

      {/* <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-2xl justify-items-center">
        {[
          "AI / ML",
          "Audio Signal Processing",
          "React / Next.js",
          "Python / PyTorch",
          "Embedded Systems",
          "LLMs / RAG",
          "Data Visualization",
          "Cloud / DevOps",
        ].map((skill) => (
          <span
            key={skill}
            className="border border-gray-600 px-3 py-2 rounded-md text-xs sm:text-sm text-gray-400 text-center hover:border-[#1f6feb] transition-all"
          >
            {skill}
          </span>
        ))}
      </section> */}

      <footer className="mt-10 text-xs sm:text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} Amith Ramaswamy — Portfolio
      </footer>
    </main>
  );
}
