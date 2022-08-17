---
title: "Adding a new paper"
author: "Jonah Paper"
description: "Instructions on how to create a new paper to AnVIL"
---

# Adding a new paper
If you wrote a paper based on analysis from AnVIL or that has some impact for AnVIL, you can add it to the [Publications](/overview/publications) page.

### Overview
All publications are stored in a single markdown file, and appear in two sections on the same page. By editing this file, you can add new papers, without having to create any new pages.

### Editing publications
Open the markdown file at `content/home/publication-cloud.md`. This file should contain information for
all the papers that are shown on the page. Add a new paper by copying in the following block right below the 
`publications` line, keeping the indent the same as the files below

    - title: ""
      cardLink: ""
      category: ""
      citation:
        authors:
            - ""
            - "" 
        doi: ""
        journal: ""
        publisher: ""
        year: ""

Then fill in the elements as follows, ensuring that the indent remains the same:
- `title`: The full title for the paper
- `cardLink`: A good link for the paper, including the https:// at the start. Clicking on the paper title will open this link in the browser.
- `category`: The header the paper should be listed under. Should be one of the following:
  - `ON_ANVIL` for the *Analyzed on AnVIL* section
  - `ABOUT_ANVIL` for the *AnVIL Platform, Data, Tools and Components* section
- `citation`:
  - `authors`: List each individual author here, as listed on the paper
  - `doi`: A doi link, of the format "https://doi.org/10.1093/gigascience/giaa145"
  - `journal`: The journal the paper was published in
  - `publisher`: The publisher of the journal, can be left blank
  - `year`: The year in which the paper was published

### Submitting the Contribution

If all the information is entered, the paper should appear on your locally hosted 
[publications](/overview/publications) page, and you should be ready to submit a pull request! 
See the rest of the [content guide](/guides/) for more info for how to get your changes approved!