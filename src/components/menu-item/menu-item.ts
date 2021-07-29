export interface IMenuItem {
  name: string;
  path: string;
  subMenuItems?: IMenuItem[];
}
