---
title: "Adding and Updating Events"
author: "Dave Rogers"
description: "A basic guide on how to create events for the AnVIL portal"
---

# Creating Events

The AnVIL portal lists events:

1. In the events section available from the top nav,
1. Optionally in the featured events section on the home page,
1. In site search results,
1. and also in external search results and when an event item is shared on social media.

## Markdown Files

Events are implemented with markdown files under the `/content/events` directory in the AnVIL Portal GitHub repository.

## URLS and File Names

Events use the conference name as a prefix for the URL giving URLs like:

`https://anvilproject.org/events/bcc2020-dockstore-fundamentals`

In the URL above, `bcc2020` is the conference name and `dockstore-fundamentals` is a shortened version of the event name.

The URL for the event is determined by the event file name. For the URL above the corresponding markdown file is:

`bcc2020-dockstore-fundamentals.md`

When preparing to list an event on the AnVIL portal please collect / provide the following information in either a Google doc or pull request.

## Front Matter

The front matter information controls how the event displays in lists, if it appears on the home page, and how the event appears when sharing on social media. Front matter fields for events are:

| Field | Example |
| --- | --- |
| title: | _Massive Genome Informatics in the Cloud (MaGIC) Jamboree_ |
| conference: | _ISMB 2020_ |
| description: | A short description for the event lists and social media shares e.g. _"An introduction to the AnVIL platform to enable CCDG and CMG researchers to analyze GSP data using AnVIL tools."_ |
| eventType: | "Virtual Jamboree", "Interactive Workshop" |
| featured: | `true` if the event should appear on the home page events list. |
| sessions: | An array of session times. e.g. ` [{sessionEnd: "17 Jul 2020 3:00 PM", sessionStart: "17 Jul 2020 12:31 PM"}]` |
| timezone: | The timezone the session times are given in. e.g `America/New_York` |
| location: | Optional - Physical or virtual "location" e.g. "_West Training 3_" or "_San Diego Convention Center, 111 West Harbor Drive, San Diego, CA 92101_" |

## Body Text

### Description

The longer form description of the event for the event page (not the event lists). For example:

*An introduction to the AnVIL platform to enable CCDG and CMG researchers
to analyze GSP data using AnVIL tools. Participants will gain exposure and familiarity
with available data, tools, workflows, training materials, and support channels of AnVIL.
Participants will not become bioinformatic experts, but will know what to do
or who to contact when the time comes.*

### Background

A longer form background/rational for why this session is being provided. For example:

*In summer 2020, NHGRI plans to organize Massive Genome Informatics in the
Cloud or MaGIC, a two-day, jamboree-style informatics event for
introducing new users to the
AnVIL platform for cloud-based genomics data analysis.*

### Audience
A description of the target audience / qualifications for attending. Similar to: *No computational expertise is required.
Anyone from GSP who would like to learn about cloud based genomic analysis on AnVIL.
This Jamboree will focus on highlighting interactive tools that are used from a
graphical user interface.*

### Prerequisites if Any
Similar to:

* _Participants should be comfortable working with R and RStudio._
* _Some familiarity with Bioconductor is helpful but not required._
* _No prior cloud-based experience is necessary._
* _A Wi-Fi enabled laptop with RStudio installed._

### Event Details

1. **Agenda** - Titles, dates, times, speakers and length of sessions.
1. **How to register** - e.g. link to registration website, registration open, closing dates,
1. **Costs** - any fees or discount/scholarship opportunities.
1. **Event home page** - on the conference website
1. **Conference website**
1. **Contact Info** Who to contact at AnVIL for more information if applicable.
1. **Hashtag** - The twitter hashtag for the event.

## Updating Events with Event Content

Once the event has happened please gather any slides, minutes / notes, video recordings., hashtags for posting the [events](/events) page and [workshop videos](/learn/workshop-videos) listing. These can be delivered as a pull request to the event's page or as a Google doc.




