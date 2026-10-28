"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { site } from "@/lib/site";
import { scenes } from "@/lib/visuals";
export function HeroMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => {
      setReduced(query.matches);
      if (query.matches) video.current?.pause();
    };
    change();
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    if (reduced || failed || !site.heroVideoUrl || !video.current) return;
    video.current.play().catch(() => setPlaying(false));
  }, [reduced, failed]);
  return (
    <>
      <div
        data-people="4"
        className={`hero-photograph ${playing ? "hero-media-has-video" : ""}`}
      >
        <Image
          src={scenes.quartet.src}
          alt={scenes.quartet.alt}
          fill
          sizes="100vw"
          preload
          quality={85}
        />
        {!site.heroVideoUrl && (
          <div className="hero-human-layers" aria-hidden="true">
            {["one", "two", "three", "four"].map((person) => (
              <div className={`hero-human hero-human-${person}`} key={person}>
                <Image
                  src={scenes.quartet.src}
                  alt=""
                  fill
                  sizes="100vw"
                  quality={85}
                />
              </div>
            ))}
          </div>
        )}
        {site.heroVideoUrl && !failed && (
          <video
            ref={video}
            className="hero-video"
            poster={scenes.quartet.src}
            src={site.heroVideoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="クリエイティブチームの紹介映像"
            onError={() => setFailed(true)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        )}
      </div>
      {site.heroVideoUrl && !failed && (
        <button
          className="hero-video-toggle"
          aria-label={playing ? "背景動画を一時停止" : "背景動画を再生"}
          onClick={() => {
            if (playing) video.current?.pause();
            else video.current?.play().catch(() => setFailed(true));
          }}
        >
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
      )}
    </>
  );
}
