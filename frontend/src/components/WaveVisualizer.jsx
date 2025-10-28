import { useEffect, useRef } from "react";

export default function WaveVisualizer({ analyser }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const draw = () => {
      requestAnimationFrame(draw);
      if (!analyser) return;

      const values = analyser.getValue();
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();

      for (let i = 0; i < values.length; i++) {
        const x = (i / values.length) * width;
        const y = (values[i] / 2 + 0.5) * height;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = "rgba(180, 180, 180, 0.8)";
      ctx.lineWidth = 2;
      ctx.shadowColor = "rgba(180,180,180,0.3)";
      ctx.shadowBlur = 8;
      ctx.stroke();
    };

    draw();
  }, [analyser]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={200}
      className="rounded-lg border border-gray-700/50 bg-[#111]/50 backdrop-blur-sm"
    />
  );
}
