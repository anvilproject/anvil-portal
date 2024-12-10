import { LinkProps as DXLinkProps } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";

export type LinkProps = Omit<DXLinkProps, "url"> & { url: string };
