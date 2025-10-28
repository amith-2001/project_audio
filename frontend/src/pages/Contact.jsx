export default function Contact() {
  return (
    <main className="min-h-dvh w-screen bg-[#0b0c10] text-gray-300 font-mono flex flex-col items-center justify-center px-6 sm:px-12 md:px-20 py-24">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1f6feb] mb-8 text-center">
        Contact
      </h1>

      <p className="text-xs sm:text-sm md:text-base text-center max-w-md text-gray-400 mb-10 leading-relaxed">
        I’m open to collaborations, research, or creative AI projects.
        Let’s connect and build something meaningful.
      </p>

      <section className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm items-center justify-center">
        <a
          href="mailto:amithr707@gmail.com"
          className="text-[#1f6feb] hover:text-[#3b82f6] transition-colors"
        >
          ✉️ amithr707@gmail.com
        </a>
        <a
          href="https://linkedin.com/in/amith-ramaswamy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1f6feb] hover:text-[#3b82f6] transition-colors"
        >
          💼 LinkedIn
        </a>
        <a
          href="https://github.com/amith-2001"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1f6feb] hover:text-[#3b82f6] transition-colors"
        >
          🧠 GitHub
        </a>
      </section>

      <footer className="mt-12 text-xs sm:text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} Amith Ramaswamy — Built with React · Tailwind
      </footer>
    </main>
  );
}
