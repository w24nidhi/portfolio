import { View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, type SharedValue } from "react-native-reanimated";

import { site } from "@/config/site";
import { aboutHighlights, aboutIntro, stats } from "@/data/about";
import { useAppTheme } from "@/hooks/useAppTheme";
import type { AboutHighlight } from "@/types";

import { HoverCard } from "./ui/HoverCard";
import { Icon } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";
import { AppText, Heading } from "./ui/Typography";

function HighlightCard({ item, hover }: { item: AboutHighlight; hover: SharedValue<number> }) {
  const { colors } = useAppTheme();
  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(hover.value, [0, 1], [0, -8])}deg` }, { scale: 1 + hover.value * 0.08 }],
  }));
  return (
    <View className="h-full rounded-3xl border border-slate-200/80 bg-white p-5 dark:border-slate-800 dark:bg-surface-dark">
      <Animated.View style={iconStyle} className="mb-4 h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 dark:bg-brand-900/30">
        <Icon name={item.icon} size={22} color={colors.accent} />
      </Animated.View>
      <Heading level={3} className="text-base font-bold text-ink dark:text-white">
        {item.title}
      </Heading>
      <AppText className="mt-1.5 text-sm leading-6 text-ink-soft dark:text-slate-400">{item.description}</AppText>
    </View>
  );
}

export function About() {
  return (
    <Section id="about" label="About me" className="bg-white/60 dark:bg-slate-950/40">
      <SectionHeading
        eyebrow="About me"
        title="Crafting mobile experiences people love to use"
        subtitle={`${site.experience} of building, shipping and scaling cross-platform apps with React Native.`}
      />

      <View className="flex-col gap-10 lg:flex-row lg:gap-14">
        {/* Story + stats */}
        <View className="w-full lg:w-5/12">
          <Reveal from="left">
            <View className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-surface-dark">
              <View className="mb-5 flex-row items-center gap-3">
                <View className="h-12 w-12 items-center justify-center rounded-2xl bg-ink dark:bg-white">
                  <AppText className="text-lg font-extrabold text-white dark:text-ink">{site.name.charAt(0)}</AppText>
                </View>
                <View className="flex-1">
                  <AppText className="text-base font-bold text-ink dark:text-white">{site.fullName}</AppText>
                  <AppText className="text-sm text-ink-soft dark:text-slate-400">
                    {site.role} · {site.location}
                  </AppText>
                </View>
              </View>
              {aboutIntro.map((p, i) => (
                <AppText key={i} className="mb-4 text-base leading-7 text-ink-soft dark:text-slate-300">
                  {p}
                </AppText>
              ))}

              <View className="mt-2 flex-row flex-wrap border-t border-slate-200 pt-6 dark:border-slate-800">
                {stats.map((s) => (
                  <View key={s.label} className="w-1/2 py-3">
                    <AppText className="text-3xl font-extrabold tracking-tight text-ink dark:text-white">{s.value}</AppText>
                    <AppText className="mt-1 text-xs font-medium uppercase tracking-wider text-ink-faint">{s.label}</AppText>
                  </View>
                ))}
              </View>
            </View>
          </Reveal>
        </View>

        {/* Highlights grid */}
        <View className="w-full lg:flex-1">
          <View className="-mx-2 flex-row flex-wrap">
            {aboutHighlights.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 80 + Math.floor(i / 2) * 40} className="mb-4 w-full px-2 sm:w-1/2">
                <HoverCard className="h-full" lift={4}>
                  {(hover) => <HighlightCard item={item} hover={hover} />}
                </HoverCard>
              </Reveal>
            ))}
          </View>
        </View>
      </View>
    </Section>
  );
}
