# Nidhi — React Native Developer Portfolio

A premium, animated, responsive developer portfolio built **entirely with React Native components** and deployed to the web with **Expo Web + Vercel**. The same codebase also runs on iOS and Android.

**Stack:** Expo SDK 57 · React Native 0.86 · TypeScript · Expo Router · NativeWind 4 (Tailwind CSS 3) · React Native Reanimated 4 · Expo Linear Gradient · Vercel

---

## Features

- Sections: Navbar, Hero, About, Skills, Experience timeline, Featured Projects, Projects, GitHub, Published Apps, Contact, Footer
- Light theme by default, with a dark mode toggle. On web the choice is saved and restored before first paint, so the page never flashes the wrong theme.
- Glass navbar with an animated active-section indicator, smooth scrolling and a hamburger menu on mobile
- Reanimated animations: hero entrance, scroll reveal, floating background shapes, and hover/focus effects on cards, buttons and images. The "reduce motion" OS setting is respected.
- Static HTML output for SEO: title, meta description, Open Graph, Twitter card, JSON-LD `Person`, semantic headings (`<h1>`–`<h3>`), landmarks and accessible labels
- Contact form with validation. It works without a backend and can be connected to a form service with one environment variable.
- GitHub section that tries the GitHub API and falls back to static data if the API is unavailable
- Every piece of content lives in data files, so you never need to edit UI code to update it

---

## Project structure

```text
portfolio/
├── src/
│   ├── app/                      # Expo Router routes
│   │   ├── _layout.tsx           # Root layout (global CSS, theme, status bar)
│   │   ├── index.tsx             # The portfolio page
│   │   ├── +html.tsx             # Web HTML shell: SEO/OG tags, fonts, theme bootstrap
│   │   └── +not-found.tsx        # 404
│   ├── components/
│   │   ├── Navbar.tsx  Hero.tsx  About.tsx  Skills.tsx  Experience.tsx
│   │   ├── FeaturedProjects.tsx  Projects.tsx  Github.tsx  Apps.tsx
│   │   ├── Contact.tsx  Footer.tsx
│   │   └── ui/                   # Reusable primitives (Button, Section, Reveal, HoverCard,
│   │                             #   PhoneMockup, ProjectVisual, StoreButton, FormField, …)
│   ├── config/site.ts            # ✏️ Name, role, email, GitHub, LinkedIn, resume, site URL
│   ├── data/                     # ✏️ projects, skills, experience, about, apps, github
│   ├── constants/                # theme tokens, navigation
│   ├── context/ScrollContext.tsx # scroll position, section offsets, active section
│   ├── hooks/                    # useAppTheme, useHover, useGithubRepos, useBreakpoint
│   ├── services/contact.ts       # contact-form delivery (endpoint or mailto)
│   ├── types/                    # shared TypeScript interfaces
│   └── utils/                    # links, validation, storage, NativeWind interop
├── public/                       # Copied as-is to the web build (resume.pdf, og-image.png)
├── assets/                       # App icon, favicon, splash, your screenshots
├── app.json  babel.config.js  metro.config.js  tailwind.config.js  global.css
├── nativewind-env.d.ts  tsconfig.json  vercel.json
└── package.json
```

> Expo Router now uses `src/app/` by default, so routes live there instead of a top-level `app/`.

---

## Customising content

| What | Where |
| --- | --- |
| Name, role, tagline, email, GitHub username/URL, LinkedIn, resume, site URL | `src/config/site.ts` |
| Projects (featured + regular) | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Experience timeline | `src/data/experience.ts` |
| About text, highlight cards, stats | `src/data/about.ts` |
| Published apps (store links) | `src/data/apps.ts` |
| GitHub fallback repositories | `src/data/github.ts` |
| Colors / fonts | `tailwind.config.js` (+ JS mirror in `src/constants/theme.ts`) |
| Resume PDF | replace `public/resume.pdf` |
| Social preview image | replace `public/og-image.png` (1200×630) |

### Adding a project

