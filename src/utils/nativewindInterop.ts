import { cssInterop } from "nativewind";
import Animated from "react-native-reanimated";

/**
 * Lets Reanimated components accept NativeWind `className` props.
 * Imported once from the root layout, before any component renders.
 */
cssInterop(Animated.View, { className: "style" });
cssInterop(Animated.Text, { className: "style" });
cssInterop(Animated.ScrollView, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});
