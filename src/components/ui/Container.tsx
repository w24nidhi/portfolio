import type { ReactNode } from "react";
import { View } from "react-native";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <View className={`w-full max-w-6xl self-center px-5 sm:px-8 ${className}`}>{children}</View>;
}
