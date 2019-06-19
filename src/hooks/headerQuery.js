import {useStaticQuery, graphql} from 'gatsby';
import * as NavigationService from '../utils/navigation.service';

export const headerStaticQuery = () => {
    const {allSiteMapYaml} = useStaticQuery(
        graphql`
        query HeaderStaticQuery {
          allSiteMapYaml {
            edges {
              node {
                name
                path
                position {
                    location
                    order
                }
              }
            }
          }
        }
    `
    );
    let headerLinks = (NavigationService.filterNavigationByLocation(allSiteMapYaml.edges.map(e => e.node), 'h'));
    return (NavigationService.orderNavigationLinks(headerLinks));
};
