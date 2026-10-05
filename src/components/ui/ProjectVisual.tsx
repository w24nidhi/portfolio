import { LinearGradient } from "expo-linear-gradient";
import { Image, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, type SharedValue } from "react-native-reanimated";

import type { Project } from "@/types";

import { PhoneMockup } from "./PhoneMockup";

interface ProjectVisualProps {
  project: Project;
  hover: SharedValue<number>;
  /** Height of the visual area in px. */
  height: number;
  phoneWidth?: number;
}

/** Project screenshot (if provided) or a generated device mockup, with hover zoom. */
export function ProjectVisual({ project, hover, height, phoneWidth = 170 }: ProjectVisualProps) {
  const zoom = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(hover.value, [0, 1], [1, 1.05]) }],
  }));
  const rise = useAnimatedStyle(() => ({
    transform: [
      { translateY: interpolate(hover.value, [0, 1], [height * 0.12, height * 0.06]) },
      { rotate: `${interpolate(hover.value, [0, 1], [-4, -1])}deg` },
    ],
  }));

  if (project.image) {
    return (
      <View style={{ height }} className="w-full overflow-hidden">
        <Animated.View style={[{ width: "100%", height: "100%" }, zoom]}>
          <Image
            source={project.image}
            accessibilityLabel={project.imageAlt ?? `${project.title} screenshot`}
            alt={project.imageAlt ?? `${project.title} screenshot`}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </Animated.View>
      </View>
    );
  }

  return (
    <View
      style={{ height }}
      className="w-full items-center overflow-hidden"
      role="img"
      aria-label={project.imageAlt ?? `${project.title} app preview`}
    >
      <Animated.View style={[{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0 }, zoom]}>
        <LinearGradient
          colors={[`${project.palette.from}26`, `${project.palette.to}33`]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
      <View
        className="pointer-events-none absolute rounded-full"
        style={{ width: height * 1.1, height: height * 1.1, top: height * 0.2, backgroundColor: `${project.palette.from}1A` }}
      />
      <Animated.View style={rise}>
        <PhoneMockup palette={project.palette} icon={project.icon} title={project.title.split(" — ")[0]} width={phoneWidth} />
      </Animated.View>
    </View>
  );
}
