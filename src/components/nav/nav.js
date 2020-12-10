/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL nav component.
 */

// Core dependencies
import React, {useCallback, useEffect, useRef, useState} from "react";

// App dependencies
import NavList from "./nav-list/nav-list";
import * as ScrollingService from "../../utils/scrolling.service";

// Styles
import compStyles from "./nav.module.css";

function Nav(props) {

    const {articleOffsetTop, bannerHeight, docPath, navItems} = props;
    const navRef = useRef(null);
    const [navStyles, setNavStyles] = useState({maxHeight: `unset`, top: `unset`});
    const {maxHeight, top} = navStyles || {};
    const showNav = navItems && navItems.length > 0;

    const updateNavStyles = useCallback(() => {

        /* Sets the nav container maxHeight and top position. */
        const styles = ScrollingService.calculateNavStyles(bannerHeight, navRef.current, articleOffsetTop);

        setNavStyles(navStyles => ({...navStyles, maxHeight: styles.maxHeight, top: styles.top}));
    }, [articleOffsetTop, bannerHeight]);

    /* useEffect - componentDidMount, componentWillUnmount. */
    useEffect(() => {

        /* Initialize nav style. */
        updateNavStyles();

        /* Add event listeners "scroll" and "resize". */
        window.addEventListener("scroll", updateNavStyles);
        window.addEventListener("resize", updateNavStyles);

        return() => {

            /* Remove event listeners. */
            window.removeEventListener("scroll", updateNavStyles);
            window.removeEventListener("resize", updateNavStyles);
        };
    }, [updateNavStyles]);

    /* useEffect - componentDidUpdate - bannerHeight, articleOffsetTop. */
    useEffect(() => {

        updateNavStyles();
    }, [updateNavStyles]);

    return (
        <div className={compStyles.sideNavContainer}>
            {showNav ?
                <div className={compStyles.sideNav} ref={navRef} style={{maxHeight: maxHeight, top: top}}>
                    <NavList docPath={docPath} navItems={navItems}/>
                </div> : null}
        </div>
    );
}

export default Nav;
