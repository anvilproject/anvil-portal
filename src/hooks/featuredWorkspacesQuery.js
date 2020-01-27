import {useStaticQuery, graphql} from 'gatsby';

export const FeaturedWorkspacesStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
		query FeaturedWorkspacesStaticQuery {
		  allMarkdownRemark(filter: {frontmatter: {component: {eq: "featured"}}}) {
			edges {
			  node {
			    htmlAst
			    frontmatter {
			      component
			      linked {
			        childMarkdownRemark {
			          htmlAst
			        }
			      }
			    }
			  }
			}
		  }
		}
    `
    );
    return allMarkdownRemark.edges.map(e => e.node)[0];
};
