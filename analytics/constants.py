# CHANGE THIS VALUE TO GENERATE A NEW REPORT
# The date of the current month to report on (yyyy-mm)
CURRENT_MONTH = "2026-07"

# FIXED CONFIGURATION — the values below do not change between monthly reports

ANVIL_PORTAL_ID = "368678391"

# Dates of known synthetic/bot traffic (headless-browser burst, likely a load test)
# to exclude from reports; see anvilproject/anvil-portal#4077.
EXCLUDE_BOT_TRAFFIC_DATES = ["2025-02-10"]

HISTORIC_UA_DATA_PATH = "users_over_time_history.json"
SECRET_NAME = 'ANVIL_ANALYTICS_REPORTING_CLIENT_SECRET_PATH'
# Excludes users who start on the markdown tutorial page
EXCLUDE_PAGES_FILTER = {"filter": {"fieldName": "audienceId", "numericFilter": {"operation": "EQUAL", "value": {"doubleValue": 5559548544}}}}
ANALYTICS_START = "2023-07-01"

OAUTH_PORT = 8082
