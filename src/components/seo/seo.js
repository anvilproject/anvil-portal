/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL seo component.
 */

// Core dependencies
import React from "react";
import Helmet from "react-helmet";

// App dependencies
import * as EnvironmentService from "../../utils/environment.service";

class SEO extends React.Component {

    render() {
        const {description, title} = this.props,
            site = "The AnVIL";
        return (
            <Helmet>
                <title>{site}</title>
                {EnvironmentService.isProd() ? null : <meta name="robots" content="noindex" />}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:300&display=swap"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                <link href="https://fonts.googleapis.com/css?family=Barlow:300,400,500|Open+Sans:300,400,600,700&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Round"/>
                <meta property="og:title" content={title}/>
                <meta property="og:site_name" content={site}/>
                <meta property="twitter:title" content={title}/>
                {description ? [
                    <meta property="twitter:description" content={description} key="twitter:description"/>,
                    <meta name="description" content={description} key="description" />
                ] : null}
                <meta name="twitter:card" content="summary"/>
                
                <html lang="en" />
            </Helmet>
        )
    }
}

export default SEO;
