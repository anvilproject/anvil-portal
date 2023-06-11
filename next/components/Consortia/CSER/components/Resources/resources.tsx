import { MaterialsList } from "../MaterialsList/materialsList";
import { MaterialsCategory } from "../common/materials";

export const Resources = (): JSX.Element => {
  return <MaterialsList category={MaterialsCategory.RESOURCES} />;
};
