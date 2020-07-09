import {useStaticQuery, graphql} from "gatsby";

export const WorkspacesStaticQuery = () => {
    const {allMarkdownRemark} = useStaticQuery(
        graphql`
		query WorkspacesStaticQuery {
		  allMarkdownRemark(filter: {fields: {slug: {regex: "/^/workspaces/"}}}) {
			edges {
			  node {
			    frontmatter {
			      description
			      featured
			      title
			      url
			    }
			  }
			}
		  }
		}
    `
    );
    return allMarkdownRemark.edges.map(e => e.node);
};
