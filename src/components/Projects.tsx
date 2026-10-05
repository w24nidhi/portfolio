import { View } from "react-native";

import { otherProjects } from "@/data/projects";
import type { Project } from "@/types";

import { Badge } from "./ui/Badge";
import { HoverCard } from "./ui/HoverCard";
import { ProjectLinks } from "./ui/ProjectLinks";
import { ProjectVisual } from "./ui/ProjectVisual";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { AppText, Heading } from "./ui/Typography";

function ProjectCard({ project }: { project: Project }) {
  return (
    <HoverCard className="h-full overflow-hidden border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-surface-dark">
      {(hover) => (
        <View className="h-full overflow-hidden rounded-3xl">
          <ProjectVisual project={project} hover={hover} height={230} phoneWidth={130} />
          <View className="flex-1 p-6">
            <AppText className="text-xs font-semibold uppercase tracking-widest text-ink-faint">{project.category}</AppText>
            <Heading level={3} className="mt-2 text-xl font-bold text-ink dark:text-white">
              {project.title}
            </Heading>
            <AppText className="mt-2 text-sm leading-6 text-ink-soft dark:text-slate-400">{project.description}</AppText>
            <View className="mb-6 mt-4 flex-row flex-wrap gap-2">
              {project.technologies.map((t) => (
                <Badge key={t} label={t} />
              ))}
            </View>
            <View className="mt-auto">
              <ProjectLinks project={project} compact />
            </View>
          </View>
        </View>
      )}
    </HoverCard>
  );
}

export function Projects() {
  if (otherProjects.length === 0) return null;
  return (
    <Section id="all-projects" label="More projects" padding="pt-10 pb-20 md:pt-14 md:pb-28">
      <Reveal className="mb-8 flex-row items-end justify-between">
        <View>
          <Heading level={2} className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl dark:text-white">
            More Projects
          </Heading>
          <AppText className="mt-2 text-base text-ink-soft dark:text-slate-400">
            Side projects, experiments and client work.
          </AppText>
        </View>
      </Reveal>
      <View className="-mx-3 flex-row flex-wrap">
        {otherProjects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 3) * 90} className="mb-6 w-full px-3 md:w-1/2 lg:w-1/3">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </View>
    </Section>
  );
}
