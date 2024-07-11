import { StaticImageProps } from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import { LayoutStyle } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/entities";
import { NavItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Nav/nav";

export type NavigationConfig = Record<NavigationKey, NavigationEntry>;

export interface NavigationEntry {
  nodes: NavigationNode[];
}

export enum NavigationKey {
  CONSORTIA = "consortia",
  EVENTS = "events",
  FAQ = "faq",
  GUIDES = "guides",
  HELP = "help",
  LEARN = "learn",
  NEWS = "news",
  OVERVIEW = "overview",
  PRIVACY = "privacy",
  TEAM = "team",
}

export interface NavigationNode {
  hero?: NodeHero;
  key?: string;
  layoutStyle?: LayoutStyle;
  navigation?: NavItem[];
  slugs: string[]; // A list of slugs that are valid for the node.
}

export interface NodeHero {
  byline: string;
  logo: StaticImageProps;
  slogan: string;
}

export type SlugByFilePaths = Map<string, string[]>;
