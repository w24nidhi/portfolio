import { useCallback, useMemo } from "react";
import { useSharedValue, withTiming, type SharedValue } from "react-native-reanimated";

import { motion } from "@/constants/theme";

interface HoverHandlers {
  onHoverIn: () => void;
  onHoverOut: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

/**
 * Animated hover progress (0 → 1) for web pointers and keyboard focus.
 * On touch devices these events simply never fire, so cards stay static.
 */
export function useHover(): { progress: SharedValue<number>; handlers: HoverHandlers } {
  const progress = useSharedValue(0);

  const set = useCallback(
    (to: number) => {
      progress.value = withTiming(to, { duration: motion.hover });
    },
    [progress],
  );

  const handlers = useMemo<HoverHandlers>(
    () => ({
      onHoverIn: () => set(1),
      onHoverOut: () => set(0),
      onFocus: () => set(1),
      onBlur: () => set(0),
    }),
    [set],
  );

  return { progress, handlers };
}
