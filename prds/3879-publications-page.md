# PRD: Citations Page

**Issue**: https://github.com/anvilproject/anvil-portal/issues/3879
**Route**: `/explore/citations`

## Overview

Add a top-level **Citations** page to the AnVIL Portal that lists research papers citing the main AnVIL paper. The page uses findable-ui's client-side faceted filtering (the same framework used by the AnVIL Dataset Catalog in data-browser) to let users search and filter citations by title, author, journal, year, and PubMed ID. A Table/Graph toggle lets users switch between the tabular list and histogram charts per facet.

The existing `/overview/publications` page is renamed to **"Selected Publications"** and retains only the "About AnVIL" platform papers. An info alert on that page links users to the new Citations page.

## Data Source

The page lists **papers that cite the main AnVIL paper**:

> Schatz MC, Philippakis AA, Afgan E, Banks E, Carey VJ, Carroll RJ, et al. Inverting the model of genomics data sharing with the NHGRI Genomic Data Science Analysis, Visualization, and Informatics Lab-space (AnVIL). Cell Genomics. 2022;2. doi:10.1016/j.xgen.2021.100085

- **Citing papers** discovered via the **Semantic Scholar API** (citations endpoint for DOI `10.1016/j.xgen.2021.100085`)
- Metadata enriched from the **Crossref API** (title, authors, journal, year, publisher)
- **Citation counts** per paper fetched from the **Semantic Scholar API** (`citationCount` field)
- **PubMed IDs** from Semantic Scholar's `externalIds.PubMed` field
- Output committed as a **static JSON file** (`files/publications/publications.json`)

### Data Pipeline

```
Semantic Scholar: GET /paper/DOI:10.1016/j.xgen.2021.100085/citations
  → list of citing paper DOIs + PubMed IDs
  → Crossref API (full metadata per DOI)
  → Semantic Scholar API (citation count per DOI)
  → Title cleanup (strip HTML tags, normalize whitespace)
  → Preprint deduplication (see below)
  → publications.json (committed)
```

The script is run manually via `npm run fetch-citations` to refresh the citing papers list and citation counts.

### Preprint Deduplication

Semantic Scholar sometimes returns both the preprint and published version of the same study. The build script deduplicates these to avoid listing a paper twice.

**Detection:** A paper is flagged as a preprint if its DOI matches a known preprint prefix:

- `10.1101/` (bioRxiv, medRxiv)
- `10.21203/` (Research Square)
- `10.48550/` (arXiv)
- `10.20944/` (Preprints.org)
- `10.2139/` (SSRN)

**Dedup rules** (applied to each preprint in order):

1. **Crossref relation check:** Look up the preprint's Crossref `relation.is-preprint-of` field. If it links to a published DOI that's already in the dataset, drop the preprint.
2. **Title match:** If a non-preprint entry with the same title (case-insensitive) exists in the dataset, drop the preprint.
3. **Keep:** If neither check matches, the preprint is a unique study — keep it.

Note: Crossref relation coverage is partial (~28% of preprints have `is-preprint-of` metadata), which is why the title fallback is needed.

## Data Model

```typescript
interface Publication {
  authors: string[]; // List of author names
  citationCount: number; // Citation count from Semantic Scholar
  doi: string; // Full DOI URL (https://doi.org/...)
  journal: string; // Journal / container title
  pmid: string | null; // PubMed ID from Semantic Scholar (null if unavailable)
  publisher: string; // Publisher name
  title: string; // Paper title (HTML stripped, whitespace normalized)
  year: number; // Publication year (0 if unknown, displayed as empty)
}
```

## Page Location & Routing

- **Route**: `/explore/citations` (dynamic segment: `pages/explore/[entityListType]/index.tsx`)
- **Nav**: "Citations" in top-level header navigation, links to `/explore/citations`
- The `/explore/[entityListType]` route is generic — adding a new entity type only requires registering its `EntityConfig` in the site config's `entities` array; `getStaticPaths` derives paths automatically

