---
title: "Creating Links in Markdown"
author: "Dave Rogers"
description: "Instructions on how to create links in AnVIL markdown."
---

# Creating Links in Markdown

Markdown syntax for a hyperlink is square brackets followed by parentheses. The square brackets hold the text, the parentheses hold the link.

```
[Link text Here](https://example.org)
```

## Internal Links

For internal links (links to other AnVIL portal pages) we need to follow a few rules:

1. Use the "relative path" to the page omitting the protocol and domain name. For example use `/guides/content/creating-links` instead of `https://anvilproject.org/guides/content/creating-links`.
1. For the link address use the `path` of the page in the site regardless of the location of the file in the repository.
1. Do not use the `.md` suffix.
1. Don't forget to start the path with a forward slash: `/`.

Putting this all together an internal link looks like:

```
[An Internal Link](/guides/content/editing-an-existing-page)
```

This renders as: [An Internal Link](/guides/content/editing-an-existing-page)

>#### TIP
> Don't forget the leading slash "/" in the internal link paths.

### Linking to an Internal Page Heading

It is possible to link directly to any outline heading on an internal page as the page headings each have an anchor. 

You can find out the link to a page heading by clicking on link icon that appears when you hover over a heading. After you click on the link symbol, the url to that heading will be in your browsers address bar. Copy the link and strip off the method and domain to make a relative url. 

<figure>
<img src="../_images/internal-link.png" alt="Link Icon"/>
<figure-caption>Figure 1: Hovering over a page heading to reveal the "copy to clipboard" link for the internal anchor.</figure-caption>
</figure>

Then use the path to create a link like so:

```
[An Internal Link to a Section Heading](/guides/content/editing-an-existing-page#modifying-front-matter)
```

This renders like:

[An Internal Link to a Section Heading](/guides/content/editing-an-existing-page#modifying-front-matter)

## External Links

The markdown for external links is the same for internal links except we use the full url.
 
```
[This is an external link to genome.gov](https://www.genome.gov/)
```

This displays as:

[This is an external link to genome.gov](https://www.genome.gov/)
