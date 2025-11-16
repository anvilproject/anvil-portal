import { promises as fsp } from "fs";
import { parse as callbackParseCsv } from "csv-parse";
import { ConsortiumPublication } from "../components/Consortia/types";

let got: (typeof import("got"))["got"];

interface CrossrefWorkResponse {
  message: {
    author?: Array<{
      family?: unknown;
      given?: unknown;
      name?: unknown;
    }>;
    "container-title"?: unknown[];
    institution?: Array<{ name: unknown }>;
    published?: {
      "date-parts": unknown[][];
    };
    "short-container-title"?: unknown[];
    subtype?: unknown;
    title?: unknown[];
  };
}

interface InputCsvRow {
  DOI: string;
  PMID: string;
}

const INPUT_CSV_PATH = "scripts/files/gregor_publications_pmid_doi.csv";
const OUTPUT_JSON_PATH =
  "components/Consortia/GREGOR/components/Publications/publications.json";

convertGregorPublications();

async function convertGregorPublications(): Promise<void> {
  ({ got } = await import("got"));

  const csvText = await fsp.readFile(INPUT_CSV_PATH, "utf8");
  const entries = await new Promise<InputCsvRow[]>((resolve, reject) => {
    callbackParseCsv(csvText, { columns: true }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

  const publications: ConsortiumPublication[] = [];
  const skippedEntries: InputCsvRow[] = [];

  for (const [i, entry] of entries.entries()) {
    console.log(`Requesting work ${i + 1}/${entries.length} (${entry.DOI})`);
    try {
      publications.push(await getPublication(entry.DOI, entry.PMID));
    } catch (e) {
      console.log(`Skipping because an error occurred: ${e}`);
      skippedEntries.push(entry);
    }
  }

  await fsp.writeFile(
    OUTPUT_JSON_PATH,
    JSON.stringify(publications, undefined, 2) + "\n"
  );

  if (skippedEntries.length)
    console.log(
      `\nSkipped entries due to errors:\n${skippedEntries.map((entry) => JSON.stringify(entry)).join("\n")}`
    );

  console.log("\nDone");
}

async function getPublication(
  doi: string,
  pmid: string
): Promise<ConsortiumPublication> {
  if (!doi) throw new Error(`Missing DOI (PMID: ${pmid})`);

  const res = await got(
    `https://api.crossref.org/works/${encodeURIComponent(doi)}`
  );
  const { message } = JSON.parse(res.body) as CrossrefWorkResponse;

  const authors = message.author
    ?.map((author) => {
      let name: unknown;
      if (author.name) {
        name = author.name;
      } else if (author.family) {
        if (author.given) name = `${author.family}, ${author.given}`;
        else name = author.family;
      } else if (author.given) {
        name = author.given;
      }
      return unknownValueToString(name);
    })
    ?.join("; ");

  let journal =
    message["container-title"]?.[0] ||
    message["short-container-title"]?.[0] ||
    message.institution?.[0].name;
  if (!journal) {
    if (message.subtype === "preprint") journal = "Preprint";
  }

  return {
    authors: unknownValueToString(authors),
    doi,
    journalOrBook: unknownValueToString(journal),
    pmid,
    publicationYear: unknownValueToString(
      message.published?.["date-parts"][0]?.[0]
    ),
    title: unknownValueToString(message.title),
  };
}

function unknownValueToString(value: unknown): string {
  return value ? String(value) : "";
}
