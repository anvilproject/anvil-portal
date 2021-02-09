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
import ArticleNavigation from "../components/article-navigation/article-navigation";
import ArticleSocials from "../components/article-socials/article-socials";
import Layout from "../components/layout";
import ProviderFrontmatter from "../components/provider-frontmatter/provider-frontmatter";
import * as TemplateService from "../utils/template.service";

export default ({data}) => {
    const post = data.markdownRemark,
        {fields, frontmatter, headings, htmlAst} = post,
        {slug, styles} = fields,
        {description, showOutline, title} = frontmatter;
    const {context} = data.sitePage;
    const faq = slug.includes("/faq/") && !slug.includes("/faq/help");
    const ncpi = slug.startsWith("/ncpi");
    const h1 = TemplateService.getPageH1(headings);
    const pageTitle = h1 ? faq ? `FAQ - ${h1}` : h1 : title;

    return (
        <Layout navigations={context}
                description={description}
                docPath={slug}
                ncpi={ncpi}
                showOutline={showOutline}
                styles={styles}
                title={pageTitle}>
            <ProviderFrontmatter frontmatter={frontmatter}>
                <ArticleBody htmlAst={htmlAst}>
                    <ArticleSocials/>
                    <ArticleNavigation navigations={context}/>
                    <ArticleEnd docPath={slug}/>
                </ArticleBody>
            </ProviderFrontmatter>
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
        description
        eventType
        featured
        location
        sessionsDisplay
        showOutline
        subTitle
        title
      }
      headings(depth: h1) {
        depth
        value
      }
      html
      htmlAst
    }
    sitePage(context: {slug: {eq: $slug }}) {
      context {
        navItemNext {
          name
          path
        }
        navItemPrevious {
          name
          path
        }
        navItems {
          file
          name
          navItems {
            file
            name
            path
          }
          path
          slugs
        }
        slug
        tabs {
          active
          name
          path
        }
        title
      }
    }
  }
`;
