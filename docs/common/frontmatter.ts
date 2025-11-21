import { Frontmatter } from "../../content/entities";
import { getMoment } from "../../content/utils";
import { DATE_FORMAT } from "../../content/constants";

/**
 * Returns the formatted date from the frontmatter.
 * @param frontmatter - Frontmatter.
 * @returns formatted date.
 */
export function formatFrontmatterDate(frontmatter: Frontmatter): string {
  if ("date" in frontmatter)
    return getMoment(frontmatter.date).format(DATE_FORMAT);

  return "";
}
