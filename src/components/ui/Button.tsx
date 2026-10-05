import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { Pressable, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

import { brandGradient } from "@/constants/theme";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useHover } from "@/hooks/useHover";
import type { IconName } from "@/types";
import { openUrl } from "@/utils/links";

import { Icon } from "./Icon";
import { AppText } from "./Typography";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  label: string;
  /** Opens this URL when pressed. */
  href?: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  accessibilityHint?: string;
  className?: string;
  fullWidth?: boolean;
}

const SIZE: Record<Size, { box: string; text: string; icon: number }> = {
  sm: { box: "h-9 px-4", text: "text-sm", icon: 16 },
  md: { box: "h-11 px-5", text: "text-sm", icon: 18 },
  lg: { box: "h-[52px] px-7", text: "text-base", icon: 20 },
};

const VARIANT: Record<Variant, { box: string; text: string }> = {
  primary: { box: "", text: "text-white" },
  dark: { box: "bg-ink dark:bg-white", text: "text-white dark:text-ink" },
  secondary: {
    box: "border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900",
    text: "text-ink dark:text-slate-100",
  },
  ghost: { box: "bg-transparent", text: "text-ink-soft dark:text-slate-300" },
};

export function Button({
  label,
  href,
  onPress,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  disabled,
  accessibilityHint,
  className = "",
  fullWidth,
}: ButtonProps) {
  const { colors, isDark } = useAppTheme();
  const { progress, handlers } = useHover();
  const pressed = useSharedValue(0);
  const s = SIZE[size];
  const v = VARIANT[variant];

  const iconColor =
    variant === "primary"
      ? "#FFFFFF"
      : variant === "dark"
        ? isDark
          ? "#0B1220"
          : "#FFFFFF"
        : variant === "ghost"
          ? colors.textMuted
          : colors.text;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [0, -2]) },
      { scale: 1 - pressed.value * 0.04 },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: variant === "primary" ? 0.25 + progress.value * 0.35 : 0,
  }));

  const handlePress = () => {
    if (href) void openUrl(href);
    onPress?.();
  };

  const iconEl = icon ? <Icon name={icon} size={s.icon} color={iconColor} /> : null;

  return (
    <Animated.View style={animatedStyle} className={`${fullWidth ? "w-full" : ""} ${className}`}>
      {variant === "primary" ? (
        <Animated.View
          style={[glowStyle, { boxShadow: "0px 10px 30px rgba(79, 70, 229, 0.55)" }]}
          className="pointer-events-none absolute inset-0 rounded-full"
        />
      ) : null}
      <Pressable
        role={href ? "link" : "button"}
        accessibilityLabel={label}
        accessibilityHint={accessibilityHint}
        disabled={disabled}
        onPress={handlePress}
        onPressIn={() => {
          pressed.value = withSpring(1, { duration: 150 });
        }}
        onPressOut={() => {
          pressed.value = withSpring(0, { duration: 250 });
        }}
        {...handlers}
        className={`flex-row items-center justify-center gap-2 overflow-hidden rounded-full ${s.box} ${v.box} ${
          disabled ? "opacity-50" : ""
        } web:cursor-pointer web:outline-none`}
      >
        {variant === "primary" ? (
          <LinearGradient
            colors={brandGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }}
          />
        ) : null}
        {iconPosition === "left" ? iconEl : null}
        <AppText className={`font-semibold ${s.text} ${v.text}`} numberOfLines={1}>
          {label}
        </AppText>
        {iconPosition === "right" ? iconEl : null}
      </Pressable>
    </Animated.View>
  );
}

interface IconButtonProps {
  icon: IconName;
  label: string;
  href?: string;
  onPress?: () => void;
  size?: number;
}

/** Circular icon-only button (social links, theme toggle, menu). */
export function IconButton({ icon, label, href, onPress, size = 20 }: IconButtonProps) {
  const { colors } = useAppTheme();
  const { progress, handlers } = useHover();

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(progress.value, [0, 1], [0, -2]) }],
  }));

  const ringStyle = useAnimatedStyle(() => ({ opacity: progress.value }));

  return (
    <Animated.View style={style}>
      <Pressable
        role={href ? "link" : "button"}
        accessibilityLabel={label}
        onPress={() => {
          if (href) void openUrl(href);
          onPress?.();
        }}
        {...handlers}
        className="h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 dark:border-slate-700 dark:bg-slate-900/80 web:cursor-pointer web:outline-none"
      >
        <Animated.View
          style={ringStyle}
          className="pointer-events-none absolute inset-0 rounded-full border-2 border-brand-400"
        />
        <Icon name={icon} size={size} color={colors.text} />
      </Pressable>
    </Animated.View>
  );
}

/** Small horizontal group helper for buttons that wraps on narrow screens. */
export function ButtonRow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <View className={`flex-row flex-wrap items-center gap-3 ${className}`}>{children}</View>;
}
