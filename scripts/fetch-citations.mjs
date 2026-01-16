/**
 * Citation Fetcher Script for AnVIL Portal
 *
 * This script:
 * 1. Finds papers that cite the main AnVIL paper via Semantic Scholar API
 * 2. Fetches metadata for DOIs via Crossref API
 * 3. Outputs JSON matching the publications.mdx format
 *
 * Usage:
 *   node scripts/fetch-citations.mjs --find-citing     # Find papers citing AnVIL
 *   node scripts/fetch-citations.mjs --from-dois       # Fetch metadata for DOIs in input file
 *   node scripts/fetch-citations.mjs --from-current    # Refresh metadata for current publications
 */

import { promises as fsp } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Main AnVIL paper DOI
const ANVIL_MAIN_DOI = "10.1016/j.xgen.2021.100085";

// API endpoints
const SEMANTIC_SCHOLAR_API = "https://api.semanticscholar.org/graph/v1";
const CROSSREF_API = "https://api.crossref.org/works";

// Rate limiting helpers
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch with retry and rate limiting
 */
async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "User-Agent": "AnVIL-Portal-Citation-Fetcher/1.0 (mailto:your-email@example.com)",
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
 * Find papers citing the main AnVIL paper using Semantic Scholar
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
          title: paper.title,
          authors: paper.authors?.map((a) => a.name) || [],
          year: paper.year,
          doi: paper.externalIds?.DOI || null,
          pmid: paper.externalIds?.PubMed || null,
          venue: paper.venue,
          publicationDate: paper.publicationDate,
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
 * Fetch metadata for a single DOI from Crossref
 */
async function fetchCrossrefMetadata(doi) {
  // Clean DOI - remove URL prefix if present
  const cleanDoi = doi.replace("https://doi.org/", "").replace("http://doi.org/", "");

  console.log(`Fetching Crossref metadata for: ${cleanDoi}`);

  try {
    const data = await fetchWithRetry(`${CROSSREF_API}/${encodeURIComponent(cleanDoi)}`);
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
      title: work.title?.[0] || "",
      cardLink: work.URL || `https://doi.org/${cleanDoi}`,
      category: "ON_ANVIL", // Default - can be changed manually
      citation: {
        authors,
        doi: `https://doi.org/${cleanDoi}`,
        journal,
        publisher: work.publisher || "",
        year: year ? String(year) : "",
      },
      // Additional metadata for reference
      _metadata: {
        type: work.type,
        issn: work.ISSN,
        subject: work.subject,
        referencesCount: work["references-count"],
        citedByCount: work["is-referenced-by-count"],
      },
    };
  } catch (error) {
    console.error(`Error fetching ${cleanDoi}: ${error.message}`);
    return null;
  }
}

/**
 * Fetch metadata for multiple DOIs
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
 * Extract DOIs from current publications.mdx
 */
async function extractCurrentDois() {
  const pubPath = path.join(__dirname, "../docs/overview/publications.mdx");
  const content = await fsp.readFile(pubPath, "utf8");

  // Extract DOIs using regex
  const doiRegex = /doi:\s*["']?(https:\/\/doi\.org\/[^"'\s]+|10\.[^"'\s]+)["']?/gi;
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
 * Convert publications to YAML format for publications.mdx
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
    lines.push(`      publisher: "${pub.citation.publisher.replace(/"/g, '\\"')}"`);
    lines.push(`      year: "${pub.citation.year}"`);
  }

  return lines.join("\n");
}

/**
 * Main CLI handler
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

      const fullOutputPath = path.join(__dirname, "output/citing-papers-full.json");
      await fsp.writeFile(fullOutputPath, JSON.stringify(fullMetadata, null, 2));
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

      const outputPath = path.join(__dirname, "output/publications-from-dois.json");
      await fsp.mkdir(path.dirname(outputPath), { recursive: true });
      await fsp.writeFile(outputPath, JSON.stringify(metadata, null, 2));
      console.log(`\nSaved to: ${outputPath}`);

      const yamlPath = path.join(__dirname, "output/publications-from-dois.yaml");
      await fsp.writeFile(yamlPath, toYamlFormat(metadata));
      console.log(`Saved YAML format to: ${yamlPath}`);
    } catch (error) {
      console.error(`Error reading input file: ${error.message}`);
      console.log("\nCreate a file with one DOI per line, e.g.:");
      console.log("  scripts/files/dois.txt");
    }
  } else if (command === "--from-current") {
    // Refresh metadata for current publications
    const dois = await extractCurrentDois();
    console.log(`\nFound ${dois.length} DOIs in current publications.mdx`);

    const metadata = await fetchMultipleDois(dois);

    const outputPath = path.join(__dirname, "output/current-publications-refreshed.json");
    await fsp.mkdir(path.dirname(outputPath), { recursive: true });
    await fsp.writeFile(outputPath, JSON.stringify(metadata, null, 2));
    console.log(`\nSaved to: ${outputPath}`);

    const yamlPath = path.join(__dirname, "output/current-publications-refreshed.yaml");
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

Output:
  - JSON files are saved to scripts/output/
  - YAML format is also generated for easy copy-paste into publications.mdx

APIs Used:
  - Semantic Scholar: Finding citing papers
  - Crossref: Full publication metadata

Note: Please update the User-Agent email in this script before heavy usage.
`);
  }
}

main().catch(console.error);
