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
import * as EnvironmentService from "../../utils/environment/environment.service";

class SEO extends React.Component {

    render() {
        const {description, ncpi, site, title} = this.props,
            siteURL = EnvironmentService.getCurrentEnvironmentURL(),
            imgFileName = ncpi ? "twitter-ncpi.png" : "twitter-anvil.png",
            twitterImgUrl = `${siteURL}images/${imgFileName}`;
        return (
            <Helmet>
                <meta property="og:title" content={title}/>
                <meta property="og:site_name" content={site}/>
                <meta property="twitter:title" content={title}/>
                {description ? [
                    <meta property="twitter:description" content={description} key="twitter:description"/>,
                    <meta name="description" content={description} key="description"/>,
                    <meta property="og:description" content={description} key="og:description"/>,
                    <meta name="twitter:image" content={twitterImgUrl} key="twitter:image"/>
                ] : null}
                <meta name="twitter:card" content="summary"/>
            </Helmet>
        )
    }
}

export default SEO;
