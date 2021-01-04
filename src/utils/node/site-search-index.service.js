/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic service supporting site search indexing.
 */

// App dependencies
const fs = require("fs");
const lunr = require("lunr");

const generateSiteSearchIndex = function generateSiteSearchIndex(documents) {

    /* Add the site documents to the search index. */
    const siteSearchIndex = lunr(function () {

        this.ref("file");
        this.field("content");
        this.field("description");
        this.field("title");

        documents.forEach(document => {

            const {fields, frontmatter, htmlAst} = document,
                {slug} = fields,
                {description, title} = frontmatter;
            const content = reduceHTMLAstText(htmlAst.children).join(" ");

            this.add({
                "content": content,
                "description": description,
                "file": slug,
                "title": title,
            });
        });
    });

    fs.writeFileSync("static/site-search-index.json", JSON.stringify(siteSearchIndex));
};

/**
 * Returns all htmlAst text as an string array.
 * Accumulates all type "text" content - used to index markdown content.
 * TODO components within markdown.
 *
 * @param children
 */
function reduceHTMLAstText(children) {

    return children.reduce((acc, child) => {

        if ( child.type === "text" ) {

            acc.push(child.value.trim());
        }
        else {

            acc.push(...reduceHTMLAstText(child.children));
        }

        return acc;
    }, []);
}

module.exports.generateSiteSearchIndex = generateSiteSearchIndex;
