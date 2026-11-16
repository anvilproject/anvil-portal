/**
 * @jest-environment node
 */
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";
import { spawnSync } from "child_process";
import { promises as fsp } from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import {
  cleanTitle,
  fetchSemanticScholarPaper,
  findCitingPapers,
  getPublishedDoi,
  isExecutedDirectly,
  isPreprint,
  mergeHandAddedPapers,
  readDoiList,
  toYamlFormat,
  validateExtraDois,
} from "../scripts/fetch-citations.mjs";

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => undefined);
  jest.spyOn(console, "log").mockImplementation(() => undefined);
});

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/fetch-citations.mjs", import.meta.url)
);

describe("isExecutedDirectly", () => {
  it("returns true for the script's path", () => {
    expect(isExecutedDirectly(SCRIPT_PATH)).toBe(true);
  });

  it("returns true for a symlink to the script", async () => {
    const dir = await fsp.mkdtemp(path.join(os.tmpdir(), "fetch-citations-"));
    try {
      const link = path.join(dir, "fetch-citations.mjs");
      await fsp.symlink(SCRIPT_PATH, link);
      expect(isExecutedDirectly(link)).toBe(true);
    } finally {
      await fsp.rm(dir, { force: true, recursive: true });
    }
  });

  it("returns false for another file", () => {
    expect(isExecutedDirectly(fileURLToPath(import.meta.url))).toBe(false);
  });

  it("runs main when the script is executed directly", () => {
    const { status, stdout } = spawnSync(process.execPath, [SCRIPT_PATH], {
      encoding: "utf8",
      timeout: 10000,
    });
    expect(status).toBe(0);
    expect(stdout).toContain("Usage:");
  });

  it("returns false with no entry path or stdin", () => {
    expect(isExecutedDirectly(undefined)).toBe(false);
    expect(isExecutedDirectly("-")).toBe(false);
  });

  it("returns false for a path where no file exists", () => {
    expect(isExecutedDirectly(path.join(os.tmpdir(), "no-such-file"))).toBe(
      false
    );
  });
});

describe("isPreprint", () => {
  it.each([
    "10.1101/2024.01.01.123456",
    "10.21203/rs.3.rs-123/v1",
    "10.48550/arXiv.2401.00001",
    "10.20944/preprints202401.0001.v1",
    "10.2139/ssrn.1234567",
  ])("returns true for the preprint DOI %s", (doi) => {
    expect(isPreprint(doi)).toBe(true);
  });

  it("returns true for a preprint DOI with a doi.org URL prefix", () => {
    expect(isPreprint("https://doi.org/10.1101/2024.01.01.123456")).toBe(true);
    // eslint-disable-next-line sonarjs/no-clear-text-protocols -- DOI string under test, not a network call
    expect(isPreprint("http://doi.org/10.1101/2024.01.01.123456")).toBe(true);
  });

  it("returns false for a journal DOI", () => {
    expect(isPreprint("https://doi.org/10.1038/s41586-026-10843-7")).toBe(
      false
    );
  });
});

describe("cleanTitle", () => {
  it("decodes double-encoded and numeric HTML entities", () => {
    expect(cleanTitle("A &amp;amp; B &#8211; C&#x2019;s")).toBe(
      "A & B \u2013 C\u2019s"
    );
  });

  it("removes XML processing instructions, comments and tags", () => {
    expect(
      cleanTitle("<?A3B2 pi6?>Genomic <i>analysis</i><!-- note --> at scale")
    ).toBe("Genomic analysis at scale");
  });

  it("removes a comment left behind by removing a nested one", () => {
    expect(cleanTitle("Genomic <!<!-- x -->-- y -->analysis")).toBe(
      "Genomic analysis"
    );
  });

  it("removes a whole processing instruction that contains >", () => {
    expect(cleanTitle("<?A3B2 a>b?>Genomic analysis")).toBe("Genomic analysis");
  });

  it("collapses whitespace and trims", () => {
    expect(cleanTitle("  Genomic\n   analysis  ")).toBe("Genomic analysis");
  });
});

describe("toYamlFormat", () => {
  it("escapes backslashes and double quotes in quoted values", () => {
    const yaml = toYamlFormat([
      {
        cardLink: "https://doi.org/10.1/x",
        category: "ON_ANVIL",
        citation: {
          authors: ['Ann "A" Author'],
          doi: "https://doi.org/10.1/x",
          journal: "Journal\\Name",
          publisher: "Publisher",
          year: 2024,
        },
        title: 'The "AnVIL" paper',
      },
    ]);
    expect(yaml).toBe(
      [
        "publications:",
        '  - title: "The \\"AnVIL\\" paper"',
        '    cardLink: "https://doi.org/10.1/x"',
        '    category: "ON_ANVIL"',
        "    citation:",
        "      authors:",
        '        - "Ann \\"A\\" Author"',
        '      doi: "https://doi.org/10.1/x"',
        '      journal: "Journal\\\\Name"',
        '      publisher: "Publisher"',
        '      year: "2024"',
      ].join("\n")
    );
  });
});

