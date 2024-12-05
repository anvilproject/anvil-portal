import { LinkProps } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";

export interface Overview {
  label: string;
  links: OverviewLink[];
}

export type OverviewLink = string | LinkProps;

export interface Props {
  overview: (Omit<Overview, "links"> & { links: LinkProps[] })[];
}
