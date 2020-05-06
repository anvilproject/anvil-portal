import {useStaticQuery, graphql} from 'gatsby';

export const TypographyExampleStaticQuery = () => {
    const {allTypographyYaml} = useStaticQuery(
        graphql`
        query TypographyExampleStaticQuery {
            allTypographyYaml(filter: {label: {regex: "/Heading|Paragraph/"}}) {
                edges {
                  node {
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
