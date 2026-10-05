import { Text, type TextProps } from "react-native";

interface AppTextProps extends TextProps {
  className?: string;
}

/** Base text: applies the brand font family. Colors/sizes come from `className`. */
export function AppText({ className = "", ...props }: AppTextProps) {
  return <Text className={`font-sans ${className}`} {...props} />;
}

interface HeadingProps extends AppTextProps {
  /** Semantic heading level — rendered as <h1>…<h4> on web. */
  level: 1 | 2 | 3 | 4;
}

export function Heading({ level, className = "", ...props }: HeadingProps) {
  return <AppText role="heading" aria-level={level} className={className} {...props} />;
}
