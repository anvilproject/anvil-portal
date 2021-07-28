import { useStaticQuery, graphql } from "gatsby";

export const HeaderNavBarStaticQuery = () => {
  const { allSiteMapHeaderYaml } = useStaticQuery(
    graphql`
      query HeaderNavBarStaticQuery {
        allSiteMapHeaderYaml {
          edges {
            node {
              menuItems {
                name
                path
              }
            }
          }
        }
      }
    `
  );
  return allSiteMapHeaderYaml.edges.find((e) => e.node).node.menuItems;
};
