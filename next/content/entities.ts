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
  featured?: boolean;
  sessions: EventSession[];
  timezone: string;
}

export interface FrontmatterNews extends DefaultFrontmatter {
  date: string;
  featured?: boolean;
}

export type FrontmatterLayoutStyle =
  | "LAYOUT_STYLE_CONTRAST_LIGHT"
  | "LAYOUT_STYLE_CONTRAST_LIGHTEST"
  | "LAYOUT_STYLE_NO_CONTRAST_LIGHT"
  | "LAYOUT_STYLE_NO_CONTRAST_LIGHTEST";
