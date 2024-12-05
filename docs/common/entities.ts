import { StaticImageProps } from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import { LayoutStyle } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/entities";
import { NavLinkItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/components/Content/components/Navigation/navigation";
import { NavItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Nav/nav";

export type Navigation = NavItem & Pick<NavLinkItem, "selectedMatch">;

export type NavigationConfig = Record<NavigationKey, NavigationEntry>;

export interface NavigationEntry {
  nodes: NavigationNode[];
}

export enum NavigationKey {
  ANVIL_CHAMPIONS = "anvil-champions",
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

export interface NavigationNode
  extends Pick<NavLinkItem, "flatten" | "selectedMatch" | "visible"> {
  hero?: NodeHero;
  key?: string;
  label?: string;
  layoutStyle?: LayoutStyle;
  navigation?: Navigation[];
  slugs: string[]; // A list of slugs that are valid for the node.
  url?: string;
}

export interface NodeHero {
  byline: string;
  logo: StaticImageProps;
  slogan: string;
}

export type SlugByFilePaths = Map<string, string[]>;
