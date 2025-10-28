export default function Contact() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0b0c10] text-gray-300 font-mono px-4">
      <h1 className="text-4xl font-bold text-[#1f6feb] mb-6">Contact</h1>

      <p className="text-gray-400 text-center max-w-md mb-8 text-sm">
        I'd love to hear from you! Whether it's about collaborations, ideas, or
        just saying hello — feel free to reach out.
      </p>

      <div className="flex flex-col gap-3 text-sm">
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
      </div>

      <footer className="absolute bottom-4 text-xs text-gray-500">
        © {new Date().getFullYear()} Amith Ramaswamy — Built with React · Tailwind
      </footer>
    </div>
  );
}
