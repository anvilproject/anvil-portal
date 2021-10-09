/* Core dependencies. */
import { IGatsbyImageData } from "gatsby-plugin-image";

export interface ICard {
  actions: ICardAction[];
  media?: IGatsbyImageData;
  subTitle?: string;
  text?: string;
  thumbnail?: IGatsbyImageData;
  title: string;
}

interface ICardAction {
  label: string;
  url: string;
}
