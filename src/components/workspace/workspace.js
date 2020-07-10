/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL workspace component.
 */

// Core dependencies
import React from "react";

// App dependencies
import BrandIcon from "../brand-icon/brand-icon";
import ListItem from "../list-item/list-item";
import ListItemContent from "../list-item/list-item-content";
import ListItemIcon from "../list-item/list-item-icon";
import Markdown from "../markdown/markdown";
import * as AnvilGTMService from "../../utils/anvil-gtm/anvil-gtm.service";
import * as DOMService from "../../utils/dom.service";

// Styles
import compStyles from "./workspace.module.css";

class Workspace extends React.Component {

    redirect = (linkTo, linkText) => {

        window.open(linkTo);

        // Track click to external sites
        if ( DOMService.isHrefExternal(linkTo) || DOMService.isMailTo(linkTo) ) {
            AnvilGTMService.trackExternalLinkClicked(linkTo, linkText);
        }
    };

    render() {
        const {workspace} = this.props,
            {frontmatter, htmlAst} = workspace,
            {logo, title, url} = frontmatter || {},
            {childImageSharp} = logo || {},
            {fluid} = childImageSharp || {},
            {src} = fluid || {};
        return (
            <div className={compStyles.workspace}>
                <ListItem redirectTo={() => this.redirect(url, title)} label={title}>
                    <ListItemIcon>
                        <BrandIcon src={src} alt={title}/>
                    </ListItemIcon>
                    <ListItemContent>
                        <h3>{title}</h3>
                        <Markdown>{htmlAst}</Markdown>
                    </ListItemContent>
                </ListItem>
            </div>
        );
    }
}

export default Workspace;
