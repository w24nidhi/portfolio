import type { ReactNode } from "react";
import { View } from "react-native";

import { useScroll } from "@/context/ScrollContext";
import type { SectionId } from "@/types";

import { Container } from "./Container";
import { Reveal } from "./Reveal";
import { AppText, Heading } from "./Typography";

interface SectionProps {
  id: SectionId;
  children: ReactNode;
  className?: string;
  /** Accessible label for the landmark region. */
  label: string;
  /** Vertical padding classes (override for the hero). */
  padding?: string;
  /** Rendered behind the content, full-bleed (e.g. decorative backgrounds). */
  background?: ReactNode;
}

/** A page section that registers its scroll offset for navbar navigation. */
export function Section({ id, children, className = "", label, padding = "py-20 md:py-28", background }: SectionProps) {
  const { registerSection } = useScroll();
  return (
    <View
      nativeID={id}
      role="region"
      aria-label={label}
      className={`w-full overflow-hidden ${padding} ${className}`}
      onLayout={(e) => registerSection(id, e.nativeEvent.layout.y)}
    >
      {background}
      <Container>{children}</Container>
    </View>
  );
}

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export function SectionHeading({ eyebrow, title, subtitle, align = "center" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal className={`mb-12 md:mb-16 ${centered ? "items-center" : "items-start"}`}>
      <View className="mb-4 flex-row items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 dark:border-brand-800 dark:bg-brand-900/30">
        <View className="h-1.5 w-1.5 rounded-full bg-brand-600 dark:bg-brand-400" />
        <AppText className="text-xs font-semibold uppercase tracking-widest text-brand-700 dark:text-brand-300">
          {eyebrow}
        </AppText>
      </View>
      <Heading
        level={2}
        className={`max-w-3xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl md:text-5xl dark:text-slate-50 ${
          centered ? "text-center" : "text-left"
        }`}
      >
        {title}
      </Heading>
      {subtitle ? (
        <AppText
          className={`mt-4 max-w-2xl text-base leading-7 text-ink-soft md:text-lg dark:text-slate-400 ${
            centered ? "text-center" : "text-left"
          }`}
        >
          {subtitle}
        </AppText>
      ) : null}
    </Reveal>
  );
}
