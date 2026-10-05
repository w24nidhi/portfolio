import { LinearGradient } from "expo-linear-gradient";
import { Image, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, type SharedValue } from "react-native-reanimated";

import { publishedApps } from "@/data/apps";
import { useAppTheme } from "@/hooks/useAppTheme";
import type { PublishedApp } from "@/types";
import { hasUrl } from "@/utils/links";

import { ButtonRow } from "./ui/Button";
import { HoverCard } from "./ui/HoverCard";
import { Icon } from "./ui/Icon";
import { Reveal } from "./ui/Reveal";
import { Section, SectionHeading } from "./ui/Section";
import { StoreButton } from "./ui/StoreButton";
import { AppText, Heading } from "./ui/Typography";

function AppIcon({ app, hover }: { app: PublishedApp; hover: SharedValue<number> }) {
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(hover.value, [0, 1], [1, 1.08]) }, { rotate: `${interpolate(hover.value, [0, 1], [0, -6])}deg` }],
  }));
  return (
    <Animated.View style={[style, { boxShadow: `0px 12px 28px ${app.palette.from}55` }]} className="h-16 w-16 rounded-2xl">
      {app.iconImage ? (
        <Image source={app.iconImage} alt={`${app.name} app icon`} accessibilityLabel={`${app.name} app icon`} style={{ width: 64, height: 64, borderRadius: 18 }} />
      ) : (
        <LinearGradient
          colors={[app.palette.from, app.palette.to]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 64, height: 64, borderRadius: 18, alignItems: "center", justifyContent: "center" }}
        >
          <Icon name={app.icon} size={30} color="#FFFFFF" />
        </LinearGradient>
      )}
    </Animated.View>
  );
}

function AppCard({ app }: { app: PublishedApp }) {
  const { colors } = useAppTheme();
  return (
    <HoverCard className="h-full border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-surface-dark">
      {(hover) => (
        <View className="h-full p-6">
          <View className="mb-5 flex-row items-start justify-between">
            <AppIcon app={app} hover={hover} />
            {app.rating ? (
              <View className="flex-row items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 dark:bg-amber-950/40">
                <Icon name="star" size={14} color="#F59E0B" />
                <AppText className="text-xs font-bold text-amber-700 dark:text-amber-300">{app.rating}</AppText>
              </View>
            ) : null}
          </View>
          <Heading level={3} className="text-xl font-bold text-ink dark:text-white">
            {app.name}
          </Heading>
          <View className="mt-1 flex-row items-center gap-2">
            <AppText className="text-sm font-medium text-brand-600 dark:text-brand-400">{app.category}</AppText>
            {app.downloads ? (
              <>
                <View className="h-1 w-1 rounded-full bg-slate-300" />
                <View className="flex-row items-center gap-1">
                  <Icon name="download" size={14} color={colors.textMuted} />
                  <AppText className="text-sm text-ink-soft dark:text-slate-400">{app.downloads}</AppText>
                </View>
              </>
            ) : null}
          </View>
          <AppText className="mb-6 mt-3 text-sm leading-6 text-ink-soft dark:text-slate-400">{app.description}</AppText>
          <ButtonRow className="mt-auto">
            {hasUrl(app.playStoreUrl) ? <StoreButton store="google" url={app.playStoreUrl} compact /> : null}
            {hasUrl(app.appStoreUrl) ? <StoreButton store="apple" url={app.appStoreUrl} compact /> : null}
          </ButtonRow>
        </View>
      )}
    </HoverCard>
  );
}

export function Apps() {
  if (publishedApps.length === 0) return null;
  return (
    <Section id="apps" label="Published apps">
      <SectionHeading
        eyebrow="In the stores"
        title="Published Apps"
        subtitle="Real apps, used by real people — available on Google Play and the App Store."
      />
      <View className="-mx-3 flex-row flex-wrap justify-center">
        {publishedApps.map((a, i) => (
          <Reveal key={a.name} delay={i * 90} from="scale" className="mb-6 w-full px-3 md:w-1/2 lg:w-1/3">
            <AppCard app={a} />
          </Reveal>
        ))}
      </View>
    </Section>
  );
}
