import { StaticImageProps } from "@clevercanary/data-explorer-ui/lib/components/common/StaticImage/staticImage";
import { LayoutStyle } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/ContentLayout/contentLayout";
import { NavItem } from "@clevercanary/data-explorer-ui/lib/components/Layout/components/Nav/nav";

export interface Frontmatter {
  layoutStyle?: LayoutStyle;
}

export type NavigationConfig = Record<NavigationKey, NavigationEntry>;

export interface NavigationEntry {
  nodes: NavigationNode[];
}

export enum NavigationKey {
  CONSORTIA = "consortia",
}

export interface NavigationNode {
  hero?: NodeHero;
  key?: string;
  navigation?: NavItem[];
  slugs: string[]; // A list of slugs that are valid for the node.
}

export interface NodeHero {
  byline: string;
  logo: StaticImageProps;
  slogan: string;
}

export type SlugByFilePath = Map<string, string[]>;
