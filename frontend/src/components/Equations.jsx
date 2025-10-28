import { motion } from "framer-motion";

const eqs = [
  "X(ω)=∫x(t)e^{-jωt}dt",
  "STFT{x(t)}=∑x[n]w[n−m]e^{-jωn}",
  "ŷ=W₂·σ(W₁x+b₁)+b₂",
  "ψ(t,f)=ReLU(W·x+b)",
  "∇θL=E[∂L/∂θ]",
  "A(f)=∫x(t)e^{-j2πft}dt",
  "FFT[k]=∑x[n]e^{-j2πkn/N}"
];

export default function Equations() {
  return (
    <div className="absolute inset-0 overflow-hidden z-20 pointer-events-none">
      {eqs.map((txt, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            repeatType: "mirror"
          }}
          className="absolute text-xl text-purple-300/70 font-mono select-none"
          style={{
            textShadow: "0 0 10px rgba(92, 83, 100, 0.9)"
          }}
        >
          {txt}
        </motion.div>
      ))}
    </div>
  );
}
