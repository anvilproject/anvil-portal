import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import * as C from "../../components";
import { Link } from "../../components/common/Link/link";
import { Table } from "../../components/common/Table/table";
import DataIngestionChart from "../../components/Consortia/CSER/components/DataIngestionChart/dataIngestionChart";
import { PUBLICATION_CATEGORY } from "../../components/Home/components/Section/components/SectionPublications/common/entities";
import { CARDS as WORKSPACE_CARDS } from "../../components/Home/components/Section/components/SectionWorkspaces/common/content";
import { ROUTES } from "../../routes/constants";
import { getContentScope } from "./scope";

export const DOC_SITE_FOLDER_NAME = "docs";

export const MDX_COMPONENTS = {
  Alert: C.Alert,
  AlertTitle: C.AlertTitle,
  AnVILPublications: C.AnVILPublications,
  AnalysisPortals: C.AnalysisPortals,
  AnchorLink: C.AnchorLink,
  Breadcrumbs: C.Breadcrumbs,
  BreadcrumbsCSER: C.BreadcrumbsCSER,
  BreadcrumbsNews: C.BreadcrumbsNews,
  BreadcrumbsProjects: C.BreadcrumbsProjects,
  ButtonAddPublication: C.ButtonAddPublication,
  CallToActionButton: C.CallToActionButton,
  Card: C.Card,
  Champions: C.Champions,
  Consortia: C.Consortia,
  DataIngestionChart,
  EventCard: C.EventCard,
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
  SectionOverview: C.SectionOverview,
  Subheader: C.Subheader,
  TextBodyLarge500: C.TextBodyLarge500,
  Video: C.Video,
  WorkspaceCard: C.WorkspaceCard,
  a: Link,
  table: Table,
};

export const MDX_SCOPE = {
  ...getContentScope(),
  ANCHOR_TARGET,
  PUBLICATION_CATEGORY,
  ROUTES,
  workspaces: WORKSPACE_CARDS,
};
