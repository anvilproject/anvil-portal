---
title: "Overview"
author: "Dave Rogers"
---

#Overview

The content for the portal is located in the [/content](https://github.com/anvilproject/anvil-portal/tree/staging/content) folder of the [anvil-portal](https://github.com/anvilproject/anvil-portal/tree/staging) github repository. Each page of the site, and some page components, are represented as [markdown](https://en.wikipedia.org/wiki/Markdown) files in this folder.

## Page Creation
For new pages, it may be helpful to start writing first in google doc or other word processor that has both a spell checker and the ability to solicit reviews from peers. 

Once the page has has taken shape, it can be copied into a markdown file and markdown elements applied.

## Page Editing
To edit a page, find the page on the site, then click the "Improve this page" link at the bottom of the site. 
This will take you to the markdown file for the site in github on the `staging` branch.

Edit the file and review the file in github.

## Creating a Pull Request against Staging
Once the file looks ok, submit a pull request against the staging branch, describing your changes and then request reviewers.


## PR Review Policy
We will generally request 2 reviewers for any complex technical content, team consensus for any marketing/branding/value proposition issues and allow the site maintainers to make typo or grammar fixes without additional reviewers.

Once a change that requires approval has been approved, the pull request will be merged into the staging branch by the site maintainers.

## Deploy to Staging
The merge into the staging branch will automatically trigger a deploy to the staging environment. This generally completes in a few minutes. There the display of the content can be validated, and if all looks well the staging branch will be promoted to master to deploy the change.

## Deploy to Production
Committing code to master, likewise will trigger a deploy to production. Once the change is deployed to production again site maintainers will review to be sure the content looks ok in production. 


