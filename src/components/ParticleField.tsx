"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ParticleFieldProps {
  mouseX?: number;
  mouseY?: number;
}

export default function ParticleField({ mouseX = 0, mouseY = 0 }: ParticleFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: mouseX, y: mouseY });

  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Scene setup ──────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Particles — three layers at different depths ──────────────────────────
    const createLayer = (count: number, spread: number, size: number, zRange: [number, number], color: THREE.Color) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const speeds = new Float32Array(count); // drift speed per particle

      for (let i = 0; i < count; i++) {
        positions[i * 3]     = (Math.random() - 0.5) * spread;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.6;
        positions[i * 3 + 2] = zRange[0] + Math.random() * (zRange[1] - zRange[0]);
        speeds[i] = 0.0002 + Math.random() * 0.0003;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("speed",    new THREE.BufferAttribute(speeds, 1));

      const material = new THREE.PointsMaterial({
        color,
        size,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.75,
        depthWrite: false,
      });

      return { points: new THREE.Points(geometry, material), speeds };
    };

    // Far layer — tiny white/blue stars
    const far  = createLayer(500, 20, 0.018, [-6, -3],  new THREE.Color(0xc4b5fd));
    // Mid layer — slightly larger, cyan tint
    const mid  = createLayer(280, 14, 0.030, [-3,  0],  new THREE.Color(0x67e8f9));
    // Near layer — bright purple, largest
    const near = createLayer(120, 10, 0.055, [ 0,  2],  new THREE.Color(0xa78bfa));

    scene.add(far.points, mid.points, near.points);

    // ── Resize handler ────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ────────────────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const mx = mouseRef.current.x; // -0.5 → +0.5
      const my = mouseRef.current.y;

      // Gentle auto-rotation plus mouse parallax
      far.points.rotation.y  = t * 0.012 + mx * 0.08;
      far.points.rotation.x  = my * 0.06;
      mid.points.rotation.y  = t * 0.018 + mx * 0.14;
      mid.points.rotation.x  = my * 0.10;
      near.points.rotation.y = t * 0.026 + mx * 0.22;
      near.points.rotation.x = my * 0.16;

      // Breathe opacity
      (far.points.material as THREE.PointsMaterial).opacity  = 0.55 + 0.20 * Math.sin(t * 0.4);
      (mid.points.material as THREE.PointsMaterial).opacity  = 0.60 + 0.20 * Math.sin(t * 0.55 + 1);
      (near.points.material as THREE.PointsMaterial).opacity = 0.70 + 0.20 * Math.sin(t * 0.7  + 2);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
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
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
        borderRadius: "inherit",
      }}
    />
  );
}
