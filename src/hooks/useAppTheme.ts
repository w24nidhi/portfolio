import { useCallback } from "react";
import { useColorScheme } from "nativewind";

import { darkColors, lightColors, type ThemeColors } from "@/constants/theme";
import { storage } from "@/utils/storage";

export const THEME_STORAGE_KEY = "portfolio-theme";

export type ThemeMode = "light" | "dark";

interface AppTheme {
  mode: ThemeMode;
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
}

export function useAppTheme(): AppTheme {
  const { colorScheme, setColorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";

  const toggleTheme = useCallback(() => {
    const next: ThemeMode = isDark ? "light" : "dark";
    setColorScheme(next);
    storage.set(THEME_STORAGE_KEY, next);
  }, [isDark, setColorScheme]);

  return {
    mode: isDark ? "dark" : "light",
    isDark,
    colors: isDark ? darkColors : lightColors,
    toggleTheme,
  };
}
