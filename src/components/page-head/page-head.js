/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL page head component.
 */

// Core dependencies
import React from "react";
import Helmet from "react-helmet";

// App dependencies
import * as EnvironmentService from "../../utils/environment/environment.service";

class PageHead extends React.Component {

    render() {
        const {pageTitle, site} = this.props,
            title = pageTitle ? `${pageTitle} | ${site}` : site;
        return (
            <Helmet>
                <title>{title}</title>
                {EnvironmentService.isProd() ? null : <meta name="robots" content="noindex" />}
                <link href="https://fonts.googleapis.com/css?family=Barlow:300,400,500|Open+Sans:300,400,600,700&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"/>
                <html lang="en" />
            </Helmet>
        )
    }
}

export default PageHead;
