// App dependencies
import { ITab } from "../tabs/tab/tab";

// TODO review INavItem interface and uses with navItem component
export interface INavItem {
  file: string;
  name: string;
  navItems?: INavItem[];
  path: string;
  slugs?: string[];
}

export interface INavigation {
  menuPath: string;
  navItemNext?: INavItem;
  nextItemPrevious?: INavItem;
  navItems: INavItem[];
  slug: string;
  tabPath: string;
  tabs: ITab[];
  title: string;
}
