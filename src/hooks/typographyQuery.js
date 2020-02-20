import {useStaticQuery, graphql} from 'gatsby';

export const TypographyStaticQuery = () => {
    const {allTypographyYaml} = useStaticQuery(
        graphql`
        query TypographyStaticQuery {
            allTypographyYaml {
                edges {
                  node {
                    color
                    fontFamily
                    fontSize
                    fontWeight
                    label
                    letterSpacing
                    lineHeight
                    margin
                    tagName
                  }
                }
            }
        }
    `
    );
    return allTypographyYaml.edges.map(n => n.node);
};
