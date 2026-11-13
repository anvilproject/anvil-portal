/**
 * Citation Fetcher Script for AnVIL Portal
 *
 * This script:
 * 1. Finds papers that cite the main AnVIL paper via Semantic Scholar API
 * 2. Fetches metadata for DOIs via Crossref API
 * 3. Outputs JSON matching the publications.mdx format
 *
 * Usage:
 *   node scripts/fetch-citations.mjs --find-citing         # Find papers citing AnVIL
 *   node scripts/fetch-citations.mjs --from-dois           # Fetch metadata for DOIs in input file
 *   node scripts/fetch-citations.mjs --from-current        # Refresh metadata for current publications
 *   node scripts/fetch-citations.mjs --build-publications  # Build publications.json for the portal
 *
 * --build-publications also includes the DOIs in scripts/files/extra-publication-dois.txt.
 */

import { promises as fsp, realpathSync } from "fs";
import path from "path";
import { stripHtml } from "string-strip-html";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Common HTML entities found in academic titles
const HTML_ENTITIES = {
  "&amp;": "&",
  "&apos;": "'",
  "&gt;": ">",
  "&lt;": "<",
  "&nbsp;": " ",
  "&quot;": '"',
};

// Main AnVIL paper DOI
const ANVIL_MAIN_DOI = "10.1016/j.xgen.2021.100085";

// Hand-added papers that use AnVIL data but do not cite the main AnVIL paper
const EXTRA_PUBLICATION_DOIS_PATH = path.join(
  __dirname,
  "files/extra-publication-dois.txt"
);

// Key AnVIL component papers (ABOUT_ANVIL category)
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Reserved for future use to fetch ABOUT_ANVIL category papers
const ANVIL_COMPONENT_DOIS = {
  Bioconductor: "10.1038/s41592-019-0654-x",
  Dockstore: "10.1093/nar/gkab346",
  "Galaxy 2020": "10.1093/nar/gkaa434",
  "Terra/FireCloud": "10.1038/s41588-019-0372-4", // Original Terra paper
  seqr: "10.1002/humu.24366",
};

// API endpoints
const SEMANTIC_SCHOLAR_API = "https://api.semanticscholar.org/graph/v1";
const CROSSREF_API = "https://api.crossref.org/works";

// Rate limiting helpers
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Decode common HTML entities in a string.
 * @param {string} text - The input text with HTML entities.
 * @returns {string} The text with entities decoded.
 */
function decodeHtmlEntities(text) {
  let result = text;
  for (const [entity, char] of Object.entries(HTML_ENTITIES)) {
    result = result.replace(new RegExp(entity, "gi"), char);
  }
  // Handle numeric entities (&#60; &#x3C; etc.)
  result = result.replace(/&#(\d+);/g, (_, code) =>
    String.fromCharCode(parseInt(code, 10))
  );
  result = result.replace(/&#x([0-9a-f]+);/gi, (_, code) =>
    String.fromCharCode(parseInt(code, 16))
  );
  return result;
}

/**
 * Strip HTML/XML tags, decode entities, and normalize whitespace in a string.
 * @param {string} text - The input text to sanitize.
 * @returns {string} The sanitized text with HTML/XML removed and whitespace normalized.
 */
function cleanTitle(text) {
  // Decode HTML entities first (may be double-encoded from Crossref)
  let result = decodeHtmlEntities(decodeHtmlEntities(text));
  // Remove XML processing instructions (e.g., <?A3B2 pi6?>)
  result = result.replace(/<\?[^?]*\?>/g, "");
  // Remove HTML comments (e.g., <!--...-->) iteratively to avoid incomplete multi-character sanitization
  let previous;
  do {
    previous = result;
    result = result.replace(/<!--[\s\S]*?-->/g, "");
  } while (result !== previous);
  // Strip any remaining HTML tags
  result = stripHtml(result, { skipHtmlDecoding: true }).result;
  return result.replace(/\s+/g, " ").trim();
}

// Preprint DOI prefixes
const PREPRINT_DOI_PREFIXES = [
  "10.1101/", // bioRxiv, medRxiv
  "10.21203/", // Research Square
  "10.48550/", // arXiv
  "10.20944/", // Preprints.org
  "10.2139/", // SSRN
];

