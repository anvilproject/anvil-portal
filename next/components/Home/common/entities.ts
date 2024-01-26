import { StaticImageProps } from "@clevercanary/data-explorer-ui/lib/components/common/StaticImage/staticImage";
import { LinkProps } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";

export interface SectionCard {
  links: LinkProps[];
  media?: StaticImageProps;
  secondaryText?: string;
  text: string;
  title: string;
}

export enum VISIBILITY_MODE {
  COLLAPSED = "COLLAPSED",
  EXPANDED = "EXPANDED",
}
