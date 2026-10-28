import {
  Atom,
  CodeXml,
  FileCode2,
  Network,
  Cuboid,
  Figma,
  Blocks,
  Component,
  Smartphone,
  Cpu,
  Spline,
  SwatchBook,
} from "lucide-react";
const icons: Record<string, typeof Atom> = {
  "Next.js": CodeXml,
  React: Atom,
  TypeScript: FileCode2,
  "Node.js": Network,
  "Three.js": Cuboid,
  Figma,
  WordPress: Blocks,
  "UI / UX": Component,
  "iOS / Android": Smartphone,
  "Generative AI": Cpu,
  GSAP: Spline,
  Canva: SwatchBook,
};
export function SkillGlyph({ skill }: { skill: string }) {
  const Icon = icons[skill] || Component;
  return (
    <span className="skill-glyph" aria-hidden="true">
      <Icon size={23} strokeWidth={1.65} />
    </span>
  );
}
