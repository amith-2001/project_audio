import { motion } from "framer-motion";

const projects = [
    {
    "title": "Research-Temporal_LTU",
    "desc": "Enhancing the LTU audio-language model for temporal marine audio segmentation and classification (ships vs marine mammals) with physics-based dataset augmentations and LoRA fine-tuning.",
    "tech": ["Python", "Hugging Face Transformers", "LoRA", "Audio signal processing"],  // from README system summary :contentReference[oaicite:9]{index=9}
    "link": "https://github.com/amith-2001/Research-Temporal_LTU"
  },
    {
    "title": "Demon (DeMonS)",
    "desc": "DeMonS – Deforestation Monitoring System: audio-based hardware nodes (Raspberry Pi + Node MCU) detect illegal tree-cutting via AI-processed audio/mel-spectrogram and web UI.",
    "tech": ["Python", "Raspberry Pi", "Node MCU", "Audio processing / Deep Learning"],  // from README hardware + system description :contentReference[oaicite:7]{index=7}
    "link": "https://github.com/amith-2001/Demon"
  },

  {
  title: "Avocado & Host",
  desc: "AI-driven podcast generator that transforms trending Reddit and Twitter topics into engaging, character-based podcasts. Supports dynamic voice synthesis, multi-host formats, and unbiased content curation for news and discussions.",
  tech: ["Golang", "Python", "Next.js", "MongoDB", "OpenAI", "ElevenLabs", "PyDub", "Render"],
  link: "https://github.com/amith-2001/avocado_and_host",
  },

  {
    "title": "OCT4LLM",
    "desc": "One-Click Tool for LLMs — simplifies fine-tuning and deployment of large language models by converting unstructured to structured data and wrapping the pipeline in Docker.",
    "tech": ["Docker", "Python", "PyTorch", "LLM fine-tuning pipeline"],  // deduced from install & overview :contentReference[oaicite:5]{index=5}
    "link": "https://github.com/amith-2001/OCT4LLM"
  },

  {
  title: "Automated SLM Training Pipeline",
  desc: "Streamlined web app for training small n-gram language models. Allows users to upload text or PDFs, train predictive models, test next-word predictions, and download trained models — all with minimal computational cost.",
  tech: ["Python", "Streamlit", "NLTK", "PyPDF2", "Pickle"],
  link: "https://github.com/amith-2001/automated_slm_training_pipeline",
  },


  {
    "title": "BuzzFeeds.Ai",
    "desc": "Transform the way you consume information with BuzzFeeds.Ai — personalized content, multi-channel accessibility and interactive text summarisation via a web UI. ",
    "tech": ["Python", "Streamlit", "OpenAI API", "Fal.ai API", "Vertex AI (Gemini)"],  // inferred from README :contentReference[oaicite:1]{index=1}
    "link": "https://github.com/amith-2001/BuzzFeeds.Ai"
  },
  {
    "title": "Presently",
    "desc": "A prototype that redefines presentation creation: upload data, get graph recommendations via Snowflake Arctic, automatically generate E-charts code using GPT-4, with a Streamlit frontend.",
    "tech": ["Python", "Streamlit", "Snowflake Arctic", "OpenAI GPT-4"],  // from README features list :contentReference[oaicite:3]{index=3}
    "link": "https://github.com/amith-2001/Presently"
  },




  {
  title: "LDKIC",
  desc: "Interactive Streamlit app powered by OpenAI API that demonstrates intelligent content generation or analysis through a clean and responsive interface.",
  tech: ["Python", "OpenAI API", "Streamlit"],
  link: "https://github.com/amith-2001/LDKIC",
  },
  {
  title: "World-Wide CO2 Emissions",
  desc: "Interactive data visualization dashboard showcasing global CO₂ emission trends across countries and years. Combines geospatial analysis with dynamic charts to highlight environmental impact patterns.",
  tech: ["Python", "Pandas", "GeoPandas", "NumPy", "D3.js", "ECharts"],
  link: "https://github.com/amith-2001/World-Wide-CO2-Emissions",
  },





  {
    title: "Cyber-Cop",
    desc: "API service that detects sexual/violent content in video/audio and auto-classifies/censors media for social platforms, CCTV, and institutional filters.",
    tech: ["Python", "REST API", "VGG16", "Computer Vision", "TensorFlow/Keras", "OpenCV"],
    link: "https://github.com/amith-2001/Cyber-Cop",
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
