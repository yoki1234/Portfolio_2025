import React, { useEffect, useRef } from "react";

// not exporting types from this file, it is for more understaing.
 
type BlurAnimWrapperProps = {
  /** The only parameter: palette for the animated blobs */
  colors: string[];
  /** Children render above the animated background */
  children: React.ReactNode;
};

type Blob = {
  x: number; y: number;
  vx: number; vy: number;
  r: number; color: string;
};

const BlurAnimWrapper: React.FC<BlurAnimWrapperProps> = ({ colors, children }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const blobsRef = useRef<Blob[]>([]);
  const lastTsRef = useRef<number>(0);

  // Resize canvas to its CSS size (with DPR)
  useEffect(() => {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    const resize = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const { width, height } = c.getBoundingClientRect();
      c.width = Math.round(width * dpr);
      c.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    return () => ro.disconnect();
  }, []);

  // Init blobs once
  useEffect(() => {
    const c = canvasRef.current!;
    const { width, height } = c.getBoundingClientRect();

    const N = 10; // number of blobs
    const rand = (a:number, b:number) => a + Math.random() * (b - a);

    blobsRef.current = Array.from({ length: N }, () => {
      const color = colors[Math.floor(Math.random() * colors.length)] || "#000";
      const r = rand(60, 160);
      const speed = rand(10, 22);
      const angle = rand(0, Math.PI * 2);
      return {
        x: rand(0, width),
        y: rand(0, height),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r,
        color
      };
    });
  }, [colors]);

  // Animate (auto-starts on mount)
  useEffect(() => {
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const step = (ts: number) => {
      const dt = lastTsRef.current ? (ts - lastTsRef.current) / 1000 : 0;
      lastTsRef.current = ts;

      const { width, height } = c.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      // Soft vignette base
      const g = ctx.createRadialGradient(
        width / 2, height / 2, Math.min(width, height) / 5,
        width / 2, height / 2, Math.max(width, height)
      );
      g.addColorStop(0, "rgba(0,0,0,0.25)");
      g.addColorStop(1, "rgba(0,0,0,0.15)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      // Blobs
      for (const b of blobsRef.current) {
        if (!reduced) {
          b.x += b.vx * dt;
          b.y += b.vy * dt;
        }

        const m = b.r * 0.8;
        if (b.x < -m || b.x > width + m) b.vx *= -1;
        if (b.y < -m || b.y > height + m) b.vy *= -1;

        ctx.globalAlpha = 0.9;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const wrapperStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    overflow: "hidden",
  };
  const canvasStyle: React.CSSProperties = {
    position: "absolute",
    top:0,
    left:0,
    width: "100%",
    height: "90%",
    pointerEvents: "none",
    filter: `blur(23px) saturate(0.9)`,
    opacity:".65",
  };

  return (
    <div style={wrapperStyle}>
      <canvas ref={canvasRef} style={canvasStyle} />
      <div className="flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};

export default BlurAnimWrapper;
