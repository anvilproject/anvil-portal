/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL frontmatter provider component.
 */

// Core dependencies
import React from "react";

// App dependencies
import ContextFrontmatter from "../context-frontmatter/context-frontmatter";

class ProviderFrontmatter extends React.Component {

    render() {
        const {children, frontmatter} = this.props;
        return (
            <ContextFrontmatter.Provider value={frontmatter}>
                {children}
            </ContextFrontmatter.Provider>
        )
    }
}

export default ProviderFrontmatter;
