export interface Citation {
  authors: string[];
  doi: string;
  journal: string;
  publisher: string;
  year: string;
}

export interface PublicationCard extends PublicationSectionCard {
  category: PUBLICATION_CATEGORY;
}

export interface PublicationSectionCard {
  cardLink: string;
  citation: Citation;
  title: string;
}

export enum PUBLICATION_CATEGORY {
  ABOUT_ANVIL = "ABOUT_ANVIL",
  ON_ANVIL = "ON_ANVIL",
}
