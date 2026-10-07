import { StaticImageProps } from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import { LinkProps } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";

type Link = Omit<LinkProps, "url"> & { url: string };

export interface SectionCard {
  date?: string;
  /**
   * Last day the card is shown, as "YYYY-MM-DD" (inclusive, anywhere on Earth).
   * The card is hidden once that day is over everywhere, regardless of the
   * persistent flag or the recent-content window.
   */
  endDate?: string;
  links: Link[];
  media?: StaticImageProps;
  persistent?: boolean;
  secondaryText?: string;
  text: string;
  title: string;
}

export interface SectionCardWithLink extends Omit<SectionCard, "links"> {
  link: Link;
}

export enum VISIBILITY_MODE {
  COLLAPSED = "COLLAPSED",
  EXPANDED = "EXPANDED",
}
