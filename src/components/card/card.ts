/* Core dependencies. */
import { IGatsbyImageData } from "gatsby-plugin-image";

export interface ICard {
  actions?: ICardAction[];
  cardLink?: string;
  media?: IMedia;
  subTitle?: string;
  text?: string;
  thumbnail?: IGatsbyImageData;
  title: string;
}

interface ICardAction {
  label: string;
  url: string;
}

interface IMedia {
  landscape?: IGatsbyImageData;
  portrait?: IGatsbyImageData;
}