## UI Layout

Standard findable-ui catalog list page: faceted filters on the left, results table on the right. Table/Graph toggle above the results.

```
┌─────────────────────────────────────────────────────────┐
│  Header / Nav                                           │
├──────────────┬──────────────────────────────────────────┤
│              │  ℹ️ Using AnVIL? See Citing AnVIL...      │
│  Faceted     │                                          │
│  Filters     │  [Table] [Graph]   Results 1-105 of 105  │
│  (Left Nav)  │                                          │
│              │  ┌──────┬───────┬───────┬────┬─────┬────┐│
│  ☐ Title     │  │Title │Author │Journal│Year│PMID │Cite││
│  ☐ Journal   │  │      │       │       │    │     │    ││
│  ☐ PubMed ID │  │ ...  │ ...   │ ...   │... │ ... │... ││
│  ☐ Author    │  │      │       │       │    │     │    ││
│  ☐ Year      │  └──────┴───────┴───────┴────┴─────┴────┘│
│              │                                          │
├──────────────┴──────────────────────────────────────────┤
│  Footer                                                 │
└─────────────────────────────────────────────────────────┘
```

## Faceted Filters (Left Sidebar)

| Facet     | Type              | Key       | Chart | Behavior                                                                            |
| --------- | ----------------- | --------- | ----- | ----------------------------------------------------------------------------------- |
| Title     | Search/text input | `title`   | No    | Free-text search, filters as you type (chart disabled — every value is unique)      |
| Journal   | Multi-select      | `journal` | Yes   | Checkbox list of distinct journal names                                             |
| PubMed ID | Search/text input | `pmid`    | No    | Search by PMID (chart disabled — every value is unique)                             |
| Author    | Multi-select      | `authors` | Yes   | Checkbox list with search-within-filter; array field, matches if any author matches |
| Year      | Multi-select      | `year`    | Yes   | Checkbox list of years, sorted alphabetically                                       |

## Results Table Columns

| Column    | Component   | Width                     | Notes                                                |
| --------- | ----------- | ------------------------- | ---------------------------------------------------- |
| Title     | `Link`      | `max: 2fr, min: 240px`    | Links to DOI URL (external, new tab)                 |
| Author    | `NTagCell`  | `max: 0.75fr, min: 140px` | First few authors + "+N more"                        |
| Journal   | `BasicCell` | `max: 1fr, min: 120px`    | Plain text                                           |
| Year      | `BasicCell` | `max: 0.5fr, min: 80px`   | Sortable. Displays empty for unknown years           |
| PubMed ID | `Link`      | `max: 0.5fr, min: 100px`  | Links to pubmed.ncbi.nlm.nih.gov (new tab)           |
| Citations | `BasicCell` | `max: 0.5fr, min: 100px`  | Sortable. Default sort descending (most cited first) |

## Graph View

The Table/Graph toggle (`enableEntitiesView: true` in site config) lets users switch to a histogram view. Each facet with `enableChartView: true` gets a bar chart showing term counts. Title and PubMed ID are excluded (`enableChartView: false`) since every value is unique.

## Files Created / Modified

### New Files

| File                                                    | Purpose                                                  |
| ------------------------------------------------------- | -------------------------------------------------------- |
| `files/publications/publications.json`                  | Static citation data (105 entries, generated)            |
| `pages/explore/[entityListType]/index.tsx`              | Generic entity list page (dynamic route)                 |
| `apis/publications/entities.ts`                         | `Publication` / `PublicationInput` TypeScript interfaces |
| `apis/publications/utils.ts`                            | Input mapper, getId, getTitle                            |
| `viewModelBuilders/publications/viewModelBuilders.ts`   | View builders for each column                            |
| `site-config/anvil-portal/publications/category.ts`     | Category keys and labels                                 |
| `site-config/anvil-portal/publications/entityConfig.ts` | `EntityConfig<Publication>`                              |
| `components/Citations/components/CitationInfoBox/`      | Info alert linking to "Citing AnVIL"                     |
| `utils/readFile.ts`                                     | Static file reader for getStaticProps                    |
| `scripts/fetch-citations.mjs`                           | Citation fetcher (S2 + Crossref APIs)                    |