describe("getPublishedDoi", () => {
  it("returns the DOI of the published version Crossref records", () => {
    const work = {
      relation: {
        "is-preprint-of": [{ id: "10.1038/published", "id-type": "doi" }],
      },
    };
    expect(getPublishedDoi(work)).toBe("10.1038/published");
  });

  it("returns null when Crossref records no published version", () => {
    expect(getPublishedDoi({})).toBeNull();
  });

  it("returns null when the published version is not a DOI", () => {
    const work = {
      relation: {
        "is-preprint-of": [{ id: "2401.00001", "id-type": "arxiv" }],
      },
    };
    expect(getPublishedDoi(work)).toBeNull();
  });
});

describe("readDoiList", () => {
  let dir;

  beforeEach(async () => {
    dir = await fsp.mkdtemp(path.join(os.tmpdir(), "fetch-citations-"));
  });

  afterEach(async () => {
    await fsp.rm(dir, { force: true, recursive: true });
  });

  it("returns trimmed DOIs, skipping blank lines and comments", async () => {
    const filePath = path.join(dir, "dois.txt");
    await fsp.writeFile(
      filePath,
      "# Hand-added papers\n10.1/a\n\n  10.1/b  \n# 10.1/c\n"
    );
    expect(await readDoiList(filePath)).toEqual(["10.1/a", "10.1/b"]);
  });
});

describe("validateExtraDois", () => {
  it("returns a valid list unchanged", () => {
    const dois = ["10.1/a", "10.1/b"];
    expect(validateExtraDois(dois)).toBe(dois);
  });

  it("rejects a DOI that does not start with 10.", () => {
    expect(() => validateExtraDois(["https://doi.org/10.1/a"])).toThrow(
      'is not a bare DOI starting with "10."'
    );
  });

  it("rejects a DOI listed twice, ignoring case", () => {
    expect(() => validateExtraDois(["10.1/abc", "10.1/ABC"])).toThrow(
      '"10.1/ABC" is listed more than once'
    );
  });
});

describe("mergeHandAddedPapers", () => {
  const citingPapers = [
    { doi: "10.1/Citing", pmid: "111" },
    { doi: "10.1/other", pmid: null },
  ];

  it("adds hand-added DOIs that are not citing papers, before the citing papers", () => {
    expect(mergeHandAddedPapers(citingPapers, ["10.1/new"])).toEqual([
      { doi: "10.1/new", handAdded: true, pmid: null },
      { doi: "10.1/Citing", handAdded: false, pmid: "111" },
      { doi: "10.1/other", handAdded: false, pmid: null },
    ]);
  });

  it("skips a hand-added DOI already among the citing papers, ignoring case, and marks that paper hand-added", () => {
    expect(mergeHandAddedPapers(citingPapers, ["10.1/CITING"])).toEqual([
      { doi: "10.1/Citing", handAdded: true, pmid: "111" },
      { doi: "10.1/other", handAdded: false, pmid: null },
    ]);
  });
});

