/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data study card header component.
 */

// Core dependencies
import React from "react";

// App dependencies
import ClickHandler from "../click-handler/click-handler";
import Tooltip from "../tooltip/tooltip";
import * as DashboardTableService from "../../utils/dashboard/dashboard-table.service";
import * as RedirectService from "../../utils/redirect.service";

// Styles
import compStyles from "./data-study-card-header.module.css";

let classNames = require("classnames");

class DataStudyCardHeader extends React.Component {

    render() {
        const {study} = this.props,
            {access, consentGroup, consortia, count, dbGapIdAccession, diseases, studyName, subjectsTotal} = study,
            {consents} = consentGroup;
        const countError = count !== subjectsTotal;
        const linkedTo = DashboardTableService.getCellUrl(dbGapIdAccession, "dbGapIdAccession", false);
        const subjectCount = countError ? `${subjectsTotal} of ${count}` : count;
        const subjectDiseases = diseases || "--";

        const Consent = (props) => {

            const {consent} = props,
                {consentLongName, consentShortName} = consent;

            return (
                <span className={classNames(compStyles.consent, compStyles.value)}>
                    <Tooltip label={consentLongName}>{consentShortName}</Tooltip>
                </span>
            )
        };

        const Consents = (props) => {

            const {consents} = props;

            return (
                <div className={compStyles.row}>
                    <span className={compStyles.label}>Consent Groups:</span>
                    {consents.map((consent, c) => <Consent key={c} consent={consent}/>)}
                </div>
            )
        };

        return (
            <div className={compStyles.snapshot}>
                <h3 className={classNames(compStyles.title)}>{studyName}</h3>
                <div className={classNames(compStyles.divide, compStyles.group)}>
                    <div className={compStyles.row}>
                        <span className={compStyles.label}>Consortium:</span>
                        <span className={compStyles.value}>{consortia}</span>
                        <span className={compStyles.label}>dbGaP Id:</span>
                        <ClickHandler className={classNames(compStyles.link, compStyles.value)}
                                      clickAction={() => RedirectService.redirect(linkedTo, dbGapIdAccession)}
                                      label={dbGapIdAccession}
                                      tag={"span"}>{dbGapIdAccession}</ClickHandler>
                        <span className={compStyles.label}>Access:</span><span className={compStyles.value}>{access}</span>
                        <span className={compStyles.label}>Subjects:</span>
                        <span className={classNames({[compStyles.error]: countError}, compStyles.value)}>{subjectCount}</span>
                    </div>
                </div>
                <div className={classNames(compStyles.divide, compStyles.group)}>
                    <Consents consents={consents}/>
                    <div className={compStyles.row}>
                        <span className={compStyles.label}>Diseases:</span>
                        <span className={compStyles.value}>{subjectDiseases}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default DataStudyCardHeader;