/**
 * Check if a DOI belongs to a preprint server.
 * @param {string} doi - The DOI to check (with or without URL prefix).
 * @returns {boolean} True if the DOI belongs to a known preprint server.
 */
function isPreprint(doi) {
  const cleanDoi = doi
    .replace("https://doi.org/", "")
    // eslint-disable-next-line sonarjs/no-clear-text-protocols -- String pattern for DOI cleaning, not a network call
    .replace("http://doi.org/", "");
  return PREPRINT_DOI_PREFIXES.some((prefix) => cleanDoi.startsWith(prefix));
}

/**
 * Read the published version of a preprint from a Crossref work's relation metadata.
 * @param {object} work - The `message` of a Crossref works response.
 * @returns {string|null} The published version DOI if Crossref records one, otherwise null.
 */
function getPublishedDoi(work) {
  const relation = work.relation?.["is-preprint-of"];
  if (relation && relation.length > 0 && relation[0]["id-type"] === "doi") {
    return relation[0].id;
  }
  return null;
}

/**
 * Error for a non-OK HTTP response.
 */
class HttpError extends Error {
  /**
   * Create an error for a response with the given status.
   * @param {number} status - The HTTP status code.
   * @param {string} url - The requested URL.
   */
  constructor(status, url) {
    super(`HTTP ${status} from ${url}`);
    this.status = status;
  }
}

/**
 * Check whether an error is a 404 response, meaning the API has no record for the DOI.
 * @param {Error} error - The error to check.
 * @returns {boolean} True if the error is an HttpError with status 404.
 */
function isNotFound(error) {
  return error instanceof HttpError && error.status === 404;
}

/**
 * Fetch a URL with retries, treating a 404 as "no record".
 * @param {string} url - The URL to fetch.
 * @returns {Promise<object|null>} The parsed JSON response, or null on a 404.
 * @throws {Error} If the request fails for any other reason.
 */
async function fetchOrNullIfNotFound(url) {
  try {
    return await fetchWithRetry(url);
  } catch (error) {
    if (isNotFound(error)) return null;
    throw error;
  }
}

/**
 * Make sure a request error names the URL; a network error from fetch does not.
 * @param {Error} error - The error from the last attempt.
 * @param {string} url - The requested URL.
 * @returns {Error} The HttpError unchanged, or a new error naming the URL with the original as its cause.
 */
function withUrl(error, url) {
  if (error instanceof HttpError) return error;
  return new Error(`Request failed: ${url}`, { cause: error });
}

/**
 * Fetch with retry and rate limiting.
 * @param {string} url - The URL to fetch.
 * @param {object} options - Fetch options to pass to the request.
 * @param {number} retries - Number of attempts in total.
 * @param {number} delay - Wait in milliseconds before the first retry; it doubles before each later one.
 * @returns {Promise<object>} The parsed JSON response.
 * @throws {HttpError} At once on a 4xx response other than 429, or after the last attempt on a 429 or 5xx response.
 * @throws {Error} On a network error after the last attempt, naming the URL.
 */
async function fetchWithRetry(url, options = {}, retries = 5, delay = 2000) {
  // Every iteration returns, retries, or throws on the last attempt
  for (let i = 0; ; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "User-Agent":
            "AnVIL-Portal-Citation-Fetcher/1.0 (mailto:help@anvilproject.org)",
          ...options.headers,
        },
      });

      if (response.status === 429 && i < retries - 1) {
        // Rate limited - wait and retry. A retry-after date (not seconds) falls back to the backoff.
        const retryAfter =
          Number(response.headers.get("retry-after")) ||
          (delay * 2 ** i) / 1000;
        console.log(`Rate limited. Waiting ${retryAfter}s...`);
        await sleep(retryAfter * 1000);
        continue;
      }

      if (!response.ok) {
        throw new HttpError(response.status, url);
      }

      return await response.json();
    } catch (error) {
      // A 4xx response other than 429 will not succeed on retry
      const isClientError = error instanceof HttpError && error.status < 500;
      if (isClientError || i === retries - 1) throw withUrl(error, url);
      console.log(`Retry ${i + 1}/${retries} after error: ${error.message}`);
      await sleep(delay * 2 ** i);
    }
  }
}