describe("fetchSemanticScholarPaper", () => {
  /**
   * Stub fetch to answer every request with the given JSON body and status.
   * @param {object} body - The JSON response body.
   * @param {number} status - The HTTP status code.
   * @returns {object} The fetch mock.
   */
  function stubFetch(body, status = 200) {
    return jest
      .spyOn(globalThis, "fetch")
      .mockImplementation(async () => Response.json(body, { status }));
  }

  it("returns the citation count and PubMed ID from one request", async () => {
    const fetchMock = stubFetch({
      citationCount: 42,
      externalIds: { PubMed: "12345" },
    });
    await expect(
      fetchSemanticScholarPaper("https://doi.org/10.1/a")
    ).resolves.toEqual({ citationCount: 42, pmid: "12345" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe(
      "https://api.semanticscholar.org/graph/v1/paper/DOI:10.1/a?fields=citationCount,externalIds"
    );
  });

  it("returns a count of 0 and no PubMed ID when the response has neither", async () => {
    stubFetch({});
    await expect(fetchSemanticScholarPaper("10.1/a")).resolves.toEqual({
      citationCount: 0,
      pmid: null,
    });
  });

  it("returns null without retrying when Semantic Scholar has no record", async () => {
    const fetchMock = stubFetch({ error: "Paper not found" }, 404);
    await expect(fetchSemanticScholarPaper("10.1/a")).resolves.toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("rejects without retrying on a client error other than 404", async () => {
    const fetchMock = stubFetch({ error: "Bad request" }, 400);
    await expect(fetchSemanticScholarPaper("10.1/a")).rejects.toThrow(
      "HTTP 400"
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe("fetchWithRetry, through fetchSemanticScholarPaper", () => {
  const PAPER_URL =
    "https://api.semanticscholar.org/graph/v1/paper/DOI:10.1/a?fields=citationCount,externalIds";

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  /**
   * Make a fetch implementation that answers with the given status, JSON body and headers.
   * @param {number} status - The HTTP status code.
   * @param {object} body - The JSON response body.
   * @param {object} headers - The response headers.
   * @returns {Function} The fetch implementation.
   */
  function respond(status, body = {}, headers = {}) {
    return async () => Response.json(body, { headers, status });
  }

  /**
   * Stub fetch to answer each request with the next implementation in turn.
   * @param {...Function} implementations - One fetch implementation per request.
   * @returns {object} The fetch mock.
   */
  function stubFetchSequence(...implementations) {
    const fetchMock = jest.spyOn(globalThis, "fetch");
    for (const implementation of implementations) {
      fetchMock.mockImplementationOnce(implementation);
    }
    return fetchMock;
  }

  it("retries a 5xx response after 2s, then 4s, and returns the result", async () => {
    const fetchMock = stubFetchSequence(
      respond(503),
      respond(503),
      respond(200, { citationCount: 7 })
    );
    const result = fetchSemanticScholarPaper("10.1/a");
    await jest.advanceTimersByTimeAsync(1999);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await jest.advanceTimersByTimeAsync(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    await jest.advanceTimersByTimeAsync(3999);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    await jest.advanceTimersByTimeAsync(1);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    await expect(result).resolves.toEqual({ citationCount: 7, pmid: null });
  });

  it("rejects with the HTTP error after five 5xx responses", async () => {
    const fetchMock = jest
      .spyOn(globalThis, "fetch")
      .mockImplementation(respond(503));
    const assertion = expect(
      fetchSemanticScholarPaper("10.1/a")
    ).rejects.toThrow(`HTTP 503 from ${PAPER_URL}`);
    await jest.runAllTimersAsync();
    await assertion;
    expect(fetchMock).toHaveBeenCalledTimes(5);
  });

  it("rejects naming the URL, with the network error as its cause, after five network errors", async () => {
    const networkError = new TypeError("fetch failed");
    const fetchMock = jest
      .spyOn(globalThis, "fetch")
      .mockRejectedValue(networkError);
    const caught = fetchSemanticScholarPaper("10.1/a").catch((error) => error);
    await jest.runAllTimersAsync();
    const error = await caught;
    expect(error.message).toBe(`Request failed: ${PAPER_URL}`);
    expect(error.cause).toBe(networkError);
    expect(fetchMock).toHaveBeenCalledTimes(5);
  });

  it("waits the seconds a 429 response's retry-after gives", async () => {
    const fetchMock = stubFetchSequence(
      respond(429, {}, { "retry-after": "3" }),
      respond(200, { citationCount: 7 })
    );
    const result = fetchSemanticScholarPaper("10.1/a");
    await jest.advanceTimersByTimeAsync(2999);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await jest.advanceTimersByTimeAsync(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    await expect(result).resolves.toEqual({ citationCount: 7, pmid: null });
  });

  it("falls back to the backoff when a 429 response's retry-after is a date", async () => {
    const fetchMock = stubFetchSequence(
      respond(429, {}, { "retry-after": "Wed, 21 Oct 2026 07:28:00 GMT" }),
      respond(200, { citationCount: 7 })
    );
    const result = fetchSemanticScholarPaper("10.1/a");
    await jest.advanceTimersByTimeAsync(1999);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await jest.advanceTimersByTimeAsync(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    await expect(result).resolves.toEqual({ citationCount: 7, pmid: null });
  });

  it("rejects with the HTTP error after five 429 responses", async () => {
    const fetchMock = jest
      .spyOn(globalThis, "fetch")
      .mockImplementation(respond(429));
    const assertion = expect(
      fetchSemanticScholarPaper("10.1/a")
    ).rejects.toThrow(`HTTP 429 from ${PAPER_URL}`);
    await jest.runAllTimersAsync();
    await assertion;
    expect(fetchMock).toHaveBeenCalledTimes(5);
  });
});

describe("findCitingPapers", () => {
  it("rejects when the response has no citation list", async () => {
    jest
      .spyOn(globalThis, "fetch")
      .mockImplementation(async () => Response.json({ error: "Not found" }));
    await expect(findCitingPapers("10.1/a", 10)).rejects.toThrow(
      "No citation list in response from https://api.semanticscholar.org/graph/v1/paper/DOI:10.1/a/citations"
    );
  });
});
