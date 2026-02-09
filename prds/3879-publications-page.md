# PRD: Publications Page — "Analyzed on AnVIL"

**Issue**: https://github.com/anvilproject/anvil-portal/issues/3879
**Route**: `/explore/publications`

## Overview

Add a top-level **Publications** page to the AnVIL Portal that lists research papers analyzed on the AnVIL platform. The page uses findable-ui's client-side faceted filtering (the same framework used by the AnVIL Dataset Catalog in data-browser) to let users search and filter publications by title, author, journal, and recency.

The existing `/overview/publications` page retains the "About AnVIL" publications (platform papers). The new page focuses exclusively on "Analyzed on AnVIL" research.

## Data Source

The page lists **papers that cite the main AnVIL paper**:

> Schatz MC, Philippakis AA, Afgan E, Banks E, Carey VJ, Carroll RJ, et al. Inverting the model of genomics data sharing with the NHGRI Genomic Data Science Analysis, Visualization, and Informatics Lab-space (AnVIL). Cell Genomics. 2022;2. doi:10.1016/j.xgen.2021.100085

- **Citing papers** discovered via the **Semantic Scholar API** (citations endpoint for DOI `10.1016/j.xgen.2021.100085`)
- Metadata enriched from the **Crossref API** (title, authors, journal, year, publisher)
- **Citation counts** per paper fetched from the **Semantic Scholar API** (`citationCount` field)
- Output committed as a **static JSON file** (`files/publications/publications.json`)

### Data Pipeline

```
Semantic Scholar: GET /paper/DOI:10.1016/j.xgen.2021.100085/citations
  → list of citing paper DOIs
  → Crossref API (full metadata per DOI)
  → Semantic Scholar API (citation count per DOI)
  → Preprint deduplication (see below)
  → Title cleanup (strip HTML tags, normalize whitespace)
  → publications.json (committed)
```

The script is run manually (or via CI) to refresh the citing papers list and citation counts.

### Preprint Deduplication

Semantic Scholar sometimes returns both the preprint and published version of the same study. The build script deduplicates these to avoid listing a paper twice.

**Detection:** A paper is flagged as a preprint if its DOI matches a known preprint prefix:

