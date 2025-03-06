import {
  ANCHOR_TARGET,
  REL_ATTRIBUTE,
} from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { SectionCardWithLink } from "../../../../../common/entities";

const ACTION_LABEL = {
  UNSPECIFIED: "",
};

/**
 * Returns the cards for the tools and workflows section.
 * @param browserURL - Browser URL.
 * @returns tools and workflows cards.
 */
export function buildToolsAndWorkflowsCards(
  browserURL: string
): SectionCardWithLink[] {
  return [
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        url: "https://dockstore.org/organizations/anvil",
      },
      text: "Create, reuse and share analysis and workflows in Jupyter, R Studio, and WDL",
      title: "Analysis Tools and Workflows",
    },
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        url: `${browserURL}/datasets`,
      },
      text: "Access public and managed-access data hosted in the AnVIL Data Explorer",
      title: "Datasets",
    },
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        rel: REL_ATTRIBUTE.NO_OPENER,
        target: ANCHOR_TARGET.SELF,
        url: "/learn/run-analyses-workflows/using-example-workspaces",
      },
      text: "Explore curated workspaces with popular datasets and analyses",
      title: "Example Workspaces",
    },
    {
      link: {
        label: ACTION_LABEL.UNSPECIFIED,
        url: "https://help.anvilproject.org",
      },
      text: "Get support at help.anvilproject.org",
      title: "Join our Community",
    },
  ];
}
