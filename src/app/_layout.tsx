import "../../global.css";
import "@/utils/nativewindInterop";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";
import { Platform } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";

export default function RootLayout() {
  const { setColorScheme } = useColorScheme();
  const { isDark, colors } = useAppTheme();

  useEffect(() => {
    // Web restores the saved theme before paint via the inline script in +html.tsx.
    // Native always starts in the light theme.
    if (Platform.OS !== "web") setColorScheme("light");
  }, [setColorScheme]);

  return (
    <>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </>
  );
}
