import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type Animated from "react-native-reanimated";
import {
  useAnimatedReaction,
  useAnimatedRef,
  useSharedValue,
  type AnimatedRef,
  type SharedValue,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { NAVBAR_HEIGHT } from "@/constants/navigation";
import type { SectionId } from "@/types";

interface ScrollContextValue {
  scrollRef: AnimatedRef<Animated.ScrollView>;
  scrollY: SharedValue<number>;
  viewportHeight: SharedValue<number>;
  activeSection: SectionId;
  registerSection: (id: SectionId, y: number) => void;
  scrollToSection: (id: SectionId) => void;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

/** Sections that aren't in the navbar highlight their closest parent nav item. */
const NAV_ALIASES: Partial<Record<SectionId, SectionId>> = {
  "all-projects": "projects",
  github: "projects",
  apps: "projects",
};

export function ScrollProvider({ children }: { children: ReactNode }) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);
  const viewportHeight = useSharedValue(800);
  const offsets = useSharedValue<Partial<Record<SectionId, number>>>({});
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const registerSection = useCallback(
    (id: SectionId, y: number) => {
      offsets.value = { ...offsets.value, [id]: y };
    },
    [offsets],
  );

  const scrollToSection = useCallback(
    (id: SectionId) => {
      const y = id === "home" ? 0 : (offsets.value[id] ?? 0) - NAVBAR_HEIGHT + 8;
      scrollRef.current?.scrollTo({ y: Math.max(0, y), animated: true });
    },
    [offsets, scrollRef],
  );

  // Work out which section is under the top third of the viewport (runs on the UI thread).
  useAnimatedReaction(
    () => {
      const probe = scrollY.value + viewportHeight.value * 0.35;
      let current = "home";
      let best = -1;
      const entries = offsets.value;
      for (const key in entries) {
        const y = entries[key as SectionId] ?? 0;
        if (y <= probe && y > best) {
          best = y;
          current = key;
        }
      }
      return current as SectionId;
    },
    (current, previous) => {
      if (current !== previous) {
        scheduleOnRN(setActiveSection, NAV_ALIASES[current] ?? current);
      }
    },
  );

  const value = useMemo(
    () => ({ scrollRef, scrollY, viewportHeight, activeSection, registerSection, scrollToSection }),
    [scrollRef, scrollY, viewportHeight, activeSection, registerSection, scrollToSection],
  );

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}

export function useScroll(): ScrollContextValue {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScroll must be used inside <ScrollProvider>");
  return ctx;
}
