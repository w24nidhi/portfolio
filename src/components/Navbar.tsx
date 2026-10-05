import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutUp,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { NAV_ITEMS, NAVBAR_HEIGHT } from "@/constants/navigation";
import { useScroll } from "@/context/ScrollContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import type { NavItem, SectionId } from "@/types";

import { Button, IconButton } from "./ui/Button";
import { Container } from "./ui/Container";
import { Logo } from "./ui/Logo";
import { AppText } from "./ui/Typography";

/** Desktop nav link with an animated active pill. */
function NavLink({ item, active, onPress }: { item: NavItem; active: boolean; onPress: () => void }) {
  const progress = useSharedValue(active ? 1 : 0);
  useEffect(() => {
    progress.value = withSpring(active ? 1 : 0, { damping: 20, stiffness: 240 });
  }, [active, progress]);

  const pillStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: interpolate(progress.value, [0, 1], [0.8, 1]) }],
  }));

  return (
    <Pressable
      onPress={onPress}
      role="link"
      accessibilityLabel={`Go to ${item.label}`}
      aria-current={active ? "page" : undefined}
      className="rounded-full px-3.5 py-2 lg:px-4 web:cursor-pointer web:outline-none"
    >
      <Animated.View style={pillStyle} className="pointer-events-none absolute inset-0 rounded-full bg-ink dark:bg-white" />
      <AppText
        className={`text-sm font-semibold ${
          active ? "text-white dark:text-ink" : "text-ink-soft hover:text-ink dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        {item.label}
      </AppText>
    </Pressable>
  );
}

export function Navbar() {
  const insets = useSafeAreaInsets();
  const { scrollY, activeSection, scrollToSection } = useScroll();
  const { isDark, toggleTheme } = useAppTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  // Entrance: slide down on first paint.
  const enter = useSharedValue(0);
  useEffect(() => {
    enter.value = withTiming(1, { duration: 600 });
  }, [enter]);

  // Glass background fades in once the page is scrolled.
  const scrolled = useDerivedValue(() => withTiming(scrollY.value > 12 ? 1 : 0, { duration: 250 }));

  const barStyle = useAnimatedStyle(() => ({
    opacity: enter.value,
    transform: [{ translateY: interpolate(enter.value, [0, 1], [-24, 0]) }],
  }));

  const glassStyle = useAnimatedStyle(() => ({
    opacity: scrolled.value,
  }));

  const go = (id: SectionId) => {
    setMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <Animated.View
      style={[barStyle, { paddingTop: insets.top }]}
      className="absolute left-0 right-0 top-0 z-50"
      role="banner"
    >
      {/* Glass layer */}
      <Animated.View
        style={glassStyle}
        className="pointer-events-none absolute inset-0 border-b border-slate-200/70 bg-white/90 web:bg-white/70 web:backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/90 dark:web:bg-slate-950/60"
      />

      <Container>
        <View style={{ height: NAVBAR_HEIGHT }} className="flex-row items-center justify-between">
          <Logo onPress={() => go("home")} />

          {/* Desktop navigation */}
          <View role="navigation" aria-label="Primary" className="hidden flex-row items-center rounded-full border border-slate-200/80 bg-white/60 p-1 md:flex dark:border-slate-800 dark:bg-slate-900/60">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.id} item={item} active={activeSection === item.id} onPress={() => go(item.id)} />
            ))}
          </View>

          <View className="flex-row items-center gap-2">
            <IconButton
              icon={isDark ? "white-balance-sunny" : "weather-night"}
              label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              onPress={toggleTheme}
            />
            <View className="hidden lg:flex">
              <Button label="Hire me" size="sm" variant="dark" onPress={() => go("contact")} />
            </View>
            <View className="md:hidden">
              <IconButton
                icon={menuOpen ? "close" : "menu"}
                label={menuOpen ? "Close menu" : "Open menu"}
                onPress={() => setMenuOpen((o) => !o)}
              />
            </View>
          </View>
        </View>
      </Container>

      {/* Mobile menu */}
      {menuOpen ? (
        <Animated.View
          entering={FadeInDown.duration(220)}
          exiting={FadeOutUp.duration(160)}
          className="md:hidden"
        >
          <Container>
            <View
              role="navigation"
              aria-label="Mobile"
              className="mb-3 overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900"
              style={{ boxShadow: "0px 20px 40px rgba(15,23,42,0.12)" }}
            >
              {NAV_ITEMS.map((item) => {
                const active = activeSection === item.id;
                return (
                  <Pressable
                    key={item.id}
                    onPress={() => go(item.id)}
                    role="link"
                    accessibilityLabel={`Go to ${item.label}`}
                    className={`flex-row items-center justify-between rounded-2xl px-4 py-3.5 ${
                      active ? "bg-brand-50 dark:bg-brand-900/30" : ""
                    }`}
                  >
                    <AppText
                      className={`text-base font-semibold ${
                        active ? "text-brand-700 dark:text-brand-300" : "text-ink dark:text-slate-200"
                      }`}
                    >
                      {item.label}
                    </AppText>
                    {active ? <View className="h-2 w-2 rounded-full bg-brand-600" /> : null}
                  </Pressable>
                );
              })}
              <View className="p-2">
                <Button label="Hire me" variant="primary" fullWidth onPress={() => go("contact")} />
              </View>
            </View>
          </Container>
        </Animated.View>
      ) : null}
    </Animated.View>
  );
}
