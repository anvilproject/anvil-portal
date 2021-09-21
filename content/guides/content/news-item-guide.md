---
title: "Creating News Items"
author: "Dave Rogers"
description: "A basic guide for creating news items for the AnVIL portal."
---

# Creating News Items

The AnVIL portal lists news items:

1. In the news section available from the top nav,
1. Optionally in the carousel on the home page,
1. Optionally in the featured news section on the home page,
1. In site search results,
1. and also in external search results and when a news item is shared on social media.

## URLs

News items are namespaced by their publication date and have URLs like:

`https://anvilproject.org/news/2020/06/19/announcing-gen3-availability-in-anvil`

## Markdown Files

News items are implemented with markdown `.md` files that are under the `/content/news` folder in the AnVIL portal repository.
The URL namespace above is accomplished by creating news item markdown files in subdirectories named for year, month and day
of the publication date given us a directory structure like:

```
── news
│   ├── 2019
│   │   └── 12
│   │       └── 05
│   │           └── dockstore-training.md
│   ├── 2020
│   │   ├── 05
│   │   │   └── 21
│   │   │       └── discover-anvil-at-bcc-2020.md
│   │   ├── 06
│   │   │   └── 19
│   │   │       ├── _images
│   │   │       │   ├── gen3-noshadow.png
│   │   │       │   └── gen3.png
│   │   │       └── announcing-gen3-availability-in-anvil.md
│   │   └── 11
│   │       └── 20
│   │           └── nhgri-anvil-now-supports-free-export-of-gtex-data.md
```

## Front Matter

The front matter information controls how the event displays in lists, if it appears on the home page, and how the event appears when sharing on social media. Front matter fields for events are:

| Field | Example |
| --- | --- |
| title: | _NHGRI AnVIL Cloud Platform Now Supports Free Export of GTEx Data_ |
| description: | A short description for the event lists and social media shares e.g. _"An introduction to the AnVIL platform to enable CCDG and CMG researchers to analyze GSP data using AnVIL tools."_ |
| featured: | `true` if the event should appear on the home page events list. |
| carousel: | `true` if the event should appear on carousel on the home page. |
| logo: | Logo image to use in the carousel `../../../_images/anvil.png` |
| date: | Date used for ordering the event lists e.g. _"2020-10-20"_ |
| description: | Text used in the carousel, event lists and social media shares e.g. _"In support of the evolving nature of the NHGRI mission, we are pleased to announce that researchers are now able to download controlled access GTEx V8 to local compute infrastructure without incurring egress fees."_ |
| docType: | "News" for a news item. |

## Body Text

Some very general guidelines for writing news articles:

* **Audience**: Media or Anvil Community? - News items can be more formally written to address the media or targeted news to the AnVIL community.
* **Third Person Voice** - "Today the AnVIL development team released..."
* **Headline** - Brief and to the point.
* **Lead paragraph** - summarizing the announcement.
* **Two or Three body paragraphs** - with links, or quotes providing additional information.
* **Platform/Component Descriptions** - very brief overview paragraphs for the AnVIL project or any involved components or tools.
* **Break up long paragraphs** - two or three sentences at most for the web.
* **Contact information** - If appropriate.
* **Image or Diagram** - If possible.

Review existing news items in the [news section](/news) for inspiration.
