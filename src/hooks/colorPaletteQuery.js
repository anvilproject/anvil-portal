import {useStaticQuery, graphql} from 'gatsby';

export const ColorPaletteStaticQuery = () => {
    const {allColorPaletteYaml} = useStaticQuery(
        graphql`
        query ColorPaletteStaticQuery {
            allColorPaletteYaml {
                edges {
                  node {
                    hex
                    name
                    variable
                  }
                }
            }
        }
    `
    );
    return allColorPaletteYaml.edges.map(n => n.node);
};
