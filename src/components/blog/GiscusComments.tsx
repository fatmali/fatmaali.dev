"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Giscus from "@giscus/react";

/**
 * GiscusComments
 * Wraps @giscus/react to provide theme sync + safe client-only render.
 *
 * Repo/Category metadata comes from the original script tag you were given.
 * If you change discussion category in GitHub Discussions, update category + IDs below.
 *
 * Data mapping strategy: pathname (stable for /blog/[slug]) so 'term' isn't required.
 */
export function GiscusComments() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Avoid hydration mismatch: only render after mount so theme is accurate.
  if (!mounted) return null;

  // Respect user's selected theme; fallback to OS preference.
  const activeTheme = theme === "system" ? systemTheme : theme;
  const giscusTheme = activeTheme === "dark" ? "dark" : "light";

  return (
    <div id="comments" className="mt-16">
      <h2 className="text-xl font-semibold mb-4" id="comments-title">Comments & Reactions</h2>
      <Giscus
        repo="fatmali/fatmaali.dev"
        repoId="R_kgDOOYSO1A"
        category="Announcements"
        categoryId="DIC_kwDOOYSO1M4Cv_eE"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={giscusTheme}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}

export default GiscusComments;
