/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL frontmatter provider component.
 */

// Core dependencies
import React from "react";

// App dependencies
import FrontmatterContext from "../context/frontmatter-context";

class ProviderFrontmatter extends React.Component {

    render() {
        const {children, frontmatter} = this.props;
        return (
            <FrontmatterContext.Provider value={frontmatter}>
                {children}
            </FrontmatterContext.Provider>
        )
    }
}

export default ProviderFrontmatter;