/**
 * Find papers citing the main AnVIL paper using Semantic Scholar.
 * @param {string} doi - The DOI of the paper to find citations for.
 * @param {number} limit - Maximum number of citing papers to retrieve.
 * @returns {Promise<Array<object>>} Array of citing paper objects with DOI, title, authors, etc.
 * @throws {Error} If the request fails or the response has no citation list.
 */
async function findCitingPapers(doi = ANVIL_MAIN_DOI, limit = 100) {
  console.log(`\nFinding papers that cite DOI: ${doi}`);

  const url = `${SEMANTIC_SCHOLAR_API}/paper/DOI:${doi}/citations?fields=title,authors,year,externalIds,venue,publicationDate&limit=${limit}`;

  const data = await fetchWithRetry(url);

  if (!Array.isArray(data.data)) {
    throw new Error(`No citation list in response from ${url}`);
  }
  const citations = data.data;
  console.log(`Found ${citations.length} citing papers\n`);

  // Extract DOIs from citing papers
  return citations
    .map((item) => {
      const paper = item.citingPaper;
      return {
        authors: paper.authors?.map((a) => a.name) || [],
        doi: paper.externalIds?.DOI || null,
        pmid: paper.externalIds?.PubMed || null,
        publicationDate: paper.publicationDate,
        title: paper.title,
        venue: paper.venue,
        year: paper.year,
      };
    })
    .filter((p) => p.doi); // Only keep papers with DOIs
}

/**
 * Fetch metadata for a single DOI from Crossref.
 * @param {string} doi - The DOI to fetch metadata for.
 * @returns {Promise<object|null>} Publication metadata object, or null if Crossref has no record of the DOI.
 * @throws {Error} If the request fails for any other reason.
 */
async function fetchCrossrefMetadata(doi) {
  // Clean DOI - remove URL prefix if present
  const cleanDoi = doi
    .replace("https://doi.org/", "")
    // eslint-disable-next-line sonarjs/no-clear-text-protocols -- String pattern for DOI cleaning, not a network call
    .replace("http://doi.org/", "");

  console.log(`Fetching Crossref metadata for: ${cleanDoi}`);

  const data = await fetchOrNullIfNotFound(
    `${CROSSREF_API}/${encodeURIComponent(cleanDoi)}`
  );
  if (!data) {
    console.error(`Crossref has no record of ${cleanDoi}`);
    return null;
  }
  const work = data.message;

  // Extract authors
  const authors = (work.author || []).map((a) => {
    if (a.name) return a.name; // Organization
    return `${a.given || ""} ${a.family || ""}`.trim();
  });

  // Get publication date parts [year, month, day]
  const dateParts =
    work.published?.["date-parts"]?.[0] ||
    work["published-print"]?.["date-parts"]?.[0] ||
    work["published-online"]?.["date-parts"]?.[0] ||
    [];
  // Month and day are null when Crossref gives only a year or a year and month
  const year = dateParts[0] ?? 0;
  const month = dateParts[1] ?? null;
  const day = dateParts[2] ?? null;

  // Get journal/container title
  const journal = decodeHtmlEntities(
    work["container-title"]?.[0] || work.publisher || ""
  );

  return {
    // Additional metadata for reference
    _metadata: {
      citedByCount: work["is-referenced-by-count"],
      issn: work.ISSN,
      publishedDoi: getPublishedDoi(work),
      referencesCount: work["references-count"],
      subject: work.subject,
      type: work.type,
    },
    cardLink: work.URL || `https://doi.org/${cleanDoi}`,
    category: "ON_ANVIL", // Default - can be changed manually
    citation: {
      authors,
      day,
      doi: `https://doi.org/${cleanDoi}`,
      journal,
      month,
      publisher: decodeHtmlEntities(work.publisher || ""),
      year,
    },
    title: work.title?.[0] || "",
  };
}

/**
 * Fetch metadata for multiple DOIs.
 * @param {Array<string>} dois - Array of DOIs to fetch metadata for.
 * @returns {Promise<Array<object>>} Array of publication metadata objects, leaving out DOIs Crossref has no record of.
 */
