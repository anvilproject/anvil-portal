/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - markdown component.
 */

// Core dependencies
import React from "react";
import rehypeReact from "rehype-react";

// App dependencies
import DataDashboard from "../data-dashboard/data-dashboard";
import EventHero from "../event-hero/event-hero";
import Events from "../events/events";
import ExternalLink from "../anchor-element/external-link/external-link";
import Figure from "../figure/figure";
import FigureCaption from "../figure/figure-caption/figure-caption";
import Hero from "../hero/hero";
import News from "../news/news";
import Platforms from "../platforms/platforms";
import SiteSearch from "../site-search/site-search";
import Socials from "../socials/socials";
import SocialLink from "../socials/social-link/social-link";
import SocialTwitter from "../socials/social-twitter/social-twitter";
import SocialYoutube from "../socials/social-youtube/social-youtube";
import StyleGuideColorPalette from "../style-guide-color-palette/style-guide-color-palette";
import StyleGuideDownloadLogo from "../style-guide-download-logo/style-guide-download-logo";
import StyleGuideTypography from "../style-guide-typography/style-guide-typography";
import StyleGuideTypographyExample from "../style-guide-typography-example/style-guide-typography-example";
import Tools from "../tools/tools";
import Warning from "../warning/warning";
import Workspaces from "../workspaces/workspaces";

// Styles
import compStyles from "./markdown.module.css";

let classNames = require("classnames");

class Markdown extends React.Component {

    componentDidMount() {

        this.addClassList();
    }

    addClassList = () => {

        /* Grab the content element. */
        const contentEl = document.querySelector('[id^="content"]');

        if ( !contentEl ) {
            return;
        }

        /* Grab <span> that wraps the images for medium-zoom capability (therefore will exclude gif images). */
        const imagesWithZoomEl = Array.from(contentEl.getElementsByClassName("gatsby-resp-image-wrapper"));

        /* Grab <div> that wraps a code block with gatsby-remark-prismjs. */
        const prismsEl = Array.from(contentEl.getElementsByClassName("gatsby-highlight"));

        /* Grab <div> that wraps videos. */
        const videosEl = Array.from(contentEl.getElementsByClassName("gatsby-resp-iframe-wrapper"));

        /* Add class name. */
        imagesWithZoomEl.map(imageEl => imageEl.classList.add(compStyles.zoomIcon));
        prismsEl.map(prismEl => prismEl.classList.add(compStyles.codeBlock));
        videosEl.map(videoEl => videoEl.classList.add(compStyles.video));
    };

    render() {
        const {children, className} = this.props;
        const renderAst = new rehypeReact({
            createElement: React.createElement,
            components: {
                "data-dashboard": DataDashboard,
                "event-hero": EventHero,
                "events": Events,
                "external-link": ExternalLink,
                "figure": Figure,
                "figure-caption": FigureCaption,
                "hero": Hero,
                "news": News,
                "platforms": Platforms,
                "site-search": SiteSearch,
                "socials": Socials,
                "social-link": SocialLink,
                "social-twitter": SocialTwitter,
                "social-youtube": SocialYoutube,
                "style-guide-color-palette": StyleGuideColorPalette,
                "style-guide-download-logo": StyleGuideDownloadLogo,
                "style-guide-typography": StyleGuideTypography,
                "style-guide-typography-example": StyleGuideTypographyExample,
                "tools": Tools,
                "warning": Warning,
                "workspaces": Workspaces
            }
        }).Compiler;
        const identifier = Date.now();
        const markdownClassNames = classNames(className, compStyles.content);
        return (
            <div id={`content${identifier}`} className={markdownClassNames}>{renderAst(children)}</div>
        );
    }
}

export default Markdown;
