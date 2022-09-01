/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL template component.
 * Renders markdown content.
 */

// Core dependencies
import { graphql } from "gatsby";
import React from "react";

// App dependencies
import ArticleBody from "../components/article/article-body";
import ArticleEnd from "../components/article-end/article-end";
import ArticleNavigation from "../components/article-navigation/article-navigation";
import ArticleSocials from "../components/article-socials/article-socials";
import Layout from "../components/layout";
import ProviderFrontmatter from "../components/provider-frontmatter/provider-frontmatter";
import * as TemplateService from "../utils/template.service";

export default ({ data, pageContext }) => {
  const post = data.markdownRemark,
    { fields, frontmatter, htmlAst } = post,
    { slug, styles } = fields,
    { description, showOutline, title } = frontmatter;
  const faq = slug.includes("/faq/") && !slug.includes("/faq/help");
  const ncpi = slug.startsWith("/ncpi");
  const h1 = TemplateService.getPageTitle(htmlAst);
  const pageTitle = h1 ? (faq ? `FAQ - ${h1}` : h1) : title;

  return (
    <ProviderFrontmatter frontmatter={frontmatter}>
      <Layout
        description={description}
        docPath={slug}
        navigation={pageContext}
        ncpi={ncpi}
        showOutline={showOutline}
        styles={styles}
        title={pageTitle}
      >
        <ArticleBody htmlAst={htmlAst}>
          <ArticleSocials />
          <ArticleNavigation navigation={pageContext} />
          <ArticleEnd docPath={slug} />
        </ArticleBody>
      </Layout>
    </ProviderFrontmatter>
  );
};

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        styles {
          alignment
        }
        slug
      }
      frontmatter {
        author
        breadcrumb {
          link
          name
        }
        conference
        date(formatString: "MMMM DD, YYYY")
        description
        eventType
        featured
        hashtag
        location
        sessionsDisplay
        showOutline
        subTitle
        title
        tutorial
      }
      html
      htmlAst
    }
  }
`;
