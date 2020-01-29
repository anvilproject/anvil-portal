import {useStaticQuery, graphql} from 'gatsby';

export const OnboardingStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
        query OnboardingStaticQuery {
          allMarkdownRemark(filter: {fields: {slug: {regex: "/onboarding/onboarding-intro/"}}}) {
            edges {
              node {
                frontmatter {
                  title
                }
                htmlAst
              }
            }
          }
        }
    `
    );
    return allMarkdownRemark.edges.map(e => e.node).find(n => n);
};
