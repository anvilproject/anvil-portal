import { OutlineItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/types";
import {
  isClientSideNavigation,
  isURLString,
} from "@databiosphere/findable-ui/lib/components/Links/common/utils";
import {
  Frontmatter,
  FrontmatterOverview,
} from "../../../../../../../../content/entities";
import { isFrontmatterOverview } from "../../../../../../../../content/typeGuards";
import { slugifyHeading } from "../../../../../../../../plugins/common/utils";
import { OverviewLink } from "./types";
import { LinkProps } from "../../../../../../../../common/types";

const MAX_ROWS = 3;
const OVERVIEW_OUTLINE_DEPTH = 2;

/**
 * Maps an overview link to LinkProps.
 * A string link is converted to a LinkProps with the title taken from the frontmatter.
 * An undefined value is returned if the link is not found in the frontmatter, or if the title is not found.
 * @param section - Section.
 * @param link - Overview link.
 * @param frontmatters - Paths with frontmatter.
 * @returns link props.
 */
function getOverviewLink(
  section: string,
  link: OverviewLink,
  frontmatters: [string, Frontmatter][]
): LinkProps | undefined {
  // Grab the configured URL from the link.
  const url = getOverviewLinkUrl(link);
  if (!url) return;
  // Grab the configured label from the link.
  const label = getOverviewLinkLabel(link);
  // Handle external links.
  if (!isClientSideNavigation(url)) {
    if (typeof link === "string") return;
    return { label, url };
  }
  // Otherwise, handle internal links.
  // Find the corresponding frontmatter for the link.
  const pathFrontmatter = getPathFrontmatter(section, url, frontmatters);
  if (!pathFrontmatter) return;
  // Extract the title from the frontmatter.
  const [, { title }] = pathFrontmatter;
  if (!title) return;
  // Return the link props.
  return {
    label: label || title,
    url,
  };
}

/**
 * Gets the label, if configured, from an overview link.
 * OverviewLink can be a string or LinkProps.
 * @param link - Overview link.
 * @returns overview link label.
 */
function getOverviewLinkLabel(
  link: OverviewLink
): LinkProps["label"] | undefined {
  if (typeof link === "string") return;
  return link.label;
}

/**
 * Gets the URL configured from an overview link.
 * OverviewLink can be a string or LinkProps.
 * @param link - Overview link.
 * @returns overview link URL.
 */
function getOverviewLinkUrl(link: OverviewLink): string {
  if (typeof link === "string") return link;
  if (isURLString(link.url)) return link.url;
  return "";
}

/**
 * Finds the path with frontmatter tuple for a given path.
 * Compares the given link with the path in the path with frontmatter tuples.
 * @param section - Section.
 * @param link - Link.
 * @param frontmatters - Path frontmatter tuples.
 * @returns path with frontmatter tuple.
 */
function getPathFrontmatter(
  section: string,
  link: string,
  frontmatters: [string, Frontmatter][]
): [string, Frontmatter] | undefined {
  const regex = new RegExp(`^\\/${section}\\/`);
  return frontmatters.find(([path]) => path === link.replace(regex, ""));
}

/**
 * Maps the overview to an outline.
 * @param overview - Overview.
 * @returns outline.
 */
export function mapFrontmatterOutline(
  overview: FrontmatterOverview["overview"]
): FrontmatterOverview["outline"] {
  return overview.reduce((acc, { label, links }) => {
    if (links.length > 0) {
      acc.push({
        depth: OVERVIEW_OUTLINE_DEPTH,
        hash: slugifyHeading(label),
        value: label,
      });
    }
    return acc;
  }, [] as OutlineItem[]);
}

/**
 * Maps the frontmatter overview to an overview with links mapped to LinkProps.
 * @param section - Section.
 * @param frontmatter - Frontmatter.
 * @param frontmatters - Paths with frontmatter.
 * @returns overview.
 */
export function mapFrontmatterOverview(
  section: string,
  frontmatter: FrontmatterOverview,
  frontmatters: [string, Frontmatter][]
): FrontmatterOverview["overview"] {
  return frontmatter.overview.map(({ label, links }) => {
    return { label, links: parseOverviewLinks(section, links, frontmatters) };
  });
}

/**
 * Maps overview links to LinkProps for display in the Link component.
 * @param section - Section.
 * @param links - Overview links.
 * @param frontmatters - Paths with frontmatter.
 * @returns link props.
 */
function parseOverviewLinks(
  section: string,
  links: OverviewLink[],
  frontmatters: [string, Frontmatter][]
): LinkProps[] {
  return links.reduce((acc, link) => {
    const overviewLink = getOverviewLink(section, link, frontmatters);
    if (overviewLink) {
      // Only add the link if the title exists; confirming the overview configured the link correctly.
      acc.push(overviewLink);
    }
    return acc;
  }, [] as LinkProps[]);
}

/**
 * Returns parsed overview related frontmatter.
 * @param section - Section.
 * @param frontmatter - Frontmatter.
 * @param frontmatters - Paths with frontmatter.
 * @returns frontmatter.
 */
export function processOverviewFrontmatter(
  section: string = "",
  frontmatter: Frontmatter | undefined,
  frontmatters: [string, Frontmatter][]
): Frontmatter | undefined {
  if (!frontmatter) return;
  if (!isFrontmatterOverview(frontmatter)) return frontmatter;
  const overview = mapFrontmatterOverview(section, frontmatter, frontmatters);
  const outline = mapFrontmatterOutline(overview);
  return { ...frontmatter, outline, overview };
}

/**
 * Splits group overview links into two arrays suitable for a two-column layout.
 * @param links - Section overview links.
 * @returns section overview links, evenly split into two arrays.
 */
export function splitLinks(
  links: Exclude<OverviewLink, string>[]
): Exclude<OverviewLink, string>[][] {
  const sliceIndex = Math.max(MAX_ROWS, Math.ceil(links.length / 2));
  return [links.slice(0, sliceIndex), links.slice(sliceIndex)];
}
