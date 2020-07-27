/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL providers component.
 */

// Core dependencies
import React from "react";

// App dependencies
import ProviderDashboardFilter from "./provider-dashboard-filter";
import ProviderFrontmatter from "./provider-frontmatter";

class Providers extends React.Component {

    render() {
        const {children, frontmatter} = this.props;
        return (
            <ProviderFrontmatter frontmatter={frontmatter}>
                <ProviderDashboardFilter>
                    {children}
                </ProviderDashboardFilter>
            </ProviderFrontmatter>
        )
    }
}

export default Providers;
