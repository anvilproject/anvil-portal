/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL [frontmatter] linked template component.
 * Template for linked (nested) markdown files - may redirect to a component if specified.
 */

// Core dependencies
import React from "react";

// App dependencies
import Card from "../components/card/card";


class LinkedTemplate extends React.Component {

    render() {
        const {children, docPath, post} = this.props,
            {frontmatter} = post,
            {component} = frontmatter;
        return (
            component === "card" ? <Card docPath={docPath} post={post}>{children}</Card> :
                <div dangerouslySetInnerHTML={{__html: children}}/>
        );
    }
}

export default LinkedTemplate;