- `10.1101/` (bioRxiv, medRxiv)
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
  title: string; // Paper title
  authors: string[]; // List of author names
  journal: string; // Journal / container title
  doi: string; // Full DOI URL (https://doi.org/...)
  year: number; // Publication year (numeric, for recency bucketing)
  publisher: string; // Publisher name
  citationCount: number; // Citation count from Semantic Scholar
}
```

### Recency Buckets

Computed client-side from `year` relative to the current year. **Exclusive** buckets:

| Bucket        | Rule                      |
| ------------- | ------------------------- |
| Last year     | `currentYear - year <= 1` |
| 1–2 years ago | `currentYear - year == 2` |
| 2–3 years ago | `currentYear - year == 3` |
| Older         | `currentYear - year > 3`  |

## Page Location & Routing

- **Route**: `/explore/publications` (dynamic segment: `pages/explore/[entityListType]/index.tsx`)
- **Nav**: "Publications" in top-level header navigation, links to `/explore/publications`
- The `/explore/[entityListType]` route is generic — adding a new entity type only requires registering its `EntityConfig` in the site config's `entities` array; `getStaticPaths` derives paths automatically

## UI Layout

Standard findable-ui catalog list page: faceted filters on the left, results table on the right.

```
┌─────────────────────────────────────────────────┐
│  Header / Nav                                   │
├──────────────┬──────────────────────────────────┤
│              │                                  │
│  Faceted     │  Results Table                   │
│  Filters     │                                  │
│  (Left Nav)  │  ┌───────┬────────┬───────┬────┬─────────┐
│              │  │ Title │Authors │Journal│Year│Citations│
│  ☐ Title     │  │       │        │       │    │         │
│    (search)  │  │ ...   │ ...    │ ...   │... │ ...     │
│              │  │       │        │       │    │         │
│  ☐ Author    │  └───────┴────────┴───────┴────┴─────────┘
│    (select)  │                                  │
│              │  Total: N publications            │
│  ☐ Journal   │                                  │
│    (select)  │                                  │
│              │                                  │
│  ☐ Recency   │                                  │
│    (select)  │                                  │
│              │                                  │
├──────────────┴──────────────────────────────────┤
│  Footer                                         │
└─────────────────────────────────────────────────┘
```

## Faceted Filters (Left Sidebar)

| Facet   | Type              | Key             | Behavior                                                                            |
| ------- | ----------------- | --------------- | ----------------------------------------------------------------------------------- |
| Title   | Search/text input | `title`         | Free-text search, filters as you type                                               |
| Author  | Multi-select      | `authors`       | Checkbox list with search-within-filter; array field, matches if any author matches |
| Journal | Multi-select      | `journal`       | Checkbox list of distinct journal names                                             |
| Recency | Multi-select      | `recencyBucket` | Exclusive buckets: "Last year", "1–2 years ago", "2–3 years ago", "Older"           |

## Results Table Columns

| Column    | Component   | Width                    | Notes                                |
| --------- | ----------- | ------------------------ | ------------------------------------ |
| Title     | `Link`      | `max: 2fr, min: 240px`   | Links to DOI URL (external, new tab) |
| Authors   | `NTagCell`  | `max: 1.5fr, min: 180px` | First few authors + "+N more"        |
| Journal   | `BasicCell` | `max: 1fr, min: 140px`   | Plain text                           |
| Year      | `BasicCell` | `max: 0.5fr, min: 80px`  | Plain text                           |
| Citations | `BasicCell` | `max: 0.5fr, min: 80px`  | Numeric count from Semantic Scholar  |

Default sort: **Citations** descending (most cited first). Sortable by **Year** descending as secondary option.

## Files to Create / Modify

### New Files

| File                                                    | Purpose                                                   |
| ------------------------------------------------------- | --------------------------------------------------------- |
| `files/publications/publications.json`                  | Static publication data (generated)                       |
| `pages/explore/[entityListType]/index.tsx`              | Generic entity list page (dynamic route)                  |
| `apis/publications/entities.ts`                         | `Publication` TypeScript interface                        |
| `apis/publications/utils.ts`                            | Input mapper, getId, getTitle, recency bucket computation |
| `viewModelBuilders/publications/viewModelBuilders.ts`   | View builders for each column                             |
| `site-config/anvil-portal/publications/category.ts`     | Category keys and labels                                  |
| `site-config/anvil-portal/publications/entityConfig.ts` | `EntityConfig<Publication>`                               |

### Modified Files

| File                                     | Change                                                                                                |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `site-config/anvil-portal/dev/config.ts` | Add entity config, nav item (prod inherits via `makeConfig()`)                                        |
| `routes/constants.ts`                    | Add `PUBLICATIONS = "/explore/publications"`                                                          |
| `scripts/fetch-citations.mjs`            | Add S2 citation count pass; output portal-compatible JSON (index-keyed, numeric year, no `_metadata`) |

### Script Updates

Add a Semantic Scholar pass after Crossref fetch:

```
GET https://api.semanticscholar.org/graph/v1/paper/DOI:{doi}?fields=citationCount
```

Output format (index-keyed for findable-ui static load):

```json
{
  "0": {
    "title": "A draft human pangenome reference",
    "authors": ["Wen-Wei Liao", "Mobin Asri", "..."],
    "journal": "Nature",
    "doi": "https://doi.org/10.1038/s41586-023-05896-x",
    "year": 2023,
    "publisher": "Springer Science and Business Media LLC",
    "citationCount": 887
  }
}
```

## Decisions

- **Recency buckets**: Exclusive (not cumulative)
- **Author facet**: Rely on findable-ui's built-in search-within-filter for long lists
- **Total count**: Display in results area (likely handled by findable-ui list infrastructure)

## Implementation Notes

### Architecture: findable-ui Entity Integration

The publications page uses findable-ui's `CS_FETCH_CS_FILTERING` explore mode — static JSON loaded at build time, client-side filtering via TanStack Table. This matches the pattern used by ncpi-dataset-catalog and brc-analytics.

**Key components wired up in `_app.tsx`:**

- `ConfigProvider` — receives `entityListType` (defaults to `"publications"` via `DEFAULT_ENTITY_LIST_TYPE`)
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

This only affects full page refresh. Client-side navigation works because `ExploreStateProvider` is already mounted and `ResetExploreResponse` doesn't re-fire (its deps `[exploreDispatch, token]` are stable).

**Solution:** A `useExploreReady` hook in `pages/explore/[entityListType]/index.tsx` delays `ExploreView` mounting by one render cycle:

```tsx
function useExploreReady(): boolean {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return ready;
}

const ExplorePage = (props) => {
  const isReady = useExploreReady();
  if (!isReady) return <></>;
  return <ExploreView {...props} />;
};
```

**Why it works — render-by-render:**

- **Render 1:** `ready=false` → page returns empty fragment. `ExploreView` never mounts.
  - Effects fire bottom-up: `setReady(true)` (child), then `ResetExploreResponse` (parent). The reset fires harmlessly into an empty tree.
- **Render 2:** `ready=true` → `ExploreView` mounts fresh. `useEntityList` dispatches `ProcessExploreResponse`.
  - `ExploreStateProvider`'s `ResetExploreResponse` does **not** re-fire because its deps (`exploreDispatch`, `token`) are unchanged since render 1.
  - Data persists. `loading=false`. Publications render.

The one-frame delay (~16ms) is imperceptible to users. The loading gate lives in the generic explore page, so it applies to all entity list types automatically.

### Dynamic Route: `/explore/[entityListType]`

The page uses a dynamic `[entityListType]` segment under the `/explore` prefix. This serves two purposes:

1. **Avoids `?entityListType=` query param** — findable-ui's state sync manager compares explore state against `router.query`. With a dynamic segment, Next.js includes `entityListType` in the router query automatically, so no redirect occurs.
2. **Generic entity page** — adding a new entity type (e.g., workflows) only requires adding its `EntityConfig` to the site config's `entities` array. `getStaticPaths` derives paths from the config automatically. No new page file needed.

The `/explore` prefix was chosen over `/data` (existing redirects to data explorer) and `/browse`/`/catalog` (less aligned with findable-ui terminology).

## Out of Scope (v1)

- Institution/affiliation facet (data not reliably available from Crossref)
- Publication category facet (page is scoped to "analyzed on AnVIL")
- Detail/back pages for individual publications (link to DOI)
- Automated CI pipeline for DOI fetching
- Export/download functionality
