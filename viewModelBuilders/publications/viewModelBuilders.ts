import { ANCHOR_TARGET } from "@databiosphere/findable-ui/lib/components/Links/common/entities";
import { LinkProps } from "@databiosphere/findable-ui/lib/components/Links/components/Link/link";
import { BasicCellProps } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/BasicCell/basicCell";
import { NTagCellProps } from "@databiosphere/findable-ui/lib/components/Table/components/TableCell/components/NTagCell/nTagCell";
import { Publication } from "../../apis/publications/entities";

/**
 * Builds Link props for the publication title column.
 * @param publication - Publication entity.
 * @returns Link component props.
 */
export function buildPublicationTitle(publication: Publication): LinkProps {
  return {
    label: publication.title,
    target: ANCHOR_TARGET.BLANK,
    url: publication.doi,
  };
}

/**
 * Builds NTagCell props for the authors column.
 * @param publication - Publication entity.
 * @returns NTagCell component props.
 */
export function buildAuthors(publication: Publication): NTagCellProps {
  return {
    label: "Authors",
    values: publication.authors,
  };
}

/**
 * Builds BasicCell props for the journal column.
 * @param publication - Publication entity.
 * @returns BasicCell component props.
 */
export function buildJournal(publication: Publication): BasicCellProps {
  return {
    value: publication.journal,
  };
}

/**
 * Builds BasicCell props for the year column.
 * @param publication - Publication entity.
 * @returns BasicCell component props.
 */
export function buildYear(publication: Publication): BasicCellProps {
  return {
    value: String(publication.year),
  };
}

/**
 * Builds BasicCell props for the citation count column.
 * @param publication - Publication entity.
 * @returns BasicCell component props.
 */
export function buildCitationCount(publication: Publication): BasicCellProps {
  return {
    value: publication.citationCount.toLocaleString(),
  };
}
