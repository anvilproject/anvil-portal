import { StaticImageProps } from "@databiosphere/findable-ui/lib/components/common/StaticImage/staticImage";
import { LinkProps } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";

export interface SectionCard {
  links: LinkProps[];
  media?: StaticImageProps;
  secondaryText?: string;
  text: string;
  title: string;
}

export interface SectionCardWithLink extends Omit<SectionCard, "links"> {
  link: LinkProps;
}

export enum VISIBILITY_MODE {
  COLLAPSED = "COLLAPSED",
  EXPANDED = "EXPANDED",
}
