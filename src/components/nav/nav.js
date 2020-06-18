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
import {DraftStaticQuery} from "../../hooks/draft-query";
import {NavStaticQuery} from "../../hooks/nav-query";
import * as NavigationService from '../../utils/navigation.service';
import * as ScrollingService from "../../utils/scrolling.service";

// Styles
import compStyles from "./nav.module.css";

let classNames = require("classnames");
let navEl;

class Nav extends React.Component {

    componentDidMount() {

        // Side nav container element
        navEl = document.getElementById("nav");

        // Initialize nav style
        this.setSideNavMaxHeight();

        window.addEventListener("scroll", this.setSideNavMaxHeight);
        window.addEventListener("resize", this.setSideNavMaxHeight);
    };

    componentWillUnmount() {

        window.removeEventListener("scroll", this.setSideNavMaxHeight);
        window.removeEventListener("resize", this.setSideNavMaxHeight);
    };

    componentDidUpdate(prevProp) {

        const {bannerHeight} = this.props;

        if ( prevProp.bannerHeight !== bannerHeight ) {

            this.setSideNavMaxHeight();
        }
    }

    isActive = (key) => {

        const {docPath} = this.props;

        return docPath === key;
    };

    isSelected = (key) => {

        const {docPath} = this.props;

        return docPath.startsWith(key) && docPath !== key;
    };

    setSideNavMaxHeight = () => {

        const {bannerHeight} = this.props;

        // Sets the nav container maxHeight.
        ScrollingService.calculateNavMaxHeight(bannerHeight, navEl);
    };

    render() {
        const {hideNav, leftAlignPage, nav} = this.props;

        const NavItem = (props) => {

            const {item} = props,
                {key, name, secondaryLinks} = item;

            return (
                <li>
                    <Link className={classNames(compStyles.link, {[compStyles.active]: this.isActive(key)}, {[compStyles.selected]: this.isSelected(key)})}
                          to={NavigationService.getPath(item)}>{name}</Link>
                    {secondaryLinks ?
                        <ul>{secondaryLinks.map((nestedItem, k) =>
                            <NavItem key={k} item={nestedItem}/>)}
                        </ul> : null}
                </li>
            )
        };

        return (
            <div className={compStyles.sideNavContainer}>
                <div className={classNames({[compStyles.left]: leftAlignPage}, compStyles.sideNav, {[compStyles.hidden]: hideNav})} id="nav">
                    <ul>
                        {!hideNav && nav.map((navItem, i) => <NavItem key={i} item={navItem}/>)}
                    </ul>
                </div>
            </div>
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
        <Nav nav={nav} docPath={docPath} hideNav={hideNav} {...props}/>
    );
}
