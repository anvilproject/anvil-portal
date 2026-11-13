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
# GA4 audience filter, passed to generate_site as base_dimension_filter, so it
# applies to every GA4 metric on the dashboard. Only users in audience
# 5559548544 are counted, which excludes users who land on the markdown
# tutorial page (/guides/content/creating-links). This is not a page filter;
# page exclusions are the exclude_pages list in generate_static_site.py.
TUTORIAL_AUDIENCE_FILTER ={"filter": {"fieldName": "audienceId", "numericFilter": {"operation": "EQUAL", "value": {"doubleValue": 5559548544}}}}
ANALYTICS_START = "2023-07-01"

OAUTH_PORT = 8082
