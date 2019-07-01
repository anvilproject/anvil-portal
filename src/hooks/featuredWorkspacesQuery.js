import {useStaticQuery, graphql} from 'gatsby';

export const featuredWorkspacesStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
		query FeaturedWorkspacesStaticQuery {
		  allMarkdownRemark {
			edges {
			  node {
			    html
			    frontmatter {
			      component
			      linked {
			        childMarkdownRemark {
			          html
			          frontmatter {
			            linkTo
			          }
			        }
			      }
			    }
			  }
			}
		  }
		}
    `
    );
    return allMarkdownRemark.edges.map(e => e.node).filter(n => n.frontmatter.component && n.frontmatter.component === "featured")[0];
};
