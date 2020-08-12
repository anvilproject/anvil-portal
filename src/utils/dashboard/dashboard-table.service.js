/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic data dashboard table service.
 */

// App dependencies
import DataTableRowCellDataTypes from "../../components/data-table-row-cell-data-types/data-table-row-cell-data-types";
import DataTableRowCellEllipsis from "../../components/data-table-row-cell-ellipsis/data-table-row-cell-ellipsis";
import DataTableRowCellGapId from "../../components/data-table-row-cell-gap-id/data-table-row-cell-gap-id";
import DataTableRowCellProjectId from "../../components/data-table-row-cell-project-id/data-table-row-cell-project-id";
import DataTableRowCellRedirect from "../../components/data-table-row-cell-redirect/data-table-row-cell-redirect";
import DataTableRowCellX from "../../components/data-table-row-cell-x/data-table-row-cell-x";
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

        if ( column === "diseases" ) {

            if ( value.length ) {

                return value.join("; ");
            }
            else {

                return "--"
            }
        }

        if ( column === "sizeTB" ) {

            return NumberFormatService.formatSizeToTB(value);
        }

        if ( NumberFormatService.isNumber(value) ) {

            return value.toLocaleString();
        }

        return value;
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

        return DataTableRowCellRedirect;
    }

    switch (columnName) {
        case "accessUI":
            return DataTableRowCellRedirect;
        case "dataTypes":
            return DataTableRowCellDataTypes;
        case "diseases":
            return DataTableRowCellEllipsis;
        case "gapId":
            return DataTableRowCellGapId;
        case "projectId":
            return DataTableRowCellProjectId;
        default:
            return DataTableRowCellX;
    }
}

/**
 * Returns the table class name.
 *
 * @param studies
 * @param summary
 * @param workspaces
 * @returns {*}
 */
export function getTableName(studies, summary, workspaces) {

    if ( studies ) {

        return "studies";
    }

    if ( summary ) {

        return "summary";
    }

    if ( workspaces ) {

        return "workspaces";
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
        case "accessUI":
            return "Access";
        case "cohorts":
            return "Cohorts";
        case "consentName":
            return "Consent Groups";
        case "consents":
            return "Access";
        case "consentStat":
            return "Subjects";
        case "consortia":
            return "Consortia";
        case "consortium":
            return "Consortium";
        case "dataTypes":
            return "Data Type";
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
        case "projectId":
            return "Terra Workspace Name";
        case "samples":
            return "Samples";
        case "studyName":
            return "Title";
        case "subjects":
            return "Subjects";
        case "size":
            return "Size";
        case "sizeTB":
            return "Size (TB)";
        default:
            return columnName;
    }
}

/**
 * Returns accessUI corresponding page URL.
 *
 * @param accessUI
 * @returns {*}
 */
function switchAccessUIUrl(accessUI) {

    switch(accessUI) {
        case "Consortia":
            return "/data/requesting-data-access#requesting-data-access-as-a-consortium-member";
        case "Researcher":
            return "/data/requesting-data-access#requesting-data-access-as-a-researcher";
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
        case "accessUI":
            return switchAccessUIUrl(value);
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
