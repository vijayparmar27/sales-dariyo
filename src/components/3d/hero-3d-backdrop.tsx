"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import * as THREE from "three";

const emptySubscribe = () => () => {};

/**
 * Hero3DBackdrop renders an interactive 3D WebGL ambient particle and floating
 * geometric polyhedron field that reacts to mouse movement with smooth spring damping.
 * Automatically throttles and pauses when out of viewport for optimal battery efficiency.
 */
export function Hero3DBackdrop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    if (!isClient || !containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Subtle ambient and directional lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x0054f9, 2.5);
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x06b6d4, 2.0);
    dirLight2.position.set(-10, -10, 5);
    scene.add(dirLight2);

    // Floating 3D Polyhedra Group
    const group = new THREE.Group();
    scene.add(group);

    // Materials
    const materialBlue = new THREE.MeshPhysicalMaterial({
      color: 0x0054f9,
      metalness: 0.2,
      roughness: 0.15,
      transmission: 0.6,
      thickness: 1.2,
      transparent: true,
      opacity: 0.6,
      wireframe: false,
    });

    const materialCyan = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      metalness: 0.1,
      roughness: 0.2,
      transmission: 0.7,
      thickness: 1.0,
      transparent: true,
      opacity: 0.5,
      wireframe: false,
    });

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    const items: Array<{
      mesh: THREE.Object3D;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      baseY: number;
      floatSpeed: number;
      floatOffset: number;
    }> = [];

    // Create 10 floating polyhedra dispersed around the edges
    const geometries = [
      new THREE.IcosahedronGeometry(1.6, 0),
      new THREE.OctahedronGeometry(1.4, 0),
      new THREE.TorusGeometry(1.8, 0.4, 12, 24),
      new THREE.TetrahedronGeometry(1.5, 0),
      new THREE.IcosahedronGeometry(2.2, 1),
    ];

    const positions: [number, number, number][] = [
      [-16, 7, -6],
      [17, 8, -5],
      [-18, -4, -8],
      [18, -5, -7],
      [-12, -9, -4],
      [13, -8, -4],
      [-9, 10, -9],
      [10, 11, -8],
      [-20, 2, -10],
      [21, 3, -10],
    ];

    positions.forEach((pos, idx) => {
      const geo = geometries[idx % geometries.length] ?? geometries[0];
      const mat = idx % 3 === 0 ? materialBlue : idx % 3 === 1 ? materialCyan : wireMaterial;
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(pos[0], pos[1], pos[2]);
      group.add(mesh);

      items.push({
        mesh,
        rotSpeedX: (Math.random() - 0.5) * 0.012,
        rotSpeedY: (Math.random() - 0.5) * 0.015,
        rotSpeedZ: (Math.random() - 0.5) * 0.01,
        baseY: pos[1],
        floatSpeed: 0.8 + Math.random() * 0.6,
        floatOffset: Math.random() * Math.PI * 2,
      });
    });

    // Particle Cloud (Stardust)
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 60;
      particlePos[i + 1] = (Math.random() - 0.5) * 40;
      particlePos[i + 2] = (Math.random() - 0.5) * 25;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Tracking with smooth spring damping
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetX = normX * 1.5;
      targetY = normY * 1.0;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // IntersectionObserver to pause rendering when scrolled out of view
    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = Boolean(entry?.isIntersecting);
    });
    observer.observe(container);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera parallax
      if (!prefersReducedMotion) {
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;
        camera.position.x = currentX;
        camera.position.y = currentY;
        camera.lookAt(0, 0, 0);

        // Rotate particles slowly
        particles.rotation.y = elapsedTime * 0.02;

        // Animate floating items
        items.forEach((item) => {
          item.mesh.rotation.x += item.rotSpeedX;
          item.mesh.rotation.y += item.rotSpeedY;
          item.mesh.rotation.z += item.rotSpeedZ;
          item.mesh.position.y = item.baseY + Math.sin(elapsedTime * item.floatSpeed + item.floatOffset) * 0.6;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      renderer.dispose();
      geometries.forEach((g) => g.dispose());
      particleGeo.dispose();
      materialBlue.dispose();
      materialCyan.dispose();
      wireMaterial.dispose();
      particleMat.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isClient]);

  if (!isClient) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-75 mix-blend-screen"
    />
  );
}
