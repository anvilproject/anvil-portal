import { ANCHOR_TARGET } from "@clevercanary/data-explorer-ui/lib/components/Links/common/entities";
import { SectionCard } from "../../../../../common/entities";

const ACTION_LABEL = {
  DATASETS: "Datasets",
  LAUNCH: "Launch",
  LEARN_MORE: "Learn More",
};

/**
 * Returns the analysis portal cards for the analysis portal section.
 * @param browserURL - Browser URL.
 * @param portalURL - Portal URL.
 * @returns analysis portal cards.
 */
export function buildAnalysisPortalCards(
  browserURL: string,
  portalURL: string
): SectionCard[] {
  return [
    {
      links: [
        {
          label: ACTION_LABEL.LAUNCH,
          url: "https://anvil.terra.bio/#workspaces",
        },
        {
          label: ACTION_LABEL.LEARN_MORE,
          target: ANCHOR_TARGET.SELF,
          url: `${portalURL}/learn/introduction/intro-to-terra`,
        },
      ],
      media: {
        alt: "Terra",
        height: 40,
        src: "/consortia/portals/terra.png",
      },
      text: "Collaborate in Terra, AnVIL's secure, scalable, cloud compute environment.",
      title: "Terra",
    },
    {
      links: [
        {
          label: ACTION_LABEL.DATASETS,
          target: ANCHOR_TARGET.BLANK,
          url: `${browserURL}/datasets`,
        },
        {
          label: ACTION_LABEL.LEARN_MORE,
          target: ANCHOR_TARGET.BLANK,
          url: `${browserURL}/guides`,
        },
      ],
      media: {
        alt: "Anvil Data Explorer",
        height: 40,
        src: "/consortia/portals/anvil-explorer.png",
      },
      text: "Build cross study cohorts for analysis in Terra.",
      title: "Anvil Data Explorer",
    },
    {
      links: [
        { label: ACTION_LABEL.LAUNCH, url: "https://dockstore.org/" },
        {
          label: ACTION_LABEL.LEARN_MORE,
          target: ANCHOR_TARGET.SELF,
          url: `${portalURL}/learn/introduction/intro-to-dockstore`,
        },
      ],
      media: {
        alt: "Dockstore",
        height: 40,
        src: "/consortia/portals/dockstore.png",
      },
      text: "Create and share Docker-based workflows.",
      title: "Dockstore",
    },
    {
      links: [
        { label: ACTION_LABEL.LEARN_MORE, url: "https://www.ncpi-acc.org/" },
        {
          label: ACTION_LABEL.DATASETS,
          url: "https://ncpi-data.org/platforms",
        },
      ],
      media: {
        alt: "NCPI",
        height: 40,
        src: "/consortia/portals/ncpi.png",
      },
      text: "Interoperate with other NIH data commons.",
      title: "NCPI",
    },
    {
      links: [
        {
          label: ACTION_LABEL.LEARN_MORE,
          target: ANCHOR_TARGET.SELF,
          url: `${portalURL}/learn/interactive-analysis/getting-started-with-bioconductor`,
        },
      ],
      media: {
        alt: "Bioconductor",
        height: 40,
        src: "/consortia/portals/bioconductor.png",
      },
      text: "Analyze genomic data in the R statistical language.",
      title: "Bioconductor",
    },
    {
      links: [
        {
          label: ACTION_LABEL.LEARN_MORE,
          target: ANCHOR_TARGET.SELF,
          url: `${portalURL}/learn/interactive-analysis/getting-started-with-galaxy`,
        },
      ],
      media: {
        alt: "Galaxy",
        height: 40,
        src: "/consortia/portals/galaxy.png",
      },
      text: "Run batch analysis workflows and interactive visualizations.",
      title: "Galaxy",
    },
    {
      links: [
        {
          label: ACTION_LABEL.LEARN_MORE,
          target: ANCHOR_TARGET.SELF,
          url: `${portalURL}/learn/interactive-analysis/getting-started-with-jupyter-notebooks`,
        },
      ],
      media: {
        alt: "Jupyter",
        height: 40,
        src: "/consortia/portals/jupyter.png",
      },
      text: "Run interactive analysis with python or R.",
      title: "Jupyter",
    },
    {
      links: [
        {
          label: ACTION_LABEL.LAUNCH,
          url: "https://support.terra.bio/hc/en-us/articles/4402431367949-Launching-seqr-through-Terra",
        },
        {
          label: ACTION_LABEL.LEARN_MORE,
          target: ANCHOR_TARGET.SELF,
          url: `${portalURL}/news/2021/03/10/announcing-seqr-in-anvil/`,
        },
      ],
      media: {
        alt: "Seqr",
        height: 40,
        src: "/consortia/portals/seqr.png",
      },
      text: "Identify disease-causing variants.",
      title: "Seqr",
    },
  ];
}
