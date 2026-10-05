import { View } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";
import type { IconName } from "@/types";

import { Icon } from "./Icon";
import { AppText } from "./Typography";

interface BadgeProps {
  label: string;
  icon?: IconName;
  tone?: "neutral" | "brand";
}

export function Badge({ label, icon, tone = "neutral" }: BadgeProps) {
  const { colors } = useAppTheme();
  const box =
    tone === "brand"
      ? "border-brand-200 bg-brand-50 dark:border-brand-800 dark:bg-brand-900/30"
      : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/60";
  const text = tone === "brand" ? "text-brand-700 dark:text-brand-300" : "text-ink-soft dark:text-slate-300";
  return (
    <View className={`flex-row items-center gap-1.5 rounded-full border px-3 py-1 ${box}`}>
      {icon ? <Icon name={icon} size={14} color={tone === "brand" ? colors.accent : colors.textMuted} /> : null}
      <AppText className={`text-xs font-medium ${text}`}>{label}</AppText>
    </View>
  );
}
