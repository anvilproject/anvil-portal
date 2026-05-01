#!/usr/bin/env python3
"""Generate static analytics site for AnVIL Portal."""

import os

import analytics.api as ga
from analytics.static_site import generate_site
from constants import (
    ANVIL_PORTAL_ID,
    ANALYTICS_START,
    CURRENT_MONTH,
    EXCLUDE_PAGES_FILTER,
    HISTORIC_UA_DATA_PATH,
    OAUTH_PORT,
    SECRET_NAME,
)

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CREDENTIALS_PATH = os.path.join(SCRIPT_DIR, "..", "..", "..", ".credentials", "anvil_ga4_credentials.json")


def main():
    os.environ.setdefault(SECRET_NAME, CREDENTIALS_PATH)

    ga_authentication = ga.authenticate(
        SECRET_NAME,
        ga.ga4_service_params,
        port=OAUTH_PORT,
    )

    generate_site(
        ga_authentication=ga_authentication,
        config={
            "site_title": "AnVIL Portal",
            "logo_url": "https://anvilproject.org/consortia/logos/logoAnvil.png",
            "favicon_url": "https://anvilproject.org/consortia/favicons/favicon.ico",
            "logo_link": "https://anvilproject.org",
            "primary_color": "#035C94",
            "primary_color_dark": "#003E76",
        },
        property_id=ANVIL_PORTAL_ID,
        current_month=CURRENT_MONTH,
        analytics_start=ANALYTICS_START,
        output_dir=os.path.join(SCRIPT_DIR, "site"),
        historic_data_path=HISTORIC_UA_DATA_PATH,
        exclude_pages=[
            "/guides/content/creating-links",
            "/guides/content/editing-an-existing-page",
        ],
        base_dimension_filter=EXCLUDE_PAGES_FILTER,
        search_path="/search",
    )


if __name__ == "__main__":
    main()
