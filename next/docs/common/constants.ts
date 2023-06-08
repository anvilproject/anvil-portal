import { Breadcrumbs } from "@clevercanary/data-explorer-ui/lib/components/common/Breadcrumbs/breadcrumbs";
import { Card } from "@clevercanary/data-explorer-ui/lib/components/common/Card/card";
import { Grid } from "@clevercanary/data-explorer-ui/lib/components/common/Grid/grid";
import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { BreadcrumbsCSER } from "../../components/Breadcrumbs/components/BreadcrumbsCSER/breadcrumbsCSER";
import { BreadcrumbsNews } from "../../components/Breadcrumbs/components/BreadcrumbsNews/breadcrumbsNews";
import DataIngestionChart from "../../components/DataIngestionChart/dataIngestionChart";
import { Image } from "../../components/Image/image";
import { Subheader } from "../../components/Typography/components/Subheader/subheader";

export const DOC_SITE_FOLDER_NAME = "docs";

export const MDX_COMPONENTS = {
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
