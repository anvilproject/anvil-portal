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
import ArticleBody from "../components/article/article-body";
import ArticleEnd from "../components/article-end/article-end";
import Layout from "../components/layout";
import Providers from "../components/providers/providers";
import * as TemplateService from "../utils/template.service";

// Styles
import tableStyles from "../components/markdown/markdown.module.css";

let classNames = require("classnames");

export default ({data}) => {
    const post = data.markdownRemark,
        {fields, frontmatter, headings, htmlAst} = post,
        {slug, styles} = fields,
        {description, title} = frontmatter,
        dashboard = slug === "/data/data",
        faq = slug.includes("/faq/") && !slug.includes("/faq/help"),
        ncpi = slug.startsWith("/ncpi"),
        h1 = TemplateService.getPageH1(headings),
        pageTitle = h1 ? faq ? `FAQ - ${h1}` : h1 : title;

    return (
        <Layout description={description} docPath={slug} ncpi={ncpi} styles={styles} title={pageTitle}>
            <Providers frontmatter={frontmatter}>
                <ArticleBody className={classNames({[tableStyles.data]: dashboard})} htmlAst={htmlAst}>
                    <ArticleEnd docPath={slug}/>
                </ArticleBody>
            </Providers>
        </Layout>
    )
}

export const query = graphql`
query($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      fields {
        styles {
          alignment
        }
        slug
      }
      frontmatter {
        author
        conference
        date(formatString: "MMMM DD, YYYY")
        dates
        description
        eventType
        featured
        location
        subTitle
        time
        title
      }
      headings(depth: h1) {
        depth
        value
      }
      html
      htmlAst
    }
  }
`;
