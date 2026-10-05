import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import type { IconName } from "@/types";

interface IconProps {
  name: IconName;
  size?: number;
  color: string;
}

export function Icon({ name, size = 20, color }: IconProps) {
  return <MaterialCommunityIcons name={name} size={size} color={color} aria-hidden />;
}
