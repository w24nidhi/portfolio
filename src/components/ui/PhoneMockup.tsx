import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

import type { IconName, ProjectPalette } from "@/types";

import { Icon } from "./Icon";
import { AppText } from "./Typography";

interface PhoneMockupProps {
  palette: ProjectPalette;
  icon: IconName;
  title: string;
  subtitle?: string;
  /** Phone width in px; height follows a 19.5:9 ratio. */
  width?: number;
}

const BAR_WIDTHS = [0.62, 0.86, 0.48, 0.74, 0.92, 0.56, 0.8];

/**
 * A stylised phone showing a fake app screen, built only from Views
 * (no images to download, crisp at every resolution, themable per project).
 */
export function PhoneMockup({ palette, icon, title, subtitle = "Dashboard", width = 240 }: PhoneMockupProps) {
  const height = Math.round(width * 2.05);
  const radius = width * 0.16;
  const pad = width * 0.06;

  return (
    <View
      style={{ width, height, borderRadius: radius, padding: width * 0.035, boxShadow: "0px 30px 60px rgba(15,23,42,0.28)" }}
      className="bg-slate-900 dark:bg-slate-800"
      aria-hidden
    >
      <View style={{ flex: 1, borderRadius: radius * 0.82, overflow: "hidden" }} className="bg-white dark:bg-slate-950">
        {/* Header */}
        <LinearGradient
          colors={[palette.from, palette.to]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ paddingHorizontal: pad, paddingTop: pad * 1.6, paddingBottom: pad * 1.4 }}
        >
          {/* Dynamic island */}
          <View
            style={{ width: width * 0.3, height: width * 0.075, borderRadius: 999, alignSelf: "center", marginBottom: pad }}
            className="bg-slate-900"
          />
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-2">
              <AppText style={{ fontSize: width * 0.045 }} className="font-medium text-white/80" numberOfLines={1}>
                {subtitle}
              </AppText>
              <AppText style={{ fontSize: width * 0.072 }} className="font-extrabold text-white" numberOfLines={1}>
                {title}
              </AppText>
            </View>
            <View
              style={{ width: width * 0.15, height: width * 0.15, borderRadius: width * 0.05 }}
              className="items-center justify-center bg-white/20"
            >
              <Icon name={icon} size={width * 0.085} color="#FFFFFF" />
            </View>
          </View>
        </LinearGradient>

        {/* Body */}
        <View style={{ padding: pad, gap: pad * 0.8 }}>
          {/* Stat cards */}
          <View className="flex-row" style={{ gap: pad * 0.6 }}>
            {[0, 1].map((i) => (
              <View
                key={i}
                style={{ flex: 1, borderRadius: width * 0.05, padding: pad * 0.7 }}
                className="bg-slate-50 dark:bg-slate-900"
              >
                <View style={{ height: width * 0.025, width: "50%", borderRadius: 99 }} className="bg-slate-200 dark:bg-slate-700" />
                <View
                  style={{ height: width * 0.05, width: "80%", borderRadius: 99, marginTop: pad * 0.5, backgroundColor: i === 0 ? palette.from : palette.to }}
                />
              </View>
            ))}
          </View>

          {/* Bar chart */}
          <View
            style={{ borderRadius: width * 0.05, padding: pad * 0.7, height: width * 0.42 }}
            className="flex-row items-end justify-between bg-slate-50 dark:bg-slate-900"
          >
            {BAR_WIDTHS.map((h, i) => (
              <LinearGradient
                key={i}
                colors={[palette.to, palette.from]}
                style={{ width: width * 0.065, height: `${h * 100}%`, borderRadius: 99 }}
              />
            ))}
          </View>

          {/* List rows */}
          {[0, 1, 2].map((i) => (
            <View key={i} className="flex-row items-center" style={{ gap: pad * 0.6 }}>
              <View
                style={{ width: width * 0.11, height: width * 0.11, borderRadius: width * 0.035, backgroundColor: `${palette.from}22` }}
              />
              <View style={{ flex: 1, gap: 5 }}>
                <View style={{ height: width * 0.028, width: `${BAR_WIDTHS[i + 2] * 100}%`, borderRadius: 99 }} className="bg-slate-200 dark:bg-slate-700" />
                <View style={{ height: width * 0.022, width: "40%", borderRadius: 99 }} className="bg-slate-100 dark:bg-slate-800" />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
