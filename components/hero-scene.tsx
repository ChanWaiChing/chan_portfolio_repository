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
    } // The photographic background remains as a WebGL fallback.
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
      fragmentShader: `precision mediump float;
      varying vec2 vUv; uniform float uTime; uniform float uScroll; uniform vec2 uMouse; uniform float uAspect;
      void main(){
        vec2 p=vUv-vec2(.75,.48);p.x*=uAspect;p-=uMouse*.04;
        float r=length(p);float a=atan(p.y,p.x);
        float core=exp(-r*5.);float halo=exp(-abs(r-(.2+sin(uTime*.4)*.035))*24.);
        float ray=pow(abs(sin(a*7.+uTime*.12)),22.)*exp(-r*3.)*smoothstep(.02,.2,r);
        float ribbon=exp(-abs(p.y-sin(p.x*3.+uTime*.28)*.14)*27.)*exp(-r*1.7);
        vec3 cyan=vec3(.32,.83,1.);vec3 violet=vec3(.66,.43,1.);vec3 pink=vec3(1.,.59,.76);
        vec3 spectrum=mix(cyan,violet,.5+.5*sin(a*2.+uTime*.23));spectrum=mix(spectrum,pink,.3+.2*sin(uTime*.3));
        float glow=core*.09+halo*.22+ray*.3+ribbon*.18;
        float wipe=(1.-smoothstep(uScroll*2.4-.04,uScroll*2.4+.08,r))*smoothstep(.12,.9,uScroll);
        vec3 color=mix(spectrum,vec3(.93,.94,1.),wipe);
        gl_FragColor=vec4(color,clamp(glow+wipe*.92,0.,.96));
      }`,
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
          ((document.querySelector(".site-header")?.getBoundingClientRect()
            .height ?? 0) -
            (element.closest(".hero-track")?.getBoundingClientRect().top ??
              0)) /
            900,
          1,
        ),
      );
    };
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    visibility.observe(element);
    const startedAt = performance.now();
    const render = () => {
      frame = requestAnimationFrame(render);
      if (!visible || document.hidden) return;
      uniforms.uTime.value = (performance.now() - startedAt) / 1000;
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
