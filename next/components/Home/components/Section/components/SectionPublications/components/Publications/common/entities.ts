export interface Citation {
  authors: string[];
  doi: string;
  journal: string;
  publisher: string;
  year: string;
}

export interface PublicationCard {
  cardLink: string;
  category: PUBLICATION_CATEGORY;
  citation: Citation;
  title: string;
}

export enum PUBLICATION_CATEGORY {
  ABOUT_ANVIL = "ABOUT_ANVIL",
  ON_ANVIL = "ON_ANVIL",
}