```ts
// src/data/projects.ts
{
  id: "my-app",
  title: "My App",
  category: "Productivity · iOS & Android",
  description: "Short project description",
  image: require("../../assets/images/my-app.png"), // optional
  technologies: ["React Native", "Expo", "TypeScript"],
  githubUrl: "https://github.com/you/my-app",
  liveUrl: "",          // empty → button hidden
  appStoreUrl: "",
  playStoreUrl: "",
  featured: true,       // show in "Featured Projects"
  palette: { from: "#4F46E5", to: "#06B6D4" },
  icon: "rocket-launch-outline", // any MaterialCommunityIcons name
}
```

- A button appears only when its URL is a non-empty string.
- If you leave out `image`, the card draws a device mockup in the project's `palette` colors.
- Put screenshots in `assets/images/` and load them with `require(...)`. Metro then optimises and hashes them, and the same code works on web and native.

### Contact form delivery

The form validates input, then:

- If **`EXPO_PUBLIC_CONTACT_ENDPOINT`** is set, it POSTs JSON `{ name, email, message }` to that URL. This works with Formspree, Getform, Basin or your own serverless function.
- Otherwise it opens the visitor's email app with the message already filled in.

```bash
# .env.local (or Vercel → Project → Settings → Environment Variables)
EXPO_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
```

### GitHub section

Set `githubUsername` in `src/config/site.ts`. When the page loads, it fetches the user's public repositories (forks and archived repos are excluded, results are sorted by stars). If the request fails or there are no repos, it shows `src/data/github.ts` instead. To always use the static list, set `enableGithubApi = false`.

---

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Expo dev server (scan the QR code with Expo Go for iOS/Android) |
| `npm run web` | Dev server, opened in the browser |
| `npm run android` / `npm run ios` | Open on an emulator/simulator |
| `npm run build:web` | Production static web build → `dist/` |
| `npm run typecheck` | `tsc --noEmit` |

---

## Deploying to Vercel

### 1. Install dependencies

```bash
cd portfolio
npm install
```

### 2. Run locally

```bash
npm start
```

### 3. Test Expo Web

```bash
npm run web
```

The site opens at http://localhost:8081. Check it at different widths using your browser's device toolbar.

### 4. Build the web version

```bash
npm run build:web
npx serve dist        # optional: preview the production build at http://localhost:3000
```

This runs `expo export -p web` and writes static HTML, JS and CSS to **`dist/`**.

### 5. Push the project to GitHub

```bash
git add .
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/portfolio.git
git push -u origin main
```

### 6. Create a Vercel project

Sign in at https://vercel.com, then choose **Add New… → Project**.

### 7. Connect the GitHub repository

Pick **Import Git Repository**, authorise GitHub if Vercel asks, and select `portfolio`.

### 8. Configure the build command

`vercel.json` already sets this, so Vercel fills it in automatically:

| Setting | Value |
| --- | --- |
| Framework Preset | **Other** |
| Install Command | `npm install` |
| Build Command | `npm run build:web` |

### 9. Configure the output directory

| Setting | Value |
| --- | --- |
| Output Directory | **`dist`** |

If you want the contact form to send messages, add `EXPO_PUBLIC_CONTACT_ENDPOINT` under **Environment Variables**.

### 10. Deploy

Click **Deploy**. Each push to `main` redeploys the site, and each pull request gets its own preview URL.

You can also deploy from the CLI:

```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```

### 11. Add a custom domain

1. Open **Vercel → Project → Settings → Domains → Add** and enter e.g. `nidhi.dev`.
2. At your DNS provider, add the record Vercel shows:
   - apex domain: `A` record → `76.76.21.21`
   - `www` subdomain: `CNAME` → `cname.vercel-dns.com`
3. Wait for DNS to propagate. Vercel issues the HTTPS certificate automatically.
4. Change `siteUrl` in `src/config/site.ts` to the new domain and push. The canonical URL, Open Graph URLs and absolute links on native all use this value.

---

## Notes

- **Dark mode on native** always starts in light mode. If you want the theme to persist on native too, add `@react-native-async-storage/async-storage` and connect it in `src/utils/storage.ts`.
- **Reanimated + NativeWind:** `src/utils/nativewindInterop.ts` registers Reanimated's `Animated.View`, `Animated.Text` and `Animated.ScrollView` with NativeWind, which is what lets them accept `className`.
- **Fonts:** on web, Plus Jakarta Sans and JetBrains Mono load from Google Fonts. Native apps use the system font, so no font files are bundled.
- **Native builds:** for store builds, use EAS: `npx eas-cli@latest build`.
