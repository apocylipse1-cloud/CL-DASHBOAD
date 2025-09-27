"use client";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { animate, useMotionValue, useMotionValueEvent } from "framer-motion";

ChartJS.register(ArcElement, Tooltip);

type ProgressRingProps = {
  value: number; // 0-100
  size?: number; // px
};

export function ProgressRing({ value, size = 128 }: ProgressRingProps) {
  const current = useMotionValue(0);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const controls = animate(current, value, { duration: 0.8, ease: "easeOut" });
    return () => controls.stop();
  }, [value, current]);

  useMotionValueEvent(current, "change", (latest) => {
    setDisplayed(Math.round(latest));
  });
  const clamped = Math.max(0, Math.min(100, displayed));
  const data: ChartData<"doughnut", number[], unknown> = {
    labels: ["Progress", "Remaining"],
    datasets: [
      {
        data: [clamped, 100 - clamped],
        backgroundColor: ["#00B4FF", "rgba(255,255,255,0.08)"],
        borderWidth: 0,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: false,
    cutout: "78%",
    animation: { duration: 600 },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };

  return (
    <div style={{ width: size, height: size }} className="relative">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex items-center justify-center rounded-full">
        <div className="text-white font-bold">{clamped}%</div>
      </div>
    </div>
  );
}

