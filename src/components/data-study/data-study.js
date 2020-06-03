/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data study component.
 */

// Core dependencies
import React from "react";

// Styles
import ClickHandler from "../click-handler/click-handler";
import compStyles from "./data-study.module.css";
import * as DashboardTableService from "../../utils/dashboard/dashboard-table.service";
import * as RedirectService from "../../utils/redirect.service";

let classNames = require("classnames");

class DataStudy extends React.Component {

    render() {
        const {study} = this.props,
            {access, consortia, count, dbGapIdAccession, diseases, studyName} = study;
        const linkedTo = DashboardTableService.getCellUrl(dbGapIdAccession, "dbGapIdAccession", false);
        return (
            <div className={compStyles.study}>
                <div className={classNames(compStyles.name)}>{studyName}</div>
                <div className={classNames(compStyles.quickView, compStyles.divide)}>
                    <span className={compStyles.label}>Consortium:</span><span>{consortia}</span>
                    <span className={compStyles.label}>dbGaP Id:</span>
                    <ClickHandler className={compStyles.link}
                                  clickAction={() => RedirectService.redirect(linkedTo, dbGapIdAccession)}
                                  label={dbGapIdAccession}
                                  tag={"span"}>{dbGapIdAccession}</ClickHandler>
                    <span className={compStyles.label}>Access:</span><span>{access}</span>
                    <span className={compStyles.label}>Subjects:</span><span>{count}</span>
                </div>
                {diseases ? <div><span className={compStyles.label}>Diseases:</span><span>{diseases}</span></div> : null}
            </div>
        );
    }
}

export default DataStudy;
