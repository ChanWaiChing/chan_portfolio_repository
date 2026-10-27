"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// A single shader plane keeps the scroll transition light enough for mobile.
export default function HeroScene() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (
      !canvas.current ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const element = canvas.current;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: element,
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    } catch {
      return;
    } // The CSS orb remains as a WebGL fallback.
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
      uAspect: { value: 1 },
    };
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms,
      vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`,
      fragmentShader: `precision mediump float; varying vec2 vUv; uniform float uTime; uniform float uScroll; uniform vec2 uMouse; uniform float uAspect;
      void main(){vec2 p=vUv-vec2(.74,.52);p.x*=uAspect;p-=uMouse*.035;
      float a=atan(p.y,p.x);float r=length(p);float wave=sin(a*3.+uTime*.35+uScroll*5.)*.025+cos(a*5.-uTime*.2)*.012;
      float radius=.29+wave+uScroll*2.2;float shape=1.-smoothstep(radius-.002,radius+.004,r);
      vec3 lime=vec3(.82,.94,.43);vec3 mint=vec3(.64,.80,.62);float shade=clamp((p.x+p.y)*1.15+.45,0.,1.);
      vec3 color=mix(lime,mint,shade*.65);float bands=sin((r+sin(a*2.+uTime*.2)*.025)*100.-uScroll*12.);color+=bands*.008;
      gl_FragColor=vec4(color,shape*.88);}`,
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    scene.add(new THREE.Mesh(geometry, material));
    const resize = () => {
      const bounds = element.getBoundingClientRect();
      renderer.setSize(bounds.width, bounds.height, false);
      uniforms.uAspect.value = bounds.width / Math.max(bounds.height, 1);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(element);
    resize();
    let progress = 0;
    let frame = 0;
    let visible = true;
    const pointer = (e: PointerEvent) => {
      uniforms.uMouse.value.set(
        e.clientX / innerWidth - 0.5,
        0.5 - e.clientY / innerHeight,
      );
    };
    const scroll = () => {
      progress = Math.max(
        0,
        Math.min(
          -(element.closest(".hero-track")?.getBoundingClientRect().top ?? 0) /
            450,
          1,
        ),
      );
    };
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibility.observe(element);
    const clock = new THREE.Clock();
    const render = () => {
      frame = requestAnimationFrame(render);
      if (!visible || document.hidden) return;
      uniforms.uTime.value = clock.getElapsedTime();
      uniforms.uScroll.value += (progress - uniforms.uScroll.value) * 0.065;
      renderer.render(scene, camera);
    };
    window.addEventListener("pointermove", pointer, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    render();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      window.removeEventListener("pointermove", pointer);
      window.removeEventListener("scroll", scroll);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);
  return <canvas className="hero-canvas" ref={canvas} aria-hidden="true" />;
}
