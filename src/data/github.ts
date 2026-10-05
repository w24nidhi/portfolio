import { site } from "@/config/site";
import type { GithubRepo } from "@/types";

/**
 * Shown when the GitHub API is disabled, rate-limited or unavailable,
 * or when the username has no public repositories yet.
 */
export const fallbackRepos: GithubRepo[] = [
  {
    name: "react-native-ui-kit",
    description: "Reusable, accessible and themeable React Native components.",
    url: `${site.githubUrl}/react-native-ui-kit`,
    language: "JavaScript",
    stars: 48,
    forks: 9,
  },
  {
    name: "expo-firebase-starter",
    description: "Expo Router starter with Firebase Auth, Firestore and protected routes.",
    url: `${site.githubUrl}/expo-firebase-starter`,
    language: "JavaScript",
    stars: 36,
    forks: 12,
  },
  {
    name: "reanimated-recipes",
    description: "A collection of smooth, production-ready animation patterns built with Reanimated.",
    url: `${site.githubUrl}/reanimated-recipes`,
    language: "JavaScript",
    stars: 30,
    forks: 6,
  },
  {
    name: "rn-performance-checklist",
    description: "A practical checklist for profiling and optimising React Native apps.",
    url: `${site.githubUrl}/rn-performance-checklist`,
    language: "Markdown",
    stars: 17,
    forks: 3,
  },
  {
    name: "portfolio",
    description: "This website — React Native + Expo Web + NativeWind, deployed on Vercel.",
    url: `${site.githubUrl}/portfolio`,
    language: "JavaScript",
    stars: 12,
    forks: 2,
  },
];
