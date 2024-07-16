import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import * as C from "../../components";
import { Link } from "../../components/common/Link/link";
import { Table } from "../../components/common/Table/table";
import DataIngestionChart from "../../components/Consortia/CSER/components/DataIngestionChart/dataIngestionChart";
import { PUBLICATION_CATEGORY } from "../../components/Home/components/Section/components/SectionPublications/common/entities";
import { ROUTES } from "../../routes/constants";
import { getContentScope } from "./scope";

export const DOC_SITE_FOLDER_NAME = "docs";

export const MDX_COMPONENTS = {
  Alert: C.Alert,
  AnVILPublications: C.AnVILPublications,
  AnchorLink: C.AnchorLink,
  Breadcrumbs: C.Breadcrumbs,
  BreadcrumbsCSER: C.BreadcrumbsCSER,
  BreadcrumbsNews: C.BreadcrumbsNews,
  BreadcrumbsProjects: C.BreadcrumbsProjects,
  ButtonAddPublication: C.ButtonAddPublication,
  CallToActionButton: C.CallToActionButton,
  Card: C.Card,
  Consortia: C.Consortia,
  DataIngestionChart,
  Events: C.Events,
  EventsHero: C.EventsHero,
  Figure: C.Figure,
  Grid: C.Grid,
  Image: C.StaticImage,
  Link: C.Link,
  NBS: C.NBS, // non-breaking space typography component
  News: C.News,
  NewsCSER: C.NewsCSER,
  NewsHero: C.NewsHero,
  Projects: C.Projects,
  Publications: C.Publications,
  ResearchMaterials: C.ResearchMaterials,
  Resources: C.Resources,
  Subheader: C.Subheader,
  TextBodyLarge500: C.TextBodyLarge500,
  Video: C.Video,
  a: Link,
  table: Table,
};

export const MDX_SCOPE = {
  ...getContentScope(),
  ANCHOR_TARGET,
  PUBLICATION_CATEGORY,
  ROUTES,
};
