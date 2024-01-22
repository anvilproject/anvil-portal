import { StaticImageProps } from "@clevercanary/data-explorer-ui/lib/components/common/StaticImage/staticImage";
import { LinkProps } from "@clevercanary/data-explorer-ui/lib/components/Links/components/Link/link";

export interface SectionCard {
  links: LinkProps[];
  media?: StaticImageProps;
  text: string;
  title: string;
}
