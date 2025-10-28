import { useEffect, useRef } from "react";

export default function SineCanvas() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width, height;
    let t = 0;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const drawWave = (offset, amp, freq, color, speed) => {
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const y = height / 2 + Math.sin(x * freq + t * speed + offset) * amp;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      ctx.stroke();
    };

    const draw = () => {
      requestAnimationFrame(draw);
      ctx.clearRect(0, 0, width, height);
      t += 0.005;

      const waveLayers = [
        { offset: 0, amp: 60, freq: 0.005, color: "rgba(150,150,150,0.5)", speed: 1 },
        { offset: 2, amp: 50, freq: 0.006, color: "rgba(180,180,180,0.4)", speed: 0.8 },
        { offset: 4, amp: 40, freq: 0.007, color: "rgba(200,200,200,0.3)", speed: 0.6 },
        { offset: 6, amp: 30, freq: 0.008, color: "rgba(255,255,255,0.25)", speed: 0.4 },
        
      ];

      waveLayers.forEach(w =>
        drawWave(w.offset, w.amp, w.freq, w.color, w.speed)
      );
    };

    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-10" />;
}
