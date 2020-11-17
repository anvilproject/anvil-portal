/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav component.
 */

// Core dependencies
import React, {useCallback, useEffect, useRef} from "react";

// App dependencies
import NavList from "./nav-list/nav-list";
import * as NavigationService from '../../utils/navigation.service';
import * as ScrollingService from "../../utils/scrolling.service";

// Styles
import compStyles from "./nav.module.css";

function Nav(props) {

    const {bannerHeight, docPath} = props;
    const navRef = useRef(null);
    const nav = NavigationService.getNav(docPath);
    const showNav = nav.length > 1;

    const setSideNavMaxHeight = useCallback(() => {

        /* Sets the nav container maxHeight. */
        ScrollingService.calculateNavMaxHeight(bannerHeight, navRef.current);
    }, [bannerHeight]);

    /* useEffect - componentDidMount, componentWillUnmount. */
    useEffect(() => {

        /* Initialize nav style. */
        setSideNavMaxHeight();

        /* Add event listeners "scroll" and "resize". */
        window.addEventListener("scroll", setSideNavMaxHeight);
        window.addEventListener("resize", setSideNavMaxHeight);

        return() => {

            /* Remove event listeners. */
            window.removeEventListener("scroll", setSideNavMaxHeight);
            window.removeEventListener("resize", setSideNavMaxHeight);
        };
    }, [setSideNavMaxHeight]);

    /* useEffect - componentDidUpdate - bannerHeight. */
    useEffect(() => {

        setSideNavMaxHeight();
    }, [setSideNavMaxHeight]);

    return (
        <div className={compStyles.sideNavContainer}>
            {showNav ?
                <div className={compStyles.sideNav} ref={navRef}>
                    <NavList docPath={docPath} nav={nav}/>
                </div> : null}
        </div>
    );
}

export default Nav;
