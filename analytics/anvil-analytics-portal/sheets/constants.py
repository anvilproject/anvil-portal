# CHANGE THESE VALUES TO GENERATE NEW REPORTS
# The start and end dates of the current month (yyyy-mm-dd)
START_DATE_CURRENT = "2024-12-01"
END_DATE_CURRENT = "2024-12-31"
# The start and end dates of the prior months
START_DATE_PRIOR = "2024-11-01"
END_DATE_PRIOR = "2024-11-30"
# The name of the folder in which to save the report
PARENT_FOLDER_NAME = "December 2024 (demos)"

# The name of the spreadsheet with the report
SHEET_NAME = "AnVIL Portal"

ANVIL_PORTAL_ID = "368678391"

SECRET_NAME = 'ANVIL_ANALYTICS_REPORTING_CLIENT_SECRET_PATH'
GA_PROPERTY_PORTAL = "368678391" # AnVIL Portal - GA4
PRE_AUDIENCE_EXCLUDE_PAGES_FILTER = "landingPagePlusQueryString!=/guides/content/creating-links"
# Excludes users who start on the markdown tutorial page
EXCLUDE_PAGES_FILTER = {"filter": {"fieldName": "audienceId", "numericFilter": {"operation": "EQUAL", "value": {"doubleValue": 5559548544}}}}
ANALYTICS_START = "2021-01-01"

OAUTH_PORT = 8082