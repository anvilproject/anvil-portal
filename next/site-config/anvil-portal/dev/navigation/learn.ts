import { LAYOUT_STYLE_CONTRAST_LIGHTEST } from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { SELECTED_MATCH } from "@databiosphere/findable-ui/lib/components/Layout/components/Header/common/entities";
import {
  NavigationEntry,
  NavigationNode,
} from "../../../../docs/common/entities";
import { ROUTES } from "../../../../routes/constants";

const NODE_KEYS: Record<string, NavigationNode["key"]> = {
  DATA_ANALYSTS: "data-analysts",
  DATA_SUBMITTERS: "data-submitters",
  INVESTIGATORS: "investigators",
  LEARN: "learn",
};
const PATH_SEGMENTS = {
  ACCESSING_DATA: "accessing-data",
  ACCOUNT_SETUP: "account-setup",
  ANALYSIS_WORKFLOWS: "analysis-workflows",
  ANVIL_MOOC: "anvil-mooc",
  BILLING_SETUP: "billing-setup",
  DATA_ANALYSTS: "data-analysts",
  DATA_SUBMITTERS: "data-submitters",
  INTERACTIVE_ANALYSIS: "interactive-analysis",
  INTRODUCTION: "introduction",
  INVESTIGATORS: "investigators",
  LEARN: "learn",
  REFERENCE: "reference",
  VIDEOS: "videos",
  WORKSHOP_ARCHIVE: "workshop-archive",
};

