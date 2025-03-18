# CHANGE THESE VALUES TO GENERATE NEW REPORTS
# The date of the current month to report on (yyyy-mm)
CURRENT_MONTH = "2025-02"
# The name of the folder in which to save the report
PARENT_FOLDER_NAME = "February 2025"

# The name of the spreadsheet with the report
SHEET_NAME = "AnVIL Portal"

ANVIL_PORTAL_ID = "368678391"

HISTORIC_UA_DATA_PATH = "../users_over_time_history.json"
SECRET_NAME = 'ANVIL_ANALYTICS_REPORTING_CLIENT_SECRET_PATH'
GA_PROPERTY_PORTAL = "368678391" # AnVIL Portal - GA4
PRE_AUDIENCE_EXCLUDE_PAGES_FILTER = "landingPagePlusQueryString!=/guides/content/creating-links"
# Excludes users who start on the markdown tutorial page
EXCLUDE_PAGES_FILTER = {"filter": {"fieldName": "audienceId", "numericFilter": {"operation": "EQUAL", "value": {"doubleValue": 5559548544}}}}
ANALYTICS_START = "2023-07-01"

OAUTH_PORT = 8082