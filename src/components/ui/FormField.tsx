import { useState } from "react";
import { TextInput, View, type TextInputProps } from "react-native";

import { useAppTheme } from "@/hooks/useAppTheme";

import { Icon } from "./Icon";
import { AppText } from "./Typography";

interface FormFieldProps extends Omit<TextInputProps, "style"> {
  label: string;
  error?: string;
  nativeID: string;
}

export function FormField({ label, error, nativeID, multiline, ...props }: FormFieldProps) {
  const { colors } = useAppTheme();
  const [focused, setFocused] = useState(false);

  const border = error
    ? "border-rose-400 dark:border-rose-500"
    : focused
      ? "border-brand-500 dark:border-brand-400"
      : "border-slate-200 dark:border-slate-700";

  return (
    <View className="w-full">
      <AppText nativeID={`${nativeID}-label`} className="mb-2 text-sm font-semibold text-ink dark:text-slate-200">
        {label}
      </AppText>
      <View
        className={`rounded-2xl border-2 bg-slate-50 dark:bg-slate-900 ${border}`}
        style={focused && !error ? { boxShadow: "0px 0px 0px 4px rgba(99,102,241,0.15)" } : undefined}
      >
        <TextInput
          nativeID={nativeID}
          aria-labelledby={`${nativeID}-label`}
          aria-invalid={!!error}
          placeholderTextColor={colors.textMuted + "AA"}
          multiline={multiline}
          textAlignVertical={multiline ? "top" : "center"}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`font-sans px-4 text-base text-ink dark:text-white web:outline-none ${multiline ? "min-h-[140px] py-3.5" : "h-12"}`}
          {...props}
        />
      </View>
      {error ? (
        <View className="mt-2 flex-row items-center gap-1.5" role="alert">
          <Icon name="alert-circle-outline" size={14} color="#F43F5E" />
          <AppText className="text-sm text-rose-600 dark:text-rose-400">{error}</AppText>
        </View>
      ) : null}
    </View>
  );
}
