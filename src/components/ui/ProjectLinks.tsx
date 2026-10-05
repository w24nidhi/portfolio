import type { Project } from "@/types";
import { hasUrl } from "@/utils/links";

import { Button, ButtonRow } from "./Button";
import { StoreButton } from "./StoreButton";

/** Renders only the buttons whose URLs are configured for a project. */
export function ProjectLinks({ project, compact }: { project: Project; compact?: boolean }) {
  const { githubUrl, liveUrl, appStoreUrl, playStoreUrl, title } = project;
  const anyLink = [githubUrl, liveUrl, appStoreUrl, playStoreUrl].some(hasUrl);
  if (!anyLink) return null;

  return (
    <ButtonRow>
      {hasUrl(liveUrl) ? (
        <Button
          label="Live Demo"
          icon="arrow-top-right"
          iconPosition="right"
          size={compact ? "sm" : "md"}
          href={liveUrl}
          accessibilityHint={`Opens the live demo of ${title}`}
        />
      ) : null}
      {hasUrl(githubUrl) ? (
        <Button
          label="GitHub"
          icon="github"
          variant="secondary"
          size={compact ? "sm" : "md"}
          href={githubUrl}
          accessibilityHint={`Opens the ${title} source code on GitHub`}
        />
      ) : null}
      {hasUrl(playStoreUrl) ? <StoreButton store="google" url={playStoreUrl} compact /> : null}
      {hasUrl(appStoreUrl) ? <StoreButton store="apple" url={appStoreUrl} compact /> : null}
    </ButtonRow>
  );
}
