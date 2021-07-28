// App dependencies
import { MenuItem } from "../components/header/menu-item";
import { NavItem } from "./nav-item";
import { Tab } from "./tab";

export interface Navigation {
  menuPath: string;
  navItemNext?: MenuItem;
  nextItemPrevious?: MenuItem;
  navItems: NavItem[]
  slug: string;
  tabPath: string;
  tabs: Tab[];
  title: string;
}
