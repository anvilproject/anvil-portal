/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - platforms component.
 * Use of this component within markdown is possible.
 * Use the tag <Platforms></Platforms>.
 *
 * Platforms are located in the /content/platforms/set-of-platforms directory.
 */

// Core dependencies
import React from "react";

// App dependencies
import BrandIcon from "../brand-icon/brand-icon";
import {PlatformsStaticQuery} from "../../hooks/platforms-query";
import ListItem from "../list-item/list-item";
import ListItemContent from "../list-item/list-item-content";
import ListItemIcon from "../list-item/list-item-icon";
import Markdown from "../markdown/markdown";
import * as AnvilGTMService from "../../utils/anvil-gtm/anvil-gtm.service";
import * as CollectionService from "../../utils/collection.service";
import * as DOMService from "../../utils/dom.service";

// Styles
import compStyles from "./platforms.module.css";

let anchorEls;

class Platforms extends React.Component {

    componentDidMount() {

        anchorEls = CollectionService.findCardCollectionAnchorElements(compStyles.secondary);

        this.setAnchorInteractions();
    };

    componentWillUnmount() {

        this.removeAnchorInteractions();
    };

    isValidUrl = (link) => {

        try {
            new URL(link);
            return true;
        }
        catch (_) {
            return false;
        }
    };

    redirect = (linkTo, openTab, linkText) => {

        if (openTab) {

            window.open(linkTo);
        }
        else {

            window.location.href = linkTo;
        }

        // Track click to external sites
        if ( DOMService.isHrefExternal(linkTo) || DOMService.isMailTo(linkTo) ) {
            AnvilGTMService.trackExternalLinkClicked(linkTo, linkText);
        }
    };

    removeAnchorInteractions = () => {

        anchorEls.forEach(anchor => {

            anchor.removeEventListener("click", this.onClickAnchor());
        })
    };

    setAnchorInteractions = () => {

        anchorEls.forEach(anchor => {

            anchor.addEventListener("click", this.onClickAnchor());
        })
    };

    onClickAnchor = (e) => {

        return (e) => {

            const target = e.target;
            if ( !DOMService.isAnchor(target) ) {
                return;
            }

            const url = target.getAttribute("href");
            if ( DOMService.isHrefExternal(url) || DOMService.isMailTo(url) ) {

                const linkText = target.innerText;
                AnvilGTMService.trackExternalLinkClicked(url, linkText);

            }

            e.stopPropagation();
        }
    };

    render() {
        const {platforms} = this.props;

        const Platform = (props) => {
            const {platform} = props,
                {frontmatter, htmlAst} = platform,
                {logo, title, url} = frontmatter || {},
                {childImageSharp} = logo || {},
                {fluid} = childImageSharp || {},
                {src} = fluid || {};

            const linkTo = this.isValidUrl(url) ? url : "";
            const openTab = this.isValidUrl(url);

            return (
                <div className={compStyles.listItem}>
                    <ListItem redirectTo={() => this.redirect(linkTo, openTab, title)} label={title}>
                        <ListItemIcon>
                            <BrandIcon src={src} alt={title}/>
                        </ListItemIcon>
                        <ListItemContent>
                            <h3>{title}</h3>
                            <Markdown className={compStyles.secondary}>{htmlAst}</Markdown>
                        </ListItemContent>
                    </ListItem>
                </div>
            );
        };

        return (
            <div className={compStyles.platforms}>
                {platforms.map((platform, p) => <Platform key={p} platform={platform}/>)}
            </div>
        );
    }
}

export default () => {

    const platforms = PlatformsStaticQuery();

    return (
        platforms ? <Platforms platforms={platforms}/> : null
    )
}
