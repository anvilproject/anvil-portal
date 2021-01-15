/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL site search form component.
 */

// Core dependencies
import {navigate} from "gatsby";
import {useLocation} from "@reach/router";
import React, {useEffect, useRef} from "react";

// Styles
import compStyles from "./site-search-form.module.css";

function SiteSearchForm(props) {

    const {modalAction, onCloseModal} = props;
    const currentLocation = useLocation();
    const inputRef = useRef(null);

    const onHandleSubmit = (event) => {

        event.preventDefault();

        /* Set the search params. */
        const params = new URLSearchParams();
        params.set("q", inputRef.current.value);

        /* Close modal, if already on the search page. */
        if ( currentLocation.pathname === "/search" ) {

            /* Close modal. */
            onCloseModal(modalAction);
        }

        /* Navigate with params. */
        navigate(`/search?${params.toString()}`)
    };

    /* useEffect - componentDidMount, componentWillUnmount. */
    /* Handles external control of focus to the <input>. */
    useEffect(() => {

        inputRef.current.focus();
    }, []);

    return (
        <form className={compStyles.form} onSubmit={(e) => onHandleSubmit(e)}>
            <input className={compStyles.input}
                   placeholder={"Search"}
                   ref={inputRef}
                   type="text"/>
        </form>
    )
}

export default SiteSearchForm;
