import Image from "next/image";
import { Sparkles } from "lucide-react";
export function SectionCompanions({
  message = "人のアイデアに、テクノロジーの可能性を。",
  compact = false,
}: {
  message?: string;
  compact?: boolean;
}) {
  return (
    <figure
      className={`section-companions ${compact ? "companions-compact" : ""}`}
      data-human-robot="true"
    >
      <figcaption>
        <span>
          <Sparkles size={15} /> HUMAN IDEAS × ROBOT MAGIC
        </span>
        <p>{message}</p>
      </figcaption>
      <div className="companions-picture">
        <Image
          src="/images/four-person-team.png"
          alt="参照画像の4人全員と、カラフルな髪のロボットのイメージ"
          fill
          sizes="(max-width:760px) 180px, 330px"
        />
      </div>
    </figure>
  );
}
