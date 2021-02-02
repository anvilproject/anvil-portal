/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL provider component.
 * Provider for app level functionality.
 */

// Core dependencies
import React, {useState} from "react";

// App dependencies
import ContextAnVILPortal from "../context-anvil-portal/context-anvil-portal";

function ProviderAnVILPortal(props) {

    const {children} = props;
    const [siteSearchTerms, setSiteSearchTerms] = useState("");

    const onSetSiteSearchTerms = (terms) => {

        setSiteSearchTerms(terms);
    };

    return (
        <ContextAnVILPortal.Provider value={{onSetSiteSearchTerms, siteSearchTerms}}>
            {children}
        </ContextAnVILPortal.Provider>
    )
}

export default ProviderAnVILPortal;
