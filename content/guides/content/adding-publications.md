---
title: "Adding a New Publication"
author: "Jonah Paten"
description: "Instructions on how to create a new publication to AnVIL"
---

# Adding a New Publication
If you wrote a publication based on analysis from AnVIL or that has some impact for AnVIL, you can add it to the [Publications](/overview/publications) page.

### Overview
All publications are stored in a single markdown file, and appear in two sections on the same page. By editing this file, you can add new publications, without having to create any new pages.

### Editing Publications
Open the markdown file at `content/home/publication-cloud.md`. This file should contain information for
all the publications that are shown on the page. Add a new publication by copying in the following block right below the 
`publications` line, keeping the indent the same as the files below. Then, fill in the quotes as specified in the comments, and delete the comments to avoid repetition.
```
    - title: "" # The title of the publication
      cardLink: "" # A good link for the publication, including the https:// at the start.
      category: ""  # The header the publication should be listed under, either ON_ANVIL for the "Analyzed on AnVIL" section or ABOUT_ANVIL for the "AnVIL Platform..."  section 
      citation:
        authors: # List the authors of the paper, exactly as listed in the source
            - ""
            - "" 
        doi: "" A doi link to the paper, starting "https://doi.org/"
        journal: "The journal the publication was published in" 
        publisher: "The publisher of the journal, can be left blank"
        year: "The year of publication"
```

### Submitting the Contribution

After you enter the information, you should double check that the indentation exactly matches the entries below. 
If it does, you should be ready to submit a pull request!
See the rest of the [content guide](/guides/) for more info for how to do this and get your changes approves. Once that happens, 
the paper will be added to the [Publications](/overview/publications) page!
