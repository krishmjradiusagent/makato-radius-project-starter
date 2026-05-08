"use client";

import { useEffect, useRef } from "react";
import { cn } from "./utils";

interface AuroraBarsProps {
  barCount?: number;
  colors?: string[];
  speed?: number;
  blur?: number;
  background?: string;
  className?: string;
}

export function AuroraBars({
  barCount = 60,
  colors = ["#3b0764", "#6d28d9", "#a21caf", "#7c3aed", "#4f46e5"],
  speed = 3,
  blur = 10,
  background = "rgb(20, 8, 48)",
  className,
}: AuroraBarsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let startTs: number | null = null;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const draw = (ts: number) => {
      if (!startTs) startTs = ts;
      const t = ((ts - startTs) / 1000) * speed;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const barW = W / barCount;

      for (let i = 0; i < barCount; i++) {
        const arch = Math.sin((i / (barCount - 1)) * Math.PI);
        const wave =
          0.5 +
          0.5 *
            Math.sin(t + i * 0.28) *
            Math.sin(t * 0.63 + i * 0.45);
        const minH = 0.15 * H;
        const maxH = 0.95 * H;
        const barH = minH + (maxH - minH) * arch * wave;
        const y = H - barH;

        const grad = ctx.createLinearGradient(0, H, 0, y);
        colors.forEach((c, ci) => {
          grad.addColorStop(ci / (colors.length - 1), c);
        });

        ctx.fillStyle = grad;
        ctx.fillRect(x(i, barW), y, Math.max(barW - 1.5, 1), barH);
      }

      animId = requestAnimationFrame(draw);
    };

    const x = (i: number, barW: number) => i * barW;

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [barCount, colors, speed, blur]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      style={{ background, filter: blur ? `blur(${blur}px)` : undefined }}
    />
  );
}
