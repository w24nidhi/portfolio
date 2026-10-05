import { useEffect, useState } from "react";

import { enableGithubApi, site } from "@/config/site";
import { fallbackRepos } from "@/data/github";
import type { GithubRepo } from "@/types";

interface GithubApiRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
}

interface State {
  repos: GithubRepo[];
  source: "api" | "fallback";
  loading: boolean;
}

const MAX_REPOS = 6;

/**
 * Loads public repositories from the GitHub REST API.
 * Always resolves to something renderable: falls back to static data on any failure.
 */
export function useGithubRepos(): State {
  const [state, setState] = useState<State>({
    repos: fallbackRepos,
    source: "fallback",
    loading: enableGithubApi,
  });

  useEffect(() => {
    if (!enableGithubApi) return;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${encodeURIComponent(site.githubUsername)}/repos?sort=updated&per_page=30`,
          { headers: { Accept: "application/vnd.github+json" }, signal: controller.signal },
        );
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const data = (await res.json()) as GithubApiRepo[];
        const repos = data
          .filter((r) => !r.fork && !r.archived)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, MAX_REPOS)
          .map<GithubRepo>((r) => ({
            name: r.name,
            description: r.description ?? "No description provided.",
            url: r.html_url,
            language: r.language ?? "Code",
            stars: r.stargazers_count,
            forks: r.forks_count,
          }));
        setState(
          repos.length > 0
            ? { repos, source: "api", loading: false }
            : { repos: fallbackRepos, source: "fallback", loading: false },
        );
      } catch {
        setState({ repos: fallbackRepos, source: "fallback", loading: false });
      } finally {
        clearTimeout(timeout);
      }
    })();

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return state;
}
