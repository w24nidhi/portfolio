import type { ComponentProps } from "react";
import type { ImageSourcePropType } from "react-native";
import type MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];

export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "experience"
  | "projects"
  | "all-projects"
  | "github"
  | "apps"
  | "contact";

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: IconName;
}

export interface SiteConfig {
  name: string;
  fullName: string;
  role: string;
  experience: string;
  location: string;
  availability: string;
  tagline: string;
  description: string;
  email: string;
  /** Public URL of the deployed site, used for SEO tags and absolute links on native. */
  siteUrl: string;
  githubUsername: string;
  githubUrl: string;
  linkedinUrl: string;
  /** Path inside /public (e.g. "/resume.pdf") or a full URL. Leave empty to hide the button. */
  resumeUrl: string;
  primaryTechnologies: string[];
}

/** Project accent colors used when no screenshot is provided (generated mockup). */
export interface ProjectPalette {
  from: string;
  to: string;
}

export interface Project {
  id: string;
  title: string;
  /** One-line category shown above the title, e.g. "Fintech · iOS & Android". */
  category: string;
  description: string;
  /** Optional longer description shown on featured cards. */
  longDescription?: string;
  /**
   * Screenshot. Use `require("../../assets/images/my-shot.png")` (works on web + native)
   * or `{ uri: "https://..." }`. When omitted, a styled device mockup is rendered instead.
   */
  image?: ImageSourcePropType;
  imageAlt?: string;
  technologies: string[];
  highlights?: string[];
  githubUrl?: string;
  liveUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  featured?: boolean;
  palette: ProjectPalette;
  icon: IconName;
}

export interface Skill {
  name: string;
  icon: IconName;
}

export interface SkillCategory {
  title: string;
  description: string;
  icon: IconName;
  skills: Skill[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}

export interface AboutHighlight {
  title: string;
  description: string;
  icon: IconName;
}

export interface Stat {
  value: string;
  label: string;
}

export interface GithubRepo {
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  forks: number;
}

export interface PublishedApp {
  name: string;
  description: string;
  category: string;
  /** App icon image. When omitted, a gradient tile with `icon` is shown. */
  iconImage?: ImageSourcePropType;
  icon: IconName;
  palette: ProjectPalette;
  rating?: string;
  downloads?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
}
