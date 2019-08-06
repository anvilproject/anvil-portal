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
import EditContent from "../components/editContent/editContent";
import Layout from "../components/layout";

// Styles
import compStyles from "./contentTemplate.module.css";

let classNames = require("classnames");

export default ({data}) => {
    const post = data.markdownRemark,
        {fields, html} = post,
        {slug} = fields;

    return (
        <Layout docPath={slug}>
            <div className={classNames(compStyles.articleInner, "markdown")}>
                <div dangerouslySetInnerHTML={{__html: html}}/>
                <EditContent docPath={slug}/>
            </div>
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
              linkTo
              component
            }
          }
        }
      }
    }
  }
`;
