import { LinkProps } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { BasicCellProps } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/BasicCell/basicCell";
import { NTagCellProps } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/NTagCell/nTagCell";
import {
  CategoryGroupConfig,
  ColumnConfig,
  EntityConfig,
  SORT_DIRECTION,
} from "@databiosphere/findable-ui/lib/config/entities";
import { EXPLORE_MODE } from "@databiosphere/findable-ui/lib/hooks/useExploreMode/types";
import {
  Publication,
  PublicationInput,
} from "../../../apis/publications/entities";
import { CitationInfoBox } from "../../../components/Citations/components/CitationInfoBox/citationInfoBox";
import {
  getPublicationId,
  getPublicationTitle,
  publicationInputMapper,
} from "../../../apis/publications/utils";
import * as C from "../../../components";
import {
  buildAuthors,
  buildCitationCount,
  buildJournal,
  buildPublicationTitle,
  buildYear,
} from "../../../viewModelBuilders/publications/viewModelBuilders";
import {
  PUBLICATION_CATEGORY_KEY,
  PUBLICATION_CATEGORY_LABEL,
} from "./category";

/**
 * Publications entity category group config for faceted filtering.
 */
const categoryGroupConfig: CategoryGroupConfig = {
  categoryGroups: [
    {
      categoryConfigs: [
        {
          key: PUBLICATION_CATEGORY_KEY.TITLE,
          label: PUBLICATION_CATEGORY_LABEL.TITLE,
        },
        {
          key: PUBLICATION_CATEGORY_KEY.JOURNAL,
          label: PUBLICATION_CATEGORY_LABEL.JOURNAL,
        },
        {
          key: PUBLICATION_CATEGORY_KEY.AUTHORS,
          label: PUBLICATION_CATEGORY_LABEL.AUTHORS,
        },
        {
          key: PUBLICATION_CATEGORY_KEY.RECENCY_BUCKET,
          label: PUBLICATION_CATEGORY_LABEL.RECENCY_BUCKET,
        },
      ],
    },
  ],
  key: "citations",
};

/**
 * Publications entity config for the explore entity list page.
 */
export const publicationsEntityConfig: EntityConfig<
  Publication,
  PublicationInput
> = {
  categoryGroupConfig,
  detail: {
    detailOverviews: [],
    staticLoad: false,
    tabs: [],
    top: [],
  },
  entityMapper: publicationInputMapper,
  exploreMode: EXPLORE_MODE.CS_FETCH_CS_FILTERING,
  getId: getPublicationId,
  getTitle: getPublicationTitle,
  label: "Citations",
  list: {
    columns: [
      {
        componentConfig: {
          component: C.Link as React.FC<LinkProps>,
          viewBuilder: buildPublicationTitle,
        },
        header: PUBLICATION_CATEGORY_LABEL.TITLE,
        id: PUBLICATION_CATEGORY_KEY.TITLE,
        width: { max: "2fr", min: "240px" },
      },
      {
        componentConfig: {
          component: C.NTagCell as React.FC<NTagCellProps>,
          viewBuilder: buildAuthors,
        },
        header: PUBLICATION_CATEGORY_LABEL.AUTHORS,
        id: PUBLICATION_CATEGORY_KEY.AUTHORS,
        width: { max: "1.5fr", min: "180px" },
      },
      {
        componentConfig: {
          component: C.BasicCell as React.FC<BasicCellProps>,
          viewBuilder: buildJournal,
        },
        header: PUBLICATION_CATEGORY_LABEL.JOURNAL,
        id: PUBLICATION_CATEGORY_KEY.JOURNAL,
        width: { max: "1fr", min: "120px" },
      },
      {
        componentConfig: {
          component: C.BasicCell as React.FC<BasicCellProps>,
          viewBuilder: buildYear,
        },
        enableSorting: true,
        header: PUBLICATION_CATEGORY_LABEL.YEAR,
        id: PUBLICATION_CATEGORY_KEY.YEAR,
        width: { max: "0.5fr", min: "80px" },
      },
      {
        componentConfig: {
          component: C.BasicCell as React.FC<BasicCellProps>,
          viewBuilder: buildCitationCount,
        },
        enableSorting: true,
        header: PUBLICATION_CATEGORY_LABEL.CITATION_COUNT,
        id: PUBLICATION_CATEGORY_KEY.CITATION_COUNT,
        width: { max: "0.5fr", min: "100px" },
      },
    ] as ColumnConfig<Publication>[],
    tableOptions: {
      initialState: {
        sorting: [
          { desc: SORT_DIRECTION.DESCENDING as boolean, id: "citationCount" },
        ],
      },
    },
  },
  listView: {
    disablePagination: true,
  },
  route: "citations",
  staticLoadFile: "files/publications/publications.json",
  ui: {
    slots: {
      entityListSlot: [
        {
          component: CitationInfoBox,
        },
      ],
    },
    title: "Citations",
  },
};
