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
 */

import { promises as fsp } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Main AnVIL paper DOI
const ANVIL_MAIN_DOI = "10.1016/j.xgen.2021.100085";

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
 * Strip HTML tags and normalize whitespace in a string.
 * @param {string} text - The input text to sanitize.
 * @returns {string} The sanitized text with angle brackets removed and whitespace normalized.
 */
function cleanTitle(text) {
  return text.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
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
 * Check Crossref for a published version of a preprint (via relation metadata).
 * @param {string} preprintDoi - The preprint DOI to look up.
 * @returns {Promise<string|null>} The published version DOI if found, otherwise null.
 */
async function getPublishedDoi(preprintDoi) {
  const cleanDoi = preprintDoi
    .replace("https://doi.org/", "")
    // eslint-disable-next-line sonarjs/no-clear-text-protocols -- String pattern for DOI cleaning, not a network call
    .replace("http://doi.org/", "");
  try {
    const data = await fetchWithRetry(
      `${CROSSREF_API}/${encodeURIComponent(cleanDoi)}`
    );
    const relation = data.message?.relation?.["is-preprint-of"];
    if (relation && relation.length > 0 && relation[0]["id-type"] === "doi") {
      return relation[0].id;
    }
  } catch {
    // eslint-disable-next-line sonarjs/no-ignored-exceptions -- Relation lookup is best-effort; errors are expected for preprints without published versions
  }
  return null;
}

/**
 * Fetch with retry and rate limiting.
 * @param {string} url - The URL to fetch.
 * @param {object} options - Fetch options to pass to the request.
 * @param {number} retries - Number of retry attempts on failure.
 * @param {number} delay - Base delay in milliseconds between retries.
 * @returns {Promise<object>} The parsed JSON response.
 */
async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "User-Agent":
            "AnVIL-Portal-Citation-Fetcher/1.0 (mailto:help@anvilproject.org)",
          ...options.headers,
        },
      });

      if (response.status === 429) {
        // Rate limited - wait and retry
        const retryAfter = response.headers.get("retry-after") || delay / 1000;
        console.log(`Rate limited. Waiting ${retryAfter}s...`);
        await sleep(parseInt(retryAfter) * 1000);
        continue;
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Retry ${i + 1}/${retries} after error: ${error.message}`);
      await sleep(delay * (i + 1));
    }
  }
}

/**
 * Find papers citing the main AnVIL paper using Semantic Scholar.
 * @param {string} doi - The DOI of the paper to find citations for.
 * @param {number} limit - Maximum number of citing papers to retrieve.
 * @returns {Promise<Array<object>>} Array of citing paper objects with DOI, title, authors, etc.
 */
async function findCitingPapers(doi = ANVIL_MAIN_DOI, limit = 100) {
  console.log(`\nFinding papers that cite DOI: ${doi}`);

  const url = `${SEMANTIC_SCHOLAR_API}/paper/DOI:${doi}/citations?fields=title,authors,year,externalIds,venue,publicationDate&limit=${limit}`;

  try {
    const data = await fetchWithRetry(url);

    const citations = data.data || [];
    console.log(`Found ${citations.length} citing papers\n`);

    // Extract DOIs from citing papers
    const citingPapers = citations
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

    return citingPapers;
  } catch (error) {
    console.error(`Error fetching citations: ${error.message}`);
    return [];
  }
}

/**
 * Fetch metadata for a single DOI from Crossref.
 * @param {string} doi - The DOI to fetch metadata for.
 * @returns {Promise<object|null>} Publication metadata object or null on error.
 */
async function fetchCrossrefMetadata(doi) {
  // Clean DOI - remove URL prefix if present
  const cleanDoi = doi
    .replace("https://doi.org/", "")
    // eslint-disable-next-line sonarjs/no-clear-text-protocols -- String pattern for DOI cleaning, not a network call
    .replace("http://doi.org/", "");

  console.log(`Fetching Crossref metadata for: ${cleanDoi}`);

  try {
    const data = await fetchWithRetry(
      `${CROSSREF_API}/${encodeURIComponent(cleanDoi)}`
    );
    const work = data.message;

    // Extract authors
    const authors = (work.author || []).map((a) => {
      if (a.name) return a.name; // Organization
      return `${a.given || ""} ${a.family || ""}`.trim();
    });

    // Get publication year
    const year =
      work.published?.["date-parts"]?.[0]?.[0] ||
      work["published-print"]?.["date-parts"]?.[0]?.[0] ||
      work["published-online"]?.["date-parts"]?.[0]?.[0] ||
      null;

    // Get journal/container title
    const journal = work["container-title"]?.[0] || work.publisher || "";

    return {
      // Additional metadata for reference
      _metadata: {
        citedByCount: work["is-referenced-by-count"],
        issn: work.ISSN,
        referencesCount: work["references-count"],
        subject: work.subject,
        type: work.type,
      },
      cardLink: work.URL || `https://doi.org/${cleanDoi}`,
      category: "ON_ANVIL", // Default - can be changed manually
      citation: {
        authors,
        doi: `https://doi.org/${cleanDoi}`,
        journal,
        publisher: work.publisher || "",
        year: year ? String(year) : "",
      },
      title: work.title?.[0] || "",
    };
  } catch (error) {
    console.error(`Error fetching ${cleanDoi}: ${error.message}`);
    return null;
  }
}

