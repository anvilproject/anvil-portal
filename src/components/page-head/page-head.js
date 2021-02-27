/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL page head component.
 * 
 * <script src="https://www.youtube.com/iframe_api"> is required for GTM YouTube tracking. This script is added 
 * automatically if landing page contains a link to a YouTube video. If landing page doesn't contain a YouTube video,
 * the script is never added and subsequent clicks on videos are not tracked (eg when a user navigates from the home page
 * to a page containing a video, this script is not added). By adding this script here, we can ensure that all video
 * events are tracked, regardless of whether the landing page contains a video or not.
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
                <script src="https://www.youtube.com/iframe_api"/>
                <html lang="en" />
            </Helmet>
        )
    }
}

export default PageHead;
