import {
  LAYOUT_STYLE_CONTRAST_LIGHT,
  LAYOUT_STYLE_CONTRAST_LIGHTEST,
} from "@databiosphere/findable-ui/lib/components/Layout/components/ContentLayout/common/constants";
import { NavigationConfig } from "../../../docs/common/entities";

// Site map for the MDX pages used to generate the navigation.
export const navigation: NavigationConfig = {
  consortia: {
    nodes: [
      {
        hero: {
          byline: "Active August, 2020 to July, 2023",
          logo: {
            alt: "CSER",
            height: 40,
            src: "/consortia/cser/images/consortiaCser.svg",
          },
          slogan: "Clinical Sequencing Evidence-Generating Research",
        },
        key: "cser",
        layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHT,
        navigation: [
          { label: "About", url: "/consortia/cser" },
          { label: "News", url: "/consortia/cser/news" },
          { label: "Projects", url: "/consortia/cser/projects" },
          { label: "Publications", url: "/consortia/cser/publications" },
          { label: "Resources", url: "/consortia/cser/resources" },
          {
            label: "Research Materials",
            url: "/consortia/cser/research-materials",
          },
        ],
        slugs: ["cser"],
      },
    ],
  },
  events: {
    nodes: [
      {
        key: "events",
        layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
        slugs: ["events"],
      },
    ],
  },
  faq: {
    nodes: [
      {
        key: "faq",
        navigation: [
          { label: "Overview", url: "/faq" },
          {
            label: "Data Security, Management, and Access Procedures",
            url: "/faq/data-security",
          },
          { label: "Data Submission", url: "/faq/data-submission" },
          {
            label: "Resources for AnVIL Users",
            url: "/faq/resources-for-anvil-users",
          },
          {
            label: "Using AnVIL",
            url: "/faq/using-anvil",
          },
        ],
        slugs: [
          "faq",
          "data-security",
          "data-submission",
          "resources-for-anvil-users",
          "using-anvil",
        ],
      },
    ],
  },
  learn: {
    nodes: [
      {
        key: "learn",
        layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
        navigation: [
          { label: "Introduction" },
          { label: "Getting Started", url: "/learn" },
          {
            label: "Guides and Tutorials",
            url: "/learn/introduction/guides-and-tutorials",
          },
          {
            label: "Introduction to Terra",
            url: "/learn/introduction/intro-to-terra",
          },
          {
            label: "Introduction to Dockstore",
            url: "/learn/introduction/intro-to-dockstore",
          },
          {
            label: "Understanding Cloud Costs",
            url: "/learn/introduction/understanding-cloud-costs",
          },
          { label: "Account Setup" },
          {
            label: "Overview of Account Setup",
            url: "/learn/account-setup/overview-of-account-setup",
          },
          {
            label: "Obtaining a Google ID",
            url: "/learn/account-setup/obtaining-a-google-id",
          },
          {
            label: "Creating a Terra Account",
            url: "/learn/account-setup/creating-a-terra-account",
          },
          { label: "Billing Setup" },
          {
            label: "Overview of Billing Concepts",
            url: "/learn/billing-setup/billing-concepts",
          },
          {
            label: "Creating a Google Cloud Billing Account",
            url: "/learn/billing-setup/creating-a-google-cloud-billing-account",
          },
          { label: "Accessing Data" },
          {
            label: "Discovering Data",
            url: "/learn/accessing-data/discovering-data",
          },
          {
            label: "Requesting Data Access",
            url: "/learn/accessing-data/requesting-data-access",
          },
          {
            label: "Data Access Controls",
            url: "/learn/accessing-data/data-access-controls",
          },
          {
            label: "Bringing Your Own Data",
            url: "/learn/accessing-data/bringing-your-own-data",
          },

          { label: "Running Analysis Workflows" },
          {
            label: "Using Example Workspaces",
            url: "/learn/analysis-workflows/using-example-workspaces",
          },
          {
            label: "Running GATK in Terra",
            url: "/learn/analysis-workflows/running-gatk",
          },
          {
            label: "Running Galaxy Workflows from Dockstore",
            url: "/learn/analysis-workflows/running-galaxy-workflows-from-dockstore",
          },
          { label: "Running Interactive Analyses" },
          {
            label: "Running Jupyter Notebooks in AnVIL",
            url: "/learn/interactive-analysis/getting-started-with-jupyter-notebooks",
          },
          {
            label: "Running R / Bioconductor in AnVILL",
            url: "/learn/interactive-analysis/getting-started-with-bioconductor",
          },
          {
            label: "Running Galaxy in AnVIL",
            url: "/learn/interactive-analysis/getting-started-with-galaxy",
          },
          { label: "MOOC" },
          {
            label: "What is AnVIL?",
            url: "/learn/anvil-mooc/what-is-anvil",
          },
          {
            label: "Cloud Computing",
            url: "/learn/anvil-mooc/cloud-computing",
          },
          {
            label: "Cloud Costs",
            url: "/learn/anvil-mooc/cloud-costs",
          },
          {
            label: "Use Case: GATK",
            url: "/learn/anvil-mooc/use-case-gatk",
          },
          {
            label: "Use Case: GWAS",
            url: "/learn/anvil-mooc/use-case-gwas",
          },
          {
            label: "Use Case: eQTL",
            url: "/learn/anvil-mooc/use-case-eqtl",
          },
          { label: "Video Gallery" },
          {
            label: "Anvil",
            url: "/learn/videos/anvil-videos",
          },
          {
            label: "Terra",
            url: "/learn/videos/terra-videos",
          },
          {
            label: "Dockstore",
            url: "/learn/videos/dockstore-videos",
          },
          {
            label: "Galaxy",
            url: "/learn/videos/galaxy-videos",
          },
          {
            label: "Seqr",
            url: "/learn/videos/seqr-videos",
          },
          {
            label: "Workshop Archive",
            url: "/learn/training/workshop-archive",
          },
          {
            label: "Reference",
          },
          {
            label: "GTEx v8 - Free Egress Instructions",
            url: "/learn/reference/gtex-v8-free-egress-instructions",
          },
          {
            label: "Cross Platform Data Access with GA4GH DRS in Terra",
            url: "/learn/reference/cross-platform-data-access-with-drs-uris-in-terra",
          },
        ],
        slugs: [
          "learn",
          "introduction",
          "account-setup",
          "billing-setup",
          "accessing-data",
          "analysis-workflows",
          "interactive-analysis",
          "anvil-mooc",
          "videos",
          "training",
          "reference",
        ],
      },
      {
        key: "data-analysts",
        layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
        navigation: [
          {
            label: "Guides and Tutorials",
            url: "/learn/data-analysts",
          },
        ],
        slugs: ["learn", "data-analysts"],
      },
      {
        key: "investigators",
        layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
        navigation: [
          {
            label: "Investigators Tutorial Overview",
            url: "/learn/investigators/investigators-tutorial-overview",
          },
          {
            label: "Setting up Your Lab in AnVIL",
            url: "/learn/investigators/setting-up-lab-accounts",
          },
          {
            label: "Preparing a Cloud Cost Budget Justification",
            url: "/learn/investigators/budget-templates",
          },
        ],
        slugs: ["learn", "investigators"],
      },
      {
        key: "data-submitters",
        layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
        navigation: [
          { label: "Data Submission Guide" },
          {
            label: "Submission Process Overview",
            url: "/learn/data-submitters/submission-guide/data-submitters-overview",
          },
          {
            label: "1 - Register Study/Obtain Approvals",
            url: "/learn/data-submitters/submission-guide/data-approval-process",
          },
          {
            label: "2 - Set Up a Data Model",
            url: "/learn/data-submitters/submission-guide/set-up-a-data-model",
          },
          {
            label: "3 - Prepare for Submission",
            url: "/learn/data-submitters/submission-guide/prepare-for-submission",
          },
          {
            label: "4 - Ingest Data",
            url: "/learn/data-submitters/submission-guide/ingesting-data",
          },
          {
            label: "5 - QC Data",
            url: "/learn/data-submitters/submission-guide/qc-data",
          },
          { label: "Data Submission Resources" },
          {
            label: "Consortium Data Access Guidelines",
            url: "/learn/data-submitters/resources/consortium-data-access-guidelines",
          },
          {
            label: "Data Withdrawal Procedures",
            url: "/learn/data-submitters/resources/anvil-data-withdrawal-procedures",
          },
        ],
        slugs: ["learn", "data-submitters"],
      },
    ],
  },
  news: {
    nodes: [
      {
        key: "news",
        layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
        slugs: ["news"],
      },
    ],
  },
  overview: {
    nodes: [
      {
        key: "overview",
        layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
        navigation: [
          { label: "What is AnVIL?", url: "/overview" },
          {
            label: "Platform and Data Security",
            url: "/overview/security",
          },
          { label: "Supported by NHGRI", url: "/overview/project-sponsor" },
          { label: "Publications", url: "/overview/publications" },
          { label: "Citing AnVIL", url: "/overview/cite-anvil" },
        ],
        slugs: [
          "overview",
          "security",
          "project-sponsor",
          "publications",
          "cite-anvil",
        ],
      },
    ],
  },
  privacy: {
    nodes: [
      {
        key: "privacy",
        layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
        slugs: ["privacy"],
      },
    ],
  },
  team: {
    nodes: [
      {
        key: "team",
        layoutStyle: LAYOUT_STYLE_CONTRAST_LIGHTEST,
        navigation: [
          { label: "Leadership Team", url: "/team" },
          { label: "Working Groups", url: "/team/working-groups" },
          { label: "Oversight Committee", url: "/team/oversight-committee" },
        ],
        slugs: ["team", "working-groups", "oversight-committee"],
      },
    ],
  },
};
