/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - article tutorial component.
 */

// Core dependencies
import React, { useEffect, useRef, useState } from "react";

// App dependencies
import ArticleContentContainer from "../article-content-container/article-content-container";
import ArticleContentPositioner from "../article-content-positioner/article-content-positioner";
import SideBar from "../side-bar/side-bar";
import Spy from "../spy/spy";

// Styles
import articleStyles from "../article/article.module.css";
import globalStyles from "../../styles/global.module.css";

const classNames = require("classnames");

function ArticleTutorial(props) {
  const { bannerHeight, children, docPath } = props;
  const refArticle = useRef(null);
  const [articleOffsetTop, setArticleOffsetTop] = useState(0);
  const [activeOutline, setActiveOutline] = useState("");

  /* useEffect - componentDidMount/componentWillUnmount. */
  useEffect(() => {
    const offsetTop = refArticle.current.offsetTop;
    setArticleOffsetTop(offsetTop);
  }, []);

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
