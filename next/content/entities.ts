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
