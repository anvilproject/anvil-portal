/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic data dashboard table service.
 */

import * as NumberFormatService from "./number-format.service";

let CELLS_RIGHT_ALIGNED = ["cohorts", "demographics", "diagnosis", "families", "files", "samples", "size", "sizeTB", "subjects"];

let DBGAPIDS_BLACKLIST = ["phs001155", "phs001642", "phs001222", "phs001601", "phs001543", "phs001547", "phs001579", "phs001544", "phs001676", "phs001624", "phs001545", "phs001894", "phs001569", "phs001506", "phs001600", "phs001766", "phs001913"];

/**
 * Return true if cell is to be right aligned.
 *
 * @param columnName
 * @returns {boolean}
 */
export function cellAlignment(columnName) {

    return CELLS_RIGHT_ALIGNED.includes(columnName);
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

        if ( column === "program" ) {

            return switchProgramName(value);
        }

        if ( column === "dataType" ) {

            return formatDataType(value);
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
        case "cohorts":
            return "Cohorts";
        case "dataType":
            return "Data Type";
        case "demographics":
            return "Subjects";
        case "diagnosis":
            return "Diagnosis";
        case "families":
            return "Family";
        case "files":
            return "Files";
        case "dbGapId":
            return "dbGaP Id";
        case "program":
            return "Consortium";
        case "projectId":
            return "Terra Workspace Name";
        case "samples":
            return "Samples";
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
 * Formats the data type object into a string, with its correct display value.
 *
 * @param dataTypes
 * @returns {*}
 */
function formatDataType(dataTypes) {

    if ( dataTypes ) {

        const switchedDataTypes = dataTypes.map(dataType => switchDataType(dataType));
        return stringifyArray(switchedDataTypes);
    }

    return dataTypes;
}

/**
 * Returns true if the specified gap id is not blacklisted.
 *
 * @param gapId
 * @returns {boolean}
 */
function isGapIdWhitelist(gapId) {

    return !DBGAPIDS_BLACKLIST.includes(gapId);
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
 * Returns the corresponding tooltip label for the specified cell value.
 *
 * @param cellValue
 * @returns {*}
 */
function switchCellNameToTooltipLabel(cellValue) {

    switch (cellValue) {
        case "WGS":
            return "Whole Genome Sequencing";
        case "WES":
            return "Whole Exome Sequencing";
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
        case "projectId":
            return `https://anvil.terra.bio/#workspaces/anvil-datastorage/${value}`;
        case isGapIdWhitelist(value) && "dbGapId":
            return `https://www.ncbi.nlm.nih.gov/projects/gap/cgi-bin/study.cgi?study_id=${value}`;
        case summary && "program":
            return switchProgramUrl(value);
        default:
            return null;
    }
}

/**
 * Returns the corresponding data type display name.
 *
 * @param dataType
 * @returns {*}
 */
function switchDataType(dataType) {

    switch (dataType) {
        case "Whole Genome":
            return "WGS";
        case "Whole genome":
            return "WGS";
        case "Exome":
            return "WES";
        default:
            return dataType;
    }
}

/**
 * Returns the corresponding program display name.
 *
 * @param program
 * @returns {*}
 */
function switchProgramName(program) {

    switch (program) {
        case "GTEx":
            return "GTEx (v8)";
        case "ThousandGenomes":
            return "1000 Genomes";
        default:
            return program;
    }
}

/**
 * Returns the corresponding program url.
 *
 * @param program
 * @returns {*}
 */
function switchProgramUrl(program) {

    switch (program) {
        case "CCDG":
            return "https://www.genome.gov/Funded-Programs-Projects/NHGRI-Genome-Sequencing-Program/Centers-for-Common-Disease-Genomics";
        case "CMG":
            return "https://www.genome.gov/Funded-Programs-Projects/NHGRI-Genome-Sequencing-Program/Centers-for-Mendelian-Genomics-CMG";
        case "GTEx":
            return "https://gtexportal.org/home/";
        case "ThousandGenomes":
            return "https://www.internationalgenome.org/";
        case "eMERGE":
            return "https://emerge-network.org/";
        default:
            return null;
    }
}
