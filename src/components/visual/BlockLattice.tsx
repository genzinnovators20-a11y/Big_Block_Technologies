import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { useColorScheme } from '@mui/material/styles';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Face colours per theme.
 *
 * Not an inversion. In the dark theme the blocks are lighter than the canvas
 * and read as lit masses; in the light theme they are *darker* than the canvas
 * and read as a solid object casting its own shade. Both keep the brand azure
 * on the leading edge, which is what makes them recognisably the same artwork.
 */
const LATTICE = {
  dark: {
    top: [30, 58, 100] as const,
    topLit: [26, 74, 132] as const,
    topLitGain: [10, 90, 108] as const,
    left: [10, 22, 42] as const,
    right: [18, 40, 74] as const,
    edgeAlpha: 0.24,
    baseAlpha: 0.55,
    depthGain: 0.4,
  },
  light: {
    top: [176, 199, 227] as const,
    topLit: [96, 148, 214] as const,
    topLitGain: [40, 50, 40] as const,
    left: [70, 104, 156] as const,
    right: [122, 156, 202] as const,
    edgeAlpha: 0.32,
    baseAlpha: 0.62,
    depthGain: 0.32,
  },
} as const;

interface BlockLatticeProps {
  /** Grid size along each axis of the isometric plane. */
  columns?: number;
  rows?: number;
  sx?: SxProps<Theme>;
}

/**
 * Isometric block field.
 *
 * The brand mark is an extruded cube and the company is named for blocks, so
 * the hero visual is a structural lattice of them rather than a generic
 * particle field. It is drawn on a 2D canvas: no WebGL, no 3D library, no
 * shader compilation, and it degrades to a static frame under reduced motion.
 *
 * A slow diagonal sweep is the only animation. It reads as a system being
 * traversed rather than decoration in motion.
 */
