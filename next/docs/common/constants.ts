import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import * as C from "../../components";
import DataIngestionChart from "../../components/Consortia/CSER/components/DataIngestionChart/dataIngestionChart";

export const DOC_SITE_FOLDER_NAME = "docs";

export const MDX_COMPONENTS = {
  Breadcrumbs: C.Breadcrumbs,
  BreadcrumbsCSER: C.BreadcrumbsCSER,
  BreadcrumbsNews: C.BreadcrumbsNews,
  BreadcrumbsProjects: C.BreadcrumbsProjects,
  Card: C.Card,
  DataIngestionChart,
  Figure: C.Figure,
  Grid: C.Grid,
  Image: C.StaticImage,
  Link: C.Link,
  Projects: C.Projects,
  Publications: C.Publications,
  ResearchMaterials: C.ResearchMaterials,
  Resources: C.Resources,
  Subheader: C.Subheader,
};

export const MDX_SCOPE = {
  ANCHOR_TARGET: ANCHOR_TARGET,
};
