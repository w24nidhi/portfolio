import { View } from "react-native";

import { site } from "@/config/site";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useGithubRepos } from "@/hooks/useGithubRepos";
import type { GithubRepo } from "@/types";
import { openUrl } from "@/utils/links";

import { Button } from "./ui/Button";
import { HoverCard } from "./ui/HoverCard";
import { Icon } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";
import { AppText, Heading } from "./ui/Typography";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F1E05A",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Java: "#B07219",
  Markdown: "#64748B",
};

function RepoCard({ repo }: { repo: GithubRepo }) {
  const { colors } = useAppTheme();
  return (
    <HoverCard
      lift={4}
      onPress={() => void openUrl(repo.url)}
      accessibilityLabel={`Open the ${repo.name} repository on GitHub`}
      className="h-full border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-surface-dark"
    >
      <View className="h-full p-5">
        <View className="mb-3 flex-row items-center justify-between">
          <View className="flex-1 flex-row items-center gap-2 pr-2">
            <Icon name="source-branch" size={18} color={colors.accent} />
            <Heading level={3} className="flex-1 text-base font-bold text-ink dark:text-white" numberOfLines={1}>
              {repo.name}
            </Heading>
          </View>
          <Icon name="arrow-top-right" size={18} color={colors.textMuted} />
        </View>
        <AppText className="mb-5 text-sm leading-6 text-ink-soft dark:text-slate-400" numberOfLines={3}>
          {repo.description}
        </AppText>
        <View className="mt-auto flex-row items-center gap-4">
          <View className="flex-row items-center gap-1.5">
            <View className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? colors.accent }} />
            <AppText className="text-xs font-medium text-ink-soft dark:text-slate-400">{repo.language}</AppText>
          </View>
          <View className="flex-row items-center gap-1">
            <Icon name="star-outline" size={14} color={colors.textMuted} />
            <AppText className="text-xs font-medium text-ink-soft dark:text-slate-400">{repo.stars}</AppText>
          </View>
          <View className="flex-row items-center gap-1">
            <Icon name="source-fork" size={14} color={colors.textMuted} />
            <AppText className="text-xs font-medium text-ink-soft dark:text-slate-400">{repo.forks}</AppText>
          </View>
        </View>
      </View>
    </HoverCard>
  );
}

export function Github() {
  const { repos, source, loading } = useGithubRepos();

  return (
    <Section id="github" label="GitHub" className="bg-white/60 dark:bg-slate-950/40">
      <SectionHeading eyebrow="Open source" title="On GitHub" subtitle="Libraries, starters and experiments I share with the community." />

      <Reveal className="mb-10">
        <View className="flex-col items-start gap-5 rounded-3xl bg-ink p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8 dark:bg-slate-900">
          <View className="flex-row items-center gap-4">
            <View className="h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
              <Icon name="github" size={30} color="#FFFFFF" />
            </View>
            <View className="flex-shrink">
              <AppText className="text-lg font-bold text-white">@{site.githubUsername}</AppText>
              <AppText className="text-sm text-slate-400">
                {loading ? "Loading repositories…" : source === "api" ? "Live from the GitHub API" : "Selected repositories"}
              </AppText>
            </View>
          </View>
          <Button label="View GitHub Profile" icon="arrow-top-right" iconPosition="right" href={site.githubUrl} />
        </View>
      </Reveal>

      <View className="-mx-2 flex-row flex-wrap">
        {repos.map((r, i) => (
          <Reveal key={r.name} delay={(i % 3) * 70} className="mb-4 w-full px-2 sm:w-1/2 lg:w-1/3">
            <RepoCard repo={r} />
          </Reveal>
        ))}
      </View>
    </Section>
  );
}
