---
title: "Creating a New Page"
author: "Dave Rogers"
description: "Instructions on how to create a new page in AnVIL."
---

# Creating a New Page

To create a new page, we need to:

1. Add a new [markdown](https://en.wikipedia.org/wiki/Markdown) (`.md`) file for the new page.
1. Add a "`front matter`" metadata section to the new markdown file.
1. Add the page content as markdown.
1. Add the page to the siteMap.js file.


## Adding the new .md File.

You can create the new .md file  using the github interface.
Fist navigate to the parent directory and then use the `Create New File` button as shown below.

Typically the folder structure mirrors the structure or the site. This is not strictly necessary as the URL to a page is defined by the site map and not the folder structures. However, it does make pages much easier to find when they need to be updated.

![Create File](../_images/create-new-file.png)

>####TIP
>Note that you can not create an empty directory using the Github interface. However you can create a directory while adding a file by adding the new directory name before the file name then hitting the "/" character

![Create Folder](../_images/create-folder.gif)

## Create the "Front Matter"

Metadata describing the page and indicating its publication date, and author are held in the pages "Front Matter". Front matter is a yaml section that lists key values pairs of configuration for the page in the very beginning or "front" of the file.


 ```
    ---
    date: "2018-05-30"
    Author: "Susan Smith"
    ---
 ```
 
 >####TIP
 >The front matter goes at the very top or each new page.
 
 ## Add the Page Content
 
 With the front matter created its time to add the page content in markdown. See one of the many [markdown guides](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) on the internet
 
 ## Add the page URL to the siteMap.js
 To get your page added to the siteMap and deployed, please open a pull request for your new page in the [Github Project](https://github.com/anvilproject/anvil-portal/pulls) for the AnVIL portal repository.
 
