/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic data dashboard table service.
 */

// App dependencies
import DashboardTableRowCellDataTypes from "../../components/dashboard/dashboard-table-row-cell-data-types/dashboard-table-row-cell-data-types";
import DashboardTableRowCellEllipsis from "../../components/dashboard/dashboard-table-row-cell-ellipsis/dashboard-table-row-cell-ellipsis";
import DashboardTableRowCellGapId from "../../components/dashboard/dashboard-table-row-cell-gap-id/dashboard-table-row-cell-gap-id";
import DashboardTableRowCellProjectId from "../../components/dashboard/dashboard-table-row-cell-project-id/dashboard-table-row-cell-project-id";
import DashboardTableRowCellRedirect from "../../components/dashboard/dashboard-table-row-cell-redirect/dashboard-table-row-cell-redirect";
import DashboardTableRowCellValuesTooltip from "../../components/dashboard/dashboard-table-row-cell-values-tooltip/dashboard-table-row-cell-values-tooltip";
import DashboardTableRowCellX from "../../components/dashboard/dashboard-table-row-cell-x/dashboard-table-row-cell-x";
import * as NumberFormatService from "../number-format.service";
import {RIGHT_ALIGN_COLUMNS} from "./right-align-columns";

/**
 * Return true if cell is to be right aligned.
 *
 * @param columnName
 * @returns {boolean}
 */
export function cellAlignment(columnName) {

    return RIGHT_ALIGN_COLUMNS.includes(columnName);
}

/**
 * Returns a formatted value as specified by either column type or value type (specifically if the value is a number).
 * Any null value will return "--".
 *
 * @param value
 * @param column
 * @returns {*}
 */
export function formatValue(value, column) {

    if ( value ) {

        /* Handle column is "platform". */
        if ( column === "platform" ) {

            return switchStudyPlatform(value);
        }

        /* Handle column is "diseases". */
        if ( column === "diseases" ) {

            if ( value.length ) {

                return value.join("; ");
            }
            else {

                return "--"
            }
        }

        /* Handle column is "sizeTB" or "size". */
        if ( column === "sizeTB" || column === "size" ) {

            return NumberFormatService.formatSizeToTB(value);
        }

        /* Handle column with cell value as number. */
        if ( NumberFormatService.isNumber(value) ) {

            return value.toLocaleString();
        }

        return value;
    }

    /* Handle case when value is zero. */
    if ( value === 0 ) {

        return NumberFormatService.formatSizeToTB(value);
    }

    return "--";
}

/**
 * Returns any url for the specified cell value.
 *
 * @param value
 * @param column
 * @returns {*}
 */
export function getCellUrl(value, column) {

    if ( value ) {

        return switchColumnUrl(value, column);
    }
}

/**
 * Returns the corresponding react element type for the specified column name.
 *
 * @param columnName
 * @param summaryTable
 * @returns {*}
 */
export function getReactElementType(columnName, summaryTable) {

    if ( columnName === "consortium" && summaryTable ) {

        return DashboardTableRowCellRedirect;
    }

    switch (columnName) {
        case "accessType":
            return DashboardTableRowCellRedirect;
        case "consentCodes":
            return DashboardTableRowCellValuesTooltip;
        case "dataTypes":
            return DashboardTableRowCellDataTypes;
        case "diseases":
            return DashboardTableRowCellEllipsis;
        case "gapId":
            return DashboardTableRowCellGapId;
        case "projectId":
            return DashboardTableRowCellProjectId;
        default:
            return DashboardTableRowCellX;
    }
}

/**
 * Returns the table class name.
 *
 * @param ncpi
 * @param studies
 * @param summary
 * @returns {*}
 */
export function getTableName(ncpi, studies, summary) {

    if ( ncpi ) {

        return "ncpi";
    }

    if ( studies ) {

        return "studies";
    }

    if ( summary ) {

        return "summary";
    }

    return "";
}

/**
 * Returns the corresponding tooltip label for the specified data type value.
 *
 * @param dataType
 * @returns {*}
 */
