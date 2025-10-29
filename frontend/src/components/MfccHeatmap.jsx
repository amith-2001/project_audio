import { Chart as ChartJS, CategoryScale, LinearScale, Tooltip as ChartTooltip, Title } from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import { Chart } from "react-chartjs-2";
import { Tooltip } from "react-tooltip";  // ✅ from react-tooltip
import "react-tooltip/dist/react-tooltip.css";

ChartJS.register(MatrixController, MatrixElement, CategoryScale, LinearScale, ChartTooltip, Title);

export default function MfccHeatmap({ mfcc }) {
  if (!mfcc) return null;

  const nMfcc = mfcc.length;
  const nFrames = mfcc[0].length;

  const dataPoints = [];
  for (let i = 0; i < nMfcc; i++) {
    for (let j = 0; j < nFrames; j++) {
      dataPoints.push({ x: j, y: nMfcc - i, v: mfcc[i][j] });
    }
  }

  const data = {
    datasets: [
      {
        label: "MFCC Heatmap",
        data: dataPoints,
        width: () => 1,
        height: () => 1,
        backgroundColor: (ctx) => {
          const v = ctx.raw.v;
          const norm = Math.min(Math.max((v + 50) / 100, 0), 1);
          return `hsl(${240 - norm * 240}, 80%, 50%)`; // blue → red
        },
      },
    ],
  };

  const options = {
    aspectRatio: 2,
    scales: {
      x: {
        title: { display: true, text: "Time Frames", color: "#9ca3af" },
        ticks: { color: "#9ca3af", stepSize: Math.ceil(nFrames / 10) },
        grid: { color: "#1f2937" },
      },
      y: {
        title: { display: true, text: "MFCC Coefficients", color: "#9ca3af" },
        ticks: { color: "#9ca3af", stepSize: 1 },
        grid: { color: "#1f2937" },
      },
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "MFCC Heatmap — AI’s compressed view of sound",
        color: "#f3f4f6",
        font: { size: 14, weight: "bold" },
      },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `Coeff ${nMfcc - ctx.raw.y + 1}, Frame ${ctx.raw.x}: ${ctx.raw.v.toFixed(2)}`,
        },
      },
    },
  };

  return (
    <div className="mt-10 bg-white/5 border border-gray-700/50 backdrop-blur-md rounded-2xl p-8 shadow-lg w-full max-w-5xl h-[500px] flex flex-col items-center">
      <p
        data-tooltip-id="color-tip"
        data-tooltip-content="🔵 Blue = low energy, 🔴 Red = high energy — showing how frequency patterns change over time."
        className="text-sm text-gray-300 mb-3 cursor-help"
      >
        🎨 What the colors mean
      </p>
      <Tooltip id="color-tip" place="bottom" style={{ maxWidth: "250px" }} />
      <Chart type="matrix" data={data} options={options} />
    </div>
  );
}
