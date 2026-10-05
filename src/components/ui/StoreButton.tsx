import { Pressable, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";

import { useAppTheme } from "@/hooks/useAppTheme";
import { useHover } from "@/hooks/useHover";
import { openUrl } from "@/utils/links";

import { Icon } from "./Icon";
import { AppText } from "./Typography";

interface StoreButtonProps {
  store: "google" | "apple";
  url: string;
  compact?: boolean;
}

const STORES = {
  google: { icon: "google-play", top: "GET IT ON", name: "Google Play" },
  apple: { icon: "apple", top: "Download on the", name: "App Store" },
} as const;

/** Official-style store badge, rendered with native components so it themes correctly. */
export function StoreButton({ store, url, compact }: StoreButtonProps) {
  const meta = STORES[store];
  const { isDark } = useAppTheme();
  const { progress, handlers } = useHover();
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(progress.value, [0, 1], [0, -2]) }],
    opacity: interpolate(progress.value, [0, 1], [1, 0.92]),
  }));

  return (
    <Animated.View style={style}>
      <Pressable
        role="link"
        accessibilityLabel={`${store === "google" ? "Get it on Google Play" : "Download on the App Store"}`}
        onPress={() => void openUrl(url)}
        {...handlers}
        className={`flex-row items-center gap-2 rounded-xl bg-ink dark:bg-white ${
          compact ? "h-10 px-3" : "h-12 px-4"
        } web:cursor-pointer web:outline-none`}
      >
        <Icon name={meta.icon} size={compact ? 18 : 22} color={isDark ? "#0B1220" : "#FFFFFF"} />
        <View>
          <AppText className="text-[9px] font-medium uppercase leading-3 tracking-wide text-white/80 dark:text-ink/70">
            {meta.top}
          </AppText>
          <AppText className={`font-bold leading-5 text-white dark:text-ink ${compact ? "text-sm" : "text-base"}`}>
            {meta.name}
          </AppText>
        </View>
      </Pressable>
    </Animated.View>
  );
}
