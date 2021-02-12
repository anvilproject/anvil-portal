---
title: "Editing an Existing Page"
author: "Dave Rogers"
description: "Editing an existing page is perhaps the easiest way to get started working with the content."
---

# Editing an Existing Page 

Editing an existing page is perhaps the easiest way to get started working with the content. To facilitate this, most pages have an "Improve this page" link at the bottom of the page.

To edit a page:

1. Find the page on the portal.
1. Scroll to the bottom of the page and locate the "Improve this page" link there.
1. Select the link which will take you the page's markdown file in github on the staging branch.
1. Edit the page using the github markdown editor.
1. Preview the page using the github markdown editor.
1. Submit a pull request to have your updates merged into the staging branch of the repository. 

<figure>
<img src="../_images/improve-this-page.png" alt="Improve this page"/>
<figure-caption>Figure 1: Using the "Improve this page" link to locate the page's source file in github.</figure-caption>
</figure>



## Editing with the Github Markdown Editor
Once you have found the page in github, you can edit and do a basic preview of the page in github. To do this, click on the edit icon on the right hand side of the github markdown page.

Selecting the  edit button will open the file in the github web editor and let you make changes to the page content.  The page content is in standard markdown.

<figure>
<img src="../_images/edit-existing-page.png" alt="Edit an Existing Page"/>
<figure-caption>Figure 2: Using the github web editor to modify the source file's markdown.</figure-caption>
</figure>

## Modifying Front Matter

At the top of the file you will see a "Front Matter" sections between the `---` markers. Here you can change the Title and Publication Date of the document or the URL to the document in the site.

```
    ---
    title: "Example Page"
    author: "Mary Marple"
    ---
```

## Previewing Updates

Once in the editor, you can update content as you like and even preview the markdown by selecting the "Preview Changes" tab.

The preview will be styled for the github site, not for the AnVIL site, but you can see if your image links work and check general formatting of the document.

>Note that the github editor does not highlight spell check errors so be vigilant.

<figure>
<img alt="Edit in Github" src="../_images/preview-changes.png"/>
<figure-caption>Figure 3: Using the github preview changes feature to view a diff of your changes against the original content.</figure-caption>
</figure>

## Creating a Pull Request

Once you are ready, request a review from a peer, by creating a pull request in github using the pull request UI at the bottom of the edit or preview mode editor.

Once your pull request is merged it will be deployed to the site.

<figure>
<img src="../_images/pull-request.png" alt="Create a Pull Request"/>
<figure-caption>Figure 4: Creating a pull request with the github interface.</figure-caption>
</figure>
