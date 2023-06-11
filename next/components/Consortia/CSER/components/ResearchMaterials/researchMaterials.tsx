import { MaterialsList } from "../MaterialsList/materialsList";
import { MaterialsCategory } from "../common/materials";

export const ResearchMaterials = (): JSX.Element => {
  return <MaterialsList category={MaterialsCategory.RESEARCH_MATERIALS} />;
};
