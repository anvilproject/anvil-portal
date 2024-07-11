export interface EventSession {
  sessionEnd?: string;
  sessionStart: string;
}

export type Frontmatter =
  | DefaultFrontmatter
  | FrontmatterEvent
  | FrontmatterNews;

export interface DefaultFrontmatter {
  description: string;
  hidden?: boolean;
  layoutStyle?: FrontmatterLayoutStyle;
  title: string;
}

export interface FrontmatterEvent extends DefaultFrontmatter {
  date: string;
  eventType?: string;
  featured?: boolean;
  location?: string;
  sessions: EventSession[];
  timezone: string;
  url: string | null;
}

export interface FrontmatterNews extends DefaultFrontmatter {
  date: string;
  featured?: boolean;
  url: string | null;
}

export type FrontmatterLayoutStyle =
  | "LAYOUT_STYLE_CONTRAST_LIGHT"
  | "LAYOUT_STYLE_CONTRAST_LIGHTEST"
  | "LAYOUT_STYLE_NO_CONTRAST_DEFAULT"
  | "LAYOUT_STYLE_NO_CONTRAST_LIGHT"
  | "LAYOUT_STYLE_NO_CONTRAST_LIGHTEST";
