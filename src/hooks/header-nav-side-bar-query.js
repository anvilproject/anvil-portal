import { useStaticQuery, graphql } from "gatsby";

export const HeaderNavSideBarStaticQuery = () => {
  const { allSiteMapHeaderYaml } = useStaticQuery(
    graphql`
      query HeaderNavSideBarStaticQuery {
        allSiteMapHeaderYaml {
          edges {
            node {
              menuItems {
                name
                path
                subMenuItems {
                  name
                  path
                }
              }
            }
          }
        }
      }
    `
  );
  return allSiteMapHeaderYaml.edges.find((e) => e.node).node.menuItems;
};
