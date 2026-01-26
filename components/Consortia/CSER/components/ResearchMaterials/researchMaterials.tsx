import { JSX } from "react";
import { MaterialsCategory } from "../common/materials";
import { MaterialsList } from "../MaterialsList/materialsList";

export const ResearchMaterials = (): JSX.Element => {
  return <MaterialsList category={MaterialsCategory.RESEARCH_MATERIALS} />;
};
