import { parse as callbackParseCsv } from "csv-parse";
import { promises as fsp } from "fs";
import path from "path";
import { promisify } from "util";

const parseCsv = promisify(callbackParseCsv);

const csvFilePath =
  "./files/CSER Publications PubMed CSV Save As - 20230523.csv";
const jsonFilePath =
  "../components/Consortia/CSER/components/Publications/publications.json";

const columnKeys = {
  Authors: "authors",
  Citation: "citation",
  "Create Date": "createDate",
  DOI: "doi",
  "First Author": "firstAuthor",
  "Journal/Book": "journalOrBook",
  "NIHMS ID": "nihmsId",
  PMCID: "pmcid",
  PMID: "pmid",
  "Publication Year": "publicationYear",
  Title: "title",
};

convert();

async function convert() {
  const entries = await parseCsv(await fsp.readFile(csvFilePath, "utf8"), {
    bom: true,
    columns: (names) => names.map((name) => columnKeys[name]),
    relax_quotes: true,
    rtrim: true,
  });
  await fsp.writeFile(jsonFilePath, JSON.stringify(entries));
  console.log(`Exported to ${path.resolve(jsonFilePath)}`);
}
