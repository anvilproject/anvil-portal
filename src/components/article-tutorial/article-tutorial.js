/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - article tutorial component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import React, { useCallback, useEffect, useRef, useState } from "react";

// App dependencies
import ArticleContentContainer from "../article-content-container/article-content-container";
import ArticleContentPositioner from "../article-content-positioner/article-content-positioner";
import SideBar from "../side-bar/side-bar";
import Spy from "../spy/spy";

// Styles
import * as articleStyles from "../article/article.module.css";
import * as globalStyles from "../../styles/global.module.css";

function ArticleTutorial(props) {
  const { bannerHeight, children, docPath } = props;
  const refArticle = useRef(null);
  const [articleOffsetTop, setArticleOffsetTop] = useState(0);
  const [activeOutline, setActiveOutline] = useState("");

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
    <section className={articleStyles.section} ref={refArticle}>
      <div
        className={classNames(globalStyles.container, articleStyles.container)}
      >
        <SideBar
          activeOutline={activeOutline}
          articleOffsetTop={articleOffsetTop}
          bannerHeight={bannerHeight}
          docPath={docPath}
        />
        <ArticleContentPositioner>
          <ArticleContentContainer>
            <Spy
              articleOffsetTop={articleOffsetTop}
              setActiveOutline={setActiveOutline}
            >
              {children}
            </Spy>
          </ArticleContentContainer>
        </ArticleContentPositioner>
      </div>
    </section>
  );
}

export default ArticleTutorial;
