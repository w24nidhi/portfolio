import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import { site } from "@/config/site";
import { palette } from "@/constants/theme";
import { useScroll } from "@/context/ScrollContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { hasUrl } from "@/utils/links";

import { Button, ButtonRow } from "./ui/Button";
import { FloatingBlobs } from "./ui/FloatingBlobs";
import { Icon } from "./ui/Icon";
import { PhoneMockup } from "./ui/PhoneMockup";
import { Reveal } from "./ui/Reveal";
import { Section } from "./ui/Section";
import { AppText, Heading } from "./ui/Typography";

/** Gentle vertical bob for floating hero elements. */
function useFloat(amplitude: number, duration: number) {
  const reduceMotion = useReducedMotion();
  const t = useSharedValue(0);
  useEffect(() => {
    if (reduceMotion) return;
    t.value = withRepeat(
      withSequence(
        withTiming(1, { duration, easing: Easing.inOut(Easing.sin) }),
        withTiming(0, { duration, easing: Easing.inOut(Easing.sin) }),
      ),
      -1,
    );
    return () => cancelAnimation(t);
  }, [duration, reduceMotion, t]);
  return useAnimatedStyle(() => ({ transform: [{ translateY: -t.value * amplitude }] }));
}

function PulseDot() {
  const reduceMotion = useReducedMotion();
  const t = useSharedValue(0);
  useEffect(() => {
    if (reduceMotion) return;
    t.value = withRepeat(withTiming(1, { duration: 1600, easing: Easing.out(Easing.ease) }), -1);
    return () => cancelAnimation(t);
  }, [reduceMotion, t]);
  const ring = useAnimatedStyle(() => ({ opacity: 1 - t.value, transform: [{ scale: 1 + t.value * 1.6 }] }));
  return (
    <View className="h-2.5 w-2.5 items-center justify-center">
      <Animated.View style={ring} className="absolute h-2.5 w-2.5 rounded-full bg-emerald-400" />
      <View className="h-2 w-2 rounded-full bg-emerald-500" />
    </View>
  );
}

function FloatingChip({ icon, title, caption, tint }: { icon: Parameters<typeof Icon>[0]["name"]; title: string; caption: string; tint: string }) {
  return (
    <View
      className="flex-row items-center gap-3 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 web:backdrop-blur-md dark:border-slate-700/70 dark:bg-slate-900/90"
      style={{ boxShadow: "0px 18px 40px rgba(15,23,42,0.14)" }}
    >
      <View className="h-9 w-9 items-center justify-center rounded-xl" style={{ backgroundColor: `${tint}1F` }}>
        <Icon name={icon} size={18} color={tint} />
      </View>
      <View>
        <AppText className="text-sm font-bold text-ink dark:text-white">{title}</AppText>
        <AppText className="text-xs text-ink-soft dark:text-slate-400">{caption}</AppText>
      </View>
    </View>
  );
}

function HeroVisual() {
  const phoneFloat = useFloat(10, 3200);
  const chipA = useFloat(8, 2600);
  const chipB = useFloat(12, 3600);
  const chipC = useFloat(6, 3000);

  return (
    <View className="h-[540px] w-full max-w-[460px] items-center justify-center sm:h-[580px]" aria-hidden>
      {/* Glow ring behind the phone */}
      <View className="absolute h-[360px] w-[360px] rounded-full border border-brand-200/70 sm:h-[440px] sm:w-[440px] dark:border-brand-800/50" />
      <View className="absolute h-[260px] w-[260px] rounded-full border border-dashed border-aqua-300/70 sm:h-[320px] sm:w-[320px] dark:border-aqua-600/40" />

      <Animated.View style={phoneFloat}>
        <PhoneMockup
          palette={{ from: palette.brand, to: palette.aqua }}
          icon="react"
          title="Good morning!"
          subtitle="Hi, Nidhi 👋"
          width={250}
        />
      </Animated.View>

      <Animated.View style={chipA} className="absolute left-0 top-[46%] sm:-left-2">
        <FloatingChip icon="lightning-bolt-outline" title="60 FPS" caption="Smooth animations" tint={palette.amber} />
      </Animated.View>
      <Animated.View style={chipB} className="absolute bottom-24 right-0 sm:-right-2">
        <FloatingChip icon="monitor-cellphone" title="iOS · Android · Web" caption="One codebase" tint={palette.brand} />
      </Animated.View>
      <Animated.View style={chipC} className="absolute bottom-6 left-2 hidden sm:flex">
        <View
          className="rounded-2xl bg-slate-900 px-4 py-3 dark:bg-slate-800"
          style={{ boxShadow: "0px 18px 40px rgba(15,23,42,0.25)" }}
        >
          <AppText className="font-mono text-xs leading-5 text-slate-400">
            <AppText className="font-mono text-xs text-pink-400">const</AppText>{" "}
            <AppText className="font-mono text-xs text-aqua-300">app</AppText> ={" "}
            <AppText className="font-mono text-xs text-amber-300">{"<Expo />"}</AppText>;
          </AppText>
        </View>
      </Animated.View>
    </View>
  );
}

