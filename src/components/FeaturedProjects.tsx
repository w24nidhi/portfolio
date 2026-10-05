import { View } from "react-native";

import { featuredProjects } from "@/data/projects";
import { useAppTheme } from "@/hooks/useAppTheme";
import { BREAKPOINTS, useWindowWidth } from "@/hooks/useBreakpoint";
import type { Project } from "@/types";

import { Badge } from "./ui/Badge";
import { HoverCard } from "./ui/HoverCard";
import { Icon } from "./ui/Icon";
import { ProjectLinks } from "./ui/ProjectLinks";
import { ProjectVisual } from "./ui/ProjectVisual";
import { Reveal } from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";
import { AppText, Heading } from "./ui/Typography";

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const { colors } = useAppTheme();
  const width = useWindowWidth();
  const isWide = width >= BREAKPOINTS.lg;
  const reversed = index % 2 === 1;

  return (
    <HoverCard lift={6} className="overflow-hidden border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-surface-dark">
      {(hover) => (
        <View className={`flex-col overflow-hidden rounded-3xl ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
          <View className="w-full lg:w-1/2">
            <ProjectVisual project={project} hover={hover} height={isWide ? 460 : width >= BREAKPOINTS.sm ? 380 : 320} phoneWidth={isWide ? 220 : 180} />
          </View>

          <View className="w-full justify-center p-6 sm:p-10 lg:w-1/2">
            <View className="mb-4 flex-row items-center gap-3">
              <AppText className="font-mono text-sm font-medium" style={{ color: project.palette.from }}>
                {String(index + 1).padStart(2, "0")}
              </AppText>
              <View className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
              <AppText className="text-xs font-semibold uppercase tracking-widest text-ink-faint">{project.category}</AppText>
            </View>

            <Heading level={3} className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl dark:text-white">
              {project.title}
            </Heading>
            <AppText className="mt-4 text-base leading-7 text-ink-soft dark:text-slate-300">
              {project.longDescription ?? project.description}
            </AppText>

            {project.highlights?.length ? (
              <View className="mt-5 gap-2.5">
                {project.highlights.map((h) => (
                  <View key={h} className="flex-row items-center gap-2.5">
                    <Icon name="star-four-points" size={14} color={colors.accent} />
                    <AppText className="text-sm font-medium text-ink dark:text-slate-200">{h}</AppText>
                  </View>
                ))}
              </View>
            ) : null}

            <View className="mt-6 flex-row flex-wrap gap-2">
              {project.technologies.map((t) => (
                <Badge key={t} label={t} tone="brand" />
              ))}
            </View>

            <View className="mt-8">
              <ProjectLinks project={project} />
            </View>
          </View>
        </View>
      )}
    </HoverCard>
  );
}

export function FeaturedProjects() {
  if (featuredProjects.length === 0) return null;
  return (
    <Section id="projects" label="Featured projects" padding="pt-20 pb-10 md:pt-28 md:pb-14">
      <SectionHeading
        eyebrow="Featured work"
        title="Featured Projects"
        subtitle="A selection of apps I've designed, built and shipped — from idea to the App Store and Google Play."
      />
      <View className="gap-8 md:gap-10">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.id} from="up" distance={40}>
            <FeaturedCard project={p} index={i} />
          </Reveal>
        ))}
      </View>
    </Section>
  );
}
