import { ReactNode } from "react";
import { Target } from "../../target/target.model";
import { Social } from "../components/socials/socials";

/**
 * Model of header to be used as props for the Header component.
 */
export interface Header {
  authenticationEnabled?: boolean;
  logo: Logo;
  navLinks: NavLinkItem[];
  searchEnabled: boolean;
  slogan?: string;
  socials: Social[];
}

/**
 * Model of logo to be used as props for the Header and Footer component.
 */
export interface Logo {
  alt: string;
  height?: number;
  link: string;
  src: string;
  width?: number;
}

/**
 * Model of nav link item to be use as props for the Header and Footer component.
 */
export interface NavLinkItem {
  featureFlag?: boolean;
  label: ReactNode;
  menuItems?: MenuItem[];
  target?: Target;
  url: string;
}

export interface MenuItem extends NavLinkItem {
  description?: string;
}
