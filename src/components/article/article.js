/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - article component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React, { useCallback, useEffect, useRef, useState } from "react";

// App dependencies
import ArticleContentContainer from "../article-content-container/article-content-container";
import ArticleContentPositioner from "../article-content-positioner/article-content-positioner";
import Nav from "../nav/nav";
import Outline from "../outline/outline";
import Spy from "../spy/spy";

// Styles
import * as compStyles from "./article.module.css";
import * as globalStyles from "../../styles/global.module.css";

function Article(props) {
  const { bannerHeight, children, docPath, navigation, noSpy, showOutline } =
    props;
  const refArticle = useRef(null);
  const [activeOutline, setActiveOutline] = useState("");
  const [articleOffsetTop, setArticleOffsetTop] = useState(0);
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
        <Nav
          articleOffsetTop={articleOffsetTop}
          bannerHeight={bannerHeight}
          docPath={docPath}
          navigation={navigation}
        />
        <ArticleContentPositioner>
          <ArticleContentContainer>
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
