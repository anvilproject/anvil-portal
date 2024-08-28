import {
  getContentDirectory,
  getFilePath,
  getMatter,
} from "../../../../../../../content/utils";
import { PublicationCard } from "./entities";

const DIR_FOLDER_NAME = "overview";
const FILE_NAME = "publications.mdx";

/**
 * Returns the publication section cards.
 * @returns publication section cards.
 */
export function buildPublicationSectionCards(): PublicationCard[] {
  const filePath = getFilePath(getContentDirectory(DIR_FOLDER_NAME), FILE_NAME);
  const { data: frontmatter } = getMatter(filePath);
  return frontmatter.publications as PublicationCard[];
}
