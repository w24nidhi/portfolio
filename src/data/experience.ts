import type { ExperienceItem } from "@/types";

/** ✏️  Most recent first. Add more roles to extend the timeline. */
export const experience: ExperienceItem[] = [
  {
    role: "Mobile App Developer",
    company: "Work24 (Full-time)",
    period: "Jun 2022 — Present",
    location: "On-site",
    summary:
      "Building cross-platform iOS and Android apps for clients end-to-end, from client consultation and UI/UX design to store release.",
    responsibilities: [
      "Developed cross-platform apps with React Native (CLI & Expo) across automotive, e-commerce, agriculture and community domains",
      "Integrated REST APIs and Firebase services — Realtime DB, Cloud Storage, Cloud Functions and FCM",
      "Led a four-person team on GoColors from initial design through production launch",
      "Published applications to the Google Play Store and the App Store",
    ],
    technologies: ["React Native", "Expo", "REST APIs", "Firebase", "MongoDB"],
  },
];

export const experienceSummary = {
  title: "React Native Developer",
  years: "3+ Years Experience",
};
