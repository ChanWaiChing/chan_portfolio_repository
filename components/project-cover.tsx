import Image from "next/image";
import {
  ArrowUpRight,
  Globe2,
  HeartPulse,
  BriefcaseBusiness,
  Shapes,
} from "lucide-react";
import type { Project } from "@/lib/projects";
const icons = {
  CORPORATE: Globe2,
  RECRUITMENT: BriefcaseBusiness,
  HEALTHCARE: HeartPulse,
  BRAND: Shapes,
};
export function ProjectCover({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const Icon = icons[project.category];
  return (
    <div
      className={`project-cover cover-${project.accent} ${large ? "cover-large" : ""}`}
    >
      {project.thumbnail ? (
        <Image
          src={project.thumbnail}
          alt={`${project.title}の掲載画像`}
          fill
          sizes="(max-width:760px) 100vw, 450px"
        />
      ) : (
        <>
          <div className="cover-orbit" aria-hidden="true" />
          <div className="cover-grid" aria-hidden="true" />
          <span className="cover-caption">PROJECT OVERVIEW</span>
          <Icon className="cover-icon" size={40} strokeWidth={1.3} />
          <span className="cover-name">{project.name}</span>
          <span className="cover-category">
            {project.tag}
            <ArrowUpRight size={15} />
          </span>
        </>
      )}
    </div>
  );
}
