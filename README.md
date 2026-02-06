# Anvil Portal

The front-facing AnVIL user portal located at [https://anvilproject.org](https://anvilproject.org)

AnVIL is an Analysis, Visualization, and Informatics Lab-space for democratizing genomic data access, sharing and computing across large genomic-related data sets.

## Content Contributor Guide

Information about creating/modifying the site content can be found here: [https://anvilproject.org/guides](https://anvilproject.org/guides)

## Setting Up a Developer Workspace

### Requirements

* `Node.js` ([https://nodejs.org/en/](https://nodejs.org/en/)), version 22.12.0.

* We recommend using `n` ([https://github.com/tj/n](https://github.com/tj/n)) as the Node.js package manger.

* `npm` ([https://www.npmjs.com/](https://www.npmjs.com/)) is bundled with `Node.js` and is required to manage application dependencies.

### Setup

##### Clone Repo

Clone the `anvil-portal` repo:

	git@github.com:anvilproject/anvil-portal.git

##### Install Packages

Run the following command from the project's root directory to install the required packages:

	npm ci

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
