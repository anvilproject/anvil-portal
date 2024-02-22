import consortiaCser from "images/consortiaCser.svg";
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
            src: consortiaCser,
          },
          slogan: "Clinical Sequencing Evidence-Generating Research",
        },
        key: "cser",
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
  overview: {
    nodes: [
      {
        key: "overview",
        navigation: [
          { label: "What is AnVIL?", url: "/overview" },
          {
            label: "Platform and Data Security",
            url: "/overview/security",
          },
          { label: "Supported by NHGRI", url: "/overview/project-sponsor" },
          { label: "Citing AnVIL", url: "/overview/cite-anvil" },
        ],
        slugs: ["overview", "security", "project-sponsor", "cite-anvil"],
      },
    ],
  },
};
