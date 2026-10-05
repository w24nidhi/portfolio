import type { SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  {
    title: "Mobile Development",
    description: "Cross-platform apps for iOS, Android and the web.",
    icon: "cellphone-link",
    skills: [
      { name: "React Native", icon: "react" },
      { name: "Expo", icon: "rocket-launch-outline" },
      { name: "React", icon: "atom" },
      { name: "Expo Router", icon: "navigation-variant" },
    ],
  },
  {
    title: "Programming",
    description: "Clean, maintainable and well-tested code.",
    icon: "code-braces",
    skills: [
      { name: "JavaScript", icon: "language-javascript" },
    ],
  },
  {
    title: "Databases",
    description: "Storing and syncing app data, online and offline.",
    icon: "database-outline",
    skills: [
      { name: "MongoDB", icon: "leaf" },
      { name: "SQLite", icon: "database" },
      { name: "Realtime DB", icon: "database-sync-outline" },
    ],
  },
  {
    title: "Backend & APIs",
    description: "Connecting apps to real data, securely.",
    icon: "api",
    skills: [
      { name: "REST APIs", icon: "api" },
      { name: "Firebase", icon: "firebase" },
      { name: "Axios", icon: "xml" },
    ],
  },
  {
    title: "Tools",
    description: "The everyday toolkit for shipping quality apps.",
    icon: "tools",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "VS Code", icon: "microsoft-visual-studio-code" },
      { name: "Android Studio", icon: "android-studio" },
      { name: "Xcode", icon: "apple" },
    ],
  },
];
