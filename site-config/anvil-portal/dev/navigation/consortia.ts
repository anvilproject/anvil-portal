import { LAYOUT_STYLE_CONTRAST_LIGHT } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { SELECTED_MATCH } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import {
  NavigationEntry,
  NavigationNode,
} from "../../../../docs/common/entities";
import { ROUTES } from "../../../../routes/constants";
import { FLATTEN, VISIBLE } from "../../../common/constants";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  CSER: "cser",
};
const PATH_SEGMENTS = {
  CSER: "cser",
};

export const CONSORTIA: NavigationEntry = {
  nodes: [
    {
      flatten: FLATTEN.MD_DOWN,
      hero: {
        byline: "Active August, 2020 to July, 2023",
        logo: {
          alt: "CSER",
          height: 40,
          src: "/consortia/cser/images/consortiaCser.svg",
        },
        slogan: "Clinical Sequencing Evidence-Generating Research",
      },
      key: NODE_KEYS.CSER,
      layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHT,
      navigation: [
        {
          label: "About",
          selectedMatch: SELECTED_MATCH.EQUALS,
          url: `${ROUTES.CONSORTIA}/${PATH_SEGMENTS.CSER}`,
        },
        {
          label: "News",
          url: `${ROUTES.CONSORTIA}/${PATH_SEGMENTS.CSER}/news`,
        },
        {
          label: "Projects",
          url: `${ROUTES.CONSORTIA}/${PATH_SEGMENTS.CSER}/projects`,
        },
        {
          label: "Publications",
          url: `${ROUTES.CONSORTIA}/${PATH_SEGMENTS.CSER}/publications`,
        },
        {
          label: "Resources",
          url: `${ROUTES.CONSORTIA}/${PATH_SEGMENTS.CSER}/resources`,
        },
        {
          label: "Research Materials",
          url: `${ROUTES.CONSORTIA}/${PATH_SEGMENTS.CSER}/research-materials`,
        },
      ],
      selectedMatch: SELECTED_MATCH.EQUALS,
      slugs: [PATH_SEGMENTS.CSER],
      visible: VISIBLE.MD_DOWN,
    },
  ],
};
