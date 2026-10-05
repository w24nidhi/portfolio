import { useEffect, type ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import Animated, {
  Easing,
  measure,
  useAnimatedReaction,
  useAnimatedRef,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { motion } from "@/constants/theme";
import { useScroll } from "@/context/ScrollContext";

type Direction = "up" | "down" | "left" | "right" | "scale" | "fade";

interface RevealProps {
  children: ReactNode;
  /** Delay in ms before the animation starts once triggered. */
  delay?: number;
  duration?: number;
  from?: Direction;
  /** Distance in px for slide animations. */
  distance?: number;
  /** "scroll" waits until the element enters the viewport; "mount" animates immediately. */
  trigger?: "scroll" | "mount";
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const EASE = Easing.bezier(0.22, 1, 0.36, 1);

/**
 * Fades/slides its children in once — either on mount or when scrolled into view.
 * Honours the OS "reduce motion" setting.
 */
export function Reveal({
  children,
  delay = 0,
  duration = motion.duration,
  from = "up",
  distance = 28,
  trigger = "scroll",
  className,
  style,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY, viewportHeight } = useScroll();
  const ref = useAnimatedRef<Animated.View>();
  const progress = useSharedValue(reduceMotion ? 1 : 0);
  const triggered = useSharedValue(reduceMotion);
  const layoutTick = useSharedValue(0);

  const play = () => {
    "worklet";
    triggered.value = true;
    progress.value = withDelay(delay, withTiming(1, { duration, easing: EASE }));
  };

  useEffect(() => {
    if (trigger === "mount" && !reduceMotion) {
      progress.value = withDelay(delay, withTiming(1, { duration, easing: EASE }));
      triggered.value = true;
    }
  }, [trigger, reduceMotion, delay, duration, progress, triggered]);

  useAnimatedReaction(
    () => scrollY.value + layoutTick.value,
    () => {
      if (trigger !== "scroll" || triggered.value) return;
      const m = measure(ref);
      if (m && m.height >= 0 && m.pageY < viewportHeight.value * 0.92) {
        play();
      }
    },
  );

  const animatedStyle = useAnimatedStyle(() => {
    const p = progress.value;
    const offset = (1 - p) * distance;
    switch (from) {
      case "up":
        return { opacity: p, transform: [{ translateY: offset }] };
      case "down":
        return { opacity: p, transform: [{ translateY: -offset }] };
      case "left":
        return { opacity: p, transform: [{ translateX: -offset }] };
      case "right":
        return { opacity: p, transform: [{ translateX: offset }] };
      case "scale":
        return { opacity: p, transform: [{ scale: 0.94 + 0.06 * p }] };
      default:
        return { opacity: p };
    }
  });

  return (
    <Animated.View
      ref={ref}
      className={className}
      style={[style, animatedStyle]}
      onLayout={() => {
        layoutTick.value = layoutTick.value + 1;
      }}
    >
      {children}
    </Animated.View>
  );
}
