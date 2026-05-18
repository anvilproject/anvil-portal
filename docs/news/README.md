# News content authoring

News items render in the home page Updates section and in the full news archive at `/news`.

## File path

`docs/news/YYYY/MM/DD/slug.mdx`

The directory path encodes the publication date. The URL slug is derived from the file name.

## Frontmatter

```yaml
---
date: "YYYY-MM-DD" # required — publication date
description: "Short summary shown in cards and meta tags."   # required
title: "Headline" # required
featured: true # optional — eligible for home page Updates section
persistent: true # optional — see "Visibility" below
hidden: true # optional — hide from all listings
url: "https://..." # optional — external link (omit or use null otherwise)
---
```

## Visibility

By default, the home page Updates section (and the hero carousel) only show items with a `date` within the last 3 months — older items fall off automatically.

To keep an item visible past that window — e.g. a flagship announcement, an ongoing program, an evergreen paper — set `persistent: true`.

The full news archive at `/news` shows everything regardless of date or `persistent`. Use `hidden: true` to suppress an item from all listings.