### Modified Files

| File                                                  | Change                                                                     |
| ----------------------------------------------------- | -------------------------------------------------------------------------- |
| `pages/_app.tsx`                                      | Add ExploreStateProvider, ConfigProvider                                   |
| `site-config/anvil-portal/dev/config.ts`              | Add entity config, enableEntitiesView, nav item                            |
| `site-config/anvil-portal/dev/navigation/overview.ts` | Rename "Publications" to "Selected Publications"                           |
| `routes/constants.ts`                                 | Add `CITATIONS = "/explore/citations"`                                     |
| `components/index.tsx`                                | Export Alert component                                                     |
| `docs/overview/publications.mdx`                      | Rename to "Selected Publications", remove ON_ANVIL entries, add info alert |
| `.gitignore`                                          | Ignore `scripts/output/` and `scripts/files/`                              |
| `package.json`                                        | Add `fetch-citations` npm script                                           |

## Implementation Notes

### Architecture: findable-ui Entity Integration

The citations page uses findable-ui's `CS_FETCH_CS_FILTERING` explore mode — static JSON loaded at build time, client-side filtering via TanStack Table. This matches the pattern used by ncpi-dataset-catalog and brc-analytics.

**Key components wired up in `_app.tsx`:**

- `ConfigProvider` — receives `entityListType` (defaults to `"citations"` via `DEFAULT_ENTITY_LIST_TYPE`)
- `ExploreStateProvider` — wraps page content, manages filter/sort/pagination reducer state
- The publications `EntityConfig` is registered in `site-config/anvil-portal/dev/config.ts` via `entities: [publicationsEntityConfig]`

**Static data pipeline (`getStaticProps`):**

1. Reads `files/publications/publications.json` via `readFileSync`
2. Seeds findable-ui's in-memory database (`database.get().seed()`)
3. Fetches entities back out via `fetchAllEntities()` (TSV service queries the seeded database)
4. Passes the result as `props.data` to the page component

On the client, `ExploreView` receives the data through props. `useEntityList` reads `staticData.hits` from props (not the database) and dispatches `ProcessExploreResponse` to populate the explore state.

### Race Condition Fix: `useExploreReady` Loading Gate

**Problem:** On full page refresh, `ExploreStateProvider` and `ExploreView` mount simultaneously. React fires child effects before parent effects:

1. `useEntityList` (child) dispatches `ProcessExploreResponse` → sets `loading: false` with data
2. `ExploreStateProvider` (parent) dispatches `ResetExploreResponse` → resets `loading: true`, `listItems: []`
3. `useEntityList`'s effect dependencies haven't changed → it never re-fires → page stuck at loading spinner

**Solution:** A `useExploreReady` hook delays `ExploreView` mounting by one render cycle. See source for details.

### Layout Fix: Base `Main` Without Header Offset

The explore page imports `Main` from `@databiosphere/findable-ui/lib/components/Layout/components/Main/main.styles` (the base styled component without `margin-top: headerHeight`) instead of the default `MainWithOffset`. This is because `StyledGridEntityView` already adds `padding-top: headerHeight`, so using `MainWithOffset` would create a double offset. This follows the brc-analytics pattern.

## Out of Scope (v1)

- Institution/affiliation facet (data not reliably available from Crossref)
- Detail/back pages for individual publications (link to DOI)
- Automated CI pipeline for DOI fetching
- Export/download functionality
- Descending sort for year filter dropdown (library only supports ALPHA and COUNT sort modes)
