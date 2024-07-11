import { LAYOUT_STYLE_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import {
  NavigationEntry,
  NavigationNode,
} from "../../../../docs/common/entities";
import { ROUTES } from "../../../../routes/constants";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  GUIDES: "guides",
};
const PATH_SEGMENTS = {
  CONTENT: "content",
  GUIDES: "guides",
};

export const GUIDES: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.GUIDES,
      layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
      navigation: [
        {
          label: "Creating Content",
          url: ROUTES.GUIDES,
        },
        {
          label: "Editing an Existing Page",
          url: `${ROUTES.GUIDES}/${PATH_SEGMENTS.CONTENT}/editing-an-existing-page`,
        },
        {
          label: "Creating a New Page",
          url: `${ROUTES.GUIDES}/${PATH_SEGMENTS.CONTENT}/creating-a-new-page`,
        },
        {
          label: "Using Images",
          url: `${ROUTES.GUIDES}/${PATH_SEGMENTS.CONTENT}/using-images`,
        },
        {
          label: "Adding YouTube Videos",
          url: `${ROUTES.GUIDES}/${PATH_SEGMENTS.CONTENT}/adding-youtube-videos`,
        },
        {
          label: "Creating Links",
          url: `${ROUTES.GUIDES}/${PATH_SEGMENTS.CONTENT}/creating-links`,
        },
        {
          label: "Creating Events",
          url: `${ROUTES.GUIDES}/${PATH_SEGMENTS.CONTENT}/events-guide`,
        },
        {
          label: "Creating News Items",
          url: `${ROUTES.GUIDES}/${PATH_SEGMENTS.CONTENT}/news-item-guide`,
        },
        {
          label: "Adding a New Publication",
          url: `${ROUTES.GUIDES}/${PATH_SEGMENTS.CONTENT}/adding-publications`,
        },
      ],
      slugs: [PATH_SEGMENTS.CONTENT, PATH_SEGMENTS.GUIDES],
    },
  ],
};