async function fetchMultipleDois(dois) {
  const results = [];

  for (let i = 0; i < dois.length; i++) {
    const doi = dois[i];
    console.log(`\n[${i + 1}/${dois.length}]`);

    const metadata = await fetchCrossrefMetadata(doi);
    if (metadata) {
      results.push(metadata);
    }

    // Rate limiting: wait between requests
    if (i < dois.length - 1) {
      await sleep(500);
    }
  }

  return results;
}

/**
 * Fetch citation count and PubMed ID for a DOI from Semantic Scholar.
 * @param {string} doi - The DOI to look up.
 * @returns {Promise<{citationCount: number, pmid: string|null}|null>} The citation count and PubMed ID, or null if Semantic Scholar has no record of the DOI.
 * @throws {Error} If the request fails for any other reason.
 */
async function fetchSemanticScholarPaper(doi) {
  const cleanDoi = doi
    .replace("https://doi.org/", "")
    // eslint-disable-next-line sonarjs/no-clear-text-protocols -- String pattern for DOI cleaning, not a network call
    .replace("http://doi.org/", "");
  const data = await fetchOrNullIfNotFound(
    `${SEMANTIC_SCHOLAR_API}/paper/DOI:${cleanDoi}?fields=citationCount,externalIds`
  );
  if (!data) {
    console.error(`Semantic Scholar has no record of ${cleanDoi}`);
    return null;
  }
  return {
    citationCount: data.citationCount ?? 0,
    pmid: data.externalIds?.PubMed || null,
  };
}

/**
 * Read a list of DOIs from a text file with one DOI per line.
 * @param {string} filePath - Path to the text file.
 * @returns {Promise<Array<string>>} The DOIs, skipping blank lines and lines starting with "#".
 */
