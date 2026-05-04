## Static Analytics Site

Generates a static HTML dashboard displaying GA4 analytics data for the AnVIL Portal.

### Prerequisites

- Activate the analytics environment (see `../../readme.md`)
- Place Google OAuth credentials at `.credentials/anvil_ga4_credentials.json` in the repo root

### Generating the site

```bash
cd analytics/anvil-analytics-portal/sheets
python generate_static_site.py
```

The first run will open a browser for Google OAuth. The generated site is output to `site/`.

### Previewing locally

```bash
cd site && python -m http.server 8080
```

Then open http://localhost:8080.

### Updating the report

1. Update `CURRENT_MONTH` and `PARENT_FOLDER_NAME` in `constants.py`
2. Run `python generate_static_site.py`
3. Commit the updated `site/` directory
4. Push to `main` — GitHub Actions will deploy the site automatically

### Configuration

The script is configured with:

- **Audience filter**: Excludes users who land on the markdown tutorial page (`EXCLUDE_PAGES_FILTER` in `constants.py`)
- **Page exclusions**: `/guides/content/creating-links` and `/guides/content/editing-an-existing-page` are excluded from the pageviews detail table
- **Search queries**: Extracted from `/search?q=` page paths
- **File downloads**: GA4 enhanced measurement `file_download` events
