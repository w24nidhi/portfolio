import { useEffect, useState } from "react";
import { Dimensions, Platform } from "react-native";

/** Tailwind-equivalent breakpoints (px). */
export const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280 } as const;

const readWidth = () => Dimensions.get("window").width;

/**
 * Current window width that is safe for static rendering:
 * on web the first render matches the server HTML (mobile-first),
 * then updates after hydration. Prefer responsive classNames where possible —
 * use this only for values classNames can't express (e.g. numeric sizes).
 */
export function useWindowWidth(): number {
  const [width, setWidth] = useState(() => (Platform.OS === "web" ? 0 : readWidth()));

  useEffect(() => {
    setWidth(readWidth());
    const sub = Dimensions.addEventListener("change", ({ window }) => setWidth(window.width));
    return () => sub.remove();
  }, []);

  return width;
}
