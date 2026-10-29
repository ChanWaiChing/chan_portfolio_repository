import Image from "next/image";

export const botVariants = ["sunset", "peach", "ocean", "mint"] as const;
export type BotVariant = (typeof botVariants)[number];

/** Decorative mascots stay out of the accessibility tree and never capture input. */
export function BotMascot({ variant = "ocean", className = "", priority = false }: {
  variant?: BotVariant; className?: string; priority?: boolean;
}) {
  return <span className={`bot-mascot bot-${variant} ${className}`} aria-hidden="true">
    <Image src={`/images/bots/${variant === "sunset" ? "sunset-presenting" : variant}.webp`} alt="" fill style={{ objectFit: "contain" }}
      sizes="(max-width: 760px) 100px, 160px" preload={priority}
      draggable={false} />
  </span>;
}

export function BotTeam({ className = "", pair = false }: { className?: string; pair?: boolean }) {
  return <div className={`bot-team ${className}`} aria-hidden="true">
    {(pair ? ["sunset", "ocean"] as const : botVariants).map(variant => <BotMascot key={variant} variant={variant} />)}
  </div>;
}
