/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - markdown component.
 */

// Core dependencies
import React, {useCallback, useEffect, useRef} from "react";
import rehypeReact from "rehype-react";

// App dependencies
import Button from "../button/button";
import ButtonLink from "../button-link/button-link";
import DashboardAnVIL from "../dashboard/dashboard-anvil";
import DashboardNCPI from "../dashboard/dashboard-ncpi";
import EventHero from "../event-hero/event-hero";
import Events from "../events/events";
import ExternalLink from "../anchor-element/external-link/external-link";
import Figure from "../figure/figure";
import FigureCaption from "../figure/figure-caption/figure-caption";
import Hero from "../hero/hero";
import InternalLink from "../internal-link/internal-link";
import News from "../news/news";
import Platforms from "../platforms/platforms";
import SiteSearch from "../site-search/site-search";
import Socials from "../socials/socials";
import SocialLink from "../socials/social-link/social-link";
import SocialTwitter from "../socials/social-twitter/social-twitter";
import SocialTwitterHandle from "../socials/social-twitter-handle/social-twitter-handle";
import SocialTwitterHashTag from "../socials/social-twitter-hashtag/social-twitter-hashtag";
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

const classNames = require("classnames");

function Markdown(props) {

    const {children, className} = props;
    const refMarkdown = useRef(null);
    const renderAst = new rehypeReact({
        createElement: React.createElement,
        components: {
            "button": Button,
            "button-link": ButtonLink,
            "dashboard-anvil": DashboardAnVIL,
            "dashboard-ncpi": DashboardNCPI,
            "event-hero": EventHero,
            "events": Events,
            "external-link": ExternalLink,
            "figure": Figure,
            "figure-caption": FigureCaption,
            "hero": Hero,
            "internal-link": InternalLink,
            "news": News,
            "platforms": Platforms,
            "site-search": SiteSearch,
            "socials": Socials,
            "social-link": SocialLink,
            "social-twitter": SocialTwitter,
            "social-twitter-handle": SocialTwitterHandle,
            "social-twitter-hashtag": SocialTwitterHashTag,
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

    const initAddClassLists = useCallback(() => {

        /* Grab the content element. */
        const contentEl = document.querySelector('[id^="content"]');

        if ( !contentEl ) {
            return;
        }

        /* Grab <span> that wraps the images for medium-zoom capability (therefore will exclude gif images). */
        const imagesWithZoomEls = Array.from(contentEl.getElementsByClassName("gatsby-resp-image-wrapper"));

        /* Grab <div> that wraps a code block with gatsby-remark-prismjs. */
        const prismsEls = Array.from(contentEl.getElementsByClassName("gatsby-highlight"));

        /* Grab <div> that wraps videos. */
        const videosEls = Array.from(contentEl.getElementsByClassName("gatsby-resp-iframe-wrapper"));

        /* Add class name. */
        imagesWithZoomEls.map(imageEl => imageEl.classList.add(compStyles.zoomIcon));
        prismsEls.map(prismEl => prismEl.classList.add(compStyles.codeBlock));
        videosEls.map(videoEl => videoEl.classList.add(compStyles.video));
    }, []);

    /**
     * Wraps a container around any markdown <table> elements to facilitate overflow styles on the table.
     */
    const initTableOverflow = useCallback(() => {

        /* Grab any direct descendants of the markdown container. */
        const markdownNodes = refMarkdown.current?.firstChild?.children;

        if ( markdownNodes ) {

            /* Grab only table elements that are direct descendants of the markdown. */
            /* By filtering direct descendants, the dashboard tables are excluded from this process. */
            const tableNodes = [...markdownNodes].filter(node => node.nodeName === "TABLE");

            /* For each table node, wrap within a container element. */
            tableNodes.forEach(tableEl => insertTableOverflowNode(tableEl));
        }
    }, []);

    const insertTableOverflowNode = (tableEl) => {

        /* Create the container with "tableContainer" class. */
        const containerEl = document.createElement("div");
        containerEl.classList.add(compStyles.tableContainer);

        /* Inset new container element before existing table element. */
        tableEl.parentNode.insertBefore(containerEl, tableEl);

        /* Append the table element to the new container element. */
        containerEl.appendChild(tableEl);
    };

    /* useEffect - componentDidMount, componentWillUnmount. */
    /* Set up class lists. */
    useEffect(() => {

        initAddClassLists();
        initTableOverflow();
    }, [initAddClassLists, initTableOverflow]);

    return (
        <div id={`content${identifier}`} className={markdownClassNames} ref={refMarkdown}>{renderAst(children)}</div>
    );
}

export default React.memo(Markdown);
