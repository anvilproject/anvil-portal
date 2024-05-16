import { SectionCardWithLink } from "../../../../../common/entities";

export interface CardFrontmatter {
  date?: Date;
  description: string;
  featured?: boolean;
  hidden: boolean;
  path: string;
  secondaryText?: string;
  title: string;
}

export interface UpdateCard extends SectionCardWithLink {
  date?: string;
}
