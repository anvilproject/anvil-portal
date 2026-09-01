import { SectionCardWithLink } from "../../../../../common/entities";

export interface CardFrontmatter {
  date?: Date;
  description: string;
  endDate?: Date;
  featured?: boolean;
  hidden: boolean;
  path: string;
  persistent?: boolean;
  secondaryText?: string;
  title: string;
}

export interface UpdateCard extends Omit<SectionCardWithLink, "date"> {
  /**
   * End of the content (the last session, for events); determines which cards
   * count as "upcoming". Replaces the inherited "date", which these cards do
   * not use.
   */
  endDate?: string;
}
