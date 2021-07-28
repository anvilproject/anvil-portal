export interface MenuItem {
  name: string;
  path: string;
  subMenuItems?: MenuItem[];
}
