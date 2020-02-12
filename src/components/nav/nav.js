/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav component.
 */

// Core dependencies
import {Link} from "gatsby";
import React from "react";

// App dependencies
import {DraftStaticQuery} from "../../hooks/draftQuery";
import {NavStaticQuery} from "../../hooks/navQuery";
import * as NavigationService from '../../utils/navigation.service';

// Styles
import compStyles from "./nav.module.css";

let classNames = require("classnames");

class Nav extends React.Component {

    isActive = (key) => {

        const {docPath} = this.props;

        return docPath === key;
    };

    isSelected = (key) => {

        const {docPath} = this.props;

        return docPath.startsWith(key) && docPath !== key;
    };

    render() {
        const {hideNav, nav} = this.props;

        const NavItem = (props) => {

            const {item} = props,
                {key, name, secondaryLinks} = item;

            return (
                <li>
                    <Link className={classNames(compStyles.link, {[compStyles.active]: this.isActive(key)}, {[compStyles.selected]: this.isSelected(key)})} to={NavigationService.getPath(item)}>{name}</Link>
                    {secondaryLinks ?
                        <ul>{secondaryLinks.map((nestedItem, k) =>
                            <NavItem key={k} item={nestedItem}/>)}</ul> : null}
                </li>
            )
        };

        return (
            <ul className={classNames(compStyles.sideNav, {[compStyles.hidden]: hideNav})}>
                {!hideNav && nav.map((navItem, i) => <NavItem key={i} item={navItem}/>)}
            </ul>
        );
    }
}

export default (props) => {

    const docPath = props.docPath;
    const allSiteMapYaml = docPath ? NavigationService.getSectionNav(NavStaticQuery(), docPath) : [];
    const draftDocs = DraftStaticQuery();
    const nav = NavigationService.removeDraftDocuments(allSiteMapYaml, draftDocs);
    const hideNav = nav.length <= 1;

    return (
        <Nav nav={nav} docPath={docPath} hideNav={hideNav}/>
    );
}
