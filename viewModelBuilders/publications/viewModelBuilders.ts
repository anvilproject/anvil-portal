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
 * Builds BasicCell props for the publication date column.
 * @param publication - Publication entity.
 * @returns BasicCell component props with date formatted as yyyy-mm-dd. Returns an empty value if publicationYear is 0.
 */
export function buildPublicationDate(publication: Publication): BasicCellProps {
  if (publication.publicationYear === 0) {
    return { value: "" };
  }
  const year = String(publication.publicationYear);
  const month = String(publication.publicationMonth).padStart(2, "0");
  const day = String(publication.publicationDay).padStart(2, "0");
  return { value: `${year}-${month}-${day}` };
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

/**
 * Builds Link props for the PubMed ID column.
 * @param publication - Publication entity.
 * @returns Link component props.
 */
export function buildPmid(publication: Publication): LinkProps {
  if (!publication.pmid) {
    return { label: "", url: "" };
  }
  return {
    label: publication.pmid,
    target: ANCHOR_TARGET.BLANK,
    url: `https://pubmed.ncbi.nlm.nih.gov/${publication.pmid}`,
  };
}
