"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene setup ───────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Global mouse tracking (across whole page) ─────────────────────────────
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth)  - 0.5;
      mouse.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── Generate Procedural Glow Texture (Bokeh effect) ───────────────────────
    const createGlowTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
        gradient.addColorStop(0.5, "rgba(255,255,255,0.1)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };
    const glowTexture = createGlowTexture();

    // ── Particle layers at different depths ───────────────────────────────────
    const createLayer = (
      count: number,
      spread: number,
      size: number,
      zRange: [number, number],
      color: THREE.Color
    ) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.65;
        positions[i * 3 + 2] = zRange[0] + Math.random() * (zRange[1] - zRange[0]);
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color,
        size,
        map: glowTexture,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
        blending: THREE.AdditiveBlending, // Makes overlapping particles glow intensely
      });

      return new THREE.Points(geometry, material);
    };

    // Far — tiny lavender stars
    const far  = createLayer(2000, 22, 0.045, [-6, -3], new THREE.Color(0xc4b5fd));
    // Mid — cyan tint
    const mid  = createLayer(1000, 16, 0.075, [-3,  0], new THREE.Color(0x67e8f9));
    // Near — bright purple, largest
    const near = createLayer(500, 11, 0.140, [ 0,  2], new THREE.Color(0xa78bfa));

    scene.add(far, mid, near);

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop (no THREE.Clock — use performance.now) ─────────────────
    let animId: number;
    const start = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (performance.now() - start) * 0.001; // seconds

      // Each layer parallaxes at a different rate
      // Speeds increased for a more active, dynamic field
      far.rotation.y  = t * 0.040 + mouse.x * 0.20;
      far.rotation.x  =             mouse.y * 0.15;
      mid.rotation.y  = t * 0.065 + mouse.x * 0.35;
      mid.rotation.x  =             mouse.y * 0.25;
      near.rotation.y = t * 0.100 + mouse.x * 0.50;
      near.rotation.x =             mouse.y * 0.35;

      // Breathing opacity
      (far.material  as THREE.PointsMaterial).opacity = 0.70 + 0.25 * Math.sin(t * 0.6);
      (mid.material  as THREE.PointsMaterial).opacity = 0.80 + 0.20 * Math.sin(t * 0.8 + 1);
      (near.material as THREE.PointsMaterial).opacity = 0.90 + 0.10 * Math.sin(t * 1.0 + 2);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
    />
  );
}
