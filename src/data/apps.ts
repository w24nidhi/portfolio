import type { PublishedApp } from "@/types";

/**
 * ✏️  Published apps. Replace the placeholder store links with your real listings.
 * Add `iconImage: require("../../assets/images/app-icon.png")` to use a real app icon.
 */
export const publishedApps: PublishedApp[] = [
  {
    name: "Caryanams — Super App",
    category: "Auto & Vehicles",
    description: "Buy, sell and auction cars with verified dealers and instant valuations.",
    iconImage: require("../../assets/images/icon-caryanams-superapp.png"),
    icon: "car-multiple",
    palette: { from: "#DC2626", to: "#F97316" },
    downloads: "50K+",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.caryanams.store",
    appStoreUrl: "https://apps.apple.com/app/caryanams/id6475390653",
  },
  {
    name: "CarYanams (Auction)",
    category: "Auto & Vehicles",
    description: "Live car auctions, verified dealers and instant vehicle valuations.",
    iconImage: require("../../assets/images/icon-caryanams.png"),
    icon: "car-side",
    palette: { from: "#DC2626", to: "#F97316" },
    downloads: "1K+",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.caryanams.auction",
    appStoreUrl: "https://apps.apple.com/app/caryanams-auction/id6502234999",
  },
  {
    name: "GarageOS",
    category: "Business",
    description: "Bookings, job cards, technician tasks and invoicing for garages.",
    iconImage: require("../../assets/images/icon-garageos.png"),
    icon: "garage",
    palette: { from: "#2563EB", to: "#06B6D4" },
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.hanagarageos.app",
    appStoreUrl: "https://apps.apple.com/app/hanarad-garageos/id6778373849",
  },
  {
    name: "HANARAD Farmer",
    category: "Agriculture",
    description: "Weather, farm-boundary mapping and field tracking for farmers.",
    iconImage: require("../../assets/images/icon-farmer.png"),
    icon: "sprout",
    palette: { from: "#16A34A", to: "#84CC16" },
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.hanapaltform.farmerapp",
    appStoreUrl: "",
  },
  {
    name: "Simbahan",
    category: "Lifestyle",
    description: "Mass schedules, events and prayer guides for your parish.",
    iconImage: require("../../assets/images/icon-simbahan.png"),
    icon: "church",
    palette: { from: "#7C3AED", to: "#C026D3" },
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.simbahan.app",
    appStoreUrl: "",
  },
  {
    name: "DataAnant",
    category: "Business",
    description: "Search and enrich B2B marketing data by email, phone, brand or domain.",
    iconImage: require("../../assets/images/icon-dataanant.png"),
    icon: "database-search",
    palette: { from: "#0284C7", to: "#22D3EE" },
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.dataanant",
    appStoreUrl: "",
  },
];
