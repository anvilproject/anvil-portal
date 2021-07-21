/**
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Set of urls for the "current" environment.
 */

export const EnvironmentUrls = new Map<string, string>(
    [["LOCAl", "http://localhost:8000/"],
        ["MASTER", "https://anvilproject.org/"],
        ["STAGING", "https://staging.anvilproject.org/"],
        ["UX-DEV", "https://staging.anvilproject.org/"],
    ]
)
