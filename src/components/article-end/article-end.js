/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL article end component.
 */

// Core dependencies
import classNames from "classnames"; // Class name helper
import { Link } from "gatsby";
import React from "react";

// Styles
import * as compStyles from "./article-end.module.css";

class ArticleEnd extends React.Component {
  render() {
    const { docPath } = this.props,
      editPath = `https://github.com/anvilproject/anvil-portal/tree/main/content${docPath}.md`;

    return (
      <div className={classNames(compStyles.articleEnd)}>
        <a href={editPath} rel="noopener" target="_blank">
          Improve this page
        </a>
        <Link to={"/guides"}>Content guide</Link>
      </div>
    );
  }
}

export default (props) => {
  return <ArticleEnd {...props} />;
};
