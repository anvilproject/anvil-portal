export interface NavItem {
  file: string;
  name: string;
  navItems?: NavItem[];
  path: string;
  slugs?: string[];
}
