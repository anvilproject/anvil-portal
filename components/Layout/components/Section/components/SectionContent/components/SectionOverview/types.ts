import { LinkProps } from "../../../../../../../../common/types";

export interface Overview {
  label: string;
  links: OverviewLink[];
}

export type OverviewLink = string | LinkProps;

export interface SectionOverviewProps {
  overview: (Omit<Overview, "links"> & {
    links: Exclude<OverviewLink, string>[];
  })[];
}
