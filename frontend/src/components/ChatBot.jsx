import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi there 👋! I'm your AudioPlayground assistant. Ask me anything about sound, waves, or AI!" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }, { role: "bot", text: "💬 Feature coming soon..." }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-5 left-5 z-[9999]">
      {/* Chat bubble button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-3 shadow-lg border border-gray-600"
      >
        💬
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-14 left-0 w-72 bg-[#0e0e0e] border border-gray-700 rounded-xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gray-900 px-4 py-2 text-sm font-semibold text-gray-300 border-b border-gray-700 flex justify-between items-center">
              AI Tutor 🤖
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-300">
                ✖
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto max-h-64 px-3 py-2 text-sm">
              {messages.map((msg, i) => (
                <div key={i} className={`my-1 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  <span
                    className={`inline-block px-2 py-1 rounded-lg ${
                      msg.role === "user"
                        ? "bg-gray-600 text-white"
                        : "bg-gray-800 text-gray-300 border border-gray-700"
                    }`}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Input area */}
            <div className="border-t border-gray-700 flex">
              <input
                type="text"
                placeholder="Ask something..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 px-3 py-2 bg-transparent text-gray-200 text-sm outline-none"
              />
              <button
                onClick={handleSend}
                className="px-3 text-gray-400 hover:text-gray-200 text-sm font-medium"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
