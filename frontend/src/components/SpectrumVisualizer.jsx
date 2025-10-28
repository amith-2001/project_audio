import { useEffect, useRef } from "react";

export default function SpectrumVisualizer({ analyser, sampleRate }) {
  const canvasRef = useRef();

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    const margin = { left: 45, right: 10, top: 10, bottom: 25 };

    const draw = () => {
      requestAnimationFrame(draw);
      const w = c.width, h = c.height;
      ctx.clearRect(0, 0, w, h);

      // axes
      ctx.strokeStyle = "#4b5563";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(margin.left, margin.top);
      ctx.lineTo(margin.left, h - margin.bottom);
      ctx.lineTo(w - margin.right, h - margin.bottom);
      ctx.stroke();

      if (!analyser) return;

      const vals = analyser.getValue();
      const bins = vals.length;
      const maxHz = sampleRate ? sampleRate / 2 : 22050;
      const plotW = w - margin.left - margin.right;
      const plotH = h - margin.top - margin.bottom;

      // draw ticks
      ctx.fillStyle = "#9ca3af";
      ctx.font = "10px monospace";
      const yTicks = [-120, -90, -60, -30, 0];
      yTicks.forEach((db) => {
        const y = margin.top + (1 - (db + 120) / 120) * plotH;
        ctx.beginPath();
        ctx.moveTo(margin.left - 4, y);
        ctx.lineTo(margin.left, y);
        ctx.stroke();
        ctx.fillText(`${db}`, 8, y + 3);
      });

      const xTicks = [0, 100, 200, 500, 1000, 2000, 4000, 8000, 16000];
      xTicks.forEach((f) => {
        if (f > maxHz) return;
        const x = margin.left + (f / maxHz) * plotW;
        ctx.beginPath();
        ctx.moveTo(x, h - margin.bottom);
        ctx.lineTo(x, h - margin.bottom + 4);
        ctx.stroke();
        const label = f >= 1000 ? `${f / 1000}k` : f;
        ctx.fillText(label, x - 6, h - 5);
      });

      // spectrum bars
      for (let i = 0; i < bins; i++) {
        const db = Math.max(-120, Math.min(0, vals[i]));
        const mag = (db + 120) / 120;
        const x = margin.left + (i / bins) * plotW;
        const bw = plotW / bins;
        const bh = mag * plotH;
        const y = h - margin.bottom - bh;

        ctx.fillStyle = `hsl(${(i / bins) * 250}, 70%, 65%)`;
        ctx.fillRect(x, y, bw, bh);
      }

      // labels
      ctx.fillStyle = "#9ca3af";
      ctx.fillText("Frequency (Hz)", w / 2 - 40, h - 5);
      ctx.save();
      ctx.translate(10, h / 2 + 20);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText("Magnitude (dB)", 0, 0);
      ctx.restore();
    };

    draw();
  }, [analyser, sampleRate]);

  return (
    <canvas
      ref={canvasRef}
      width={740}
      height={260}
      className="rounded-lg border border-gray-700/50 bg-[#111]/50 backdrop-blur-sm"
    />
  );
}
