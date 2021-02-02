/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - title component.
 */

// Core dependencies
import React, {useContext} from "react";

// App dependencies
import ContextAnVILPortal from "../context-anvil-portal/context-anvil-portal";

// Styles
import compStyles from "./title.module.css";

function Title(props) {

    const {title} = props;
    const {siteSearchTerms} = useContext(ContextAnVILPortal);

    return (
        <h1 className={compStyles.title}>
            <span>{title}</span>
            {siteSearchTerms ? <span> for "{siteSearchTerms ? siteSearchTerms : null}"</span> : null}
        </h1>
    );
}

export default Title;
