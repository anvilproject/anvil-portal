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
import Layout from "../components/layout";
import Linked from "./linkedTemplate";

// Styles
import compStyles from "./contentTemplate.module.css";

let classNames = require("classnames");

export default ({data}) => {
    const post = data.markdownRemark,
        {fields, frontmatter, html} = post,
        {slug} = fields,
        {linked} = frontmatter;

    return (
        <Layout docPath={slug}>
            <div className={classNames(compStyles.articleInner, "markdown")}>
                <div dangerouslySetInnerHTML={{__html: html}}/>
                {linked ? linked.map((link, i) => <Linked key={i} docPath={slug}
                                                          post={link.childMarkdownRemark}>{link.childMarkdownRemark.html}</Linked>) : null}
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
        linked {
          childMarkdownRemark{
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
