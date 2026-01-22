import { FrontmatterProps } from "@databiosphere/findable-ui/lib/utils/mdx/frontmatter/types";
import { Frontmatter } from "../../../content/entities";
import { formatFrontmatterDate } from "../../../docs/common/frontmatter";

/**
 * Returns the processed frontmatter.
 * @param frontmatter - Frontmatter.
 * @returns processed frontmatter.
 */
export function processFrontmatter(
  frontmatter: FrontmatterProps<Frontmatter> | undefined
): FrontmatterProps<Frontmatter> | undefined {
  if (!frontmatter) return;
  const date = formatFrontmatterDate(frontmatter);
  return {
    ...frontmatter,
    date,
    enableContentEnd: false,
    enableNavigation: false,
    enableOutline: true,
    enableSupportForum: false,
    subTitle: date,
  };
}
