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
  panelColor?: FrontmatterPanelColor;
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

export type FrontmatterPanelColor =
  | "PANEL_COLOR_CONTRAST_LIGHT"
  | "PANEL_COLOR_CONTRAST_LIGHTEST"
  | "PANEL_COLOR_NO_CONTRAST_LIGHT"
  | "PANEL_COLOR_NO_CONTRAST_LIGHTEST";