/**
 * Fetch metadata for multiple DOIs.
 * @param {Array<string>} dois - Array of DOIs to fetch metadata for.
 * @returns {Promise<Array<object>>} Array of publication metadata objects.
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
 * Fetch citation count for a DOI from Semantic Scholar.
 * @param {string} doi - The DOI to fetch citation count for.
 * @returns {Promise<number>} The citation count, or 0 on error.
 */
async function fetchCitationCount(doi) {
  const cleanDoi = doi
    .replace("https://doi.org/", "")
    // eslint-disable-next-line sonarjs/no-clear-text-protocols -- String pattern for DOI cleaning, not a network call
    .replace("http://doi.org/", "");
  try {
    const data = await fetchWithRetry(
      `${SEMANTIC_SCHOLAR_API}/paper/DOI:${cleanDoi}?fields=citationCount`
    );
    return data.citationCount ?? 0;
  } catch (error) {
    console.error(
      `Error fetching citation count for ${cleanDoi}: ${error.message}`
    );
    return 0;
  }
}

/**
 * Build publications.json for the portal entity list.
 * @param {number} limit - Maximum number of citing papers to process.
 * @returns {Promise<void>}
 */
// eslint-disable-next-line sonarjs/cognitive-complexity -- Multi-step build process with necessary sequential logic
async function buildPublications(limit = 1000) {
  // Step 1: Find citing papers via Semantic Scholar
  const citingPapers = await findCitingPapers(ANVIL_MAIN_DOI, limit);
  console.log(`\nFound ${citingPapers.length} citing papers with DOIs`);

  // Step 2: Fetch metadata and citation counts for all papers
  const allEntries = [];

  for (let i = 0; i < citingPapers.length; i++) {
    const paper = citingPapers[i];
    console.log(`\n[${i + 1}/${citingPapers.length}] Processing: ${paper.doi}`);

    const crossref = await fetchCrossrefMetadata(paper.doi);
    if (!crossref) continue;

    await sleep(300); // Rate limit between S2 calls
    const citationCount = await fetchCitationCount(paper.doi);

    const cleanDoi = paper.doi
      .replace("https://doi.org/", "")
      // eslint-disable-next-line sonarjs/no-clear-text-protocols -- String pattern for DOI cleaning, not a network call
      .replace("http://doi.org/", "");

    allEntries.push({
      authors: crossref.citation.authors,
      citationCount,
      doi: `https://doi.org/${cleanDoi}`,
      journal: crossref.citation.journal,
      pmid: paper.pmid || null,
      publisher: crossref.citation.publisher,
      title: cleanTitle(crossref.title),
      year: crossref.citation.year ? Number(crossref.citation.year) : null,
    });

    if (i < citingPapers.length - 1) {
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
    await sleep(300);
    const publishedDoi = await getPublishedDoi(entry.doi);
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
 * Convert publications to YAML format for publications.mdx.
 * @param {Array<object>} publications - Array of publication objects to convert.
 * @returns {string} YAML-formatted string of publications.
 */
function toYamlFormat(publications) {
  const lines = ["publications:"];

  for (const pub of publications) {
    lines.push(`  - title: "${pub.title.replace(/"/g, '\\"')}"`);
    lines.push(`    cardLink: "${pub.cardLink}"`);
    lines.push(`    category: "${pub.category}"`);
    lines.push("    citation:");
    lines.push("      authors:");
    for (const author of pub.citation.authors) {
      lines.push(`        - "${author.replace(/"/g, '\\"')}"`);
    }
    lines.push(`      doi: "${pub.citation.doi}"`);
    lines.push(`      journal: "${pub.citation.journal.replace(/"/g, '\\"')}"`);
    lines.push(
      `      publisher: "${pub.citation.publisher.replace(/"/g, '\\"')}"`
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

    try {
      const content = await fsp.readFile(inputFile, "utf8");
      const dois = content
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#"));

      console.log(`\nProcessing ${dois.length} DOIs from ${inputFile}`);

      const metadata = await fetchMultipleDois(dois);

      const outputPath = path.join(
        __dirname,
        "output/publications-from-dois.json"
      );
      await fsp.mkdir(path.dirname(outputPath), { recursive: true });
      await fsp.writeFile(outputPath, JSON.stringify(metadata, null, 2));
      console.log(`\nSaved to: ${outputPath}`);

      const yamlPath = path.join(
        __dirname,
        "output/publications-from-dois.yaml"
      );
      await fsp.writeFile(yamlPath, toYamlFormat(metadata));
      console.log(`Saved YAML format to: ${yamlPath}`);
    } catch (error) {
      console.error(`Error reading input file: ${error.message}`);
      console.log("\nCreate a file with one DOI per line, e.g.:");
      console.log("  scripts/files/dois.txt");
    }
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

main().catch(console.error);
