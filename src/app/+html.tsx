import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

import { site } from "@/config/site";
import { THEME_STORAGE_KEY } from "@/hooks/useAppTheme";

const title = `${site.name} | ${site.role}`;
const ogImage = `${site.siteUrl}/og-image.png`;

// Applies the saved theme before first paint to avoid a light→dark flash.
const themeBootstrap = `try{if(localStorage.getItem('${THEME_STORAGE_KEY}')==='dark'){document.documentElement.classList.add('dark')}}catch(e){}`;

/** Web-only root HTML document used for static rendering (SEO tags live here). */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover" />

        <title>{title}</title>
        <meta name="description" content={site.description} />
        <meta name="author" content={site.fullName} />
        <meta
          name="keywords"
          content="React Native Developer, Expo, Mobile App Developer, iOS, Android, Firebase, Portfolio"
        />
        <meta name="theme-color" content="#4F46E5" />
        <link rel="canonical" href={site.siteUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={title} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={site.description} />
        <meta property="og:url" content={site.siteUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={`${site.name} — ${site.role}`} />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={site.description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: site.fullName,
              jobTitle: site.role,
              url: site.siteUrl,
              email: `mailto:${site.email}`,
              sameAs: [site.githubUrl, site.linkedinUrl],
              knowsAbout: site.primaryTechnologies,
            }),
          }}
        />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        />

        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />

        {/* Disables body scrolling so ScrollView behaves like a native screen. */}
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const globalStyles = `
html, body { background-color: #FAFAF9; overflow-x: hidden; }
html.dark, html.dark body { background-color: #090D18; }
::selection { background: rgba(79, 70, 229, 0.22); }
:focus-visible { outline: 2px solid #6366F1; outline-offset: 3px; border-radius: 9999px; }
input:focus-visible, textarea:focus-visible { outline: none; }
@media (prefers-reduced-motion: reduce) { * { scroll-behavior: auto !important; } }
`;
