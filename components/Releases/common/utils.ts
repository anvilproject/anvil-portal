import { formatFrontmatterDate } from "../../../docs/common/frontmatter";
import { Frontmatter } from "../../../content/entities";

/**
 * Returns the processed frontmatter.
 * @param frontmatter - Frontmatter.
 * @returns processed frontmatter.
 */
export function processFrontmatter(frontmatter: Frontmatter): Frontmatter {
  const date = formatFrontmatterDate(frontmatter);
  return {
    ...frontmatter,
    date,
    enableContentEnd: false,
    enableNavigation: false,
    enableOutline: false,
    enableSupportForum: false,
    subTitle: date,
  };
}