export function BlockLattice({ columns = 11, rows = 11, sx }: BlockLatticeProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const { colorScheme } = useColorScheme();
  // `colorScheme` is undefined until the provider reads storage; dark is the
  // default mode, so assuming it avoids a repaint on first mount.
  const scheme = colorScheme === 'light' ? 'light' : 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // No 2D context (very old or hardened browser): leave the area empty
    // rather than throwing. The hero reads fine without it.
    if (!ctx) return;

    // `frame` is the live rAF handle (0 when no loop is scheduled) and
    // `onScreen` tracks visibility. Painting and looping are kept separate:
    // conflating them meant a resize that happened while the canvas was
    // off-screen cleared the buffer and then skipped the redraw, leaving the
    // artwork permanently blank — which is exactly what a reduced-motion user
    // saw after scrolling past the hero and back.
    const palette = LATTICE[scheme];

    let frame = 0;
    let onScreen = true;
    let lastTime = 0;
    let width = 0;
    let height = 0;

    // Deterministic height field: same lattice on every load, and no random
    // reshuffle between renders that would read as noise.
    const heightAt = (x: number, y: number) => {
      const a = Math.sin(x * 0.82 + y * 0.4) * 0.5 + 0.5;
      const b = Math.cos(x * 0.38 - y * 0.68) * 0.5 + 0.5;
      // Radial massing so the structure rises toward a centre and steps down
      // at the edges, reading as architecture rather than a flat plate.
      const massing = 1 - Math.hypot(x / columns - 0.5, y / rows - 0.48) * 1.55;
      const raw = (a * 0.5 + b * 0.5) * Math.max(0, massing);
      // Quantise to discrete storeys: blocks, not a smooth landscape.
      return Math.round(raw * 5) / 5;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      // Cap the device pixel ratio: beyond 2x the extra fill cost buys
      // nothing perceptible on this artwork.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /** Paints one frame. Always paints; never schedules. */
    const paint = (time: number) => {
      lastTime = time;
      ctx.clearRect(0, 0, width, height);

      // Fit the lattice to the shorter axis so it never overflows its box.
      const tile = Math.min(width / (columns + rows), height / (columns + rows)) * 1.95;
      const tileW = tile;
      const tileH = tile * 0.5;
      const cubeH = tile * 0.9;

      const originX = width * 0.5;
      const originY = height * 0.5 - ((columns + rows) * tileH) / 4 + cubeH * 0.55;

      // Sweep travels along the x+y diagonal, the natural reading direction
      // of an isometric plane.
      const period = 7200;
      // Under reduced motion the sweep is parked mid-structure rather than
      // pushed off the grid: the lattice still reads as lit and dimensional,
      // it simply stops moving. Parking it at -99 (the previous behaviour)
      // left an almost invisible flat plate.
      const sweep = reducedMotion
        ? (columns + rows) * 0.46
        : ((time % period) / period) * (columns + rows + 8) - 4;

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          const h = heightAt(x, y);
          if (h < 0.05) continue;

          const z = h * cubeH * 2.6;
          const sx0 = originX + (x - y) * (tileW / 2);
          const sy0 = originY + (x + y) * (tileH / 2) - z;

          // Distance from the sweep line, used for a soft falloff.
          const d = Math.abs(x + y - sweep);
          const lit = Math.max(0, 1 - d / 2.6);

          const depth = 1 - (x + y) / (columns + rows);
          const baseAlpha = palette.baseAlpha + depth * palette.depthGain;

          // Top face
          ctx.beginPath();
          ctx.moveTo(sx0, sy0);
          ctx.lineTo(sx0 + tileW / 2, sy0 + tileH / 2);
          ctx.lineTo(sx0, sy0 + tileH);
          ctx.lineTo(sx0 - tileW / 2, sy0 + tileH / 2);
          ctx.closePath();
          // Top face catches the light, so it carries the brand blue and takes
          // the full lift from the sweep.
          ctx.fillStyle =
            lit > 0.01
              ? `rgba(${Math.round(palette.topLit[0] + lit * palette.topLitGain[0])}, ${Math.round(palette.topLit[1] + lit * palette.topLitGain[1])}, ${Math.round(palette.topLit[2] + lit * palette.topLitGain[2])}, ${Math.min(1, baseAlpha + lit * 0.35)})`
              : `rgba(${palette.top[0]}, ${palette.top[1]}, ${palette.top[2]}, ${baseAlpha})`;
          ctx.fill();

          // Left face — the shadowed side.
          ctx.beginPath();
          ctx.moveTo(sx0 - tileW / 2, sy0 + tileH / 2);
          ctx.lineTo(sx0, sy0 + tileH);
          ctx.lineTo(sx0, sy0 + tileH + z);
          ctx.lineTo(sx0 - tileW / 2, sy0 + tileH / 2 + z);
          ctx.closePath();
          ctx.fillStyle = `rgba(${palette.left[0]}, ${palette.left[1]}, ${palette.left[2]}, ${Math.min(1, baseAlpha + 0.2)})`;
          ctx.fill();

          // Right face
          ctx.beginPath();
          ctx.moveTo(sx0 + tileW / 2, sy0 + tileH / 2);
          ctx.lineTo(sx0, sy0 + tileH);
          ctx.lineTo(sx0, sy0 + tileH + z);
          ctx.lineTo(sx0 + tileW / 2, sy0 + tileH / 2 + z);
          ctx.closePath();
          ctx.fillStyle = `rgba(${palette.right[0]}, ${palette.right[1]}, ${palette.right[2]}, ${Math.min(1, baseAlpha + 0.14)})`;
          ctx.fill();

          // Leading edge, brightened as the sweep passes.
          ctx.beginPath();
          ctx.moveTo(sx0, sy0);
          ctx.lineTo(sx0 + tileW / 2, sy0 + tileH / 2);
          ctx.lineTo(sx0, sy0 + tileH);
          ctx.lineTo(sx0 - tileW / 2, sy0 + tileH / 2);
          ctx.closePath();
          ctx.strokeStyle = `rgba(0, 121, 240, ${palette.edgeAlpha + lit * 0.6})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

    };

    /** One step of the animation loop. */
    const loop = (time: number) => {
      paint(time);
      frame = onScreen && !reducedMotion ? requestAnimationFrame(loop) : 0;
    };

    const start = () => {
      if (frame || reducedMotion || !onScreen) return;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    paint(0);
    start();

    const observer = new ResizeObserver(() => {
      resize();
      // `resize` resets the backing store, which clears it. Repaint whatever
      // the last frame was, regardless of whether the loop is running.
      paint(lastTime);
    });
    observer.observe(canvas);

    // Stop the loop whenever the hero is scrolled out of view: no reason to
    // burn frames on a canvas nobody can see.
    let visibility: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== 'undefined') {
      visibility = new IntersectionObserver(
        ([entry]) => {
          onScreen = entry.isIntersecting;
          if (onScreen) start();
          else stop();
        },
        { threshold: 0 },
      );
      visibility.observe(canvas);
    }

    return () => {
      onScreen = false;
      stop();
      observer.disconnect();
      visibility?.disconnect();
    };
  }, [columns, rows, reducedMotion, scheme]);

  return (
    <Box
      component="canvas"
      ref={canvasRef}
      // Purely decorative: the hero states everything this conveys in text.
      aria-hidden="true"
      role="presentation"
      sx={[{ width: '100%', height: '100%', display: 'block' }, ...(Array.isArray(sx) ? sx : [sx])]}
    />
  );
}
