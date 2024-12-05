import { Frontmatter, FrontmatterOverview } from "./entities";

/**
 * Type guard for "overview" related frontmatter.
 * @param frontmatter - Frontmatter.
 * @returns true if the frontmatter includes the "overview" property.
 */
export function isFrontmatterOverview(
  frontmatter: Frontmatter
): frontmatter is FrontmatterOverview {
  return "overview" in frontmatter;
}
