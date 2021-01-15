/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL modal site search component.
 */

// Core dependencies
import React from "react";

// App dependencies
import ModalClose from "../modal-close/modal-close";
import SiteSearchForm from "../../site-search/site-search-form/site-search-form";

// Styles
import compStyles from "./modal-site-search.module.css";
import globalStyles from "../../../styles/global.module.css";

const classNames = require("classnames");

function ModalSiteSearch(props) {

    const {modalAction, onCloseModal} = props;

    return (
        <div className={classNames(globalStyles.container, compStyles.siteSearch)}>
            <SiteSearchForm modalAction={modalAction} onCloseModal={onCloseModal}/>
            <ModalClose modalAction={modalAction} onCloseModal={onCloseModal}/>
        </div>
    )
}

export default ModalSiteSearch;
