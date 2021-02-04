/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - article body component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextAnVILPortal from "../context-anvil-portal/context-anvil-portal";
import Markdown from "../markdown/markdown";

// Styles
import compStyles from "./article-body.module.css";

function ArticleBody(props) {

    const {children, className, htmlAst} = props;
    const {siteSearchLoading} = useContext(ContextAnVILPortal);

    return (
        <div className={compStyles.articleBody}>
            <Markdown className={className}>{htmlAst}</Markdown>
            {siteSearchLoading ? null : children}
        </div>
    );
}

export default ArticleBody;
