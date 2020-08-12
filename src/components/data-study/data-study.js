/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data study component.
 */

// Core dependencies
import React from "react";

// App dependencies
import ClickHandler from "../click-handler/click-handler";
import DataTable from "../data-table/data-table";
import Overline from "../overline/overline";
import PlusXMore from "../plus-x-more/plus-x-more";
import * as DashboardStudyService from "../../utils/dashboard/dashboard-study.service";
import * as DashboardTableService from "../../utils/dashboard/dashboard-table.service";
import * as EnvironmentService from "../../utils/environment/environment.service";
import * as RedirectService from "../../utils/redirect.service";

// Styles
import compStyles from "./data-study.module.css";

// Template variables
let TABLE_HEADERS_CONSENT_GROUPS = ["consentName", "consentStat"];
let TABLE_HEADERS_DISEASES = ["diseases"];
let TABLE_HEADERS_WORKSPACES = ["projectId", "dataType", "subjects", "samples"];

let classNames = require("classnames");

class DataStudy extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({showMore: false});
    }

    getSubjectCount = () => {

        const {study} = this.props,
            {subjectsCount, subjectsTotal} = study;
        const count = subjectsCount.toLocaleString();
        const total = subjectsTotal.toLocaleString();
        const countSubjectsText = `${count} Subjects`;
        const countOfTotalSubjectsText = `${count} of ${total} Subjects`;

        if ( EnvironmentService.isProd() || EnvironmentService.isStaging() || subjectsCount === subjectsTotal ) {

            return <span>{countSubjectsText}</span>
        }

        return <span className={compStyles.error}>{countOfTotalSubjectsText}</span>;
    };

    onShowMore = (event) => {

        this.setState({showMore: event});
    };

    render() {
        const {study} = this.props,
            {consentGroup, consortia, dbGapIdAccession, diseases, studyName, workspaces} = study,
            {consents} = consentGroup,
            {showMore} = this.state;
        const firstConsent = DashboardStudyService.getFirstElement(consents).consentShortName;
        const firstDisease = DashboardStudyService.getFirstElement(diseases);
        const linkedTo = DashboardTableService.getCellUrl(dbGapIdAccession, "dbGapIdAccession", false);
        const moreConsents = DashboardStudyService.getCount(consents);
        const moreDiseases = DashboardStudyService.getCount(diseases);
        const singleCount = (moreDiseases === 0) && (moreConsents === 0);
        const subjectsCounter = this.getSubjectCount();

        return (
            <div className={compStyles.study}>
                <Overline>
                    <span>{consortia}</span>
                    <ClickHandler className={classNames(compStyles.link, compStyles.natural)}
                                  clickAction={() => RedirectService.redirect(linkedTo, dbGapIdAccession)}
                                  label={dbGapIdAccession}
                                  tag={"span"}>{dbGapIdAccession}</ClickHandler>
                    <hr/>
                    {firstDisease ?
                        <PlusXMore onShowMore={this.onShowMore.bind(this)}
                                   moreCount={moreDiseases}
                                   showMore={showMore}>
                            <span>{firstDisease}</span>
                        </PlusXMore> : null}
                    <hr/>
                    {firstConsent ?
                        <PlusXMore onShowMore={this.onShowMore.bind(this)}
                                   moreCount={moreConsents}
                                   singleCount={singleCount}
                                   showMore={showMore}>
                            <span>{firstConsent}</span>
                        </PlusXMore> : null}
                    <hr/>
                    {subjectsCounter}
                </Overline>
                <div className={classNames({[compStyles.hideMore]: !showMore}, {[compStyles.showMore]: showMore})}>
                    <DataTable inset
                               singleRow={true}
                               tableHeaders={TABLE_HEADERS_DISEASES}
                               tableRow={study}/>
                    <DataTable inset
                               tableHeaders={TABLE_HEADERS_CONSENT_GROUPS}
                               tableRows={consents}/>
                </div>
                <h4 className={classNames(compStyles.title)}>{studyName}</h4>
                <DataTable workspaces
                           tableHeaders={TABLE_HEADERS_WORKSPACES}
                           tableRows={workspaces}/>
            </div>
        );
    }
}

export default DataStudy;
