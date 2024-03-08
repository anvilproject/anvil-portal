import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import * as C from "../../components";
import DataIngestionChart from "../../components/Consortia/CSER/components/DataIngestionChart/dataIngestionChart";
import { PUBLICATION_CATEGORY } from "../../components/Home/components/Section/components/SectionPublications/common/entities";
import { getContentScope } from "./scope";

export const DOC_SITE_FOLDER_NAME = "docs";

export const MDX_COMPONENTS = {
  AnVILPublications: C.AnVILPublications,
  AnchorLink: C.AnchorLink,
  Breadcrumbs: C.Breadcrumbs,
  BreadcrumbsCSER: C.BreadcrumbsCSER,
  BreadcrumbsNews: C.BreadcrumbsNews,
  BreadcrumbsProjects: C.BreadcrumbsProjects,
  ButtonAddPublication: C.ButtonAddPublication,
  Card: C.Card,
  DataIngestionChart,
  Figure: C.Figure,
  Grid: C.Grid,
  Image: C.StaticImage,
  Link: C.Link,
  NBS: C.NBS, // non-breaking space typography component
  News: C.News,
  Projects: C.Projects,
  Publications: C.Publications,
  ResearchMaterials: C.ResearchMaterials,
  Resources: C.Resources,
  Subheader: C.Subheader,
  TextBodyLarge500: C.TextBodyLarge500,
};

export const MDX_SCOPE = {
  ...getContentScope(),
  ANCHOR_TARGET: ANCHOR_TARGET,
  PUBLICATION_CATEGORY,
};
