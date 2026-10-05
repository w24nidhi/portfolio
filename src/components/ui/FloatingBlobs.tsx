import { useEffect } from "react";
import { Platform, View, type ViewStyle } from "react-native";
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { useAppTheme } from "@/hooks/useAppTheme";

interface BlobSpec {
  size: number;
  top: `${number}%`;
  left: `${number}%`;
  color: "blobA" | "blobB" | "blobC";
  dx: number;
  dy: number;
  duration: number;
}

const BLOBS: BlobSpec[] = [
  { size: 420, top: "-10%", left: "-12%", color: "blobA", dx: 40, dy: 30, duration: 9000 },
  { size: 360, top: "30%", left: "62%", color: "blobB", dx: -36, dy: 44, duration: 11000 },
  { size: 260, top: "68%", left: "18%", color: "blobC", dx: 30, dy: -26, duration: 13000 },
];

function Blob({ spec, color }: { spec: BlobSpec; color: string }) {
  const reduceMotion = useReducedMotion();
  const t = useSharedValue(0);

  useEffect(() => {
    if (reduceMotion) return;
    t.value = withRepeat(withTiming(1, { duration: spec.duration, easing: Easing.inOut(Easing.sin) }), -1, true);
    return () => cancelAnimation(t);
  }, [reduceMotion, spec.duration, t]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: t.value * spec.dx }, { translateY: t.value * spec.dy }, { scale: 1 + t.value * 0.06 }],
  }));

  return (
    <Animated.View
      style={[
        style,
        {
          position: "absolute",
          top: spec.top,
          left: spec.left,
          width: spec.size,
          height: spec.size,
          borderRadius: spec.size / 2,
          backgroundColor: color,
        },
      ]}
      className="web:blur-3xl"
    />
  );
}

// Web-only CSS (not part of React Native's style types).
const dotGrid = {
  backgroundImage: "radial-gradient(rgba(100,116,139,0.18) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
} as unknown as ViewStyle;

/** Soft, slowly drifting color fields behind hero content. Purely decorative. */
export function FloatingBlobs() {
  const { colors } = useAppTheme();
  return (
    <View aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {BLOBS.map((b, i) => (
        <Blob key={i} spec={b} color={colors[b.color]} />
      ))}
      {/* Dotted grid overlay (web only) for a subtle technical texture */}
      {Platform.OS === "web" ? <View className="absolute inset-0 opacity-60 dark:opacity-30" style={dotGrid} /> : null}
    </View>
  );
}
