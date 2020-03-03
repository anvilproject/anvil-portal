# Anvil Portal
The front-facing AnVIL user portal located at [https://anvilproject.org](https://anvilproject.org)

AnVIL is an Analysis, Visualization, and Informatics Lab-space for democratizing genomic data access, sharing and computing across large genomic-related data sets.


## Content Contributor Guide
Information about creating/modifying the site content can be found here: [https://anvilproject.org/content-guide](https://anvilproject.org/content-guide)



## Setting Up a Developer Workspace

### Requirements

* `Node.js` ([https://nodejs.org/en/](https://nodejs.org/en/)), version 10.16.0. 

* We recommend using `n` ([https://github.com/tj/n](https://github.com/tj/n)) as the Node.js package manger. 

* `npm` ([https://www.npmjs.com/](https://www.npmjs.com/)) is bundled with `Node.js` and is required to manage application dependencies.



### Setup

##### Clone Repo

Clone the `anvil-portal` repo:

	git@github.com:anvilproject/anvil-portal.git


##### Install Gatsby Command Line Tool

The Gatsby command line tool is used to develop, build and serve (locally) the Data Portal.

    npm install --global gatsby-cli

##### Install Packages

Run the following command from the project's root directory to install the required packages: 

	npm install

### Development Server

Run the following command from the root directory:

`npm start`

The development server can be viewed at:

`localhost:8000`

### Building 

Run the following command to build the application:

`npm run-script build`

#### Local Production Version

Run the following command to view a built version of the application, locally:

`gatsby serve`

The built version can be viewed at:

`localhost:9000`

