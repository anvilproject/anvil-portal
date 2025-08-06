import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { SectionCard } from "../../../../../common/entities";

const ACTION_LABEL = {
  LEARN_MORE: "Learn More",
  PAPER: "Paper",
  WORKSPACE: "Workspace",
};

/**
 * Returns the carousel cards for the hero section.
 * @returns carousel cards.
 */
export function buildCarouselCards(): SectionCard[] {
  return [
    {
      links: [
        {
          label: ACTION_LABEL.LEARN_MORE,
          target: ANCHOR_TARGET.SELF,
          url: "/events/anvil2025-community-conference",
        },
      ],
      text: "In Nashville on September 3–5, 2025, this conference brings the genomic cloud computing community together to explore advances in the field and connect with the AnVIL Team.",
      title: "ACC 2025 - AnVIL Community Conference",
    },
    {
      links: [
        {
          label: ACTION_LABEL.PAPER,
          url: "https://www.cell.com/ajhg/fulltext/S0002-9297(24)00379-3",
        },
      ],
      text: "Using the AnVIL, the PRIMED Consortium is developing methods to improve the performance of PRSs in global populations and individuals of diverse genetic ancestry.",
      title:
        "The PRIMED Consortium: Reducing disparities in polygenic risk assessment",
    },
    {
      links: [
        {
          label: ACTION_LABEL.PAPER,
          url: "https://www.science.org/doi/10.1126/science.abl3533",
        },
        {
          label: ACTION_LABEL.WORKSPACE,
          url: "https://anvil.terra.bio/#workspaces/anvil-datastorage/AnVIL_T2T",
        },
      ],
      text: "Using the AnVIL, researchers find the T2T-CHM13 reference genome universally improves the analysis of human genetic variation.",
      title:
        "A complete reference genome improves analysis of human genetic variation",
    },
    {
      links: [
        {
          label: ACTION_LABEL.PAPER,
          url: "https://www.cell.com/cell-genomics/fulltext/S2666-979X(21)00106-3",
        },
      ],
      text: "AnVIL inverts the traditional model of genomic analysis, eliminating data movement and providing scalable, shared computing resources.",
      title:
        "Inverting the model of genomics data sharing with the NHGRI Genomic Data Science Analysis, Visualization, and Informatics Lab-space (AnVIL)",
    },
    {
      links: [
        {
          label: ACTION_LABEL.LEARN_MORE,
          target: ANCHOR_TARGET.SELF,
          url: "/learn/watch-videos-and-tutorials/anvil-videos",
        },
      ],
      text: "Our short video series shows how AnVIL improves collaborative science for different researcher roles.",
      title: "AnVIL Shorts: How can AnVIL help my research?",
    },
    {
      links: [
        {
          label: ACTION_LABEL.PAPER,
          url: "https://www.science.org/doi/10.1126/science.abe3261",
        },
        {
          label: ACTION_LABEL.LEARN_MORE,
          url: "https://support.terra.bio/hc/en-us/articles/360041068771--COVID-19-workspaces-data-and-tools-in-Terra",
        },
      ],
      text: "Using the AnVIL, researchers investigate the effect of superspreading events in the Boston area.",
      title:
        "Phylogenetic analysis of SARS-CoV-2 in Boston highlights the impact of superspreading events",
    },
    {
      links: [
        {
          label: ACTION_LABEL.PAPER,
          url: "https://academic.oup.com/nar/article/49/W1/W624/6274534",
        },
        {
          label: ACTION_LABEL.LEARN_MORE,
          url: "https://dockstore.org",
        },
      ],
      text: "Dockstore is an open source platform for publishing, sharing, and finding bioinformatics tools and workflows.",
      title:
        "The Dockstore: enhancing a community platform for sharing reproducible and accessible computational protocols",
    },
    {
      links: [
        {
          label: ACTION_LABEL.PAPER,
          url: "https://www.nature.com/articles/s41592-019-0654-x",
        },
        {
          label: ACTION_LABEL.WORKSPACE,
          url: "https://anvil.terra.bio/#workspaces/bioconductor-rpci-anvil/Bioconductor-Book-OrchestratingSingleCellAnalysis",
        },
      ],
      text: "The AnVIL hosts a detailed book of single-cell methods and analysis techniques.",
      title: "Orchestrating single-cell analysis with Bioconductor",
    },
    {
      links: [
        {
          label: ACTION_LABEL.PAPER,
          url: "https://academic.oup.com/nar/article/48/W1/W395/5849904",
        },
        {
          label: ACTION_LABEL.LEARN_MORE,
          target: ANCHOR_TARGET.SELF,
          url: "/learn/run-interactive-analyses/getting-started-with-galaxy",
        },
      ],
      text: "AnVIL has access to full Galaxy capabilities, a computational workbench used by thousands of scientists to analyze biomedical data.",
      title:
        "The Galaxy platform for accessible, reproducible and collaborative biomedical analyses: 2020 update",
    },
  ];
}