async function readDoiList(filePath) {
  const content = await fsp.readFile(filePath, "utf8");
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

/**
 * Check that every hand-added DOI is a bare DOI and is listed once.
 * @param {Array<string>} dois - DOIs read from the extra publications list.
 * @returns {Array<string>} The same DOIs.
 * @throws {Error} If a DOI does not start with "10." or repeats an earlier one, ignoring case.
 */
function validateExtraDois(dois) {
  const seen = new Set();
  for (const doi of dois) {
    if (!doi.startsWith("10.")) {
      throw new Error(
        `${EXTRA_PUBLICATION_DOIS_PATH}: "${doi}" is not a bare DOI starting with "10."`
      );
    }
    if (seen.has(doi.toLowerCase())) {
      throw new Error(
        `${EXTRA_PUBLICATION_DOIS_PATH}: "${doi}" is listed more than once`
      );
    }
    seen.add(doi.toLowerCase());
  }
  return dois;
}

/**
 * Combine the citing papers with the hand-added DOIs, comparing DOIs without regard to case.
 * Hand-added papers go first, so a mistyped DOI fails before the long citing-paper loop.
 * @param {Array<object>} citingPapers - Papers citing the main AnVIL paper, each with a `doi`.
 * @param {Array<string>} extraDois - Hand-added DOIs.
 * @returns {Array<object>} A paper for each hand-added DOI that is not a citing paper, then every citing paper.
 * Each has `handAdded`, true when its DOI is on the hand-added list.
 */
function mergeHandAddedPapers(citingPapers, extraDois) {
  const citingDois = new Set(citingPapers.map((p) => p.doi.toLowerCase()));
  const newExtraDois = extraDois.filter(
    (doi) => !citingDois.has(doi.toLowerCase())
  );
  const extraDoiSet = new Set(extraDois.map((doi) => doi.toLowerCase()));
  return [
    ...newExtraDois.map((doi) => ({ doi, handAdded: true, pmid: null })),
    ...citingPapers.map((p) => ({
      ...p,
      handAdded: extraDoiSet.has(p.doi.toLowerCase()),
    })),
  ];
}

/**
 * Build publications.json for the portal entity list.
 * @param {number} limit - Maximum number of citing papers to process.
 * @returns {Promise<void>}
 */
// eslint-disable-next-line sonarjs/cognitive-complexity -- Multi-step build process with necessary sequential logic
async function buildPublications(limit = 1000) {
  // Read the hand-added DOIs first, so a bad list fails before any network calls
  const extraDois = validateExtraDois(
    await readDoiList(EXTRA_PUBLICATION_DOIS_PATH)
  );

  // Step 1: Find citing papers via Semantic Scholar
  const citingPapers = await findCitingPapers(ANVIL_MAIN_DOI, limit);
  console.log(`\nFound ${citingPapers.length} citing papers with DOIs`);

  const papers = mergeHandAddedPapers(citingPapers, extraDois);
  const addedCount = papers.length - citingPapers.length;
  console.log(
    `Adding ${addedCount} hand-added DOIs (${extraDois.length - addedCount} skipped, already citing)`
  );

  // DOIs an API has no record of, reported after the output is written
  const problems = [];
  // Published version DOI of each entry, from its Crossref record
  const publishedDois = new Map();

  // Step 2: Fetch metadata and citation counts for all papers
  const allEntries = [];

  for (let i = 0; i < papers.length; i++) {
    const paper = papers[i];
    console.log(`\n[${i + 1}/${papers.length}] Processing: ${paper.doi}`);

    const crossref = await fetchCrossrefMetadata(paper.doi);
    if (!crossref) {
      // A hand-added DOI that Crossref doesn't know is most likely mistyped
      if (paper.handAdded) {
        throw new Error(
          `Hand-added DOI ${paper.doi} not found in Crossref; check ${EXTRA_PUBLICATION_DOIS_PATH}`
        );
      }
      problems.push({
        doi: paper.doi,
        reason: "not found in Crossref; left out",
      });
      continue;
    }

    await sleep(300); // Rate limit between S2 calls
    let semanticScholar = await fetchSemanticScholarPaper(paper.doi);
    if (!semanticScholar) {
      problems.push({
        doi: paper.doi,
        reason:
          "not found in Semantic Scholar; written with citation count 0 and no PubMed ID",
      });
      semanticScholar = { citationCount: 0, pmid: null };
    }

    const cleanDoi = paper.doi
      .replace("https://doi.org/", "")
      // eslint-disable-next-line sonarjs/no-clear-text-protocols -- String pattern for DOI cleaning, not a network call
      .replace("http://doi.org/", "");

    const publicationYear = crossref.citation.year;
    const publicationMonth = crossref.citation.month;
    const publicationDay = crossref.citation.day;
    // A partial date sorts as the first day of its month or year
    const publicationTimestamp =
      publicationYear > 0
        ? Date.UTC(
            publicationYear,
            (publicationMonth ?? 1) - 1,
            publicationDay ?? 1
          )
        : 0;

    publishedDois.set(
      `https://doi.org/${cleanDoi}`,
      crossref._metadata.publishedDoi
    );
    allEntries.push({
      authors: crossref.citation.authors,
      citationCount: semanticScholar.citationCount,
      doi: `https://doi.org/${cleanDoi}`,
      journal: crossref.citation.journal,
      pmid: paper.pmid || semanticScholar.pmid,
      publicationDay,
      publicationMonth,
      publicationTimestamp,
      publicationYear,
      publisher: crossref.citation.publisher,
      title: cleanTitle(crossref.title),
    });

    if (i < papers.length - 1) {
      await sleep(500);
    }
  }

  console.log(
    `\nFetched ${allEntries.length} entries. Deduplicating preprints...`
  );

  // Step 3: Deduplicate preprints
  // Build a set of DOIs and a title-to-entry map for non-preprints
  const nonPreprintDois = new Set();
  const nonPreprintTitles = new Set();

  for (const entry of allEntries) {
    if (!isPreprint(entry.doi)) {
      nonPreprintDois.add(
        entry.doi.replace("https://doi.org/", "").toLowerCase()
      );
      nonPreprintTitles.add(entry.title.toLowerCase());
    }
  }

  const kept = [];
  let dropped = 0;

  for (const entry of allEntries) {
    if (!isPreprint(entry.doi)) {
      kept.push(entry);
      continue;
    }

    // Check 1: Crossref relation — does this preprint have a published version in the dataset?
    const publishedDoi = publishedDois.get(entry.doi);
    if (publishedDoi && nonPreprintDois.has(publishedDoi.toLowerCase())) {
      console.log(
        `  Dropping preprint ${entry.doi} (published version ${publishedDoi} in dataset)`
      );
      dropped++;
      continue;
    }

    // Check 2: Title match — does a non-preprint with the same title exist?
    if (nonPreprintTitles.has(entry.title.toLowerCase())) {
      console.log(
        `  Dropping preprint ${entry.doi} (title match with non-preprint)`
      );
      dropped++;
      continue;
    }

    // No duplicate found — keep the preprint
    kept.push(entry);
  }

  console.log(
    `\nDedup complete: ${dropped} preprints dropped, ${kept.length} publications kept`
  );

  // Step 4: Write output
  const publications = {};
  for (let i = 0; i < kept.length; i++) {
    publications[String(i)] = kept[i];
  }

  const outputDir = path.join(__dirname, "../files/publications");
  await fsp.mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, "publications.json");
  await fsp.writeFile(outputPath, JSON.stringify(publications, null, 2));
  console.log(`Saved ${kept.length} publications to: ${outputPath}`);

  if (problems.length > 0) {
    console.warn(
      `\n${problems.length} ${problems.length === 1 ? "problem" : "problems"}:`
    );
    for (const { doi, reason } of problems) {
      console.warn(`  ${doi}: ${reason}`);
    }
  }
}

