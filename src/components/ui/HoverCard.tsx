import type { ReactNode } from "react";
import { Pressable, type StyleProp, type ViewStyle } from "react-native";
import Animated, { interpolate, useAnimatedStyle, type SharedValue } from "react-native-reanimated";

import { useHover } from "@/hooks/useHover";

interface HoverCardProps {
  /** Render-prop receives hover progress so children can animate too (e.g. image zoom). */
  children: ReactNode | ((progress: SharedValue<number>) => ReactNode);
  className?: string;
  style?: StyleProp<ViewStyle>;
  /** Lift distance in px on hover. */
  lift?: number;
  onPress?: () => void;
  accessibilityLabel?: string;
}

/**
 * Card with a subtle lift + shadow on hover/focus (web).
 * Non-interactive unless `onPress` is provided.
 */
export function HoverCard({ children, className = "", style, lift = 6, onPress, accessibilityLabel }: HoverCardProps) {
  const { progress, handlers } = useHover();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(progress.value, [0, 1], [0, -lift]) }],
    boxShadow: `0px ${interpolate(progress.value, [0, 1], [4, 24])}px ${interpolate(
      progress.value,
      [0, 1],
      [16, 48],
    )}px rgba(15, 23, 42, ${interpolate(progress.value, [0, 1], [0.05, 0.14])})`,
  }));

  return (
    <Animated.View style={[style, animatedStyle]} className={`rounded-3xl ${className}`}>
      <Pressable
        onPress={onPress}
        focusable={!!onPress}
        accessible={!!onPress}
        role={onPress ? "button" : undefined}
        accessibilityLabel={accessibilityLabel}
        {...handlers}
        className={`flex-1 ${onPress ? "web:cursor-pointer" : "web:cursor-auto"} web:outline-none`}
      >
        {typeof children === "function" ? children(progress) : children}
      </Pressable>
    </Animated.View>
  );
}
