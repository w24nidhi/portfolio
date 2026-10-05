import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View } from "react-native";

import { site } from "@/config/site";
import { brandGradient } from "@/constants/theme";

import { AppText } from "./Typography";

export function Logo({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      role="link"
      accessibilityLabel={`${site.name} — back to top`}
      className="flex-row items-center gap-2.5 web:cursor-pointer web:outline-none"
    >
      <LinearGradient
        colors={brandGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ width: 36, height: 36, borderRadius: 11, alignItems: "center", justifyContent: "center" }}
      >
        <AppText className="text-lg font-extrabold text-white">{site.name.charAt(0)}</AppText>
      </LinearGradient>
      <View className="flex-row items-end">
        <AppText className="text-xl font-extrabold tracking-tight text-ink dark:text-white">{site.name}</AppText>
        <AppText className="text-xl font-extrabold text-aqua-500">.</AppText>
      </View>
    </Pressable>
  );
}
