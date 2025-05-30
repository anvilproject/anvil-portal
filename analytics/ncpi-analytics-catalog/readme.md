## Installing and activating the environment

* See `../readme.md`

## Running

* Activate the environment

* Build the book:

  * As a website:

    `jupyter-book build ./`

  * As a PDF:
  
    `jupyter-book build ./ --builder pdfhtml`

  The output will be located under the `_build` directory, in the appropriate subfolder for the build type

* If you need to delete the previous build results, you can use the `clean` command:

  `jupyter-book clean ./ --all`

## Updating the report

* In `catalog-analytics.ipynb`:
  * Replace the two mentions of each time period with the new time periods
  * Update the two time period variables
  * If necessary, adjust page breaks, `split_vertical` parameters, `rows_limit` parameters, and/or cell order to make the tables pack more neatly into the pages of the PDF

* After exporting, rename the PDF to "NCPI Dataset Catalog Analytics Report - <end date>.pdf"
