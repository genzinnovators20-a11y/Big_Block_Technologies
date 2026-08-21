import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // No 2D context (very old or hardened browser): leave the area empty
    // rather than throwing. The hero reads fine without it.
    if (!ctx) return;

    let frame = 0;
    let running = true;
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

    const draw = (time: number) => {
      if (!running) return;
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
      const sweep = reducedMotion
        ? -99
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
          const baseAlpha = 0.30 + depth * 0.42;

          // Top face
          ctx.beginPath();
          ctx.moveTo(sx0, sy0);
          ctx.lineTo(sx0 + tileW / 2, sy0 + tileH / 2);
          ctx.lineTo(sx0, sy0 + tileH);
          ctx.lineTo(sx0 - tileW / 2, sy0 + tileH / 2);
          ctx.closePath();
          ctx.fillStyle = lit > 0.01
            ? `rgba(${Math.round(14 + lit * 0)}, ${Math.round(52 + lit * 69)}, ${Math.round(96 + lit * 144)}, ${baseAlpha + lit * 0.3})`
            : `rgba(22, 35, 58, ${baseAlpha})`;
          ctx.fill();

          // Left face — the shadowed side.
          ctx.beginPath();
          ctx.moveTo(sx0 - tileW / 2, sy0 + tileH / 2);
          ctx.lineTo(sx0, sy0 + tileH);
          ctx.lineTo(sx0, sy0 + tileH + z);
          ctx.lineTo(sx0 - tileW / 2, sy0 + tileH / 2 + z);
          ctx.closePath();
          ctx.fillStyle = `rgba(8, 15, 27, ${baseAlpha + 0.12})`;
          ctx.fill();

          // Right face
          ctx.beginPath();
          ctx.moveTo(sx0 + tileW / 2, sy0 + tileH / 2);
          ctx.lineTo(sx0, sy0 + tileH);
          ctx.lineTo(sx0, sy0 + tileH + z);
          ctx.lineTo(sx0 + tileW / 2, sy0 + tileH / 2 + z);
          ctx.closePath();
          ctx.fillStyle = `rgba(13, 25, 43, ${baseAlpha + 0.06})`;
          ctx.fill();

          // Leading edge, brightened as the sweep passes.
          ctx.beginPath();
          ctx.moveTo(sx0, sy0);
          ctx.lineTo(sx0 + tileW / 2, sy0 + tileH / 2);
          ctx.lineTo(sx0, sy0 + tileH);
          ctx.lineTo(sx0 - tileW / 2, sy0 + tileH / 2);
          ctx.closePath();
          ctx.strokeStyle = `rgba(0, 121, 240, ${0.10 + lit * 0.55})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      if (!reducedMotion) frame = requestAnimationFrame(draw);
    };

    resize();
    draw(0);

    const observer = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw(0);
    });
    observer.observe(canvas);

    // Stop the loop whenever the hero is scrolled out of view: no reason to
    // burn frames on a canvas nobody can see.
    let visibility: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== 'undefined') {
      visibility = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !running) {
            running = true;
            if (!reducedMotion) frame = requestAnimationFrame(draw);
          } else if (!entry.isIntersecting && running) {
            running = false;
            cancelAnimationFrame(frame);
          }
        },
        { threshold: 0 },
      );
      visibility.observe(canvas);
    }

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility?.disconnect();
    };
  }, [columns, rows, reducedMotion]);

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
