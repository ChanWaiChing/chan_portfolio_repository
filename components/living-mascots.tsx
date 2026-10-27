"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
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
      renderer.toneMappingExposure = 1.05;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
      camera.position.set(0, 0.25, 7.6);
      scene.add(new THREE.HemisphereLight(0xeaf8ff, 0x6b85ad, 1.9));
      const key = new THREE.DirectionalLight(0xffffff, 2.8);
      key.position.set(-3, 5, 7);
      scene.add(key);
      const rim = new THREE.DirectionalLight(0x9bbcff, 1.8);
      rim.position.set(4, 2, -2);
      scene.add(rim);
      const white = new THREE.MeshPhysicalMaterial({
        color: 0xfffcff,
        roughness: 0.24,
        metalness: 0.02,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
      });
      const shine = new THREE.MeshBasicMaterial({ color: 0xffffff });
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
      const glass = new THREE.MeshPhysicalMaterial({
        color: 0x061529,
        roughness: 0.14,
        metalness: 0.16,
        clearcoat: 1,
      });
      const silver = new THREE.MeshStandardMaterial({
        color: 0x9fb2c8,
        metalness: 0.7,
        roughness: 0.26,
      });
      const led = new THREE.MeshBasicMaterial({
        color: 0x50ddff,
        toneMapped: false,
      });
      const pinkLed = new THREE.MeshBasicMaterial({ color: 0xff74bc });
      const addBox = (
        parent: THREE.Object3D,
        material: THREE.Material,
        size: number[],
        position: number[],
        radius = 0.08,
      ) => {
        const object = new THREE.Mesh(
          new RoundedBoxGeometry(size[0], size[1], size[2], 3, radius),
          material,
        );
        object.position.set(position[0], position[1], position[2]);
        parent.add(object);
        return object;
      };
      const addVisor = (
        parent: THREE.Object3D,
        material: THREE.Material,
        w: number,
        h: number,
        d: number,
        r: number,
        y: number,
        z: number,
      ) => {
        const x = -w / 2,
          b = -h / 2;
        const shape = new THREE.Shape();
        shape.moveTo(x + r, b);
        shape.lineTo(x + w - r, b);
        shape.quadraticCurveTo(x + w, b, x + w, b + r);
        shape.lineTo(x + w, b + h - r);
        shape.quadraticCurveTo(x + w, b + h, x + w - r, b + h);
        shape.lineTo(x + r, b + h);
        shape.quadraticCurveTo(x, b + h, x, b + h - r);
        shape.lineTo(x, b + r);
        shape.quadraticCurveTo(x, b, x + r, b);
        const panel = new THREE.Mesh(
          new THREE.ExtrudeGeometry(shape, {
            depth: d,
            bevelEnabled: false,
            curveSegments: 16,
          }),
          material,
        );
        panel.position.set(0, y, z - d / 2);
        parent.add(panel);
      };
      function makeBuddy(
        color: number,
        x: number,
        tilt: number,
        warm = false,
      ): Buddy {
        const root = new THREE.Group();
        scene.add(root);
        root.position.set(x, -0.25, 0);
        root.rotation.z = tilt;
        const accent = new THREE.MeshPhysicalMaterial({
          color,
          roughness: 0.22,
          metalness: 0.12,
          clearcoat: 1,
        });
        const head = new THREE.Group();
        head.position.y = 0.55;
        root.add(head);
        addBox(head, white, [1.56, 1.12, 0.87], [0, 0, 0], 0.24);
        addVisor(head, silver, 1.36, 0.86, 0.1, 0.2, -0.06, 0.443);
        addVisor(head, glass, 1.26, 0.76, 0.11, 0.18, -0.06, 0.493);
        addBox(root, white, [0.87, 0.68, 0.57], [0, -0.47, 0], 0.15);
        addBox(root, accent, [0.52, 0.28, 0.05], [0, -0.43, 0.3], 0.07);
        addBox(root, glass, [0.36, 0.13, 0.035], [0, -0.43, 0.335], 0.035);
        for (let k = 0; k < 3; k++)
          addBox(
            root,
            led,
            [0.055, 0.045, 0.015],
            [-0.09 + k * 0.09, -0.43, 0.36],
            0.015,
          );
        addSphere(root, silver, [0, -0.07, 0], [0.14, 0.13, 0.14]);
        const eyes: THREE.Group[] = [];
        for (const side of [-1, 1]) {
          const eye = new THREE.Group();
          eye.position.set(side * 0.265, 0.02, 0.565);
          head.add(eye);
          eyes.push(eye);
          addSphere(eye, led, [0, 0, 0], [0.09, 0.14, 0.025]);
          addSphere(eye, shine, [-0.018, 0.045, 0.023], [0.019, 0.035, 0.008]);
          addBox(
            head,
            pinkLed,
            [0.105, 0.025, 0.015],
            [side * 0.44, -0.18, 0.56],
            0.01,
          );
          addSphere(
            head,
            silver,
            [side * 0.81, -0.02, -0.03],
            [0.12, 0.23, 0.23],
          );
          addSphere(
            head,
            accent,
            [side * 0.86, -0.02, 0.02],
            [0.075, 0.16, 0.16],
          );
          addSphere(root, silver, [side * 0.24, -0.84, 0], [0.11, 0.115, 0.11]);
          addBox(
            root,
            silver,
            [0.19, 0.25, 0.22],
            [side * 0.24, -0.95, 0],
            0.04,
          );
          addBox(
            root,
            accent,
            [0.35, 0.18, 0.42],
            [side * 0.25, -1.1, 0.12],
            0.07,
          );
        }
        const smileCurve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(-0.1, -0.12, 0.568),
          new THREE.Vector3(0, -0.25, 0.582),
          new THREE.Vector3(0.1, -0.12, 0.568),
        );
        head.add(
          new THREE.Mesh(
            new THREE.TubeGeometry(smileCurve, 20, 0.015, 8, false),
            led,
          ),
        );
        const hairColors = warm
          ? [0xff5a2e, 0xff2993, 0xffbd24]
          : [0x185cf4, 0x16c6e9, 0x833bef];
        const tuft = new THREE.Shape();
        tuft.moveTo(-0.73, 0.34);
        tuft.bezierCurveTo(-0.48, 0.43, -0.53, 0.72, -0.13, 0.81);
        tuft.bezierCurveTo(0.16, 0.88, 0.49, 0.75, 0.73, 1.02);
        tuft.bezierCurveTo(0.77, 0.74, 0.46, 0.51, 0.13, 0.48);
        tuft.bezierCurveTo(-0.2, 0.36, -0.45, 0.23, -0.73, 0.34);
        hairColors.forEach((shade, i) => {
          const material = new THREE.MeshPhysicalMaterial({
            color: shade,
            roughness: 0.2,
            metalness: 0.08,
            clearcoat: 1,
          });
          const geometry = new THREE.ExtrudeGeometry(tuft, {
            depth: 0.15,
            bevelEnabled: true,
            bevelThickness: 0.045,
            bevelSize: 0.045,
            bevelSegments: 3,
            steps: 1,
            curveSegments: 24,
          });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(-i * 0.12, i * 0.13, 0.31 + i * 0.17);
          mesh.scale.setScalar(1 - i * 0.22);
          head.add(mesh);
        });
        const makeArm = (side: number) => {
          const arm = new THREE.Group();
          root.add(arm);
          arm.position.set(side * 0.53, -0.24, 0);
          arm.rotation.z = side === -1 ? -1.3 : 0.25;
          addSphere(arm, silver, [0, 0, 0], [0.13, 0.13, 0.13]);
          addBox(arm, white, [0.17, 0.23, 0.18], [0, -0.18, 0], 0.055);
          addSphere(arm, silver, [0, -0.33, 0], [0.09, 0.09, 0.09]);
          addBox(arm, white, [0.18, 0.18, 0.19], [0, -0.46, 0.015], 0.05);
          addBox(arm, white, [0.24, 0.2, 0.22], [0, -0.62, 0.025], 0.07);
          addSphere(
            arm,
            accent,
            [side * 0.12, -0.59, 0.04],
            [0.06, 0.08, 0.07],
          );
          for (let j = 0; j < 3; j++)
            addBox(
              arm,
              silver,
              [0.035, 0.07, 0.045],
              [-0.075 + j * 0.075, -0.735, 0.03],
              0.012,
            );
          return arm;
        };
        makeArm(1);
        const hand = makeArm(-1);
        return { root, head, eyes, hand };
      }
      const buddies = [
        makeBuddy(0x205df0, -1.1, -0.055),
        makeBuddy(0xf27124, 1.1, 0.065, true),
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
            z: i ? -2.1 : -1.95,
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
