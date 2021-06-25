import { useStaticQuery, graphql } from "gatsby";

export const OutlineStaticQuery = () => {
  const { allFile } = useStaticQuery(
    graphql`
      query OutlineStaticQuery {
        allFile(
          filter: {
            relativeDirectory: {
              nin: [
                ""
                "contact"
                "featured-workspaces"
                "help"
                "implementation"
                "implementation/_images"
              ]
            }
          }
        ) {
          group(field: relativePath) {
            slug: fieldValue
            nodes {
              childMarkdownRemark {
                htmlAst
              }
            }
          }
        }
      }
    `
  );
  return allFile.group;
};
