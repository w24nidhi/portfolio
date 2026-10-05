import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

import { brandGradient } from "@/constants/theme";
import { experience, experienceSummary } from "@/data/experience";
import { useAppTheme } from "@/hooks/useAppTheme";
import type { ExperienceItem } from "@/types";

import { Badge } from "./ui/Badge";
import { HoverCard } from "./ui/HoverCard";
import { Icon } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";
import { AppText, Heading } from "./ui/Typography";

function TimelineItem({ item, last }: { item: ExperienceItem; last: boolean }) {
  const { colors } = useAppTheme();
  return (
    <View className="flex-row">
      {/* Rail */}
      <View className="mr-4 w-6 items-center sm:mr-6">
        <View className="mt-7 h-6 w-6 items-center justify-center rounded-full border-4 border-brand-100 bg-brand-600 dark:border-brand-900 dark:bg-brand-400" />
        {!last ? <View className="w-0.5 flex-1 bg-slate-200 dark:bg-slate-800" /> : null}
      </View>

      <View className="flex-1 pb-8">
        <Reveal from="right">
          <HoverCard lift={4}>
            <View className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-surface-dark">
              <View className="flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <View className="flex-1">
                  <Heading level={3} className="text-xl font-bold text-ink dark:text-white">
                    {item.role}
                  </Heading>
                  <View className="mt-1 flex-row flex-wrap items-center gap-x-3 gap-y-1">
                    <View className="flex-row items-center gap-1.5">
                      <Icon name="briefcase-outline" size={15} color={colors.textMuted} />
                      <AppText className="text-sm font-medium text-ink-soft dark:text-slate-400">{item.company}</AppText>
                    </View>
                    <View className="flex-row items-center gap-1.5">
                      <Icon name="map-marker-outline" size={15} color={colors.textMuted} />
                      <AppText className="text-sm text-ink-soft dark:text-slate-400">{item.location}</AppText>
                    </View>
                  </View>
                </View>
                <View className="self-start">
                  <Badge label={item.period} icon="calendar-blank-outline" tone="brand" />
                </View>
              </View>

              <AppText className="mt-4 text-base leading-7 text-ink-soft dark:text-slate-300">{item.summary}</AppText>

              <View className="mt-5 gap-3">
                {item.responsibilities.map((r) => (
                  <View key={r} className="flex-row items-start gap-3">
                    <View className="mt-0.5 h-5 w-5 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/50">
                      <Icon name="check" size={13} color="#10B981" />
                    </View>
                    <AppText className="flex-1 text-sm leading-6 text-ink dark:text-slate-200">{r}</AppText>
                  </View>
                ))}
              </View>

              <View className="mt-6 flex-row flex-wrap gap-2">
                {item.technologies.map((t) => (
                  <Badge key={t} label={t} />
                ))}
              </View>
            </View>
          </HoverCard>
        </Reveal>
      </View>
    </View>
  );
}

export function Experience() {
  return (
    <Section id="experience" label="Experience" className="bg-white/60 dark:bg-slate-950/40">
      <SectionHeading
        eyebrow="Experience"
        title="Where I've been building"
        subtitle="Hands-on experience across the full mobile lifecycle — from first commit to store release."
      />

      <View className="flex-col gap-10 lg:flex-row lg:gap-14">
        {/* Summary card */}
        <View className="w-full lg:w-1/3">
          <Reveal from="left">
            <LinearGradient
              colors={brandGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ borderRadius: 28, padding: 28, overflow: "hidden" }}
            >
              <View className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
              <View className="absolute -bottom-16 -left-8 h-48 w-48 rounded-full bg-white/10" />
              <View className="mb-6 h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                <Icon name="react" size={26} color="#FFFFFF" />
              </View>
              <AppText className="text-sm font-semibold uppercase tracking-widest text-white/80">Current role</AppText>
              <AppText className="mt-2 text-2xl font-extrabold text-white">{experienceSummary.title}</AppText>
              <AppText className="mt-6 text-6xl font-extrabold tracking-tight text-white">3+</AppText>
              <AppText className="text-base font-semibold text-white/90">{experienceSummary.years}</AppText>
              <View className="mt-6 gap-2 border-t border-white/20 pt-6">
                {["iOS & Android releases", "Firebase & REST APIs", "Performance & quality"].map((t) => (
                  <View key={t} className="flex-row items-center gap-2">
                    <Icon name="check-circle-outline" size={16} color="#FFFFFF" />
                    <AppText className="text-sm font-medium text-white">{t}</AppText>
                  </View>
                ))}
              </View>
            </LinearGradient>
          </Reveal>
        </View>

        {/* Timeline */}
        <View className="w-full lg:flex-1">
          {experience.map((item, i) => (
            <TimelineItem key={`${item.company}-${item.period}`} item={item} last={i === experience.length - 1} />
          ))}
        </View>
      </View>
    </Section>
  );
}