export function switchDataTypeToTooltipLabel(dataType) {

    switch (dataType) {
        case "WGS":
            return "Whole Genome Sequencing";
        case "WES":
            return "Whole Exome Sequencing";
        case "VCF":
            return "Variant Call Format";
        default:
            return null;
    }
}

/**
 * Returns corresponding column display label.
 * @param columnName
 * @returns {*}
 */
export function switchDisplayColumnName(columnName) {

    switch (columnName) {
        case "access":
            return "Access";
        case "accessType":
            return "Access";
        case "cohorts":
            return "Cohorts";
        case "consentName":
            return "Consent Groups";
        case "consents":
            return "Access";
        case "consentCodes":
            return "Consent Codes";
        case "consentShortNames":
            return "Consent Codes";
        case "consentStat":
            return "Subjects";
        case "consortia":
            return "Consortia";
        case "consortium":
            return "Consortium";
        case "dataTypes":
            return "Data Types";
        case "demographics":
            return "Demographics";
        case "diagnosis":
            return "Diagnosis";
        case "diseases":
            return "Diseases";
        case "families":
            return "Family";
        case "files":
            return "Files";
        case "dbGapId":
            return "dbGap Id";
        case "dbGapIdAccession":
            return "dbGap Id";
        case "gapId":
            return "dbGap Id";
        case "platform":
            return "Platform";
        case "projectId":
            return "Terra Workspace Name";
        case "samples":
            return "Samples";
        case "search":
            return "Text Search";
        case "studies":
            return "Studies";
        case "studyName":
            return "Title";
        case "subjects":
            return "Subjects";
        case "subjectsTotal":
            return "Subjects";
        case "size":
            return "Size (TB)";
        case "sizeTB":
            return "Size (TB)";
        default:
            return columnName;
    }
}

/**
 * Returns the platform display value.
 * - "AnVIL" to "AnVIL"
 * - "BDC" to "BioData Catalyst"
 * - "NCRDC" to "Cancer Research Data Commons"
 * - "KF" to "Kids First Data Resource Center"
 *
 * @param platform
 * @returns {*}
 */
export function switchStudyPlatform(platform) {

    switch (platform) {
        case "AnVIL":
            return "AnVIL";
        case "BDC":
            return "BioData Catalyst";
        case "NCRDC":
            return "Cancer Research Data Commons";
        case "KF":
            return "Kids First Data Resource Center";
        default:
            return "";
    }
}

/**
 * Returns accessType corresponding page URL.
 *
 * @param accessType
 * @returns {*}
 */
function switchAccessTypeUrl(accessType) {

    switch(accessType) {
        case "Consortium Access":
            return "/learn/accessing-data/requesting-data-access#accessing-consortium-access-data";
        case "Controlled Access":
            return "/learn/accessing-data/requesting-data-access#accessing-controlled-access-data";
        default:
            return "";
    }
}

/**
 * Returns the corresponding url for the specified column.
 *
 * @param value
 * @param columnName
 * @returns {*}
 */
function switchColumnUrl(value, columnName) {

    switch (columnName) {
        case "accessType":
            return switchAccessTypeUrl(value);
        case "consortium":
            return switchConsortiumUrl(value);
        case "dbGapIdAccession":
            return `https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${value}`;
        default:
            return "";
    }
}

/**
 * Returns the corresponding consortium url.
 *
 * @param consortium
 * @returns {*}
 */
function switchConsortiumUrl(consortium) {

    switch (consortium) {
        case "CCDG":
            return "https://www.genome.gov/Funded-Programs-Projects/NHGRI-Genome-Sequencing-Program/Centers-for-Common-Disease-Genomics";
        case "CMG":
            return "https://www.genome.gov/Funded-Programs-Projects/NHGRI-Genome-Sequencing-Program/Centers-for-Mendelian-Genomics-CMG";
        case "eMERGE":
            return "https://emerge-network.org/";
        case "GTEx (v8)":
            return "https://gtexportal.org/home/";
        case "1000 Genomes":
            return "https://www.internationalgenome.org/";
        default:
            return null;
    }
}
