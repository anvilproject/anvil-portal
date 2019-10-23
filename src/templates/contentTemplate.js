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

export default ({data}) => {
    const post = data.markdownRemark,
        {fields, html} = post,
        {slug} = fields;

    return (
        <Layout docPath={slug}>
            <ArticleBody html={html}>
                <EditContent docPath={slug}/>
            </ArticleBody>
        </Layout>
    )
}

export const query = graphql`
query($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      html
      fields {
        slug
      }
      frontmatter {
        title
        date
        component
        linked {
          childMarkdownRemark {
            html
            frontmatter{
              component
            }
          }
        }
      }
    }
  }
`;
