/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - card collection component.
 * Use of this component within markdown is possible.
 * Use the tag <card-collection collection="inset-collection-prop-name" status="insert-status-prop-name"></card-collection> but ensure it is closed.
 *
 * The prop "collection" is required and should be any of the following values:
 * - "tools"
 * - "platforms"
 *
 * The prop "status" is required only if collection prop is "tools", and should be one of the following values:
 * - "current"
 * - "coming"
 */

// Core dependencies
import React from "react";

// App dependencies
import ClickHandler from "../click-handler/click-handler";
import GoArrow from "../go-arrow/go-arrow";
import {CardCollectionStaticQuery} from "../../hooks/card-collection-query";
import Markdown from "../markdown/markdown";
import * as AnvilGTMService from "../../utils/anvil-gtm/anvil-gtm.service";
import * as CollectionService from "../../utils/collection.service";
import * as DOMService from "../../utils/dom.service";

// Styles
import compStyles from "./card-collection.module.css";
import arrowStyles from "../go-arrow/go-arrow.module.css";

let anchorEls;

class CardCollection extends React.Component {

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
        const {collection} = this.props;

        const Collection = (props) => {
            const {card} = props,
                {logo, path, title, url} = card || {},
                {childMarkdownRemark} = path || {},
                {htmlAst} = childMarkdownRemark || {},
                {childImageSharp} = logo || {},
                {fluid} = childImageSharp || {},
                {src} = fluid || {};

            const linkTo = this.isValidUrl(url) ? url : "";
            const openTab = this.isValidUrl(url);

            return (
                <ClickHandler className={compStyles.card}
                              clickAction={() => this.redirect(linkTo, openTab, title)}
                              tag="div" label={title}>
                    <div className={compStyles.primary}>
                        {src ? <img className={compStyles.icon} src={src} alt="logo"/> : null}
                        <h4>{title}</h4>
                    </div>
                    <Markdown className={compStyles.secondary}>{htmlAst}</Markdown>
                    <GoArrow className={arrowStyles.stretch}><span>Learn More</span></GoArrow>
                </ClickHandler>
            )
        };

        return (
            <div className={compStyles.collection}>
                {collection.map((item, i) => <Collection key={i} card={item}/>)}
            </div>
        );
    }
}

export default (props) => {

    const collection = CollectionService.getCollection(props, CardCollectionStaticQuery());
    return (
        collection ? <CardCollection collection={collection}/> : null
    )
}
