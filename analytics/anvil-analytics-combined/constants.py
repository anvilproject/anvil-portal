ANVIL_PORTAL_NAME = "anvil-portal"
ANVIL_CATALOG_NAME = "anvil-catalog"
ANVIL_EXPLORER_NAME = "anvil-explorer"

PROPERTY_ID_MAP = {
    ANVIL_CATALOG_NAME: "368661710",
    ANVIL_EXPLORER_NAME: "383267328",
    ANVIL_PORTAL_NAME: "368678391",
}

SECRET_NAME = 'GA4_CREDENTIALS'
GA_PROPERTY_PORTAL = "368678391" # AnVIL Portal - GA4
PRE_AUDIENCE_EXCLUDE_PAGES_FILTER = "landingPagePlusQueryString!=/guides/content/creating-links"
EXCLUDE_PAGES_FILTER = {"filter": {"fieldName": "audienceId", "numericFilter": {"operation": "EQUAL", "value": {"doubleValue": 5559548544}}}}
ANALYTICS_START = "2021-01-01"
TODAY = 'today'
THIRTY_DAYS_AGO = '30daysAgo'

OAUTH_PORT = 8082