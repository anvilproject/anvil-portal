import {
  LAYOUT_STYLE_CONTRAST_LIGHT,
  LAYOUT_STYLE_CONTRAST_LIGHTEST,
} from "@clevercanary/data-explorer-ui/lib/components/Layout/components/ContentLayout/common/constants";
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
        ],
        slugs: [
          "learn",
          "introduction",
          "account-setup",
          "billing-setup",
          "accessing-data",
        ],
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
