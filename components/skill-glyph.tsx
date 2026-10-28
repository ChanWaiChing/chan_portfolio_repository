import {
  Atom,
  Braces,
  FileCode2,
  Server,
  Box,
  Figma,
  PanelsTopLeft,
  Shapes,
  Smartphone,
  BrainCircuit,
  Waves,
  Palette,
} from "lucide-react";
const icons: Record<string, typeof Atom> = {
  "Next.js": Braces,
  React: Atom,
  TypeScript: FileCode2,
  "Node.js": Server,
  "Three.js": Box,
  Figma,
  WordPress: PanelsTopLeft,
  "UI / UX": Shapes,
  "iOS / Android": Smartphone,
  "Generative AI": BrainCircuit,
  GSAP: Waves,
  Canva: Palette,
};
export function SkillGlyph({ skill }: { skill: string }) {
  const Icon = icons[skill] || Shapes;
  return (
    <span className="skill-glyph" aria-hidden="true">
      <Icon size={23} strokeWidth={1.65} />
    </span>
  );
}
