/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL template component.
 * Renders markdown content.
 */

// Core dependencies
import {graphql} from "gatsby";
import React from "react";

// App dependencies
import ArticleBody from "../components/article/articleBody";
import EditContent from "../components/editContent/editContent";
import Layout from "../components/layout";
import Workspaces from "../components/workspaces/workspaces";

export default ({data}) => {
    const post = data.markdownRemark,
        {fields, frontmatter, htmlAst} = post,
        {slug} = fields,
        {component} = frontmatter;

    const workspaces = component === "featured";

    return (
        <Layout docPath={slug}>
            <ArticleBody htmlAst={htmlAst}>
                {workspaces ? <Workspaces/> : null}
                <EditContent docPath={slug}/>
            </ArticleBody>
        </Layout>
    )
}

export const query = graphql`
query($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      htmlAst
      fields {
        slug
      }
      frontmatter {
        title
        date
        component
        linked {
          childMarkdownRemark {
            htmlAst
            frontmatter{
              component
            }
          }
        }
      }
    }
  }
`;
