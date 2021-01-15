/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL header component.
 */

// Core dependencies
import React, {useCallback, useEffect, useRef, useState} from "react";

// App dependencies
import HeaderLogo from "./header-logo/header-logo";
import HeaderMenuButton from "./header-menu-button/header-menu-button";
import HeaderNavItems from "./header-nav-items/header-nav-items";
import SiteSearchButton from "../site-search/site-search-button/site-search-button";

// Styles
import compStyles from "./header.module.css";
import globalStyles from "../../styles/global.module.css";

function Header(props) {

    const {ncpi, setSiteScrollable} = props;
    const refDelayResize = useRef(0);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleResize = useCallback(() => {

        /* Clear any previously set timeout. */
        if ( refDelayResize.current ) {

            clearTimeout(refDelayResize.current);
        }

        /* Delay resize - improves indexing/search performance. */
        refDelayResize.current = setTimeout(() => {

            const windowWidth = window.innerWidth;

            if ( windowWidth >= 720 ) {

                /* Close menu. */
                setMenuOpen(false);
            }
        }, 300);
        return () => clearTimeout(refDelayResize.current);
    }, []);

    /* useEffect - componentDidMount/componentWillUnmount. */
    /* Event listeners - resize. */
    useEffect(() => {

        /* Add event listeners. */
        window.addEventListener("resize", handleResize);

        return() => {

            /* Remove event listeners. */
            window.removeEventListener("resize", handleResize);
        }
    }, [handleResize]);

    /* useEffect - componentDidUpdate - menuOpen. */
    useEffect(() => {

        setSiteScrollable(!menuOpen);
    }, [menuOpen, setSiteScrollable]);


    return (
        <div className={compStyles.header}>
            <div className={globalStyles.container}>
                <HeaderLogo ncpi={ncpi}/>
                <HeaderNavItems menuOpen={menuOpen} ncpi={ncpi}/>
                <SiteSearchButton/>
                <HeaderMenuButton menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            </div>
        </div>
    );
}

export default Header;
