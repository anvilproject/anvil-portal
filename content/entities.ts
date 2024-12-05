import { Breadcrumb } from "@databiosphere/findable-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { LayoutStyle } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/entities";
import { NavItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Nav/nav";
import { OutlineItem } from "@databiosphere/findable-ui/lib/components/Layout/components/Outline/outline";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Overview } from "../components/Layout/components/Section/components/SectionContent/components/SectionOverview/types";
import { NodeHero } from "../docs/common/entities";

export interface EventSession {
  sessionEnd?: string;
  sessionStart: string;
}

export type Frontmatter =
  | DefaultFrontmatter
  | FrontmatterEvent
  | FrontmatterOverview
  | FrontmatterNews;

export interface DefaultFrontmatter {
  breadcrumbs?: Breadcrumb[];
  description: string;
  enableContentEnd?: boolean;
  enableNavigation?: boolean;
  enableOutline?: boolean;
  enableOverview?: boolean; // TODO: Remove when the updated "learn" UI is complete.
  enableSupportForum?: boolean;
  hidden?: boolean;
  layoutStyle?: FrontmatterLayoutStyle;
  title: string;
}

export interface FrontmatterEvent extends DefaultFrontmatter {
  conference: string;
  date: string;
  eventType?: string;
  featured?: boolean;
  formattedSessions?: string[];
  hashtag?: Hashtag;
  location?: string;
  sessions: EventSession[];
  timestamp?: number;
  timezone: string;
  url: string | null;
}

export interface FrontmatterNews extends DefaultFrontmatter {
  date: string;
  featured?: boolean;
  url: string | null;
}

export interface FrontmatterOverview extends DefaultFrontmatter {
  outline?: OutlineItem[];
  overview: Overview[];
}

export type FrontmatterLayoutStyle =
  | "LAYOUT_STYLE_CONTRAST_LIGHT"
  | "LAYOUT_STYLE_CONTRAST_LIGHTEST"
  | "LAYOUT_STYLE_NO_CONTRAST_DEFAULT"
  | "LAYOUT_STYLE_NO_CONTRAST_LIGHT"
  | "LAYOUT_STYLE_NO_CONTRAST_LIGHTEST";

export type Hashtag = `#${string}`;

export interface StaticProps {
  frontmatter: Frontmatter;
  hero?: NodeHero | null;
  layoutStyle: LayoutStyle | null;
  mdxSource: MDXRemoteSerializeResult;
  navigation?: NavItem[] | null;
  outline?: OutlineItem[] | null;
  pageTitle: string | null;
  slug: string[];
}