export function Hero() {
  const { scrollToSection } = useScroll();
  const { colors } = useAppTheme();

  return (
    <Section
      id="home"
      label="Introduction"
      padding="pt-28 pb-16 md:pt-36 md:pb-24"
      className="min-h-[640px]"
      background={<FloatingBlobs />}
    >
      <View className="flex-col items-center gap-10 lg:flex-row lg:gap-12">
        {/* Copy */}
        <View className="w-full lg:flex-1">
          <Reveal trigger="mount" delay={100}>
            <View className="mb-6 flex-row items-center gap-2 self-start rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1.5 dark:border-emerald-900 dark:bg-emerald-950/40">
              <PulseDot />
              <AppText className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">{site.availability}</AppText>
            </View>
          </Reveal>

          <Reveal trigger="mount" delay={200}>
            <AppText className="mb-3 text-lg font-semibold text-ink-soft md:text-xl dark:text-slate-300">
              Hi, I&apos;m <AppText className="font-extrabold text-ink dark:text-white">{site.name}</AppText> 👋
            </AppText>
          </Reveal>

          <Reveal trigger="mount" delay={300}>
            <Heading
              level={1}
              className="text-[44px] font-extrabold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl dark:text-white"
            >
              <AppText className="text-brand-600 web:bg-gradient-to-r web:from-brand-600 web:to-aqua-500 web:bg-clip-text web:text-transparent dark:text-brand-400 dark:web:from-brand-400 dark:web:to-aqua-400">
                React Native
              </AppText>
              {"\n"}Developer
            </Heading>
          </Reveal>

          <Reveal trigger="mount" delay={420}>
            <AppText className="mt-6 max-w-xl text-base leading-7 text-ink-soft sm:text-lg sm:leading-8 dark:text-slate-400">
              {site.tagline}
            </AppText>
          </Reveal>

          <Reveal trigger="mount" delay={520}>
            <ButtonRow className="mt-8">
              <Button
                label="View My Projects"
                size="lg"
                icon="arrow-right"
                iconPosition="right"
                onPress={() => scrollToSection("projects")}
              />
              <Button label="Contact Me" size="lg" variant="secondary" icon="email-outline" onPress={() => scrollToSection("contact")} />
            </ButtonRow>
          </Reveal>

          <Reveal trigger="mount" delay={620}>
            <ButtonRow className="mt-5">
              <Button label="GitHub" size="sm" variant="ghost" icon="github" href={site.githubUrl} />
              <Button label="LinkedIn" size="sm" variant="ghost" icon="linkedin" href={site.linkedinUrl} />
              {hasUrl(site.resumeUrl) ? (
                <Button label="Resume" size="sm" variant="ghost" icon="file-document-outline" href={site.resumeUrl} />
              ) : null}
            </ButtonRow>
          </Reveal>

          <Reveal trigger="mount" delay={720}>
            <View className="mt-10 border-t border-slate-200 pt-6 dark:border-slate-800">
              <AppText className="mb-3 text-xs font-semibold uppercase tracking-widest text-ink-faint">
                Primary stack
              </AppText>
              <View className="flex-row flex-wrap gap-x-5 gap-y-2">
                {site.primaryTechnologies.map((tech) => (
                  <View key={tech} className="flex-row items-center gap-1.5">
                    <Icon name="check-circle-outline" size={14} color={colors.accent} />
                    <AppText className="text-sm font-medium text-ink-soft dark:text-slate-300">{tech}</AppText>
                  </View>
                ))}
              </View>
            </View>
          </Reveal>
        </View>

        {/* Visual */}
        <Reveal trigger="mount" delay={350} from="scale" duration={900} className="w-full items-center lg:flex-1">
          <HeroVisual />
        </Reveal>
      </View>
    </Section>
  );
}
