"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  twinkleFactor: number;
  driftOffset: THREE.Vector3;
}

export default function ParticleField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── ENHANCEMENT 7: Mobile Optimization ──────────────────────────────────
    const isMobile = window.innerWidth < 768;
    const particleMultiplier = isMobile ? 0.5 : 1;

    // ── Scene setup ───────────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x050810, 0.1); // Deep blue-dark background
    mount.appendChild(renderer.domElement);

    // ── Global mouse tracking (across whole page) ─────────────────────────────
    const mouse = { x: 0, y: 0, vx: 0, vy: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const newX = (e.clientX / window.innerWidth)  - 0.5;
      const newY = (e.clientY / window.innerHeight) - 0.5;
      mouse.vx = newX - mouse.x;
      mouse.vy = newY - mouse.y;
      mouse.x = newX;
      mouse.y = newY;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ── ENHANCEMENT 5: Multiple Bokeh Textures ─────────────────────────────────
    const createMultipleGlowTextures = () => {
      const textures = [];
      const variations = [
        { sharpness: 0.4, maxAlpha: 0.95 },
        { sharpness: 0.25, maxAlpha: 0.85 },
        { sharpness: 0.6, maxAlpha: 0.90 },
      ];

      for (const { sharpness, maxAlpha } of variations) {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
          gradient.addColorStop(0, `rgba(255,255,255,${maxAlpha})`);
          gradient.addColorStop(sharpness * 0.25, `rgba(200,230,255,${maxAlpha * 0.7})`);
          gradient.addColorStop(sharpness * 0.6, `rgba(100,200,255,${maxAlpha * 0.2})`);
          gradient.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, 64, 64);
        }
        textures.push(new THREE.CanvasTexture(canvas));
      }
      return textures;
    };
    const glowTextures = createMultipleGlowTextures();

    // ── ENHANCEMENT 1: Enhanced Color Palette with HSL ────────────────────────
    const generateHSLColor = (h: number, s: number, l: number) => {
      const color = new THREE.Color();
      color.setHSL(h, s, l);
      return color;
    };

    // ── ENHANCEMENT 3: Depth Fog Effect ────────────────────────────────────────
    const fogGeometry = new THREE.BufferGeometry();
    const fogMaterial = new THREE.PointsMaterial({
      color: 0x0f3a7d,
      size: 0.05,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const fogCount = Math.floor(8000 * particleMultiplier); // Increased for denser atmosphere
    const fogPositions = new Float32Array(fogCount * 3);
    for (let i = 0; i < fogCount; i++) {
      fogPositions[i * 3]     = (Math.random() - 0.5) * 40;
      fogPositions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      fogPositions[i * 3 + 2] = -10 + Math.random() * 8;
    }
    fogGeometry.setAttribute("position", new THREE.BufferAttribute(fogPositions, 3));
    const fogParticles = new THREE.Points(fogGeometry, fogMaterial);
    scene.add(fogParticles);

    // ── ENHANCEMENT 4: Line Connection Network ─────────────────────────────────
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // ── Particle layers at different depths ───────────────────────────────────
    const createLayer = (
      count: number,
      spread: number,
      size: number,
      zRange: [number, number],
      hue: number,
      saturation: number,
      lightness: number,
      textureIndex: number
    ) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const originalPositions = new Float32Array(count * 3);
      
      // ENHANCEMENT 3: Store particle data for effects
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * spread;
        const y = (Math.random() - 0.5) * spread * 0.65;
        const z = zRange[0] + Math.random() * (zRange[1] - zRange[0]);

        positions[i * 3]     = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        originalPositions[i * 3]     = x;
        originalPositions[i * 3 + 1] = y;
        originalPositions[i * 3 + 2] = z;

        particles.push({
          position: new THREE.Vector3(x, y, z),
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.008,
            (Math.random() - 0.5) * 0.008,
            (Math.random() - 0.5) * 0.004
          ),
          twinkleFactor: Math.random(),
          driftOffset: new THREE.Vector3(
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2,
            Math.random() * Math.PI * 2
          ),
        });
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      const color = generateHSLColor(hue, saturation, lightness);
      const material = new THREE.PointsMaterial({
        color,
        size,
        map: glowTextures[textureIndex % glowTextures.length],
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: false,
      });

      const points = new THREE.Points(geometry, material);
      return { points, particles, positions, originalPositions };
    };

    // Far — tiny cyan stars (cool soothing color) — extended spread for full page coverage
    const far  = createLayer(Math.floor(3500 * particleMultiplier), 48, 0.055, [-6, -3], 0.55, 0.95, 0.70, 0);
    // Mid — deep blue-cyan (very soothing) — extended spread for full page coverage
    const mid  = createLayer(Math.floor(2000 * particleMultiplier), 36, 0.095, [-3,  0], 0.50, 0.90, 0.65, 1);
    // Near — bright cyan-blue (cool and aesthetic) — extended spread for full page coverage
    const near = createLayer(Math.floor(1200 * particleMultiplier), 26, 0.160, [ 0,  2], 0.52, 0.88, 0.72, 2);

    scene.add(far.points, mid.points, near.points);

    // ── ENHANCEMENT 2: Particle Responsiveness (Gentle) ───────────────────────
    const mouseInfluenceRadius = 2.5;
    const updateParticleResponsiveness = (layer: ReturnType<typeof createLayer>, mouseStrength: number) => {
      const positions = layer.positions;
      const originals = layer.originalPositions;

      for (let i = 0; i < layer.particles.length; i++) {
        const particle = layer.particles[i];
        const idx = i * 3;

        // Calculate distance from mouse
        const dx = particle.position.x - mouse.x;
        const dy = particle.position.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseInfluenceRadius) {
          // Gentle repel from cursor (reduced intensity for soothing effect)
          const force = (1 - dist / mouseInfluenceRadius) * 0.025 * mouseStrength;
          particle.position.x += (dx / dist || 0) * force;
          particle.position.y += (dy / dist || 0) * force;
        }

        // ENHANCEMENT 3: Drift motion with sine waves (slower for soothing)
        const driftTime = performance.now() * 0.0003; // Reduced speed
        const drift = {
          x: Math.sin(driftTime * 0.4 + particle.driftOffset.x) * 0.025,
          y: Math.cos(driftTime * 0.25 + particle.driftOffset.y) * 0.020,
          z: Math.sin(driftTime * 0.3 + particle.driftOffset.z) * 0.012,
        };

        // ENHANCEMENT 3: Velocity trails (subtle movement)
        particle.position.x += particle.velocity.x + drift.x;
        particle.position.y += particle.velocity.y + drift.y;
        particle.position.z += particle.velocity.z + drift.z;

        // Constrain to bounds
        if (Math.abs(particle.position.x) > originals[idx] * 2) particle.velocity.x *= -1;
        if (Math.abs(particle.position.y) > originals[idx + 1] * 2) particle.velocity.y *= -1;

        positions[idx]     = particle.position.x;
        positions[idx + 1] = particle.position.y;
        positions[idx + 2] = particle.position.z;
      }

      (layer.points.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    };

    // ── ENHANCEMENT 4: Update line connections ─────────────────────────────────
    const updateLineConnections = () => {
      const linePositions: number[] = [];
      const connectionDistance = 1.5;
      const positions = mid.positions;
      const particleCount = mid.particles.length;

      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDistance) {
            linePositions.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
            linePositions.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
          }
        }
      }

      lineGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    };

    // ── Resize ────────────────────────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ──────────────────────────────────────────────────────────
    let animId: number;
    const start = performance.now();
    const fadeInDuration = 3; // 3 seconds fade-in

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = (performance.now() - start) * 0.001;
      
      // Calculate fade-in progress (0 to 1 over 3 seconds)
      const fadeInProgress = Math.min(t / fadeInDuration, 1);

      // Mouse movement strength for responsiveness (reduced for calmness)
      const mouseStrength = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy) * 5;

      // ENHANCEMENT 2: Update particle responsiveness
      updateParticleResponsiveness(far, mouseStrength * 0.25);
      updateParticleResponsiveness(mid, mouseStrength * 0.40);
      updateParticleResponsiveness(near, mouseStrength * 0.55);

      // ENHANCEMENT 4: Update line connections
      updateLineConnections();

      // Each layer parallaxes at a different rate (slowed down for aesthetic)
      far.points.rotation.y  = t * 0.025 + mouse.x * 0.12;
      far.points.rotation.x  =             mouse.y * 0.10;
      mid.points.rotation.y  = t * 0.040 + mouse.x * 0.25;
      mid.points.rotation.x  =             mouse.y * 0.18;
      near.points.rotation.y = t * 0.065 + mouse.x * 0.38;
      near.points.rotation.x =             mouse.y * 0.28;

      // ENHANCEMENT 6: Advanced animations - Breathing waves with smooth fade-in
      const breathingWave = Math.sin(t * 0.3) * 0.5 + 0.5;
      
      // Apply fade-in and breathing to opacity (more subtle and soothing) — increased opacity for better visibility
      (far.points.material as THREE.PointsMaterial).opacity = fadeInProgress * (0.60 + 0.20 * Math.sin(t * 0.5) + breathingWave * 0.12);
      (mid.points.material as THREE.PointsMaterial).opacity = fadeInProgress * (0.70 + 0.15 * Math.sin(t * 0.6 + 1) + breathingWave * 0.10);
      (near.points.material as THREE.PointsMaterial).opacity = fadeInProgress * (0.80 + 0.12 * Math.sin(t * 0.7 + 2) + breathingWave * 0.08);

      // ENHANCEMENT 6: Color bloom effect (subtle hue rotation)
      const hueShift = Math.sin(t * 0.15) * 0.015;
      (far.points.material as THREE.PointsMaterial).color.setHSL(0.55 + hueShift, 0.95, 0.70);
      (mid.points.material as THREE.PointsMaterial).color.setHSL(0.50 + hueShift, 0.90, 0.65);
      (near.points.material as THREE.PointsMaterial).color.setHSL(0.52 + hueShift, 0.88, 0.72);

      // Update fog particles opacity for fade-in effect
      (fogMaterial).opacity = fadeInProgress * 0.08;

      // Update fog particles position for depth effect
      const fogPos = fogGeometry.attributes.position as THREE.BufferAttribute;
      const fogArray = fogPos.array as Float32Array;
      for (let i = 0; i < fogArray.length; i += 3) {
        fogArray[i + 2] += 0.0005; // Slower fog movement
        if (fogArray[i + 2] > -2) fogArray[i + 2] = -10;
      }
      fogPos.needsUpdate = true;

      // Update line material opacity for fade-in effect
      (lineMaterial).opacity = fadeInProgress * 0.08;

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
