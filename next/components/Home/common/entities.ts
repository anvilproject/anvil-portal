import { StaticImageProps } from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import { LinkProps } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";

type Link = Omit<LinkProps, "url"> & { url: string };

export interface SectionCard {
  links: Link[];
  media?: StaticImageProps;
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
