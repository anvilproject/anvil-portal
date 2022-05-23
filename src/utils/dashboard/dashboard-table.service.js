/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic data dashboard table service.
 */

// App dependencies
import DashboardTableRowCellConsentName from "../../components/dashboard/dashboard-table-row-cell-consent-name/dashboard-table-row-cell-consent-name";
import DashboardTableRowCellEllipsis from "../../components/dashboard/dashboard-table-row-cell-ellipsis/dashboard-table-row-cell-ellipsis";
import DashboardTableRowCellGapId from "../../components/dashboard/dashboard-table-row-cell-gap-id/dashboard-table-row-cell-gap-id";
import DashboardTableRowCellProjectId from "../../components/dashboard/dashboard-table-row-cell-project-id/dashboard-table-row-cell-project-id";
import DashboardTableRowCellRedirect from "../../components/dashboard/dashboard-table-row-cell-redirect/dashboard-table-row-cell-redirect";
import DashboardTableRowCellStudyName from "../../components/dashboard/dashboard-table-row-cell-study-name/dashboard-table-row-cell-study-name";
import DashboardTableRowCellX from "../../components/dashboard/dashboard-table-row-cell-x/dashboard-table-row-cell-x";
import * as NumberFormatService from "../number-format.service";
import { RIGHT_ALIGN_COLUMNS } from "./right-align-columns";

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
 * Returns a formatted value as specified by either column type or value type.
 * Any unspecified values will return "--".
 *
 * @param value
 * @param column
 * @returns {*}
 */
export function formatValue(value, column) {
  /* Handle column is "sizeTB" or "size"  - special case. */
  if (column === "sizeTB" || column === "size") {
    return NumberFormatService.formatSizeToTB(value);
  }

  /* Handle column with cell value as number. */
  if (NumberFormatService.isNumber(value)) {
    return value.toLocaleString();
  }

  /* Handle column with cell value of type array. */
  if (Array.isArray(value)) {
    if (value.length > 0) {
      return value.join(", ");
    }

    return "--";
  }

  /* Any other valid value is returned. */
  if (value) {
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
  if (value) {
    return switchColumnUrl(value, column);
  }
}

/**
 * Returns the corresponding react element type for the specified column name.
 *
 * @param columnName
 * @param dataset
 * @returns {*}
 */
export function getReactElementType(columnName, dataset) {
  if (columnName === "consortium" && dataset === "summary") {
    return DashboardTableRowCellRedirect;
  }

  switch (columnName) {
    case "accessType":
      return DashboardTableRowCellRedirect;
    case "consentName":
      return DashboardTableRowCellConsentName;
    case "diseases":
      return DashboardTableRowCellEllipsis;
    case "gapId":
      return DashboardTableRowCellGapId;
    case "projectId":
      return DashboardTableRowCellProjectId;
    case "studyName":
      return DashboardTableRowCellStudyName;
    default:
      return DashboardTableRowCellX;
  }
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
 * Returns accessType corresponding page URL.
 *
 * @param accessType
 * @returns {*}
 */
function switchAccessTypeUrl(accessType) {
  switch (accessType) {
    case "Consortium Access Only":
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
