import { Link, Stack } from "expo-router";
import { View } from "react-native";

import { AppText, Heading } from "@/components/ui/Typography";

export default function NotFound() {
  return (
    <>
      <Stack.Screen options={{ title: "Page not found" }} />
      <View className="flex-1 items-center justify-center bg-canvas px-6 dark:bg-canvas-dark">
        <AppText className="text-7xl font-extrabold text-brand-600">404</AppText>
        <Heading level={1} className="mt-4 text-center text-2xl font-bold text-ink dark:text-white">
          This page doesn&apos;t exist.
        </Heading>
        <Link href="/" className="mt-6 rounded-full bg-ink px-6 py-3 dark:bg-white">
          <AppText className="font-semibold text-white dark:text-ink">Back to home</AppText>
        </Link>
      </View>
    </>
  );
}
