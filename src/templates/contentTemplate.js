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
import ArticleEnd from "../components/articleEnd/articleEnd";
import Layout from "../components/layout";
import Workspaces from "../components/workspaces/workspaces";

// Styles
import bodyStyles from "../components/article/articleBody.module.css";

let classNames = require("classnames");

export default ({data}) => {
    const post = data.markdownRemark,
        {fields, frontmatter, htmlAst} = post,
        {slug} = fields,
        {component} = frontmatter;

    const dashboard = slug === "/data/data";
    const noSpy = dashboard;
    const workspaces = component === "featured";

    return (
        <Layout docPath={slug} noSpy={noSpy}>
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
      }
      html
      htmlAst
    }
  }
`;
