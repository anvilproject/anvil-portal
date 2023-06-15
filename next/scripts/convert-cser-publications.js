const fsp = require("fs/promises");
const path = require("path");
const { promisify } = require("util");
const parseCsv = promisify(require("csv-parse").parse);

const csvFilePath =
  "./files/CSER Publications PubMed CSV Save As - 20230523.csv";
const jsonFilePath =
  "../components/Consortia/CSER/components/Publications/publications.json";

const columnKeys = {
  PMID: "pmid",
  Title: "title",
  Authors: "authors",
  Citation: "citation",
  "First Author": "firstAuthor",
  "Journal/Book": "journalOrBook",
  "Publication Year": "publicationYear",
  "Create Date": "createDate",
  PMCID: "pmcid",
  "NIHMS ID": "nihmsId",
  DOI: "doi",
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
