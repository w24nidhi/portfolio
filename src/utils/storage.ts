import { Platform } from "react-native";

/**
 * Tiny, dependency-free preference storage.
 * Persists on web (localStorage); no-op on native to avoid an extra dependency.
 */
export const storage = {
  get(key: string): string | null {
    if (Platform.OS !== "web" || typeof window === "undefined") return null;
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    if (Platform.OS !== "web" || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Storage can be unavailable (private mode, blocked cookies) — ignore.
    }
  },
};
