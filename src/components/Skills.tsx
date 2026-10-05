import { Pressable, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

import { skillCategories } from "@/data/skills";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useHover } from "@/hooks/useHover";
import type { Skill, SkillCategory } from "@/types";

import { HoverCard } from "./ui/HoverCard";
import { Icon } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";
import { AppText, Heading } from "./ui/Typography";

function SkillChip({ skill }: { skill: Skill }) {
  const { colors } = useAppTheme();
  const { progress, handlers } = useHover();
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 1.05]) }],
  }));
  const fill = useAnimatedStyle(() => ({ opacity: progress.value }));

  return (
    <Animated.View style={style}>
      <Pressable
        {...handlers}
        focusable={false}
        accessible={false}
        className="flex-row items-center gap-2 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800/60 web:cursor-default"
      >
        <Animated.View style={fill} className="pointer-events-none absolute inset-0 bg-brand-50 dark:bg-brand-900/40" />
        <Icon name={skill.icon} size={16} color={colors.accent} />
        <AppText className="text-sm font-semibold text-ink dark:text-slate-200">{skill.name}</AppText>
      </Pressable>
    </Animated.View>
  );
}

function CategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  return (
    <View className="h-full rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-slate-800 dark:bg-surface-dark">
      <View className="mb-5 flex-row items-start justify-between">
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 dark:bg-brand-500">
          <Icon name={category.icon} size={24} color="#FFFFFF" />
        </View>
        <AppText className="font-mono text-xs text-ink-faint">{String(index + 1).padStart(2, "0")}</AppText>
      </View>
      <Heading level={3} className="text-lg font-bold text-ink dark:text-white">
        {category.title}
      </Heading>
      <AppText className="mb-5 mt-1 text-sm leading-6 text-ink-soft dark:text-slate-400">{category.description}</AppText>
      <View className="flex-row flex-wrap gap-2">
        {category.skills.map((s) => (
          <SkillChip key={s.name} skill={s} />
        ))}
      </View>
    </View>
  );
}

export function Skills() {
  return (
    <Section id="skills" label="Skills">
      <SectionHeading
        eyebrow="Skills"
        title="A toolkit built for shipping"
        subtitle="The technologies I use every day to design, build and release high-quality mobile apps."
      />
      <View className="-mx-2 flex-row flex-wrap justify-center">
        {skillCategories.map((c, i) => (
          <Reveal key={c.title} delay={i * 70} from="scale" className="mb-4 w-full px-2 sm:w-1/2 lg:w-1/3">
            <HoverCard className="h-full">
              <CategoryCard category={c} index={i} />
            </HoverCard>
          </Reveal>
        ))}
      </View>
    </Section>
  );
}
