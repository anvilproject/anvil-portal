import { Breadcrumbs } from "@clevercanary/data-explorer-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { Card } from "@clevercanary/data-explorer-ui/lib/components/common/Card/card";
import { Grid } from "@clevercanary/data-explorer-ui/lib/components/common/Grid/grid";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { Image } from "../../components/common/Image/image";
import { Subheader } from "../../components/common/Typography/components/Subheader/subheader";
import { BreadcrumbsCSER } from "../../components/Consortia/CSER/components/Breadcrumbs/components/BreadcrumbsCSER/breadcrumbsCSER";
import { BreadcrumbsNews } from "../../components/Consortia/CSER/components/Breadcrumbs/components/BreadcrumbsNews/breadcrumbsNews";
import DataIngestionChart from "../../components/Consortia/CSER/components/DataIngestionChart/dataIngestionChart";
import { Publications } from "../../components/Consortia/CSER/components/Publications/publications";

export const DOC_SITE_FOLDER_NAME = "docs";

export const MDX_COMPONENTS = {
  Publications,
  Breadcrumbs,
  BreadcrumbsCSER,
  BreadcrumbsNews,
  Card,
  DataIngestionChart,
  Grid,
  Image,
  Subheader,
};

export const MDX_SCOPE = {
  ANCHOR_TARGET: ANCHOR_TARGET,
};
