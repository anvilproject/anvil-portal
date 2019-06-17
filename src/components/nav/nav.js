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
import {navStaticQuery} from "../../hooks/navQuery";
import * as NavigationService from '../../utils/navigation.service';

// Styles
import compStyles from "./nav.module.css";
import globalStyles from "../../styles/global.module.css";

let classNames = require("classnames");

class Nav extends React.Component {

    render() {
        const {hideNav, nav} = this.props;
        return (
            <ul className={classNames(compStyles.sideNav, {[compStyles.hidden]: hideNav})}>
                {!hideNav && nav.map((p, i) =>
                    <li key={i} className={compStyles.sideNavLink}>
                        <Link to={NavigationService.getPath(p)} className={globalStyles.link} activeClassName={compStyles.active}>{p.name}</Link>
                    </li>)}
            </ul>
        );
    }
}

export default (props) => {

    let docPath = props.docPath,
        nav = NavigationService.getSectionNav(navStaticQuery(), docPath),
        hideNav = nav.length <= 1;

    return (
        <Nav nav={nav} hideNav={hideNav} {...props}/>
    );
}
