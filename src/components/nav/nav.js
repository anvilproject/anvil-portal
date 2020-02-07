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

    getClassNames = ({href, location}) => {

        if ( !location ) {

            return;
        }

        if ( !location.pathname ) {

            return;
        }

        const search = location.search ? location.search : "";
        const pathName = (location.pathname.endsWith("/") ? `${location.pathname.slice(0, -1)}${search}` : `${location.pathname}${search}`).trim();

        return href === pathName ?
            {className: (classNames(compStyles.link, compStyles.active))} : {className: compStyles.link}
    };

    render() {
        const {hideNav, nav} = this.props;

        const NavItem = (props) => {

            const {item} = props,
                {name/*, secondaryLinks*/} = item;

            return (
                <li>
                    <Link getProps={this.getClassNames} to={NavigationService.getPath(item)}>{name}</Link>
{/*
                    {secondaryLinks ?
                        <ul>{secondaryLinks.map((nestedItem, k) =>
                            <NavItem key={k} item={nestedItem}/>)}</ul> : null}
*/}
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
        <Nav nav={nav} hideNav={hideNav}/>
    );
}
