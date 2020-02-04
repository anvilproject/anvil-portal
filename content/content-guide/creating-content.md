---
title: "Creating Content"
author: "Dave Rogers"
---

# AnVIL Content Guide

## Overview
Welcome to the AnVIL Portal content guide. We welcome help from the consortium and community members for content creation and maintenance. 

### Getting Help
The guides below are meant to help you get started working on content. Please feel free to reach out to us on the  [AnVIL Gitter channel](https://gitter.im/anvil-project/Lobby) or by emailing our [help desk](mailto:help@lists.anvilproject.org) with any questions.


### Content Locaton
The content for the portal is located in the [/content](https://github.com/anvilproject/anvil-portal/tree/staging/content) folder of the [anvil-portal](https://github.com/anvilproject/anvil-portal/tree/staging) github repository. Each page of the site, and some page components, are represented as [markdown](https://en.wikipedia.org/wiki/Markdown) files in this folder.

>####TIP
>We use the **staging** branch of the  repository as the base for modifying the content. 


## Content Lifecycle

Below we describe the general flow of content creation, editing, review, approval and deployment. See the links at the left for more detail on each step.


### AnVIL Portal Content Roles
There are three roles assocated with the content lifecycle:

1. **Content Author** - This can be anyone with a github login (e.g. you!). 
1. **Content Approver** - An AnVIL Project team member.
1. **Content Deployer** - A member of the [AnVIL Portal Working Group](/about/working-groups#portal-working-group) with push access to the github master branch. 

### Content Update Worflow

In general, to modify the portal content:

1. A Content Author creates or edits a markdown page with the desired updates. When the content is ready, the Content Author creates a github pull request against the AnVIL Portal repository staging branch for the updates requesting a review from appropriate team members.
 
1. One or more Content Approvers review and approve the content (or suggest modifications). If the pull request is approved it is merged into staging branch, which auto deploys to [https://staging.anvilproject.org/](https://staging.anvilproject.org/). 

1. A Content Deployer merges the updated pull request into the master branch which auto deploys to [https://anvilproject.org/](https://anvilproject.org/) and creates a release notes describing the changes. 

## Modifying Content

### Editing an Existing Page
The easiest way to edit an existing page is via the "Improve this page" link at the bottom of each content page in the portal.
Selecting this link will take you to the markdown file for the site in github on the `staging` branch.

Edit the file and review the file in github.

### Creating a New Page
For new pages, it may be helpful to start writing first in google doc or other word processor that has both a spell checker and the ability to solicit reviews from peers. 

Once the page has has taken shape, it can be copied into a markdown file and markdown elements applied. For details see [Creating a New Page](/content-guide/creating-a-new-page)

## Getting Content Reviewed

### Creating a Pull Request Against Staging
Once the file looks ok, submit a pull request against the staging branch, describing your changes and then request reviewers.


### PR Review Policy
We will generally request 2 reviewers for any complex technical content, team consensus for any marketing/branding/value proposition issues and allow the site maintainers to make typo or grammar fixes without additional reviewers.

Once a change that requires approval has been approved, the pull request will be merged into the staging branch by the site maintainers.

## Deploying Content Updates

Content will be deployed by AnVIL team members with the "Content Deployer" role. In general the process proceeds as follows:

### Deploying to Staging 
The merge into the staging branch will automatically trigger a deploy to the staging environment. This generally completes in a few minutes. There the display of the content can be validated, and if all looks well the staging branch will be promoted to master to deploy the change.

### Deploying to Production 
Committing code to master, likewise will trigger a deploy to production. Once the change is deployed to production again site maintainers will review to be sure the content looks ok in production. 


