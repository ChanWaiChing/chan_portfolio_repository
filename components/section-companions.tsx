import Image from "next/image";
import { Robot } from "./robot";
import { Sparkles } from "lucide-react";
import { scenes, type SceneVariant } from "@/lib/visuals";
export function SectionCompanions({
  message = "人のアイデアに、テクノロジーの可能性を。",
  compact = false,
  variant = "quartet",
}: {
  message?: string;
  compact?: boolean;
  variant?: SceneVariant;
}) {
  const scene = scenes[variant];
  return (
    <figure
      className={`section-companions companions-${variant} ${compact ? "companions-compact" : ""}`}
      data-human-robot="true"
      data-people={scene.people}
      data-scene={variant}
    >
      <figcaption>
        <span>
          <Sparkles size={15} /> HUMAN IDEAS × ROBOT MAGIC
        </span>
        <p>{message}</p>
        <div className="companion-mascot">
          <Robot small warm={variant === "solo" || variant === "trio"} />
        </div>
      </figcaption>
      <div className="companions-picture">
        <Image
          src={scene.src}
          alt={scene.alt}
          fill
          sizes="(max-width:760px) 100vw, 65vw"
        />
      </div>
    </figure>
  );
}