/**
 * Extract DOIs from current publications.mdx.
 * @returns {Promise<Array<string>>} Array of unique DOIs found in the file.
 */
async function extractCurrentDois() {
  const pubPath = path.join(__dirname, "../docs/overview/publications.mdx");
  const content = await fsp.readFile(pubPath, "utf8");

  // Extract DOIs using regex
  const doiRegex =
    /doi:\s*["']?(https:\/\/doi\.org\/[^"'\s]+|10\.[^"'\s]+)["']?/gi;
  const matches = content.matchAll(doiRegex);

  const dois = [];
  for (const match of matches) {
    let doi = match[1];
    // Normalize to just the DOI (without https://doi.org/)
    doi = doi.replace("https://doi.org/", "");
    dois.push(doi);
  }

  return [...new Set(dois)]; // Remove duplicates
}

/**
 * Escape a string for use in a double-quoted YAML scalar.
 * @param {string} str - The string to escape.
 * @returns {string} The escaped string safe for double-quoted YAML.
 */
function escapeYamlDoubleQuoted(str) {
  const value = String(str);
  // Escape backslashes first, then double quotes, for use in double-quoted YAML scalars.
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

/**
 * Convert publications to YAML format for publications.mdx.
 * @param {Array<object>} publications - Array of publication objects to convert.
 * @returns {string} YAML-formatted string of publications.
 */
function toYamlFormat(publications) {
  const lines = ["publications:"];

  for (const pub of publications) {
    lines.push(`  - title: "${escapeYamlDoubleQuoted(pub.title)}"`);
    lines.push(`    cardLink: "${pub.cardLink}"`);
    lines.push(`    category: "${pub.category}"`);
    lines.push("    citation:");
    lines.push("      authors:");
    for (const author of pub.citation.authors) {
      lines.push(`        - "${escapeYamlDoubleQuoted(author)}"`);
    }
    lines.push(`      doi: "${pub.citation.doi}"`);
    lines.push(
      `      journal: "${escapeYamlDoubleQuoted(pub.citation.journal)}"`
    );
    lines.push(
      `      publisher: "${escapeYamlDoubleQuoted(pub.citation.publisher)}"`
    );
    lines.push(`      year: "${pub.citation.year}"`);
  }

  return lines.join("\n");
}

/**
 * Main CLI handler.
 * @returns {Promise<void>}
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  console.log("=".repeat(60));
  console.log("AnVIL Citation Fetcher");
  console.log("=".repeat(60));

  if (command === "--find-citing") {
    // Find papers citing the main AnVIL paper
    const limit = parseInt(args[1]) || 100;
    const papers = await findCitingPapers(ANVIL_MAIN_DOI, limit);

    if (papers.length > 0) {
      // Save raw results
      const outputPath = path.join(__dirname, "output/citing-papers.json");
      await fsp.mkdir(path.dirname(outputPath), { recursive: true });
      await fsp.writeFile(outputPath, JSON.stringify(papers, null, 2));
      console.log(`\nSaved ${papers.length} citing papers to: ${outputPath}`);

      // Now fetch full metadata from Crossref
      console.log("\n" + "=".repeat(60));
      console.log("Fetching full metadata from Crossref...");
      console.log("=".repeat(60));

      const dois = papers.map((p) => p.doi);
      const fullMetadata = await fetchMultipleDois(dois);

      const fullOutputPath = path.join(
        __dirname,
        "output/citing-papers-full.json"
      );
      await fsp.writeFile(
        fullOutputPath,
        JSON.stringify(fullMetadata, null, 2)
      );
      console.log(`\nSaved full metadata to: ${fullOutputPath}`);

      // Also save as YAML
      const yamlPath = path.join(__dirname, "output/citing-papers.yaml");
      await fsp.writeFile(yamlPath, toYamlFormat(fullMetadata));
      console.log(`Saved YAML format to: ${yamlPath}`);
    }
  } else if (command === "--from-dois") {
    // Read DOIs from input file
    const inputFile = args[1] || path.join(__dirname, "files/dois.txt");

    const dois = await readDoiList(inputFile);

    console.log(`\nProcessing ${dois.length} DOIs from ${inputFile}`);

    const metadata = await fetchMultipleDois(dois);

    const outputPath = path.join(
      __dirname,
      "output/publications-from-dois.json"
    );
    await fsp.mkdir(path.dirname(outputPath), { recursive: true });
    await fsp.writeFile(outputPath, JSON.stringify(metadata, null, 2));
    console.log(`\nSaved to: ${outputPath}`);

    const yamlPath = path.join(__dirname, "output/publications-from-dois.yaml");
    await fsp.writeFile(yamlPath, toYamlFormat(metadata));
    console.log(`Saved YAML format to: ${yamlPath}`);
  } else if (command === "--build-publications") {
    // Build publications.json for the portal entity list
    const limit = parseInt(args[1]) || 1000;
    await buildPublications(limit);
  } else if (command === "--from-current") {
    // Refresh metadata for current publications
    const dois = await extractCurrentDois();
    console.log(`\nFound ${dois.length} DOIs in current publications.mdx`);

    const metadata = await fetchMultipleDois(dois);

    const outputPath = path.join(
      __dirname,
      "output/current-publications-refreshed.json"
    );
    await fsp.mkdir(path.dirname(outputPath), { recursive: true });
    await fsp.writeFile(outputPath, JSON.stringify(metadata, null, 2));
    console.log(`\nSaved to: ${outputPath}`);

    const yamlPath = path.join(
      __dirname,
      "output/current-publications-refreshed.yaml"
    );
    await fsp.writeFile(yamlPath, toYamlFormat(metadata));
    console.log(`Saved YAML format to: ${yamlPath}`);
  } else {
    console.log(`
Usage:
  node scripts/fetch-citations.mjs --find-citing [limit]
    Find papers that cite the main AnVIL paper (DOI: ${ANVIL_MAIN_DOI})
    Uses Semantic Scholar API, then enriches with Crossref metadata.

  node scripts/fetch-citations.mjs --from-dois [input-file]
    Fetch metadata for DOIs listed in a file (one DOI per line).
    Default input: scripts/files/dois.txt

  node scripts/fetch-citations.mjs --from-current
    Refresh metadata for all DOIs currently in publications.mdx
    Useful for updating existing entries.

  node scripts/fetch-citations.mjs --build-publications [limit]
    Build publications.json for the portal /publications entity list.
    Fetches citing papers, enriches with Crossref metadata and citation counts.
    Output: files/publications/publications.json

Output:
  - JSON files are saved to scripts/output/ (or files/publications/ for --build-publications)
  - YAML format is also generated for easy copy-paste into publications.mdx

APIs Used:
  - Semantic Scholar: Finding citing papers, citation counts
  - Crossref: Full publication metadata
`);
  }
}

export {
  cleanTitle,
  fetchSemanticScholarPaper,
  getPublishedDoi,
  isPreprint,
  mergeHandAddedPapers,
  readDoiList,
  toYamlFormat,
  validateExtraDois,
};

// Run only when executed directly, so tests can import the helpers. Real paths, so a symlinked
// checkout still runs. A top-level await lets any error print its stack and exit with code 1.
if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main();
}
