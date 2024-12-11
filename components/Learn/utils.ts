import { Frontmatter } from "../../content/entities";
import { ROUTES } from "../../routes/constants";

/**
 * Returns the learn page related breadcrumbs.
 * First crumb is always "Learn".
 * Last crumb is the title of the page.
 * If the frontmatter has breadcrumbs, they are added in between.
 * @param frontmatter - Frontmatter.
 * @returns breadcrumbs.
 */
function buildBreadcrumbs(
  frontmatter: Frontmatter
): Frontmatter["breadcrumbs"] {
  return [
    { path: ROUTES.LEARN, text: "Learn" },
    ...(frontmatter.breadcrumbs ?? []),
    { path: "", text: frontmatter.title },
  ];
}

/**
 * Processes the learn page related frontmatter.
 * @param frontmatter - Frontmatter.
 * @returns learn page related frontmatter.
 */
export function processFrontmatter(
  frontmatter: Frontmatter | undefined
): Frontmatter | undefined {
  if (!frontmatter) return;
  return {
    ...frontmatter,
    breadcrumbs: buildBreadcrumbs(frontmatter),
  };
}
