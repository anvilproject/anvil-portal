/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * Basic outline service.
 */

/**
 * Returns a filtered set of the h2 and h3 htmlAst for the post.
 *
 * @param posts
 * @param docPath
 */
export function filterHtmlAstByHeading(posts, docPath) {

    if (!docPath || !posts) {

        return;
    }

    const slug = docPath.slice(1);

    const page = posts.find(post => post.slug.slice(0, -3) === slug);

    if (!page) {

        return;
    }

    // Grab any <h1>, <h2> or <h3> headings.
    const headings = page.nodes[0].childMarkdownRemark.htmlAst.children.filter(child => child.tagName === "h1" || child.tagName === "h2" || child.tagName === "h3");

    // Only show outline if there are some <h2> or <h3> headings e.g. hide the outline if there is only a <h1> heading.
    if ( !headings.some(heading => heading.tagName === "h2" || heading.tagName === "h3") ) {

        return;
    }

    return headings;
}

/**
 * Returns the outline refactored as anchor, depth and label.
 *
 * @param outline
 * @returns {*}
 */
export function getOutline(outline) {

    if ( !outline ) {

        return;
    }

    const anchor = `#${outline.properties.id}`;
    const depth = Number(outline.tagName.charAt(1));
    const heading = reduceHtmlAstToHeadingValue(outline.children, 10);

    if ( !heading ) {

        return {};
    }

    return {anchor: anchor, depth: depth, label: heading};
}

/**
 * Returns the value of htmlAst element of type "text".
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
 * Reduction is recursive where if children exist, the element type cannot be of type "text.
 * @param array
 * @param d
 * @returns {*}
 */
function reduceHtmlAstToHeadingValue(array, d = 1) {

    if ( !array ) {

        return;
    }

    return d > 0 ? array.reduce((acc, val) => val.children ? reduceHtmlAstToHeadingValue(val.children, d - 1) : val.value, []) : array.slice();
}
