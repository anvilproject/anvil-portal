/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic data dashboard table service.
 */

// App dependencies
import * as DashboardService from "./dashboard.service";
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
 * Finds the corresponding tooltip label for the specified cell value.
 *
 * @param cellValue
 * @returns {*}
 */
export function findCellTooltip(cellValue) {

    return switchCellNameToTooltipLabel(cellValue);
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

        if ( DashboardService.isArray(value) ) {

            return stringifyArray(value);
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
 * @param summary
 * @returns {*}
 */
export function getCellUrl(value, column, summary) {

    if ( value ) {

        return switchColumnUrl(column, summary, value);
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
            return "dbGaP Id";
        case "dbGapIdAccession":
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
 * Returns a string by concatenating all of the elements in an array, separated by a comma.
 *
 * @param array
 * @returns {*}
 */
function stringifyArray(array) {

    if ( array && typeof array === "object") {

        return array.join(", ");
    }

    return array;
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
 * Returns the corresponding tooltip label for the specified cell value.
 *
 * @param cellValue
 * @returns {*}
 */
function switchCellNameToTooltipLabel(cellValue) {

    switch (cellValue) {
        case "WGS":
            return "Whole Genome Sequencing";
        case "WGS, VCF":
            return "Whole Genome Sequencing, Variant Call Format";
        case "WES":
            return "Whole Exome Sequencing";
        case "VCF":
            return "Variant Call Format";
        default:
            return null;
    }
}

/**
 * Returns the corresponding url for the specified column.
 *
 * @param columnName
 * @param summary
 * @param value
 * @returns {*}
 */
function switchColumnUrl(columnName, summary, value) {

    switch (columnName) {
        case "accessUI":
            return switchAccessUIUrl(value);
        case "dbGapIdAccession":
            return `https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${value}`;
        case summary && "consortium":
            return switchConsortiumUrl(value);
        case "projectId":
            return `https://anvil.terra.bio/#workspaces/anvil-datastorage/${value}`;
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
