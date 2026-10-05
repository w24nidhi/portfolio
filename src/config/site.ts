import type { SiteConfig, SocialLink } from "@/types";

/**
 * ✏️  Personal information lives here.
 * Update these values and every section of the site updates automatically.
 */
export const site: SiteConfig = {
  name: "Nidhi",
  fullName: "Nidhi Chovatiya",
  role: "React Native Developer",
  experience: "3+ Years",
  location: "India · Open to remote",
  availability: "Available for new projects",
  tagline:
    "Building modern, scalable and high-performance mobile applications with React Native and Expo.",
  description:
    "Portfolio of Nidhi Chovatiya, a React Native Developer specializing in React Native, Expo, Firebase and cross-platform mobile application development.",
  email: "nidhichovatiya4@gmail.com",
  siteUrl: "https://portfolio-gules-one-67.vercel.app",
  githubUsername: "nidhi546",
  githubUrl: "https://github.com/nidhi546",
  linkedinUrl: "https://www.linkedin.com/in/nidhi-chovatiya-08603538a",
  resumeUrl: "/resume.pdf",
  primaryTechnologies: [
    "React Native",
    "Expo",
    "React",
    "JavaScript",
    "REST API",
    "Firebase",
  ],
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", url: site.githubUrl, icon: "github" },
  { label: "LinkedIn", url: site.linkedinUrl, icon: "linkedin" },
  { label: "Email", url: `mailto:${site.email}`, icon: "email-outline" },
];

/**
 * Optional: set EXPO_PUBLIC_CONTACT_ENDPOINT (e.g. a Formspree / Getform / your own API URL)
 * to deliver contact-form messages. When empty, the form opens the visitor's mail app instead.
 */
export const contactEndpoint = process.env.EXPO_PUBLIC_CONTACT_ENDPOINT ?? "";

/** Fetch public repositories from the GitHub API. Falls back to `src/data/github.ts` on failure. */
export const enableGithubApi = true;
