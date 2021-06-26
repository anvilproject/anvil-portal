/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - article component.
 */

// Core dependencies
import React, { useEffect, useRef, useState } from "react";

// App dependencies
import ArticleContentContainer from "../article-content-container/article-content-container";
import ArticleContentPositioner from "../article-content-positioner/article-content-positioner";
import Nav from "../nav/nav";
import Outline from "../outline/outline";
import Spy from "../spy/spy";
import * as StylesService from "../../utils/styles.service";

// Styles
import compStyles from "./article.module.css";
import globalStyles from "../../styles/global.module.css";

const classNames = require("classnames");

function Article(props) {
  const {
      bannerHeight,
      children,
      docPath,
      navigations,
      noSpy,
      showOutline,
      styles
    } = props,
    { navItems } = navigations || {},
    { alignment } = styles || {};
  const refArticle = useRef(null);
  const [activeOutline, setActiveOutline] = useState("");
  const [articleOffsetTop, setArticleOffsetTop] = useState(0);
  const left = StylesService.isPageAlignmentLeft(alignment);
  const useOutline = showOutline;
  const useSpy = showOutline && !noSpy;

  /* useEffect - componentDidMount/componentWillUnmount. */
  useEffect(() => {
    setArticleOffsetTop(refArticle.current.offsetTop);
  }, []);

  return (
    <section className={compStyles.section} ref={refArticle}>
      <div className={classNames(globalStyles.container, compStyles.container)}>
        {left ? null : (
          <Nav
            articleOffsetTop={articleOffsetTop}
            bannerHeight={bannerHeight}
            docPath={docPath}
            navItems={navItems}
          />
        )}
        <ArticleContentPositioner left={left}>
          <ArticleContentContainer left={left}>
            {useSpy ? (
              <Spy
                articleOffsetTop={articleOffsetTop}
                setActiveOutline={setActiveOutline}
              >
                {children}
              </Spy>
            ) : (
              children
            )}
            {useOutline ? (
              <Outline
                activeOutline={activeOutline}
                articleOffsetTop={articleOffsetTop}
                bannerHeight={bannerHeight}
                docPath={docPath}
              />
            ) : null}
          </ArticleContentContainer>
        </ArticleContentPositioner>
      </div>
    </section>
  );
}

export default Article;
