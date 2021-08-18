/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - article component.
 */

// Core dependencies
import React, { useCallback, useEffect, useRef, useState } from "react";

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
      navigation,
      noSpy,
      showOutline,
      styles,
    } = props,
    { alignment } = styles || {};
  const refArticle = useRef(null);
  const [activeOutline, setActiveOutline] = useState("");
  const [articleOffsetTop, setArticleOffsetTop] = useState(0);
  const left = StylesService.isPageAlignmentLeft(alignment);
  const useOutline = showOutline;
  const useSpy = showOutline && !noSpy;

  const updateArticleOffsetTop = useCallback(() => {
    setArticleOffsetTop(refArticle.current.offsetTop);
  }, []);

  /* useEffect - componentDidMount, componentWillUnmount. */
  useEffect(() => {
    /* Initialize article offset top. */
    updateArticleOffsetTop();

    /* Add event listeners "scroll" and "resize". */
    window.addEventListener("resize", updateArticleOffsetTop);

    return () => {
      /* Remove event listeners. */
      window.removeEventListener("resize", updateArticleOffsetTop);
    };
  }, [updateArticleOffsetTop]);

  return (
    <section className={compStyles.section} ref={refArticle}>
      <div className={classNames(globalStyles.container, compStyles.container)}>
        {left ? null : (
          <Nav
            articleOffsetTop={articleOffsetTop}
            bannerHeight={bannerHeight}
            docPath={docPath}
            navigation={navigation}
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
