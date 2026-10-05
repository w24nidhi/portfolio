import { site } from "@/config/site";
import type { Project } from "@/types";

const gh = (repo: string) => `${site.githubUrl}/${repo}`;

/**
 * ✏️  Add, remove or reorder projects here.
 *
 * - `featured: true` shows the project in the large "Featured Projects" section.
 * - Buttons only render when the matching URL is a non-empty string.
 * - `image` is optional. Add a screenshot with:
 *     image: require("../../assets/images/project-1.png"),
 *   Without it, a branded device mockup is generated from `palette` + `icon`.
 */
export const projects: Project[] = [
  {
    id: "caryanams-super-app",
    title: "Caryanams — Super App",
    category: "Automotive · React Native CLI · iOS & Android",
    description:
      "An automotive marketplace with real-time vehicle auctions, verified dealer listings and AI-assisted vehicle evaluation.",
    longDescription:
      "Buyers browse certified inventory, place live auction bids and chat with trusted dealers, while sellers get instant, data-driven valuations. Includes in-app payments, camera-based car inspection, maps and an Android home-screen widget.",
    technologies: ["React Native CLI", "Socket.IO", "Razorpay & PhonePe", "Firebase FCM", "Google Maps", "Vision Camera"],
    highlights: ["50K+ downloads on Google Play", "Live auctions over WebSockets", "In-app payments & chat"],
    githubUrl: "",
    liveUrl: "",
    appStoreUrl: "https://apps.apple.com/app/caryanams/id6475390653",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.caryanams.store",
    featured: true,
    palette: { from: "#DC2626", to: "#F97316" },
    icon: "car-multiple",
  },
  {
    id: "caryanams-auction",
    title: "CarYanams Auction",
    category: "Automotive · Expo · iOS & Android",
    description:
      "A dedicated auction app for dealers to follow live vehicle auctions and place competitive bids on the go.",
    longDescription:
      "A focused companion to the Caryanams Super App, built with Expo, that gives dealers a fast bidding experience with a clean Material-style UI.",
    technologies: ["React Native", "Expo", "React Navigation", "React Native Paper", "REST APIs"],
    highlights: ["Live auction bidding", "Built with Expo", "App Store & Play Store release"],
    githubUrl: gh("AuctionApp"),
    liveUrl: "",
    appStoreUrl: "https://apps.apple.com/app/caryanams-auction/id6502234999",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.caryanams.auction",
    featured: true,
    palette: { from: "#EA580C", to: "#FACC15" },
    icon: "gavel",
  },
  {
    id: "garageos",
    title: "GarageOS — Workshop Management",
    category: "Automotive services · Expo · iOS & Android",
    description:
      "A digital workshop platform for garages: appointment booking, job cards, technician tasks and automated invoicing.",
    longDescription:
      "GarageOS turns paper-based service workflows into a trackable digital operation, with real-time vehicle status for customers and a multi-role system for garage staff.",
    technologies: ["React Native", "Expo", "Axios", "Push Notifications", "React Hook Form"],
    highlights: ["Multi-role user system", "Digital job cards & PDF invoices", "Real-time vehicle status"],
    githubUrl: gh("GarageOS"),
    liveUrl: "",
    appStoreUrl: "https://apps.apple.com/app/hanarad-garageos/id6778373849",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.hanagarageos.app",
    featured: true,
    palette: { from: "#2563EB", to: "#06B6D4" },
    icon: "garage",
  },
  {
    id: "farmer",
    title: "HANARAD Farmer — Companion",
    category: "Agriculture · Expo · Android",
    description:
      "A farming companion with hyperlocal weather, GPS farm-boundary mapping and interactive field-marking tools.",
    longDescription:
      "Helps farmers visualise their land, track field activities and make data-driven decisions about planting, irrigation and resources — with maps, charts and voice guidance on the device.",
    technologies: ["React Native", "Expo", "React Native Maps", "Weather API", "Expo Location"],
    highlights: ["GPS boundary mapping", "Hyperlocal weather", "Play Store release"],
    githubUrl: gh("HANARAD-Farmer---Companion"),
    liveUrl: "",
    appStoreUrl: "",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.hanapaltform.farmerapp",
    featured: true,
    palette: { from: "#16A34A", to: "#84CC16" },
    icon: "sprout",
  },
  {
    id: "simbahan",
    title: "Simbahan — Parish App",
    category: "Community · Expo · Android",
    description:
      "A Catholic parish app for the Philippines with mass schedules, events, prayer guides and community announcements.",
    longDescription:
      "Keeps Filipino congregations connected with their parish — mass schedules, event announcements, prayer guides, live-stream access and a community bulletin board in one tailored app.",
    technologies: ["React Native", "Expo Router", "NativeWind", "Reanimated", "Expo Notifications"],
    highlights: ["Mass & event calendar", "Prayer guides", "Play Store release"],
    githubUrl: gh("Simbahan"),
    liveUrl: "",
    appStoreUrl: "",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.simbahan.app",
    featured: true,
    palette: { from: "#7C3AED", to: "#C026D3" },
    icon: "church",
  },
  {
    id: "dataanant",
    title: "DataAnant — Marketing Data Cloud",
    category: "B2B data · React Native CLI · Android",
    description:
      "A B2B marketing data app to search companies by email, phone, brand, domain or technology, with data enrichment and WhatsApp templates.",
    technologies: ["React Native CLI", "Firebase Auth", "Firestore", "Google Sign-In", "REST APIs"],
    githubUrl: "",
    liveUrl: "",
    appStoreUrl: "",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.dataanant",
    palette: { from: "#0284C7", to: "#22D3EE" },
    icon: "database-search",
  },
  {
    id: "factory-job-india",
    title: "FactoryJobIndia — Job Portal",
    category: "Jobs · React Native CLI",
    description:
      "A job portal for factory and industrial roles: recommended jobs, one-tap applications, resume upload and multi-language support.",
    technologies: ["React Native CLI", "Firebase Auth", "Google Sign-In", "Reanimated", "Moti"],
    githubUrl: "",
    liveUrl: "https://factoryjobindia.com",
    appStoreUrl: "",
    playStoreUrl: "",
    palette: { from: "#4F46E5", to: "#0EA5E9" },
    icon: "briefcase-search-outline",
  },
  {
    id: "hrms",
    title: "HRMS — Employee App",
    category: "HR · React Native CLI",
    description:
      "An employee self-service app with location-based attendance, leave requests, holidays, timesheets and a company directory.",
    technologies: ["React Native CLI", "Geolocation", "REST APIs", "PDF Viewer", "React Native Paper"],
    githubUrl: "",
    liveUrl: "",
    appStoreUrl: "",
    playStoreUrl: "",
    palette: { from: "#9333EA", to: "#EC4899" },
    icon: "account-group-outline",
  },
  {
    id: "whatsapp-chat",
    title: "WhatsApp Business Inbox",
    category: "Messaging · React Native CLI",
    description:
      "A team inbox for WhatsApp business chats: follow-up and archive filters, media and document sharing, voice notes and scheduled messages.",
    technologies: ["React Native CLI", "REST APIs", "Audio Recording", "Media Sharing", "Lottie"],
    githubUrl: "",
    liveUrl: "",
    appStoreUrl: "",
    playStoreUrl: "",
    palette: { from: "#16A34A", to: "#10B981" },
    icon: "whatsapp",
  },
  {
    id: "africasa",
    title: "AfriCasa — Listings App",
    category: "Marketplace · React Native CLI",
    description:
      "A category-based listings app with sub-categories, detail pages, partner sign-up, Firebase authentication and location-aware content.",
    technologies: ["React Native CLI", "Firebase Auth", "FCM", "Geolocation", "NativeBase"],
    githubUrl: "",
    liveUrl: "",
    appStoreUrl: "",
    playStoreUrl: "",
    palette: { from: "#B45309", to: "#F59E0B" },
    icon: "home-city-outline",
  },
  {
    id: "commune",
    title: "Commune — Dynamic Data App",
    category: "Business · React Native CLI",
    description:
      "A server-driven app whose dashboard, menus, forms and lists are rendered dynamically from an API, with OTP login and QR scanning.",
    technologies: ["React Native CLI", "REST APIs", "Vision Camera", "Skia", "React Navigation"],
    githubUrl: gh("communeData"),
    liveUrl: "",
    appStoreUrl: "",
    playStoreUrl: "",
    palette: { from: "#0EA5E9", to: "#6366F1" },
    icon: "form-select",
  },
  {
    id: "account-onboarding",
    title: "Account Onboarding App",
    category: "Fintech · React Native CLI",
    description:
      "A user and admin app for online account forms, with biometric login and an admin dashboard to call, WhatsApp or email applicants.",
    technologies: ["React Native CLI", "Biometrics", "React Native Paper", "Lottie", "Charts"],
    githubUrl: gh("RN_Projects"),
    liveUrl: "",
    appStoreUrl: "",
    playStoreUrl: "",
    palette: { from: "#0F766E", to: "#14B8A6" },
    icon: "bank-outline",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);
