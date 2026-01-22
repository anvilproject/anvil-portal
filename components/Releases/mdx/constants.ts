import * as C from "../..";
import { Link } from "../../common/Link/link";
import { GridTable } from "../../common/Table/components/GridTable/gridTable";
import { DataAdditions } from "../components/DataAdditions/dataAdditions";
import { DataModifications } from "../components/DataModifications/dataModifications";
import { Enhancements } from "../components/Enhancements/enhancements";

export const MDX_COMPONENTS = {
  AnchorLink: C.AnchorLink,
  Breadcrumbs: C.Breadcrumbs,
  DataAdditions,
  DataModifications,
  Enhancements,
  Figure: C.Figure,
  GridTable,
  a: Link,
};
