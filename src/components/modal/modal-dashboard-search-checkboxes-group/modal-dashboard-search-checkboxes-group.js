/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL modal dashboard search checkboxes group component.
 */

// Core dependencies
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";

// App dependencies
import ContextModal from "../context-modal/context-modal";
import ContextDashboard from "../../dashboard/context-dashboard/context-dashboard";
import DashboardSearchCheckbox from "../../dashboard/dashboard-search-checkbox/dashboard-search-checkbox";
import DashboardSearchSelectedToolbar from "../../dashboard/dashboard-search-selected-toolbar/dashboard-search-selected-toolbar";
import DashboardSearchSummary from "../../dashboard/dashboard-search-summary/dashboard-search-summary";
import Modal from "../modal";
import ModalClose from "../modal-close/modal-close";
import * as DashboardSearchService from "../../../utils/dashboard/dashboard-search.service";

// Styles
import compStyles from "./modal-dashboard-search-checkboxes-group.module.css";
import globalStyles from "../../../styles/global.module.css";

const classNames = require("classnames");

function ModalDashboardSearchCheckboxesGroup() {

    const {checkboxGroups} = useContext(ContextDashboard);
    const {modal, onCloseModal} = useContext(ContextModal);
    const refPanel = useRef(null);
    const [columns, setColumns] = useState([]);
    const [maxColumns, setMaxColumns] = useState(1);
    const {modalProps} = modal,
        {groupName} = modalProps || {};
    const checkboxGroup = checkboxGroups.find(checkboxGroup => checkboxGroup.groupName === groupName);
    const checkboxes = checkboxGroup.checkboxes;
    const checkboxWidth = 300;

    const onCalculateMaxColumns = useCallback(() => {

        if ( refPanel.current ) {

            /* Grab the modal panel width. */
            /* Calculate max number of displayable columns. */
            const panelWidth = refPanel.current.clientWidth;
            const maxCols = Math.trunc(panelWidth / checkboxWidth) || 1;
            setMaxColumns(maxCols);
        }
    }, [checkboxWidth]);

    /* useEffect - componentDidMount/componentWillUnmount. */
    /* Event listeners - resize. */
    useEffect(() => {

        /* Add event listeners. */
        window.addEventListener("resize", onCalculateMaxColumns);

        return() => {

            /* Remove event listeners. */
            window.removeEventListener("resize", onCalculateMaxColumns);
        }
    }, [onCalculateMaxColumns]);

    /* useEffect - componentDidMount. */
    useEffect(() => {

        /* Initialize columns. */
        onCalculateMaxColumns();
    }, [onCalculateMaxColumns]);

    /* useEffect - componentDidUpdate - maxColumns. */
    useEffect(() => {

        setColumns(columns => DashboardSearchService.getDashboardCheckboxColumns(checkboxes, maxColumns));
    }, [checkboxes, maxColumns]);

    return (
        <Modal>
            <div className={classNames(globalStyles.container, compStyles.modalContent)}>
                <ModalClose onCloseModal={onCloseModal}/>
                <h1>{groupName}</h1>
                <DashboardSearchSummary/>
                <DashboardSearchSelectedToolbar/>
                <div className={compStyles.checkboxes} ref={refPanel}>
                    {columns.map((cBoxes, b) =>
                        <span className={compStyles.col} key={b}>
                            {cBoxes.map((checkbox, c) => <DashboardSearchCheckbox key={c} checkbox={checkbox}/>)}
                        </span>)}
                </div>
            </div>
        </Modal>
    )
}

export default ModalDashboardSearchCheckboxesGroup;
