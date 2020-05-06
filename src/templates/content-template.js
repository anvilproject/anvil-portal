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
import Workspaces from "../components/workspaces/workspaces";
import * as TemplateService from "../utils/template.service";

// Styles
import bodyStyles from "../components/article/article-body.module.css";

let classNames = require("classnames");

export default ({data}) => {
    const post = data.markdownRemark,
        {fields, frontmatter, headings, htmlAst} = post,
        {slug} = fields,
        {component, description} = frontmatter,
        dashboard = slug === "/data/data",
        faq = slug.includes("/faq/") && !slug.includes("/faq/help"),
        h1 = TemplateService.getPageH1(headings),
        noSpy = dashboard,
        title = faq ? `FAQ - ${h1}` : h1,
        workspaces = component === "featured";

    return (
        <Layout description={description} docPath={slug} noSpy={noSpy} title={title}>
            <ArticleBody className={classNames({[bodyStyles.stretch]: dashboard})} htmlAst={htmlAst}>
                {workspaces ? <Workspaces/> : null}
                <ArticleEnd docPath={slug}/>
            </ArticleBody>
        </Layout>
    )
}

export const query = graphql`
query($slug: String!) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      fields {
        slug
      }
      frontmatter {
        component
        description
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
