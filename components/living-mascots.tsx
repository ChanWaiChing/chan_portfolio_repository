"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { Robot } from "./robot";

type Buddy = {
  root: THREE.Group;
  head: THREE.Group;
  eyes: THREE.Group[];
  hand: THREE.Group;
};
export default function LivingMascots() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = canvas.current;
    if (!element) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let teardown = () => {};
    const setup = () => {
      teardown();
      setReady(false);
      if (motion.matches) {
        teardown = () => {};
        return;
      }
      let renderer: THREE.WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({
          canvas: element,
          antialias: true,
          alpha: true,
          powerPreference: "low-power",
        });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
      camera.position.set(0, 0.25, 7.6);
      scene.add(new THREE.HemisphereLight(0xeaf8ff, 0xa9a7da, 3));
      const key = new THREE.DirectionalLight(0xffffff, 4.5);
      key.position.set(-3, 5, 7);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0xc7a1ff, 2.5);
      rim.position.set(4, 2, -2);
      scene.add(rim);
      const white = new THREE.MeshPhysicalMaterial({
        color: 0xfffcff,
        roughness: 0.24,
        metalness: 0.02,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
      });
      const eyeMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x162353,
        roughness: 0.08,
        clearcoat: 1,
      });
      const shine = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const blush = new THREE.MeshStandardMaterial({
        color: 0xff9cbd,
        roughness: 0.75,
      });
      const sphere = new THREE.SphereGeometry(1, 40, 28);
      const addSphere = (
        parent: THREE.Object3D,
        material: THREE.Material,
        position: number[],
        scale: number[],
      ) => {
        const mesh = new THREE.Mesh(sphere, material);
        mesh.position.set(position[0], position[1], position[2]);
        mesh.scale.set(scale[0], scale[1], scale[2]);
        parent.add(mesh);
        return mesh;
      };
      function makeBuddy(color: number, x: number, tilt: number): Buddy {
        const root = new THREE.Group();
        scene.add(root);
        root.position.set(x, -0.35, 0);
        root.rotation.z = tilt;
        const accent = new THREE.MeshPhysicalMaterial({
          color,
          roughness: 0.25,
          clearcoat: 1,
          metalness: 0.05,
        });
        const head = new THREE.Group();
        head.position.y = 0.48;
        root.add(head);
        addSphere(head, white, [0, 0, 0], [0.83, 0.74, 0.69]);
        addSphere(root, white, [0, -0.43, 0], [0.59, 0.53, 0.49]);
        addSphere(root, accent, [0, -0.43, 0.445], [0.25, 0.25, 0.055]);
        addSphere(root, shine, [-0.065, -0.36, 0.503], [0.045, 0.065, 0.01]);
        const eyes: THREE.Group[] = [];
        for (const side of [-1, 1]) {
          const eye = new THREE.Group();
          eye.position.set(side * 0.27, 0.04, 0.635);
          head.add(eye);
          eyes.push(eye);
          addSphere(eye, eyeMaterial, [0, 0, 0], [0.115, 0.16, 0.07]);
          addSphere(eye, shine, [-0.035, 0.055, 0.065], [0.035, 0.042, 0.012]);
          addSphere(eye, shine, [0.039, -0.05, 0.065], [0.018, 0.02, 0.01]);
          addSphere(
            head,
            blush,
            [side * 0.49, -0.155, 0.555],
            [0.12, 0.055, 0.02],
          );
          addSphere(
            root,
            accent,
            [side * 0.32, -0.87, 0.24],
            [0.24, 0.14, 0.32],
          );
          addSphere(
            head,
            accent,
            [side * 0.76, 0.11, -0.02],
            [0.14, 0.24, 0.2],
          );
        }
        const smileCurve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(-0.11, -0.15, 0.704),
          new THREE.Vector3(0, -0.3, 0.72),
          new THREE.Vector3(0.11, -0.15, 0.704),
        );
        const smile = new THREE.Mesh(
          new THREE.TubeGeometry(smileCurve, 20, 0.018, 8, false),
          eyeMaterial,
        );
        head.add(smile);
        const stem = new THREE.Mesh(
          new THREE.CylinderGeometry(0.035, 0.035, 0.22, 12),
          accent,
        );
        stem.position.set(0, 0.79, 0);
        head.add(stem);
        const halo = new THREE.Mesh(
          new THREE.TorusGeometry(0.24, 0.045, 12, 40),
          accent,
        );
        halo.position.set(0, 0.94, 0);
        halo.rotation.x = 1.16;
        head.add(halo);
        addSphere(head, shine, [-0.09, 0.97, 0.09], [0.055, 0.017, 0.025]);
        const arm = new THREE.Group();
        root.add(arm);
        arm.position.set(0.6, -0.18, 0);
        arm.rotation.z = 0.6;
        addSphere(arm, white, [0.08, -0.14, 0.12], [0.18, 0.31, 0.19]);
        addSphere(arm, white, [0.13, -0.33, 0.18], [0.2, 0.19, 0.2]);
        const hand = new THREE.Group();
        root.add(hand);
        hand.position.set(-0.62, -0.09, 0.04);
        hand.rotation.z = -0.9;
        addSphere(hand, white, [-0.08, -0.12, 0.1], [0.17, 0.3, 0.18]);
        addSphere(hand, white, [-0.13, -0.32, 0.13], [0.21, 0.2, 0.22]);
        return { root, head, eyes, hand };
      }
      const buddies = [
        makeBuddy(0x718cff, -1.05, -0.1),
        makeBuddy(0xff9e97, 1.04, 0.12),
      ];
      buddies[0].root.rotation.y = 0.12;
      buddies[1].root.rotation.y = -0.15;
      const animations = gsap.context(() => {
        buddies.forEach((buddy, i) => {
          gsap.to(buddy.root.position, {
            y: i ? -0.18 : -0.25,
            duration: 2.2 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.4,
          });
          gsap.to(buddy.head.rotation, {
            z: i ? -0.09 : 0.1,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.6,
          });
          gsap.to(buddy.hand.rotation, {
            z: i ? -1.7 : -1.45,
            duration: 0.65,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            repeatDelay: i ? 0.4 : 1.5,
          });
          const blink = gsap.timeline({ repeat: -1, repeatDelay: 3.2 + i });
          buddy.eyes.forEach((eye) => {
            blink
              .to(eye.scale, { y: 0.08, duration: 0.08, ease: "power2.in" }, 0)
              .to(eye.scale, { y: 1, duration: 0.12 }, 0.1);
          });
          gsap.to(buddy.root.scale, {
            y: 1.035,
            x: 0.985,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.4,
          });
        });
      });
      const resize = () => {
        const r = element.getBoundingClientRect();
        renderer.setSize(r.width, r.height, false);
        camera.aspect = r.width / Math.max(r.height, 1);
        camera.updateProjectionMatrix();
      };
      const observer = new ResizeObserver(resize);
      observer.observe(element);
      resize();
      let visible = true,
        frame = 0;
      const pointer = new THREE.Vector2();
      const intersection = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      intersection.observe(element);
      const move = (e: PointerEvent) => {
        pointer.set(
          (e.clientX / innerWidth - 0.5) * 0.35,
          (e.clientY / innerHeight - 0.5) * 0.15,
        );
      };
      window.addEventListener("pointermove", move, { passive: true });
      const render = () => {
        frame = requestAnimationFrame(render);
        if (!visible || document.hidden) return;
        buddies.forEach((b, i) => {
          b.head.rotation.y += (pointer.x - b.head.rotation.y) * 0.035;
          b.head.rotation.x += (pointer.y - b.head.rotation.x) * 0.035;
          b.root.rotation.y +=
            (pointer.x + (i ? -0.12 : 0.12) - b.root.rotation.y) * 0.025;
        });
        renderer.render(scene, camera);
      };
      render();
      setReady(true);
      teardown = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        intersection.disconnect();
        window.removeEventListener("pointermove", move);
        animations.revert();
        const geometries = new Set<THREE.BufferGeometry>();
        const materials = new Set<THREE.Material>();
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            geometries.add(object.geometry);
            (Array.isArray(object.material)
              ? object.material
              : [object.material]
            ).forEach((m) => materials.add(m));
          }
        });
        geometries.forEach((g) => g.dispose());
        materials.forEach((m) => m.dispose());
        renderer.dispose();
      };
    };
    setup();
    motion.addEventListener("change", setup);
    return () => {
      motion.removeEventListener("change", setup);
      teardown();
    };
  }, []);
  return (
    <div
      className={`living-mascots ${ready ? "mascots-ready" : ""}`}
      aria-hidden="true"
    >
      <canvas ref={canvas} className="mascot-canvas" />
      <div className="mascot-fallback">
        <Robot small waving />
        <Robot small />
      </div>
    </div>
  );
}