export const LEARN: NavigationEntry = {
  nodes: [
    {
      key: NODE_KEYS.LEARN,
      label: "Introduction",
      layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
      navigation: [
        { label: "Introduction" },
        {
          label: "Getting Started",
          selectedMatch: SELECTED_MATCH.EQUALS,
          url: ROUTES.LEARN,
        },
        {
          label: "Guides and Tutorials",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.INTRODUCTION}/guides-and-tutorials`,
        },
        {
          label: "Introduction to Terra",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.INTRODUCTION}/intro-to-terra`,
        },
        {
          label: "Introduction to Dockstore",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.INTRODUCTION}/intro-to-dockstore`,
        },
        {
          label: "Understanding Cloud Costs",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.INTRODUCTION}/understanding-cloud-costs`,
        },
        { label: "Account Setup" },
        {
          label: "Overview of Account Setup",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.ACCOUNT_SETUP}/overview-of-account-setup`,
        },
        {
          label: "Obtaining a Google ID",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.ACCOUNT_SETUP}/obtaining-a-google-id`,
        },
        {
          label: "Creating a Terra Account",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.ACCOUNT_SETUP}/creating-a-terra-account`,
        },
        { label: "Billing Setup" },
        {
          label: "Overview of Billing Concepts",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.BILLING_SETUP}/billing-concepts`,
        },
        {
          label: "Creating a Google Cloud Billing Account",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.BILLING_SETUP}/creating-a-google-cloud-billing-account`,
        },
        { label: "Accessing Data" },
        {
          label: "Discovering Data",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.ACCESSING_DATA}/discovering-data`,
        },
        {
          label: "Requesting Data Access",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.ACCESSING_DATA}/requesting-data-access`,
        },
        {
          label: "Data Access Controls",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.ACCESSING_DATA}/data-access-controls`,
        },
        {
          label: "Bringing Your Own Data",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.ACCESSING_DATA}/bringing-your-own-data`,
        },

        { label: "Running Analysis Workflows" },
        {
          label: "Using Example Workspaces",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.ANALYSIS_WORKFLOWS}/using-example-workspaces`,
        },
        {
          label: "Running GATK in Terra",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.ANALYSIS_WORKFLOWS}/running-gatk`,
        },
        {
          label: "Running Galaxy Workflows from Dockstore",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.ANALYSIS_WORKFLOWS}/running-galaxy-workflows-from-dockstore`,
        },
        { label: "Running Interactive Analyses" },
        {
          label: "Running Jupyter Notebooks in AnVIL",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.INTERACTIVE_ANALYSIS}/getting-started-with-jupyter-notebooks`,
        },
        {
          label: "Running R / Bioconductor in AnVILL",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.INTERACTIVE_ANALYSIS}/getting-started-with-bioconductor`,
        },
        {
          label: "Running Galaxy in AnVIL",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.INTERACTIVE_ANALYSIS}/getting-started-with-galaxy`,
        },
        { label: "MOOC" },
        {
          label: "What is AnVIL?",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.ANVIL_MOOC}/what-is-anvil`,
        },
        {
          label: "Cloud Computing",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.ANVIL_MOOC}/cloud-computing`,
        },
        {
          label: "Cloud Costs",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.ANVIL_MOOC}/cloud-costs`,
        },
        {
          label: "Use Case: GATK",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.ANVIL_MOOC}/use-case-gatk`,
        },
        {
          label: "Use Case: GWAS",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.ANVIL_MOOC}/use-case-gwas`,
        },
        {
          label: "Use Case: eQTL",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.ANVIL_MOOC}/use-case-eqtl`,
        },
        { label: "Video Gallery" },
        {
          label: "Anvil",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.VIDEOS}/anvil-videos`,
        },
        {
          label: "Terra",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.VIDEOS}/terra-videos`,
        },
        {
          label: "Dockstore",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.VIDEOS}/dockstore-videos`,
        },
        {
          label: "Galaxy",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.VIDEOS}/galaxy-videos`,
        },
        {
          label: "Seqr",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.VIDEOS}/seqr-videos`,
        },
        {
          label: "Workshop Archive",
        },
        {
          label: "Workshop Archive",
          url: `${ROUTES.LEARN}/workshop-archive`,
        },
        {
          label: "Reference",
        },
        {
          label: "GTEx v8 - Free Egress Instructions",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.REFERENCE}/gtex-v8-free-egress-instructions`,
        },
        {
          label: "Cross Platform Data Access with GA4GH DRS in Terra",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.REFERENCE}/cross-platform-data-access-with-drs-uris-in-terra`,
        },
      ],
      selectedMatch: SELECTED_MATCH.EQUALS,
      slugs: [
        PATH_SEGMENTS.ACCESSING_DATA,
        PATH_SEGMENTS.ACCOUNT_SETUP,
        PATH_SEGMENTS.ANALYSIS_WORKFLOWS,
        PATH_SEGMENTS.ANVIL_MOOC,
        PATH_SEGMENTS.BILLING_SETUP,
        PATH_SEGMENTS.INTERACTIVE_ANALYSIS,
        PATH_SEGMENTS.INTRODUCTION,
        PATH_SEGMENTS.LEARN,
        PATH_SEGMENTS.REFERENCE,
        PATH_SEGMENTS.VIDEOS,
        PATH_SEGMENTS.WORKSHOP_ARCHIVE,
      ],
      url: ROUTES.LEARN,
    },
    {
      key: NODE_KEYS.DATA_ANALYSTS,
      label: "Data Analysts",
      layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
      navigation: [
        {
          label: "Guides and Tutorials",
          selectedMatch: SELECTED_MATCH.EQUALS,
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_ANALYSTS}`,
        },
        { label: "Bioconductor / RStudio" },
        {
          label: "Starting RStudio",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_ANALYSTS}/rstudio-gsg-video`,
        },
        {
          label: "Using R / Bioconductor in AnVIL",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_ANALYSTS}/using-r-bioconductor-in-anvil`,
        },
        {
          label: "The R / Bioconductor AnVIL Package",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_ANALYSTS}/the-r-bioconductor-anvil-package`,
        },
        {
          label: "Running a Workflow",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_ANALYSTS}/running-a-workflow`,
        },
        {
          label:
            "Single-cell RNASeq with 'Orchestrating Single Cell Analysis'\u00A0in R / Bioconductor",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_ANALYSTS}/single-cell-rnaseq-with-orchestrating-single-cell-analysis-in-r-bioconductor`,
        },
        {
          label: "Using AnVIL for teaching R / Bioconductor",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_ANALYSTS}/using-anvil-for-teaching-r-bioconductor`,
        },
        {
          label: "Reproducible Research with AnVILPublish",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_ANALYSTS}/reproducible-research-with-anvilpublish`,
        },
        {
          label: "Participant Stories",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_ANALYSTS}/participant-stories`,
        },
        { label: "Galaxy" },
        {
          label: "Starting Galaxy",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_ANALYSTS}/galaxy-gsg-video`,
        },
        { label: "Jupyter" },
        {
          label: "Starting Jupyter",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_ANALYSTS}/jupyter-gsg-video`,
        },
      ],
      slugs: [PATH_SEGMENTS.DATA_ANALYSTS, PATH_SEGMENTS.LEARN],
      url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_ANALYSTS}`,
    },
    {
      key: NODE_KEYS.INVESTIGATORS,
      label: "Investigators",
      layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
      navigation: [
        {
          label: "Investigators Tutorial Overview",
          selectedMatch: SELECTED_MATCH.EQUALS,
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.INVESTIGATORS}`,
        },
        {
          label: "Setting up Your Lab in AnVIL",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.INVESTIGATORS}/setting-up-lab-accounts`,
        },
        {
          label: "Preparing a Cloud Cost Budget Justification",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.INVESTIGATORS}/budget-templates`,
        },
      ],
      slugs: [PATH_SEGMENTS.INVESTIGATORS, PATH_SEGMENTS.LEARN],
      url: `${ROUTES.LEARN}/${PATH_SEGMENTS.INVESTIGATORS}`,
    },
    {
      key: NODE_KEYS.DATA_SUBMITTERS,
      label: "Data Submitters",
      layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
      navigation: [
        { label: "Data Submission Guide" },
        {
          label: "Submission Process Overview",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_SUBMITTERS}/submission-guide/data-submitters-overview`,
        },
        {
          label: "1 - Register Study/Obtain Approvals",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_SUBMITTERS}/submission-guide/data-approval-process`,
        },
        {
          label: "2 - Set Up a Data Model",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_SUBMITTERS}/submission-guide/set-up-a-data-model`,
        },
        {
          label: "3 - Prepare for Submission",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_SUBMITTERS}/submission-guide/prepare-for-submission`,
        },
        {
          label: "4 - Ingest Data",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_SUBMITTERS}/submission-guide/ingesting-data`,
        },
        {
          label: "5 - QC Data",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_SUBMITTERS}/submission-guide/qc-data`,
        },
        { label: "Data Submission Resources" },
        {
          label: "Consortium Data Access Guidelines",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_SUBMITTERS}/resources/consortium-data-access-guidelines`,
        },
        {
          label: "Data Withdrawal Procedures",
          url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_SUBMITTERS}/resources/anvil-data-withdrawal-procedures`,
        },
      ],
      slugs: [PATH_SEGMENTS.DATA_SUBMITTERS, PATH_SEGMENTS.LEARN],
      url: `${ROUTES.LEARN}/${PATH_SEGMENTS.DATA_SUBMITTERS}/submission-guide/data-submitters-overview`,
    },
  ],
};
