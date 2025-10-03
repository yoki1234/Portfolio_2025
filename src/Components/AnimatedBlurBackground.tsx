import React, { Children, useEffect, useRef } from "react";

/** Per-shape override (optional) */
export type ShapeConfig = Partial<{
  color: string;
  size: number;     // px
  sides: number;    // 0=circle, 3+=polygon
  speedScale: number;
  rotationSpeed: number; // radians/sec
}>;

type Props = {
  count?: number;
  blur?: number;
  opacity?: number;
  zIndex?: number;
  fillParent?: boolean;
  /** Fallback palette; used when getColor/getShape don't specify color */
  colors?: string[];

  /** Deterministic seed so the same link produces the same animation */
  seed?: string | number;

  /** Per-shape color: index -> color string */
  getColor?: (index: number) => string;

  /** Per-shape config: index -> overrides for size/sides/speed/etc. */
  getShape?: (index: number) => ShapeConfig;

  /** If false, you can start manually; defaults to true (moves on mount) */
  autoStart?: boolean;
};

type Shape = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  sides: number;
  color: string;
  rotation: number;
  vr: number;
};

/* --------- seeded RNG so links can reproduce the same scene ---------- */
function makePRNG(seedStr: string | number) {
  let s = 0;
  const str = String(seedStr);
  for (let i = 0; i < str.length; i++) s = (s * 31 + str.charCodeAt(i)) >>> 0;
  return () => {
    // xorshift32
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
    // [0,1)
    return ((s >>> 0) % 1_000_000) / 1_000_000;
  };
}
const rBetween = (r: () => number, min: number, max: number) => min + r() * (max - min);
const pick = <T,>(r: () => number, arr: T[]) => arr[Math.floor(r() * arr.length)];

const AnimatedBlurBackground: React.FC<Props> = ({
  count = 12,
  blur = 45,
  opacity = 0.4,
  zIndex = -1,
  fillParent = false,
  colors = ["#0ef247ff", "#0ef247ff", "#0ef247ff"],
  seed,
  getColor,
  getShape,
  autoStart = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const shapesRef = useRef<Shape[]>([]);
  const lastTsRef = useRef<number>(0);

  // Setup canvas sizing
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  // Initialize shapes (deterministic if seed provided)
  useEffect(() => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();

    const rng =
      seed !== undefined
        ? makePRNG(seed)
        : makePRNG(Math.random().toString(36).slice(2));

    const shapes: Shape[] = Array.from({ length: count }).map((_, i) => {
      const baseSides = rng() < 0.25 ? 0 : Math.floor(rBetween(rng, 3, 7));
      const overrides = getShape?.(i) ?? {};
      const size = overrides.size ?? rBetween(rng, 60, 160);
      const sides = overrides.sides ?? baseSides;
      const speedScale = overrides.speedScale ?? rBetween(rng, 0.6, 1.2);
      const baseSpeed = rBetween(rng, 10, 18) * speedScale;
      const angle = rBetween(rng, 0, Math.PI * 2);
      const color = overrides.color ?? getColor?.(i) ?? pick(rng, colors);
      const vr = overrides.rotationSpeed ?? rBetween(rng, -0.25, 0.25);

      return {
        x: rBetween(rng, 0, rect.width),
        y: rBetween(rng, 0, rect.height),
        vx: Math.cos(angle) * baseSpeed,
        vy: Math.sin(angle) * baseSpeed,
        size,
        sides,
        color,
        rotation: rBetween(rng, 0, Math.PI * 2),
        vr,
      };
    });

    shapesRef.current = shapes;
  }, [count, seed, colors, getColor, getShape]);

  // Animate (starts on mount if autoStart)
useEffect(() => {
  if (!autoStart) return; // returns undefined, which is OK

  const canvas = canvasRef.current!;
  const ctx = canvas.getContext("2d")!;
  const reduced =
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  const drawPoly = (cx: number, cy: number, r: number, sides: number, rot: number) => {
    ctx.beginPath();
    for (let k = 0; k < sides; k++) {
      const a = rot + (k * 2 * Math.PI) / sides;
      const px = cx + r * Math.cos(a);
      const py = cy + r * Math.sin(a);
      k === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  };

  const step = (ts: number) => {
    const dt = lastTsRef.current ? (ts - lastTsRef.current) / 1000 : 0;
    lastTsRef.current = ts;

    const { width, height } = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);

    // base vignette
    const g = ctx.createRadialGradient(
      width / 2, height / 2, Math.min(width, height) / 4,
      width / 2, height / 2, Math.max(width, height) / 1.2
    );
    g.addColorStop(0, "rgba(0, 0, 0, 0.4)");
    g.addColorStop(1, "rgba(0,0,0,0.25)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    for (const s of shapesRef.current) {
      if (!reduced) {
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.rotation += s.vr * dt;
      }

      // gentle bounce
      const m = s.size * 0.8;
      if (s.x < -m || s.x > width + m) s.vx *= -1;
      if (s.y < -m || s.y > height + m) s.vy *= -1;

      ctx.globalAlpha = 0.9;
      ctx.fillStyle = s.color;

      if (s.sides === 0) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      } else {
        drawPoly(s.x, s.y, s.size, s.sides, s.rotation);
      }
    }

    rafRef.current = requestAnimationFrame(step);
  };

  rafRef.current = requestAnimationFrame(step);

  // ✅ cleanup returns void only
  return () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };
}, [autoStart]);


  const style: React.CSSProperties = {
    position: fillParent ? "absolute" : "fixed",
    inset: 0,
    width: "100%",
    height: "100%",
    zIndex,
    pointerEvents: "none",
    filter: `blur(${blur}px) saturate(0.9)`,
    opacity,
    background:
      "radial-gradient(1200px 800px at 10% 20%, rgba(0,0,0,0.06), transparent 60%), radial-gradient(1000px 700px at 90% 80%, rgba(0,0,0,0.05), transparent 60%)",
  };

  return (

        <canvas ref={canvasRef} style={style} className="bg-gradient-t0-t" />
);
};

export default AnimatedBlurBackground;
