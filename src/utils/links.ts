import { Linking, Platform } from "react-native";

import { site } from "@/config/site";

/** True when a link has been configured (non-empty string). */
export const hasUrl = (url?: string): url is string => typeof url === "string" && url.trim().length > 0;

/** Resolves site-relative paths ("/resume.pdf") to absolute URLs on native. */
export function resolveUrl(url: string): string {
  if (url.startsWith("/") && Platform.OS !== "web") {
    return `${site.siteUrl.replace(/\/$/, "")}${url}`;
  }
  return url;
}

/** Opens a URL: new tab on web, system handler on native. */
export async function openUrl(url: string): Promise<void> {
  const target = resolveUrl(url);
  if (Platform.OS === "web" && typeof window !== "undefined") {
    if (target.startsWith("mailto:")) {
      window.location.href = target;
    } else {
      window.open(target, "_blank", "noopener,noreferrer");
    }
    return;
  }
  try {
    await Linking.openURL(target);
  } catch {
    // Nothing can handle this URL on the device — fail silently.
  }
}
