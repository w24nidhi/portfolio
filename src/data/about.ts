import type { AboutHighlight, Stat } from "@/types";

export const aboutIntro = [
  "I'm a React Native developer with 3+ years of experience turning ideas into polished, production-ready mobile apps. I care about clean architecture, smooth interactions and the small details that make an app feel native.",
  "From the first screen to the store release, I work across the whole lifecycle — UI implementation, API integration, state management, Firebase services, testing and deployment.",
];

export const aboutHighlights: AboutHighlight[] = [
  {
    title: "Mobile App Development",
    description: "Production apps with React Native & Expo, built for real users.",
    icon: "cellphone",
  },
  {
    title: "Cross-platform",
    description: "One codebase shipping to iOS, Android and the web.",
    icon: "monitor-cellphone",
  },
  {
    title: "API Integration",
    description: "REST APIs, Axios, caching and resilient error handling.",
    icon: "api",
  },
  {
    title: "Databases",
    description: "MongoDB, SQLite and Firebase Realtime DB for app data.",
    icon: "database-outline",
  },
  {
    title: "Firebase",
    description: "Auth, Firestore, Cloud Messaging, Crashlytics and Analytics.",
    icon: "firebase",
  },
  {
    title: "App Deployment",
    description: "EAS builds, OTA updates, Play Store & App Store releases.",
    icon: "rocket-launch-outline",
  },
  {
    title: "UI/UX Implementation",
    description: "Pixel-perfect screens from Figma with fluid animations.",
    icon: "palette-outline",
  },
  {
    title: "Performance",
    description: "Profiling, list virtualisation and render optimisation.",
    icon: "speedometer",
  },
];

export const stats: Stat[] = [
  { value: "3+", label: "Years experience" },
  { value: "15+", label: "Apps delivered" },
  { value: "6", label: "Store releases" },
  { value: "100%", label: "Cross-platform" },
];
