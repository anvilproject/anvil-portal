# Events content authoring

Event items render in the home page Updates section (Events tab) and in the full events archive at `/events`.

## File path

`docs/events/slug.mdx`

Events live in a flat directory. The session date(s) are in the frontmatter `sessions` array, not in the path.

## Frontmatter

```yaml
---
conference: "ACC 2026" # required — conference / event name
description: "Short summary shown in cards and meta tags."   # required
title: "Full event title" # required
timezone: "America/New_York" # required — IANA timezone for sessions
sessions: # required — one or more session windows
  - sessionStart: "31 August 2026 2:00 PM"
    sessionEnd: "31 August 2026 5:30 PM"
  - sessionStart: "1 September 2026 9:00 AM"
    sessionEnd: "1 September 2026 6:00 PM"
eventType: "Conference" # optional — e.g. Conference, Workshop, Webinar
location: "Cambridge, MA" # optional — physical location or "Online"
hashtag: "#AnVILCommunity" # optional — social tag (must start with `#`)
url: "https://..." # optional — registration / event link
featured: true # optional — eligible for home page Updates section
persistent: true # optional — see "Visibility" below
hidden: true # optional — hide from all listings
---
```

### Session dates

Use the format `D MMMM YYYY h:mm A` (e.g. `1 September 2026 9:00 AM`) in `sessionStart` and `sessionEnd`. The earliest `sessionStart` determines whether the event counts as "upcoming" on the home page.

## Visibility

The home page Updates section (Events tab) shows only upcoming `featured` events, capped at 3 cards.

The hero carousel uses a 3-month freshness window: dated entries within the last 3 months show by default. Set `persistent: true` to keep an event eligible regardless of date — useful for recurring conferences.

Use `hidden: true` to suppress an event from all listings.
