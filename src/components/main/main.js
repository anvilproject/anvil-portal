/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL main [content] component.
 */

// Core dependencies
import React, { useContext } from "react";

// App dependencies
import Article from "../article/article";
import ArticleTutorial from "../article-tutorial/article-tutorial";
import ContextFrontmatter from "../context-frontmatter/context-frontmatter";

// Styles
import * as compStyles from "./main.module.css";

function Main(props) {
  const {
    bannerHeight,
    children,
    docPath,
    homePage,
    navigation,
    noSpy,
    showOutline,
  } = props;
  const { tutorial } = useContext(ContextFrontmatter);

  return (
    <main className={compStyles.main}>
      {homePage ? (
        children
      ) : tutorial ? (
        <ArticleTutorial bannerHeight={bannerHeight} docPath={docPath}>
          {children}
        </ArticleTutorial>
      ) : (
        <Article
          bannerHeight={bannerHeight}
          docPath={docPath}
          navigation={navigation}
          noSpy={noSpy}
          showOutline={showOutline}
        >
          {children}
        </Article>
      )}
    </main>
  );
}

export default Main;
