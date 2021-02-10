/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL provider component.
 * Provider for app level functionality.
 */

// Core dependencies
import React, {useCallback, useEffect, useRef, useState} from "react";

// App dependencies
import ContextAnVILPortal from "../context-anvil-portal/context-anvil-portal";

function ProviderAnVILPortal(props) {

    const {children} = props;
    const refDelayResize = useRef(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [siteScrollable, setSiteScrollable] = useState(true);
    const menuSnapPoint = 720;

    const onSetMenuOpen = useCallback((expanded) => {

        setMenuOpen(expanded);
        setSiteScrollable(!expanded);
    }, []);

    const handleResize = useCallback(() => {

        /* Clear any previously set timeout. */
        if ( refDelayResize.current ) {

            clearTimeout(refDelayResize.current);
        }

        /* Delay resize - improves indexing/search performance. */
        refDelayResize.current = setTimeout(() => {

            const windowWidth = window.innerWidth;

            if ( windowWidth >= menuSnapPoint ) {

                /* Close menu. */
                onSetMenuOpen(false);
            }
        }, 300);
        return () => clearTimeout(refDelayResize.current);
    }, [onSetMenuOpen]);

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

    return (
        <ContextAnVILPortal.Provider value={{menuOpen, onSetMenuOpen, siteScrollable}}>
            {children}
        </ContextAnVILPortal.Provider>
    )
}

export default ProviderAnVILPortal;
